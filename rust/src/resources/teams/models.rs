use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Team {
    pub name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub logo: Option<String>,
    pub created_at: Option<String>,
    pub id: Option<String>,
    pub stripe_id: Option<String>,
}
