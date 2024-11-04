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

    /// List all automations
    ///
    /// # Arguments
    ///
    /// * `id` - The automation id
    ///
    /// # Returns
    ///
    /// * `Vec<Automation>` - The list of automations
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed
    pub async fn list(&self) -> Result<Vec<Automation>, ApiError> {
        self.client.get("/automations").await
    }

    /// Get an automation
    ///
    /// # Arguments
    ///
    /// * `id` - The automation id
    ///
    /// # Returns
    ///
    /// * `Automation` - The automation
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed
    pub async fn get(&self, id: &str) -> Result<Automation, ApiError> {
        self.client.get(&format!("/automations/{}", id)).await
    }

    /// Get a list of runs for an automation.
    ///
    ///  # Arguments
    ///
    /// * `id` - The automation id.
    ///
    /// # Returns
    ///
    /// * `Value` - The automation runs
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed
    ///
    /// TODO:
    /// Figure out with the Onvo team on what the DTO for `runs`.
    /// For now, it's a non-strict serde JSON `Value`.
    pub async fn get_runs(&self, id: &str) -> Result<Vec<Value>, ApiError> {
        self.client.get(&format!("/automations/{}/runs", id)).await
    }

    /// Creates an automation.
    ///
    /// # Arguments
    ///
    /// * `data` - The automation data.
    ///
    /// # Returns
    ///
    /// An `Ok` response if the automation was created.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed
    pub async fn create(&self, data: &Automation) -> Result<Automation, ApiError> {
        self.client.put("/automations", data).await
    }

    /// Updates an automation.
    ///
    ///  # Arguments
    ///
    /// * `id` - The automation id.
    /// * `data` - The automation data.
    ///
    /// # Returns
    ///
    /// An `Ok` response if the automation was updated.
    ///
    ///  # Errors
    ///
    ///  * `ApiError` - If the request failed.
    pub async fn update(&self, id: &str, data: &Automation) -> Result<Automation, ApiError> {
        self.client
            .post(&format!("/automations/{}", id), data)
            .await
    }

    /// Deletes an automation.
    ///
    /// # Arguments
    ///
    /// * `id` - The automation id.
    ///
    /// # Returns
    ///
    /// An `Ok` response if the automation was deleted.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed.
    pub async fn delete(&self, id: &str) -> Result<(), ApiError> {
        self.client.delete(&format!("/automations/{}", id)).await
    }
}
