use crate::{client::OnvoApiClient, errors::ApiError};

use super::models::Datasource;

pub struct Datasources<'a> {
    client: &'a OnvoApiClient,
}

impl<'a> Datasources<'a> {
    pub fn new(client: &'a OnvoApiClient) -> Self {
        Self { client }
    }

    /// List all datasources
    ///
    /// # Returns
    ///
    /// A list of datasources
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn list(&self) -> Result<Vec<Datasource>, ApiError> {
        self.client.get("/datasources").await
    }

    /// Get a datasource
    ///
    /// # Arguments
    ///
    /// * `id` - ID of the datasource
    ///
    /// # Returns
    ///
    /// A datasource
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn get(&self, id: &str) -> Result<Datasource, ApiError> {
        self.client.get(&format!("/datasources/{}", id)).await
    }

    /// Create a datasource
    ///
    /// # Arguments
    ///
    /// * `body` - A datasource
    ///
    /// # Returns
    ///
    /// A datasource
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn create(&self, body: &Datasource) -> Result<Datasource, ApiError> {
        self.client.post("/datasources", body).await
    }

    /// Initialize a datasource
    ///
    ///  # Arguments
    ///
    /// * `id` - The id of the datasource
    ///
    /// # Returns
    ///
    /// A datasource
    ///
    ///  # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn initialize(&self, id: &str) -> Result<Datasource, ApiError> {
        self.client
            .get(&format!("/datasources/{}/initialize", id))
            .await
    }

    /// Update a datasource
    ///
    /// # Arguments
    ///
    /// * `id` - The id of the datasource
    /// * `body` - The datasource
    ///
    /// # Returns
    ///
    /// A datasource
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn update(&self, id: &str, body: &Datasource) -> Result<Datasource, ApiError> {
        self.client.put(&format!("/datasources/{}", id), body).await
    }

    /// Deletes a datasource
    ///
    /// # Arguments
    ///
    /// * `id` - The id of the datasource
    ///
    /// # Returns
    ///
    /// A datasource
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn delete(&self, id: &str) -> Result<(), ApiError> {
        self.client.delete(&format!("/datasources/{}", id)).await
    }

    // TODO: Implement
    // pub async fn upload_files() {

    // }
}
