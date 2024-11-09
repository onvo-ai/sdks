mod helpers;

use onvo_ai::resources::automations::{api::Automations, models::Automation};

#[tokio::test]
async fn test_list_automations_integration() {
    let client = helpers::setup_client();
    let automations = Automations::new(&client);
    let result = automations.list().await;
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
    let client = helpers::setup_client();
    let automations = Automations::new(&client);
    let result = automations
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|automation| automation.id.clone())
        .expect("Expected atleast one automation to be available");

    let automation = automations.get(&result).await.unwrap();
    assert_eq!(automation.id.unwrap(), result);
}

#[tokio::test]
async fn test_get_runs_integration() {
    let client = helpers::setup_client();
    let automations = Automations::new(&client);
    let result = automations
        .list()
        .await
        .unwrap()
        .first()
        .and_then(|automation| automation.id.clone())
        .expect("Expected atleast one automation to be available");

    let result = automations.get_runs(&result).await;

    assert!(result.is_ok());
}

#[tokio::test]
async fn test_create_automation_integration() {
    let client = helpers::setup_client();
    let automations = Automations::new(&client);
    let result = automations
        .create(&Automation {
            id: None,
            created_at: None,
            last_updated_at: None,
            created_by: None,
            last_run_at: None,
            next_run_at: None,
            title: String::from("API datasource test"),
            description: Some(String::from("A sample description")),
            dashboard: String::from("09720600-cab3-4486-bc14-10f014f573a5"),
            output_format: String::from("pdf"),
            schedule: String::from(""),
            recipient_type: None,
            email_format: None,
            email_subject: Some(String::from("This is an automation from Onvo")),
            recipients: None,
            team: None,
            enabled: false,
            last_updated_by: None,
            timezone: String::from("Asia/Calcutta"),
            method: String::from("email"),
            email_body: String::from("This is an automation from Onvo"),
            email_to: None,
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
async fn test_update_automation_integration() {
    let client = helpers::setup_client();
    let automations = Automations::new(&client);

    // Create a dummy automation to update later
    let automation_payload = &Automation {
        id: None,
        created_at: None,
        last_updated_at: None,
        created_by: None,
        last_run_at: None,
        next_run_at: None,
        title: String::from("API datasource test"),
        description: Some(String::from("A sample description")),
        dashboard: String::from("09720600-cab3-4486-bc14-10f014f573a5"),
        output_format: String::from("pdf"),
        schedule: String::from(""),
        recipient_type: None,
        email_format: None,
        email_subject: Some(String::from("This is an automation from Onvo")),
        recipients: None,
        team: None,
        enabled: false,
        last_updated_by: None,
        timezone: String::from("Asia/Calcutta"),
        method: String::from("email"),
        email_body: String::from("This is an automation from Onvo"),
        email_to: None,
    };
    let result = automations.create(&automation_payload).await;
    assert!(result.is_ok());

    // Update the automation
    let id = &result.unwrap().id.clone().unwrap();
    let updated_automation = &Automation {
        id: None,
        created_at: None,
        last_updated_at: None,
        created_by: None,
        last_run_at: None,
        next_run_at: None,
        title: String::from("API datasource test"),
        description: Some(String::from("A sample description")),
        dashboard: String::from("09720600-cab3-4486-bc14-10f014f573a5"),
        output_format: String::from("pdf"),
        schedule: String::from(""),
        recipient_type: None,
        email_format: None,
        email_subject: Some(String::from("This is an automation from Onvo")),
        recipients: None,
        team: None,
        enabled: false,
        last_updated_by: None,
        timezone: String::from("Asia/Tokyo"), // Change timezone
        method: String::from("email"),
        email_body: String::from("This is an automation from Onvo"),
        email_to: None,
    };
    let result = automations.update(&id, &updated_automation).await;
    match result {
        Ok(_) => {}
        Err(e) => panic!("Error: {:?}", e),
    }
}

#[tokio::test]
async fn test_delete_automation_integration() {
    let client = helpers::setup_client();
    let automations = Automations::new(&client);

    // Create a dummy automation to delete later
    let result = automations
        .create(&Automation {
            id: None,
            created_at: None,
            last_updated_at: None,
            created_by: None,
            last_run_at: None,
            next_run_at: None,
            title: String::from("API datasource test"),
            description: Some(String::from("A sample description")),
            dashboard: String::from("09720600-cab3-4486-bc14-10f014f573a5"),
            output_format: String::from("pdf"),
            schedule: String::from(""),
            recipient_type: None,
            email_format: None,
            email_subject: Some(String::from("This is an automation from Onvo")),
            recipients: None,
            team: None,
            enabled: false,
            last_updated_by: None,
            timezone: String::from("Asia/Calcutta"),
            method: String::from("email"),
            email_body: String::from("This is an automation from Onvo"),
            email_to: None,
        })
        .await;
    assert!(result.is_ok());

    let id = &result.unwrap().id.clone().unwrap();
    let result = automations.delete(&id).await;
    assert!(result.is_ok());
}
