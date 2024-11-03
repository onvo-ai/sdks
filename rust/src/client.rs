use crate::{errors::ClientError, middleware::TokenMiddleware};
use rustify::clients::reqwest::Client as HTTPClient;
use url::Url;

pub trait Client {
    fn http(&self) -> &HTTPClient;
    fn middle(&self) -> &TokenMiddleware;
    fn settings(&self) -> &OnvoAIClientSettings;
}

#[derive(Builder, Clone, Debug)]
pub struct OnvoAIClientSettings {
    pub base_url: Url,
    pub token: String,
}

pub struct OnvoAIClient {
    pub http: HTTPClient,
    pub middle: TokenMiddleware,
    pub settings: OnvoAIClientSettings,
}

impl OnvoAIClient {
    pub fn new(settings: OnvoAIClientSettings) -> Result<OnvoAIClient, ClientError> {
        let mut http_client = reqwest::ClientBuilder::new();
        let http_client = http_client
            .build()
            .map_err(|e| ClientError::RestClientBuildError { source: e })?;
        let http = HTTPClient::new(settings.base_url.as_str(), http_client);
        let middle = TokenMiddleware {
            token: settings.token.clone(),
        };
        Ok(OnvoAIClient {
            settings,
            middle,
            http,
        })
    }
}

impl Client for OnvoAIClient {
    fn http(&self) -> &HTTPClient {
        &self.http
    }

    fn middle(&self) -> &TokenMiddleware {
        &self.middle
    }

    fn settings(&self) -> &OnvoAIClientSettings {
        &self.settings
    }
}
