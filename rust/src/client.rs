use crate::errors::ApiError;
use reqwest::{
    header::{HeaderMap, HeaderValue},
    Client as RClient,
};

/// Api client holds the HTTP client, the server end-point and the headers to send with the request.
pub struct ApiClient {
    /// Endpoint
    endpoint: String,

    /// HTTP / Reqwest client
    client: RClient,

    /// Headers to send with the request
    headers: HeaderMap,
}

impl ApiClient {
    /// Creates a new ApiClient
    pub fn new(endpoint: &str, api_key: &str) -> Self {
        let mut headers = HeaderMap::new();
        headers.insert("x-api-key", HeaderValue::from_str(api_key).unwrap());
        headers.insert("Content-Type", HeaderValue::from_static("application/json"));

        Self {
            endpoint: endpoint.to_string(),
            client: RClient::new(),
            headers,
        }
    }

    /// Sends a GET request to the API
    ///
    /// # Arguments
    ///
    /// * `path` - The path to the API endpoint
    ///
    /// # Returns
    ///
    /// * `Result<T, ApiError>` - The response body as a deserialized object
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status code is not success
    pub async fn get<T: serde::de::DeserializeOwned>(&self, path: &str) -> Result<T, ApiError> {
        let url = format!("{}/{}", self.endpoint, path);
        let response = self
            .client
            .get(&url)
            .headers(self.headers.clone())
            .send()
            .await?;

        // print response status
        println!("Response status: {}", response.status());

        if !response.status().is_success() {
            let status = response.status();
            let text = response.text().await?;
            return Err(ApiError::from_status(status, text));
        }

        response.json::<T>().await.map_err(ApiError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use mockito::{mock, server_url};
    use reqwest::StatusCode;
    use tokio;

    #[tokio::test]
    async fn test_get_success() {
        const API_KEY: &str = "test_api_key";

        let _m = mock("GET", "/test")
            .match_header("x-api-key", API_KEY)
            .with_status(200)
            .with_header("content-type", "application/json")
            .with_body(r#"{"id": 1, "name": "Alice"}"#)
            .create();

        let api_client = ApiClient::new(&server_url(), API_KEY);

        #[derive(Debug, serde::Deserialize)]
        struct TestResponse {
            id: u32,
            name: String,
        }

        let result: Result<TestResponse, ApiError> = api_client.get("test").await;
        assert!(result.is_ok());
        let response = result.unwrap();
        assert_eq!(response.id, 1);
        assert_eq!(response.name, "Alice");
    }

    #[tokio::test]
    async fn test_get_missing_api_key() {
        const API_KEY: &str = "test_api_key";

        let _m = mock("GET", "/test")
            .match_header("x-api-key", API_KEY) // Mismatch header expectation
            .with_status(200)
            .with_header("content-type", "application/json")
            .with_body(r#"{"id": 1, "name": "Alice"}"#)
            .create();

        let api_client = ApiClient::new(&server_url(), "wrong_key");

        #[derive(Debug, serde::Deserialize)]
        struct TestResponse {
            id: u32,
            name: String,
        }

        let result: Result<TestResponse, ApiError> = api_client.get("test").await;

        assert!(result.is_err());
        if let Err(ApiError::Unexpected(status, _)) = result {
            assert_eq!(status, StatusCode::NOT_IMPLEMENTED);
        }
    }
}
