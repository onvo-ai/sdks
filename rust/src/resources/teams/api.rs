use crate::{client::OnvoApiClient, errors::ApiError};

use super::models::Team;

pub struct Teams<'a> {
    client: &'a OnvoApiClient,
}

impl<'a> Teams<'a> {
    pub fn new(client: &'a OnvoApiClient) -> Self {
        Self { client }
    }

    /// List all teams.
    ///
    /// # Arguments
    ///
    /// *`id` - The ID of the team to retrieve.
    ///
    /// # Returns
    ///
    /// *`Vec<Team>` - A list of all teams.
    ///
    /// # Errors
    ///
    /// *`ApiError` - If the request failed.
    pub async fn list(&self) -> Result<Vec<Team>, ApiError> {
        self.client.get("/teams").await
    }

    /// Get a team.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the team to retrieve.
    ///
    /// # Returns
    ///
    /// * `Team` - The team.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed
    pub async fn get(&self, id: &str) -> Result<Team, ApiError> {
        self.client.get(&format!("/teams/{}", id)).await
    }

    /// Update a team.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the team to update.
    /// * `data` - The data to update the team with.
    ///
    /// # Returns
    ///
    /// * `Team` - The updated team.
    ///
    /// # Errors
    ///
    /// * `ApiError` - If the request failed
    pub async fn update(&self, id: &str, data: &Team) -> Result<Team, ApiError> {
        self.client.put(&format!("/teams/{}", id), data).await
    }
}
