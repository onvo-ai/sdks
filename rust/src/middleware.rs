use rustify::{Endpoint, MiddleWare};

const TOKEN_HEADER: &str = "x-api-key"; // This could be named better in the server like
                                        // `X-Onvo-Token` or something

#[derive(Debug, Clone)]
pub struct TokenMiddleware {
    pub token: String,
}

impl MiddleWare for TokenMiddleware {
    fn request<E: Endpoint>(
        &self,
        _: &E,
        req: &mut http::Request<Vec<u8>>,
    ) -> Result<(), rustify::errors::ClientError> {
        // Add Vault token to all requests
        if !self.token.is_empty() {
            req.headers_mut().append(
                TOKEN_HEADER,
                http::HeaderValue::from_str(self.token.as_str()).unwrap(),
            );
        }
        Ok(())
    }
    fn response<E: Endpoint>(
        &self,
        _: &E,
        _: &mut http::Response<Vec<u8>>,
    ) -> Result<(), rustify::errors::ClientError> {
        Ok(())
    }
}
