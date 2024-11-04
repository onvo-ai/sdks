mod helpers;

use chrono::naive;
use onvo_ai::resources::datasources::{api::Datasources, models::Datasource};

#[tokio::test]
async fn test_list_datasources_integration() {
    let api_client = helpers::setup_client();

    let teams = Datasources::new(api_client);
    let result = teams.list().await;

    assert!(result.is_ok());
}

#[tokio::test]
async fn test_get_datasource_integration() {
    let api_client = helpers::setup_client();
    let datasources = Datasources::new(api_client);

    // Create some dummy data
    let datasource = &Datasource {
        title: "Test datasource".to_string(),
        description: "Test datasource description".to_string(),
        columns: Some(vec![]),
        config: None,
        parameters: None,
        sample_data: None,
        size: None,
        source: "api".to_string(),
        team: None,
        created_at: None,
        created_by: None,
        id: None,
        last_updated_at: None,
        last_updated_by: None,
        filters: None,
    };
    let _ = datasources.create(&datasource).await;

    let datasources_id = datasources
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|datasource| datasource.id.clone())
        .expect("Expected at least one data source to be available");

    let datasource = datasources.get(&datasources_id).await.unwrap();
    assert_eq!(datasource.id.unwrap(), datasources_id);
}

#[tokio::test]
async fn test_create_datasource_integration() {
    let api_client = helpers::setup_client();
    let datasources = Datasources::new(api_client);

    let datasource = &Datasource {
        title: "Test datasource".to_string(),
        description: "Test datasource description".to_string(),
        columns: Some(vec![]),
        config: None,
        parameters: None,
        sample_data: None,
        size: None,
        source: "api".to_string(),
        team: None,
        created_at: None,
        created_by: None,
        id: None,
        last_updated_at: None,
        last_updated_by: None,
        filters: None,
    };

    let result = datasources.create(&datasource).await;
    match result {
        Ok(_) => {}
        Err(e) => panic!("Error: {:?}", e),
    }
    assert!(result.is_ok())
}

#[tokio::test]
async fn test_update_datasource_integration() {
    let api_client = helpers::setup_client();
    let datasources = Datasources::new(api_client);

    let datasource = &Datasource {
        title: "Test datasource".to_string(),
        description: "Test datasource description".to_string(),
        columns: Some(vec![]),
        config: None,
        parameters: None,
        sample_data: None,
        size: None,
        source: "api".to_string(),
        team: None,
        created_at: None,
        created_by: None,
        id: None,
        last_updated_at: None,
        last_updated_by: None,
        filters: None,
    };

    let result = datasources.create(&datasource).await;
    assert!(result.is_ok());

    let id = &result.unwrap().id.clone().unwrap();
    let updated_datasources = &Datasource {
        title: "Test updated datasource".to_string(), // Update title
        description: "Test datasource description".to_string(),
        columns: Some(vec![]),
        config: None,
        parameters: None,
        sample_data: None,
        size: None,
        source: "api".to_string(),
        team: None,
        created_at: None,
        created_by: None,
        id: None,
        last_updated_at: None,
        last_updated_by: None,
        filters: None,
    };
    let result = datasources.update(id, &updated_datasources).await;
    assert!(result.is_ok());
}

#[tokio::test]
async fn test_delete_datasource_integration() {
    let api_client = helpers::setup_client();
    let datasources = Datasources::new(api_client);

    let datasource = datasources
        .create(&Datasource {
            title: "Test datasource".to_string(),
            description: "Test datasource description".to_string(),
            columns: Some(vec![]),
            config: None,
            parameters: None,
            sample_data: None,
            size: None,
            source: "api".to_string(),
            team: None,
            created_at: None,
            created_by: None,
            id: None,
            last_updated_at: None,
            last_updated_by: None,
            filters: None,
        })
        .await;

    assert!(datasource.is_ok());

    let id = &datasource.unwrap().id.clone().unwrap();
    let result = datasources.delete(&id).await;
    assert!(result.is_ok());
}
