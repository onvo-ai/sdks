mod helpers;

use onvo_ai::resources::{
    questions::api::Questions,
    widgets::{self, api::Widgets, models::Widget},
};

#[tokio::test]
async fn test_list_widgets_integration() {
    let api_client = helpers::setup_client();

    let questions = Questions::new(&api_client);
    let widgets = Widgets::new(&api_client, &questions);
    let result = widgets.list("09720600-cab3-4486-bc14-10f014f573a5").await;

    match &result {
        Ok(_) => {}
        Err(e) => panic!("Error: {:?}", e),
    }
}

#[tokio::test]
#[ignore = "
TODO: Check why this test is failing? It can't seem to find the dashboard..
Error: `Unexpected(400, \"{\\\"message\\\":\\\"Dashboard does not exist\\\"}\")`"]
async fn test_create_widgets_integration() {
    let api_client = helpers::setup_client();
    let questions = Questions::new(&api_client);
    let widgets = Widgets::new(&api_client, &questions);

    let result = widgets
        .create(
            "09720600-cab3-4486-bc14-10f014f573a5",
            "Create a pie chart showing the sales in 2018 vs the sales in 2019",
        )
        .await;

    match &result {
        Ok(_) => {}
        Err(e) => panic!("Error: {:?}", e),
    }
}
