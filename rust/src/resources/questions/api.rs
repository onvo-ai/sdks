use crate::{client::OnvoApiClient, errors::ApiError};

use super::models::{Message, Question};

pub struct Questions<'a> {
    client: &'a OnvoApiClient,
}

impl<'a> Questions<'a> {
    pub fn new(client: &'a OnvoApiClient) -> Self {
        Self { client }
    }

    /// List all questions
    ///
    /// # Returns
    ///
    /// A list of questions
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn list(&self) -> Result<Vec<Question>, ApiError> {
        self.client.get("/questions").await
    }

    /// Create a question
    ///
    /// # Arguments
    ///
    /// * `dashboard_id` - The dashboard id
    /// * `query` - The question query
    ///
    /// # Returns
    ///
    /// The created question
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn create(&self, dashboard_id: &str, query: &str) -> Result<Question, ApiError> {
        let message = Message {
            role: String::from("user"),
            content: query.to_string(),
        };
        let messages = vec![message];
        let body = &Question {
            dashboard: dashboard_id.to_string(),
            messages: messages,
            query: None,
            id: None,
            created_at: None,
            team: None,
        };
        self.client.post("/questions", &body).await
    }

    /// Delete a question
    ///
    /// # Arguments
    ///
    /// * `id` - The question id
    ///
    /// # Returns
    ///
    /// No content
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn delete(&self, id: &str) -> Result<(), ApiError> {
        self.client.delete(&format!("/questions/{}", id)).await
    }
}
