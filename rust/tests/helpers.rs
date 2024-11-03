use std::env;

use onvo_ai::client::OnvoApiClient;

/// Setup the API client.
/// This can be used to setup the API client for testing purposes.
pub fn setup_client() -> &'static OnvoApiClient {
    // Using `Box::leak` to get a static lifetime reference
    // Hack ref: https://stackoverflow.com/a/73330433
    Box::leak(Box::new(OnvoApiClient::new(
        Some("https://dashboard.onvo.ai/api"),
        None,
    )))
}
