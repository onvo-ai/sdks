mod helpers;

#[tokio::test]
async fn test_list_sessions_integration() {
    let onvo = helpers::setup_client();

    let sessions = onvo.sessions();
    let result = sessions.list("09720600-cab3-4486-bc14-10f014f573a5").await;

    assert!(result.is_ok());
}

#[tokio::test]
async fn test_revoke_sessions_integrated() {
    let onvo = helpers::setup_client();

    let sessions = onvo.sessions();
    let result = sessions
        .revoke("09720600-cab3-4486-bc14-10f014f573a5")
        .await;
    assert!(result.is_ok());
}

#[tokio::test]
#[ignore = "
TODO: Fix no dashboard found issue
Error `Unexpected(400, \"{\\\"message\\\":\\\"No dashboard found\\\"}`"]
async fn test_upsert_session_integrated() {
    let onvo = helpers::setup_client();

    let sessions = onvo.sessions();
    let result = sessions
        .upsert(
            "09720600-cab3-4486-bc14-10f014f573a5",
            "874de49f-3b18-4e0d-ad4e-2c873ef42a5c",
        )
        .await;

    match &result {
        Ok(_) => {}
        Err(err) => panic!("Error: {:?}", err),
    }

    assert!(result.is_ok());
}
