use std::env;

use crate::{
    errors::ApiError,
    resources::embed_users::{self, api::EmbedUsers, models::EmbedUser},
};
use reqwest::{
    header::{HeaderMap, HeaderValue},
    Client as rClient,
};

/// Internal Api client holds the HTTP client, the server end-point and the API Key to send with the request.
/// This struct is not exposed to the library users
pub(crate) struct OnvoApiClient {
    /// Endpoint
    pub(crate) endpoint: String,

    /// HTTP / Reqwest client
    pub(crate) client: rClient,

    /// API Key
    pub(crate) api_key: String,
}

impl OnvoApiClient {
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

        let mut headers = HeaderMap::new();
        headers.insert("Content-Type", HeaderValue::from_static("application/json"));
        headers.insert("x-api-key", HeaderValue::from_str(&self.api_key).unwrap());

        let response = self.client.get(&url).headers(headers).send().await?;

        if !response.status().is_success() {
            let status = response.status();
            let text = response.text().await?;
            return Err(ApiError::from_status(status, text));
        }

        // Get the response body as a string
        response.json::<T>().await.map_err(ApiError::from)
    }

    /// Sends a POST request to the API.
    ///
    /// # Arguments
    ///
    /// * `path` - The path to the API endpoint.
    /// * `data` - The data to send with the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing the response body.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status code is not success
    pub async fn post<T: serde::Serialize, U: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        data: &T,
    ) -> Result<U, ApiError> {
        let url = format!("{}/{}", self.endpoint, path);

        let mut headers = HeaderMap::new();
        headers.insert("Content-Type", HeaderValue::from_static("application/json"));
        headers.insert("x-api-key", HeaderValue::from_str(&self.api_key).unwrap());

        let response = self
            .client
            .post(&url)
            .headers(headers)
            .json(data)
            .send()
            .await?;

        if !response.status().is_success() {
            let status = response.status();
            let text = response.text().await?;
            return Err(ApiError::from_status(status, text));
        }

        response.json::<U>().await.map_err(ApiError::from)
    }

    /// Sends a PUT request to the API.
    ///
    /// # Arguments
    ///
    /// * `path` - The path to the resource.
    /// * `data` - The data to send.
    ///
    /// # Returns
    ///
    /// A future that resolves to the response body.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status code is not success
    pub async fn put<T: serde::Serialize, U: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        data: &T,
    ) -> Result<U, ApiError> {
        let url = format!("{}/{}", self.endpoint, path);

        let mut headers = HeaderMap::new();
        headers.insert("Content-Type", HeaderValue::from_static("application/json"));
        headers.insert("x-api-key", HeaderValue::from_str(&self.api_key).unwrap());

        let response = self
            .client
            .put(&url)
            .headers(headers)
            .json(data)
            .send()
            .await?;

        if !response.status().is_success() {
            let status = response.status();
            let text = response.text().await?;
            return Err(ApiError::from_status(status, text));
        }

        response.json::<U>().await.map_err(ApiError::from)
    }

    /// Sends a PATCH request to the API.
    ///
    /// # Arguments
    ///
    /// * `path` - The path to the resource.
    /// * `data` - The data to send.
    ///
    /// # Returns
    ///
    /// A future that resolves to the response body.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status code is not success
    pub async fn patch<T: serde::Serialize, U: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        data: &T,
    ) -> Result<U, ApiError> {
        let url = format!("{}/{}", self.endpoint, path);

        let mut headers = HeaderMap::new();
        headers.insert("Content-Type", HeaderValue::from_static("application/json"));
        headers.insert("x-api-key", HeaderValue::from_str(&self.api_key).unwrap());

        let response = self
            .client
            .patch(&url)
            .headers(headers)
            .json(data)
            .send()
            .await?;

        if !response.status().is_success() {
            let status = response.status();
            let text = response.text().await?;
            return Err(ApiError::from_status(status, text));
        }

        response.json::<U>().await.map_err(ApiError::from)
    }

    /// Sends a DELETE request to the API.
    ///
    /// # Arguments
    ///
    /// * `path` - The path to the API endpoint.
    ///
    /// # Returns
    ///
    /// A `Result` containing the response body.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the response status code is not success
    pub async fn delete(&self, path: &str) -> Result<(), ApiError> {
        let url = format!("{}/{}", self.endpoint, path);

        let mut headers = HeaderMap::new();
        headers.insert("Content-Type", HeaderValue::from_static("application/json"));
        headers.insert("x-api-key", HeaderValue::from_str(&self.api_key).unwrap());

        let response = self.client.delete(&url).headers(headers).send().await?;

        if !response.status().is_success() {
            let status = response.status();
            let text = response.text().await?;
            return Err(ApiError::from_status(status, text));
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use mockito::{mock, server_url};
    use reqwest::StatusCode;
    use tokio;

    #[tokio::test]
    async fn test_get_missing_api_key() {
        const API_KEY: &str = "test_api_key";

        let _m = mock("GET", "/test")
            .match_header("x-api-key", API_KEY) // Mismatch header expectation
            .with_status(200)
            .with_header("content-type", "application/json")
            .with_body(r#"{"id": 1, "name": "Alice"}"#)
            .create();

        let api_client = &OnvoApiClient {
            endpoint: String::from(&server_url()),
            api_key: String::from("wrong_key"),
            client: reqwest::Client::new(),
        };

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
