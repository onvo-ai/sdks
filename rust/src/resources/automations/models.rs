use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Automation {
    pub title: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_by: Option<String>,
    pub dashboard: String,
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email_format: Option<String>,
    pub email_subject: Option<String>,
    pub enabled: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub last_run_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub last_updated_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub last_updated_by: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub next_run_at: Option<String>,
    pub output_format: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub recipient_type: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub recipients: Option<Vec<String>>,
    pub schedule: String,
    pub timezone: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub team: Option<String>,
    pub method: String,
    pub email_body: String,
    pub email_to: Option<String>,
}
