use crate::api;
use crate::api::dashboard::requests::GetDashboardRequest;
use crate::api::dashboard::responses::GetDashboardResponse;
use crate::client::Client;
use crate::errors::ClientError;

pub async fn get(client: &impl Client, id: i32) -> Result<GetDashboardResponse, ClientError> {
    let endpoint = GetDashboardRequest::builder().id(id).build().unwrap();
    api::execute(client, endpoint).await
}
