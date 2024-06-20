use crate::client::Client;
use rustify::Endpoint;

use crate::errors::ClientError;

pub mod dashboard;
use rustify::errors::ClientError as RestClientError;
use serde::{de::DeserializeOwned, Deserialize};

#[derive(Deserialize, Debug)]
pub struct EndpointError {
    pub errors: Vec<String>,
}

pub async fn execute<E>(client: &impl Client, endpoint: E) -> Result<E::Response, ClientError>
where
    E: Endpoint,
{
    endpoint
        .with_middleware(client.middle())
        .exec(client.http())
        .await?
        .parse()
        .map_err(ClientError::from)
}
