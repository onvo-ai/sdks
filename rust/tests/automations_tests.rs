mod helpers;

use onvo_ai::resources::automations::api::Automations;

#[tokio::test]
async fn test_list_automations_integration() {
    let client = helpers::setup_client();
    let automations = Automations::new(&client);
    let result = automations.list().await;

    match result {
        Ok(automations) => {
            println!("Received automations: {:?}", automations);
        }
        Err(e) => panic!("Expected successful response, but got error: {:?}", e),
    }
}
