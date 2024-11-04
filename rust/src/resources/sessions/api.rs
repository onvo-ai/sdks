use crate::{client::OnvoApiClient, errors::ApiError};

use super::models::Session;

pub struct Sessions<'a> {
    client: &'a OnvoApiClient,
}

impl<'a> Sessions<'a> {
    pub fn new(client: &'a OnvoApiClient) -> Self {
        Self { client }
    }

    /// List all sessions
    ///
    /// # Returns
    ///
    /// A list of sessions
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn list(&self, dashboard_id: &str) -> Result<Vec<Session>, ApiError> {
        self.client
            .get(format!("/sessions?parent_dashboard={}", dashboard_id.to_string()).as_str())
            .await
    }

    /// Revoke all sessions
    ///
    /// # Arguments
    ///
    /// * `dashboard_id` - The dashboard id
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn revoke(&self, dashboard_id: &str) -> Result<(), ApiError> {
        self.client
            .delete(format!("/sessions?parent_dashboard={}", dashboard_id.to_string()).as_str())
            .await
    }

    /// Inserts a user session. If a session already exists, it updates it.
    ///
    /// # Arguments
    ///
    /// * `dashboard_id` - The dashboard id
    /// * `user_id` - The user id
    ///
    /// # Returns
    ///
    /// No content
    ///
    /// # Error
    ///
    /// * `ApiError` - Error returned by the API
    pub async fn upsert(&self, dashboard_id: &str, user_id: &str) -> Result<Session, ApiError> {
        let data = &Session {
            embed_user: user_id.to_string(),
            dashboard: dashboard_id.to_string(),
            team: None,
            created_at: None,
            parameters: None,
        };
        self.client.post("/sessions", &data).await
    }
}
