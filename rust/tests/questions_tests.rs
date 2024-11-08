mod helpers;

use onvo_ai::resources::questions::api::Questions;

#[tokio::test]
async fn test_list_questions_integration() {
    let client = helpers::setup_client();
    let questions = Questions::new(&client);
    let result = questions.list().await;
    match &result {
        Ok(_) => {}
        Err(err) => {
            print!("Error: {:?}", err);
        }
    }
    assert!(result.is_ok());
}

#[tokio::test]
#[ignore]
// TODO: Check why this test is failing? It can't seem to find the dashboard..
// Error: `Unexpected(400, "{\"message\":\"Dashboard does not exist\"}")`
async fn test_create_questions_integration() {
    let client = helpers::setup_client();
    let questions = Questions::new(&client);
    let result = questions
        .create("09720600-cab3-4486-bc14-10f014f573a5", "hello")
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
#[ignore]
// TODO: Enable this back. Could not get to create any questions.
// Hence cannot test any deletions as well.
async fn test_delete_question_integration() {
    let client = helpers::setup_client();
    let questions = Questions::new(&client);
    let result = questions
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|question| question.id.clone())
        .expect("Expected atleast one question to be available");

    let result = questions.delete(&result).await;
    assert!(result.is_ok())
}
