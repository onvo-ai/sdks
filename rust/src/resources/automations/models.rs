use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Automation {
    pub title: String,
    pub created_at: Option<String>,
    pub created_by: Option<String>,
    pub dashboard: String,
    pub description: Option<String>,
    pub email_format: Option<String>,
    pub email_subject: Option<String>,
    pub enabled: bool,
    pub id: Option<String>,
    pub last_run_at: Option<String>,
    pub last_updated_at: Option<String>,
    pub last_updated_by: Option<String>,
    pub next_run_at: Option<String>,
    pub output_format: String,
    pub recipient_type: String,
    pub recipients: Vec<String>,
    pub schedule: String,
    pub timezone: String,
    pub team: Option<String>,
}
