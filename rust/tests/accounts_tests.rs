mod helpers;

use onvo_ai::resources::accounts::api::Accounts;

#[tokio::test]
async fn test_list_accounts_integration() {
    let api_client = helpers::setup_client();

    let accounts = Accounts::new(api_client);
    let result = accounts.list().await;

    assert!(result.is_ok());
}

#[tokio::test]
async fn test_get_account_integration() {
    let api_client = helpers::setup_client();
    let accounts = Accounts::new(api_client);

    let account_id = accounts
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|account| account.id.clone())
        .expect("Expected at least one account to be available");

    let account = accounts.get(&account_id).await.unwrap();
    assert_eq!(account.id.unwrap(), account_id);
}
