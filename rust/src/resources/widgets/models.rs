use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Widget {
    pub cache: serde_json::Value,
    pub code: String,
    pub dashboard: String,
    pub id: Option<String>,
    pub query: Option<String>,
    pub team: Option<String>,
    pub messages: Vec<Message>,
    pub settings: Option<WidgetSettings>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WidgetSettings {
    pub title: String,
    pub h: i32,
    pub w: i32,
    pub x: i32,
    pub y: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    pub role: String,
    pub content: String,
}
