use crate::{client::OnvoApiClient, errors::ApiError, resources::questions::api::Questions};
use regex::Regex;
use serde_json::{json, Value};

use crate::resources::questions::models::Message as QuestionMessage;

use super::models::{Message as ConversationMessage, Widget};

pub struct Widgets<'a> {
    client: &'a OnvoApiClient,
    questions: &'a Questions<'a>,
}

impl<'a> Widgets<'a> {
    pub fn new(client: &'a OnvoApiClient, questions: &'a Questions) -> Self {
        Self { client, questions }
    }

    /// List widgets linked to a dashboard.
    ///
    /// # Arguments
    ///
    /// * `dashboard_id` - The dashboard id to list widgets for.
    ///
    /// # Returns
    ///
    /// * `Vec<Widget>` - A list of all widgets.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed.
    pub async fn list(&self, dashboard_id: &str) -> Result<Vec<Widget>, ApiError> {
        self.client
            .get(&format!("/widgets?dashboard_id={}", dashboard_id))
            .await
    }

    /// Create a new widget.
    ///
    /// # Arguments
    ///
    /// * `dashboard_id` - The dashboard id for the widget.
    /// * `query` - The query string to ask a question.
    ///
    /// # Returns
    ///
    /// * `Widget` - The created widget.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed.
    pub async fn create(&self, dashboard_id: &str, query: &str) -> Result<Widget, ApiError> {
        let conversation = self.questions.create(dashboard_id, query).await?;
        let messages: Vec<QuestionMessage> = conversation.messages.clone();

        // Extract the raw widget text from the last tool message
        let result = messages
            .iter()
            .find(|message| message.role == "tool")
            .map(|message| message.content.as_str());

        // Raise an API Error if it is None
        if result.is_none() {
            return Err(ApiError::InternalError(
                "Could not find a tool message in the conversation".to_string(),
            ));
        }

        // Extract the raw widget text from the last tool message
        let raw_widget_text = result.unwrap();

        // Extract the `code` and `cache` portions from the raw widget text
        let code = extract_pattern(r"```python([\S\n\t\v ]*)```\n```json", raw_widget_text)?;
        let cache = extract_pattern(r"```json([\S\n\t\v ]*)```", raw_widget_text)?;

        // Create the widget data payload
        let data = Widget {
            dashboard: dashboard_id.to_string(),
            code,
            cache: serde_json::from_str(&cache)?,
            messages: vec![ConversationMessage {
                role: "user".to_string(),
                content: query.to_string(),
            }],
            id: None,
            query: None,
            team: None,
            settings: None,
        };

        self.client.post("/widgets", &data).await
    }

    /// Get details on a specific widget.
    ///
    /// # Arguments
    ///
    /// * `id` - The widget id.
    ///
    /// # Returns
    ///
    /// The widget details.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status code is not success
    pub async fn get(&self, id: &str) -> Result<Value, ApiError> {
        self.client.get(&format!("/widgets/{}", id)).await
    }

    /// Export a widget.
    ///
    /// This endpoint exports a widget to a file.
    ///
    /// # Arguments
    ///
    /// * `id` - The widget id.
    /// * `format` - The format to export the widget to.
    ///
    /// # Returns
    ///
    /// The exported widget.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status code is not success
    pub async fn export(&self, id: &str, format: &str) -> Result<Value, ApiError> {
        self.client
            .get(&format!("/widgets/{}/export?format={}", id, format))
            .await
    }

    /// Update an existing widget.
    ///
    /// # Arguments
    ///
    /// * `id` - The widget id.
    /// * `data` - The data to update the widget with.
    ///
    /// # Returns
    ///
    /// The updated widget.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status is not success.
    pub async fn update(&self, id: &str, data: &Widget) -> Result<Widget, ApiError> {
        self.client.post(&format!("/widgets/{}", id), data).await
    }

    /// Request an edit to an existing widget.
    ///
    /// # Arguments
    ///
    /// * `id` - The widget id.
    /// * `data` - The data to update the widget with.
    ///
    /// # Returns
    ///
    /// The updated widget.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status is not success.
    pub async fn request_edit(&self, id: &str, data: &Widget) -> Result<Widget, ApiError> {
        self.client.patch(&format!("/widgets/{}", id), data).await
    }

    /// Execute code in the context of a widget.
    ///
    /// # Arguments
    ///
    /// * `id` - The widget id.
    /// * `code` - The code to execute.
    ///
    /// # Returns
    ///
    /// The result of the code execution.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status
    pub async fn execute_code(&self, id: &str, code: &str) -> Result<Value, ApiError> {
        let data = json!({ "code": code });
        self.client
            .post(&format!("/widgets/{}/execute-code", id), &data)
            .await
    }

    /// Delete an existing widget.
    ///
    /// # Arguments
    ///
    /// * `id` - The widget id.
    ///
    /// # Returns
    ///
    /// `Ok(())` if the widget was deleted.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status
    pub async fn delete(&self, id: &str) -> Result<(), ApiError> {
        self.client.delete(&format!("/widgets/{}", id)).await
    }
}

// Helper function to extract patterns from text using regex
fn extract_pattern(pattern: &str, text: &str) -> Result<String, ApiError> {
    let re = Regex::new(pattern)
        .map_err(|_| ApiError::InternalError("Invalid pattern for extraction".to_string()))?;
    re.captures(text)
        .and_then(|caps| caps.get(1))
        .map(|m| m.as_str().trim().to_string())
        .ok_or(ApiError::InternalError(
            "Could not extract pattern".to_string(),
        ))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_pattern_success() {
        let pattern = r"```python([\S\n\t\v ]*)```\n```json";
        let text = "Some text before ```pythonprint('Hello')```\n```json with more text after";

        let result = extract_pattern(pattern, text);

        assert!(result.is_ok());
        assert_eq!(result.unwrap(), "print('Hello')");
    }

    #[test]
    fn test_extract_pattern_no_match() {
        let pattern = r"```python([\S\n\t\v ]*)```\n```json";
        let text = "This text does not contain the pattern we are looking for.";

        let result = extract_pattern(pattern, text);

        assert!(result.is_err());
    }

    #[test]
    fn test_extract_pattern_incorrect_format() {
        let pattern = r"```python([\S\n\t\v ]*)```\n```json";
        let text = "Some text before ```pythonprint('Hello')`` with incomplete tags";

        let result = extract_pattern(pattern, text);

        assert!(result.is_err());
    }

    #[test]
    fn test_extract_pattern_invalid_regex() {
        let pattern = r"```python([";
        let text = "Some text before ```pythonprint('Hello')```";

        let result = extract_pattern(pattern, text);

        assert!(result.is_err());
    }

    #[test]
    fn test_extract_pattern_empty_text() {
        let pattern = r"```python([\S\n\t\v ]*)```\n```json";
        let text = "";

        let result = extract_pattern(pattern, text);

        assert!(result.is_err());
    }
}
