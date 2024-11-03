use thiserror::Error;

#[derive(Error, Debug)]
pub enum ClientError {
    #[error("The Onvo AI server returned an error (status code {code})")]
    APIError { code: u16, errors: Vec<String> },

    #[error("Error parsing value into JSON")]
    JsonParseError { source: serde_json::error::Error },

    #[error("Error building the REST client")]
    RestClientBuildError { source: reqwest::Error },

    #[error("An unknown error occurred with the REST Client")]
    RestClientError {
        #[from]
        source: rustify::errors::ClientError,
    },
}
