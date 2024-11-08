use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Account {
    pub email: String,
    pub full_name: String,
    pub avatar_url: Option<String>,
    pub id: Option<String>,
    pub phone: Option<String>,
    pub updated_at: Option<String>,
}
