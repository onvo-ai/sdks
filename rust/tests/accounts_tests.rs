mod helpers;

#[tokio::test]
async fn test_list_accounts_integration() {
    let onvo = helpers::setup_client();

    let accounts = onvo.accounts();
    let result = accounts.list().await;

    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());
}

#[tokio::test]
async fn test_get_account_integration() {
    let onvo = helpers::setup_client();
    let accounts = onvo.accounts();

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
