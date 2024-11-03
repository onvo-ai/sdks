use crate::{client::OnvoApiClient, errors::ApiError};
use serde_json::Value;

use super::models::Automation;

pub struct Automations<'a> {
    client: &'a OnvoApiClient,
}

impl<'a> Automations<'a> {
    pub fn new(client: &'a OnvoApiClient) -> Self {
        Self { client }
    }

    pub async fn list(&self) -> Result<Vec<Automation>, ApiError> {
        self.client.get("/automations").await
    }

    pub async fn get(&self, id: &str) -> Result<Automation, ApiError> {
        self.client.get(&format!("/automations/{}", id)).await
    }

    pub async fn get_runs(&self, id: &str) -> Result<Value, ApiError> {
        self.client.get(&format!("/automations/{}/runs", id)).await
    }

    pub async fn create(&self, data: &Value) -> Result<Automation, ApiError> {
        self.client.put("/automations", data).await
    }

    pub async fn update(&self, id: &str, data: &Value) -> Result<Automation, ApiError> {
        self.client
            .post(&format!("/automations/{}", id), data)
            .await
    }

    pub async fn delete(&self, id: &str) -> Result<Automation, ApiError> {
        self.client.delete(&format!("/automations/{}", id)).await
    }
}
