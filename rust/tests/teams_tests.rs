mod helpers;

use onvo_ai::resources::teams::{api::Teams, models::Team};

#[tokio::test]
async fn test_list_teams_integration() {
    let api_client = helpers::setup_client();

    let teams = Teams::new(api_client);
    let result = teams.list().await;

    assert!(result.is_ok());
}

#[tokio::test]
async fn test_get_team_integration() {
    let api_client = helpers::setup_client();
    let teams = Teams::new(api_client);

    let team_id = teams
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|team| team.id.clone())
        .expect("Expected at least one team to be available");

    let team = teams.get(&team_id).await.unwrap();
    assert_eq!(team.id.unwrap(), team_id);
}

#[tokio::test]
async fn test_update_team_integration() {
    let api_client = helpers::setup_client();
    let teams = Teams::new(api_client);

    let team_id = teams
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|team| team.id.clone())
        .unwrap();

    let team = teams.get(&team_id).await.unwrap();
    let updated_team = &Team {
        name: team.name.clone(),
        email: team.email.clone(),
        phone_number: Some("1234567890".to_string()), // Update phone number
        logo: team.logo.clone(),
        created_at: team.created_at.clone(),
        id: team.id.clone(),
        stripe_id: team.stripe_id.clone(),
    };

    let result = teams.update(&team_id, updated_team).await;
    assert!(result.is_ok());
}
