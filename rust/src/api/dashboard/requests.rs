use crate::api::dashboard::responses::GetDashboardResponse;
use rustify_derive::Endpoint;
use std::fmt::Debug;

#[derive(Builder, Debug, Endpoint)]
#[endpoint(
    path = "{self.id}",
    response = "GetDashboardResponse",
    builder = "true"
)]
#[builder(setter(into))]
pub struct GetDashboardRequest {
    #[endpoint(skip)]
    pub id: i32,
}
