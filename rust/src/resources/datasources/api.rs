use crate::{client::OnvoApiClient, errors::ApiError};

use super::models::Datasource;

pub struct Datasources<'a> {
    client: &'a OnvoApiClient,
}

impl<'a> Datasources<'a> {
    pub fn new(client: &'a OnvoApiClient) -> Self {
        Self { client }
    }

    pub async fn list(&self) -> Result<Vec<Datasource>, ApiError> {
        self.client.get("/datasources").await
    }

    pub async fn get(&self, id: &str) -> Result<Datasource, ApiError> {
        self.client.get(&format!("/datasources/{}", id)).await
    }

    pub async fn create(&self, body: &Datasource) -> Result<Datasource, ApiError> {
        self.client.put("/datasources", body).await
    }

    pub async fn initialize(&self, id: &str) -> Result<Datasource, ApiError> {
        self.client
            .get(&format!("/datasources/{}/initialize", id))
            .await
    }

    pub async fn update(&self, id: &str, body: &Datasource) -> Result<Datasource, ApiError> {
        self.client
            .post(&format!("/datasources/{}", id), body)
            .await
    }

    pub async fn delete(&self, id: &str) -> Result<(), ApiError> {
        self.client.delete(&format!("/datasources/{}", id)).await
    }

    // TODO: Implement
    // pub async fn upload_files() {

    // }
}
