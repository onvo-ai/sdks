mod helpers;

use helpers::generate_id;
use onvo_ai::resources::embed_users::{
    api::EmbedUsers,
    models::{EmbedUser, Metadata},
};

#[tokio::test]
async fn test_list_embed_users_integration() {
    let client = helpers::setup_client();
    let embed_users = EmbedUsers::new(&client);
    let result = embed_users.list().await;
    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());
}

#[tokio::test]
async fn test_get_embed_user_integration() {
    let client = helpers::setup_client();
    let embed_users = EmbedUsers::new(&client);

    // Get the first embed user's id
    let id: String = embed_users
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|embed_user| Some(embed_user.id.clone()))
        .expect("Expected atleast one embed user to be available");

    let result = embed_users.get(&id).await;
    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
}

#[tokio::test]
async fn test_create_embed_user_integration() {
    let client = helpers::setup_client();
    let embed_users = EmbedUsers::new(&client);
    let result = embed_users
        .upsert(&EmbedUser {
            name: "test".to_string(),
            email: "test@test.com".to_string(),
            id: generate_id(),
            created_at: None,
            last_updated_at: None,
            metadata: Metadata {
                group_id: Some(1),
                authorization: Some("test".to_string()),
            },
            team: None,
        })
        .await;
    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());
}

#[tokio::test]
// TODO: Enable this back. Could not get to create any questions.
// Hence cannot test any deletions as well.
async fn test_delete_embed_users_integration() {
    let client = helpers::setup_client();
    let embed_users = EmbedUsers::new(&client);

    // Create a dummy embed user
    let result = embed_users
        .upsert(&EmbedUser {
            name: "test".to_string(),
            email: "test@test.com".to_string(),
            id: generate_id(),
            created_at: None,
            last_updated_at: None,
            metadata: Metadata {
                group_id: Some(1),
                authorization: Some("test".to_string()),
            },
            team: None,
        })
        .await;
    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());

    // Get the first embed user to delete
    let id: String = embed_users
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|embed_user| Some(embed_user.id.clone()))
        .expect("Expected atleast one embed user to be available");

    let result = embed_users.delete(&id).await;
    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());
}
