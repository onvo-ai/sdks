use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Parameter {
    pub year: u64,
    pub sort: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Session {
    pub dashboard: String,
    pub embed_user: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parameters: Option<Parameter>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub team: Option<String>,
}
