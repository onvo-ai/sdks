use chrono::serde::ts_seconds;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct ParentDashboard {}

#[derive(Debug, Serialize, Deserialize)]
struct Widget {
    id: String,
    title: String,
    query: String,
    x: i32,
    y: i32,
    w: i32,
    h: i32,
    assumptions: Vec<String>,
    code: String,
    organisation: String,
    dashboard: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct DataSource {
    id: String,
    #[serde(with = "ts_seconds")]
    created_at: DateTime<Utc>,

    #[serde(with = "ts_seconds")]
    last_updated_at: DateTime<Utc>,
    title: String,
    source: String,
    config: DataSourceConfig,
    columns: Vec<Column>,
    organisation: String,
    parameters: Vec<String>, // Not sure if this is a Vec of string or a map of key-value pairs
}

#[derive(Debug, Serialize, Deserialize)]
struct DataSourceConfig {
    url: String,
    #[serde(rename = "type")]
    data_source_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Column {
    title: String,
    description: String,
}

/// Represents the dashboard resource from the Dashboards API at `api/dashboards`
#[derive(Debug, Serialize, Deserialize)]
pub struct GetDashboardResponse {
    id: String,
    created_at: DateTime<Utc>,
    last_updated_at: DateTime<Utc>,
    title: String,
    description: String,
    thumbnail: String,
    organisation: String,
    parent_dashboard: ParentDashboard,
    widgets: Vec<Widget>,
    datasources: Vec<DataSource>,
}
