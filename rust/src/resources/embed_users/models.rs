use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct EmbedUser {
    pub name: String,
    pub email: String,
    pub created_at: Option<String>,
    pub id: String,
    pub last_updated_at: Option<String>,
    pub metadata: Metadata,
    pub team: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Metadata {
    pub group_id: Option<i32>,
    pub authorization: Option<String>,
}
