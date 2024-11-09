use crate::{client::OnvoApiClient, errors::ApiError};

use super::models::EmbedUser;

pub struct EmbedUsers<'a> {
    client: &'a OnvoApiClient,
}

impl<'a> EmbedUsers<'a> {
    pub fn new(client: &'a OnvoApiClient) -> Self {
        Self { client }
    }

    /// List all embed users
    ///
    /// # Returns
    ///
    /// A list of embed users
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn list(&self) -> Result<Vec<EmbedUser>, ApiError> {
        self.client.get("/embed-users").await
    }

    /// Get a embed user by ID
    ///
    /// # Arguments
    ///
    /// * `id` - ID of the embed user
    ///
    /// # Returns
    ///
    /// A embed user
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn get(&self, id: &str) -> Result<EmbedUser, ApiError> {
        self.client.get(&format!("/embed-users/{}", id)).await
    }

    /// Upsert a embed user
    ///
    /// # Arguments
    ///
    /// * `body` - Embed user
    ///
    /// # Returns
    ///
    /// A embed user
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn upsert(&self, body: &EmbedUser) -> Result<EmbedUser, ApiError> {
        self.client.post("/embed-users", body).await
    }

    /// Deletes a embed user
    ///
    /// # Arguments
    ///
    /// * `id` - The id of the embed user
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn delete(&self, id: &str) -> Result<(), ApiError> {
        self.client.delete(&format!("/embed-users/{}", id)).await
    }

    // TODO: Implement
    // pub async fn upload_files() {

    // }
}
