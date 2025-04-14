use std::env;

use client::OnvoApiClient;
use resources::{
    accounts::api::Accounts, automations::api::Automations, dashboards::api::Dashboards,
    datasources::api::Datasources, embed_users::api::EmbedUsers, questions::api::Questions,
    sessions::api::Sessions, teams::api::Teams, widgets::api::Widgets,
};

pub mod client;
pub mod errors;
pub mod resources;

use reqwest::Client as rClient;
pub struct Onvo {
    api_client: OnvoApiClient,
}

impl Onvo {
    /// Creates a new client with the provided endpoint and API key.
    /// If you don't provide an endpoint, the endpoint is taken from the environment variable `ONVO_API_ENDPOINT`.
    /// If you don't provide an API key, the API key is taken from the environment variable `ONVO_API_KEY`.
    pub fn new(endpoint: Option<&str>, api_key: Option<&str>) -> Onvo {
        let endpoint = endpoint
            .map(|e| e.to_string())
            .or_else(|| env::var("ONVO_API_ENDPOINT").ok())
            .expect(
                "You must provide an endpoint or set the ONVO_API_ENDPOINT environment variable.",
            );

        let api_key = api_key
            .map(|k| k.to_string())
            .or_else(|| env::var("ONVO_API_KEY").ok())
            .expect("You must provide an API key or set the ONVO_API_KEY environment variable.");

        Onvo {
            api_client: OnvoApiClient {
                endpoint: endpoint,
                client: rClient::new(),
                api_key: api_key,
            },
        }
    }

    /// Provides access to the Embed Users API.
    ///
    /// # Returns
    /// An instance of [`EmbedUsers`] that can be used to interact with the Embed Users resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let embed_users = onvo.embed_users();
    /// ```
    pub fn embed_users(&self) -> EmbedUsers {
        EmbedUsers::new(&self.api_client)
    }

    /// Provides access to the Datasources API.
    ///
    /// # Returns
    /// An instance of [`Datasources`] that can be used to interact with the Datasources resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let datasources = onvo.datasources();
    /// ```
    pub fn datasources(&self) -> Datasources {
        Datasources::new(&self.api_client)
    }

    /// Provides access to the Sessions API.
    ///
    /// # Returns
    /// An instance of [`Sessions`] that can be used to interact with the Sessions resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let sessions = onvo.sessions();
    /// ```
    pub fn sessions(&self) -> Sessions {
        Sessions::new(&self.api_client)
    }

    /// Provides access to the Teams API.
    ///
    /// # Returns
    /// An instance of [`Teams`] that can be used to interact with the Teams resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let teams = onvo.teams();
    /// ```
    pub fn teams(&self) -> Teams {
        Teams::new(&self.api_client)
    }

    /// Provides access to the Questions API.
    ///
    /// # Returns
    /// An instance of [`Questions`] that can be used to interact with the Questions resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let questions = onvo.questions();
    /// ```
    pub fn questions(&self) -> Questions {
        Questions::new(&self.api_client)
    }

    /// Provides access to the Widgets API, scoped by the provided Questions instance.
    ///
    /// # Arguments
    /// * `questions` - A reference to an instance of [`Questions`].
    ///
    /// # Returns
    /// An instance of [`Widgets`] that can be used to interact with the Widgets resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let questions = onvo.questions();
    /// let widgets = onvo.widgets(&questions);
    /// ```
    pub fn widgets<'a>(&'a self, questions: &'a Questions) -> Widgets<'a> {
        Widgets::new(&self.api_client, questions)
    }

    /// Provides access to the Dashboards API, scoped by the given dashboard ID.
    ///
    /// # Arguments
    /// * `id` - A reference to a `str` representing the dashboard ID.
    ///
    /// # Returns
    /// An instance of [`Dashboards`] that can be used to interact with the Dashboards resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let dashboard = onvo.dashboards("dashboard_id");
    /// ```
    pub fn dashboards<'a>(&'a self, id: &'a str) -> Dashboards<'a> {
        Dashboards::new(&self.api_client, id)
    }

    /// Provides access to the Automations API.
    ///
    /// # Returns
    /// An instance of [`Automations`] that can be used to interact with the Automations resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let automations = onvo.automations();
    /// ```
    pub fn automations(&self) -> Automations {
        Automations::new(&self.api_client)
    }

    /// Provides access to the Accounts API.
    ///
    /// # Returns
    /// An instance of [`Accounts`] that can be used to interact with the Accounts resource.
    ///
    /// # Example
    /// ```rust
    /// use onvo_ai::Onvo;
    ///
    /// let url = "";
    /// let api_key = "";
    /// let onvo = Onvo::new(Some(&url), Some(&api_key));
    /// let accounts = onvo.accounts();
    /// ```
    pub fn accounts(&self) -> Accounts {
        Accounts::new(&self.api_client)
    }
}

#[cfg(test)]
mod tests {
    use std::env;

    use serial_test::serial;

    use crate::Onvo;

    #[test]
    #[serial]
    fn test_new_with_provided_values() {
        let test_endpoint = "https://api.example.com";
        let test_api_key = "test_api_key";

        let onvo = Onvo::new(Some(test_endpoint), Some(test_api_key));

        assert_eq!(onvo.api_client.endpoint, test_endpoint);
        assert_eq!(onvo.api_client.api_key, test_api_key);
    }

    #[test]
    #[serial]
    fn test_new_with_environment_variables() {
        env::set_var("ONVO_API_ENDPOINT", "https://api.example.com");
        env::set_var("ONVO_API_KEY", "env_api_key");

        let onvo = Onvo::new(None, None);

        assert_eq!(onvo.api_client.endpoint, "https://api.example.com");
        assert_eq!(onvo.api_client.api_key, "env_api_key");

        env::remove_var("ONVO_API_ENDPOINT");
        env::remove_var("ONVO_API_KEY");
    }

    #[test]
    #[serial]
    #[should_panic]
    fn test_new_missing_endpoint_and_api_key() {
        env::remove_var("ONVO_API_ENDPOINT");
        env::remove_var("ONVO_API_KEY");

        Onvo::new(None, None);
    }

    #[test]
    #[serial]
    #[should_panic]
    fn test_new_missing_api_key() {
        env::set_var("ONVO_API_ENDPOINT", "https://api.example.com");
        env::remove_var("ONVO_API_KEY");

        Onvo::new(None, None);
    }
}
