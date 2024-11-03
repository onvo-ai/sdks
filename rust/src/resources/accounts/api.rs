//! Contains all the APIs for the Accounts resource

use crate::{client::OnvoApiClient, errors::ApiError};

use super::models::Account;

pub struct Accounts<'a> {
    client: &'a OnvoApiClient,
}

impl<'a> Accounts<'a> {
    pub fn new(client: &'a OnvoApiClient) -> Self {
        Self { client }
    }

    /// Lists all the accounts.
    ///
    /// # Returns
    ///
    /// A list of accounts.
    ///
    pub async fn list(&self) -> Result<Vec<Account>, ApiError> {
        self.client.get("/accounts").await
    }

    /// Gets a specific account.
    ///
    /// # Arguments
    ///
    /// * `id` - The id of the account
    ///
    /// # Returns
    ///
    /// A specific account.
    ///
    pub async fn get(&self, id: &str) -> Result<Account, ApiError> {
        self.client.get(&format!("/accounts/{}", id)).await
    }
}
