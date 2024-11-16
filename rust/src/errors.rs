use reqwest::StatusCode;
use thiserror::Error;

/// Error returned by the SDK when an API call fails.
#[derive(Debug, Error)]
pub enum ApiError {
    #[error("Network error: {0}")]
    Network(#[from] reqwest::Error),

    #[error("Failed to parse response: {0}")]
    ParseError(#[from] serde_json::Error),

    #[error("Resource not found with ID: {0}")]
    NotFound(u32),

    #[error("Unauthorized access - invalid API key")]
    Unauthorized,

    #[error("Unexpected response status: {0}, {1}")]
    Unexpected(StatusCode, String),

    #[error("An internal error occurred when processing the request: {0}")]
    InternalError(String),
}

impl ApiError {
    /// Creates a new `ApiError` from a `StatusCode`.
    ///
    /// # Arguments
    ///
    /// * `status` - The status code to use.
    /// * `message` - The message to use.
    ///
    /// # Returns
    ///
    /// A new `ApiError` with the given status code
    pub fn from_status(status: StatusCode, message: String) -> Self {
        match status {
            StatusCode::NOT_FOUND => ApiError::NotFound(0),
            StatusCode::UNAUTHORIZED => ApiError::Unauthorized,
            _ => ApiError::Unexpected(status, message),
        }
    }
}
