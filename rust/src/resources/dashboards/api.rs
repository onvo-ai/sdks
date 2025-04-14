use serde_json::json;

use crate::{client::OnvoApiClient, errors::ApiError, resources::datasources::models::Datasource};

pub struct Dashboards<'a> {
    client: &'a OnvoApiClient,
    dashboard_id: &'a str,
}

impl<'a> Dashboards<'a> {
    pub fn new(client: &'a OnvoApiClient, dashboard_id: &'a str) -> Self {
        Self {
            client,
            dashboard_id,
        }
    }

    /// List all datasources linked to a dashboard
    ///
    /// # Returns
    ///
    /// A list of datasources
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn list(&self) -> Result<Vec<Datasource>, ApiError> {
        self.client
            .get(&format!("/dashboards/{}/datasources", self.dashboard_id))
            .await
    }

    /// Link a datasource to a dashboard
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
    pub async fn link(&self, id: &str) -> Result<(), ApiError> {
        self.client
            .put(
                &format!("/dashboards/{}/datasources", self.dashboard_id),
                &json!({
                    "dataSourceId": id
                }),
            )
            .await
    }

    /// Unlink a datasource
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
    pub async fn unlink(&self, id: &str) -> Result<(), ApiError> {
        self.client
            .delete(&format!(
                "/dashboards/{}/datasources/{}",
                self.dashboard_id, id
            ))
            .await
    }
}
