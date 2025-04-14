use onvo_ai::resources::{
    dashboards::{self, api::Dashboards},
    datasources::api::Datasources,
};
use tokio::sync::mpsc::error;

mod helpers;

#[tokio::test]
#[ignore = "TODO: Check why this is giving a 405 error."]
async fn test_list_dashboards_integration() {
    let onvo = helpers::setup_client();

    let dashboards = onvo.dashboards("id09720600-cab3-4486-bc14-10f014f573a5");
    let result = dashboards.list().await;

    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());
}

#[tokio::test]
#[ignore = "TODO: Check why this is giving a 405 error."]
async fn test_link_datasource_integration() {
    let onvo = helpers::setup_client();

    let datasources = onvo.datasources();
    let datasources_id = datasources
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|datasource| datasource.id.clone())
        .expect("Expected at least one data source to be available");
    let dashboards = onvo.dashboards("id09720600-cab3-4486-bc14-10f014f573a5");
    let result = dashboards.link(&datasources_id).await;

    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());
}

#[tokio::test]
#[ignore = "TODO: Check why this is giving a 405 error."]
async fn test_unlink_datasource_integration() {
    let onvo = helpers::setup_client();

    // Link a datasource ID
    let datasources = onvo.datasources();
    let datasources_id = datasources
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|datasource| datasource.id.clone())
        .expect("Expected at least one data source to be available");
    let dashboards = onvo.dashboards("id09720600-cab3-4486-bc14-10f014f573a5");
    let result = dashboards.link(&datasources_id).await;

    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());

    // Unlink it after
    let result = dashboards.unlink(&datasources_id).await;
    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());
}
