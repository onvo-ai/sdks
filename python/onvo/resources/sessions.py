from onvo.base_resource import BaseResource


class Sessions(BaseResource):
    def list(self, dashboard_id: str):
        return self.base_get("/sessions", params={"dashboard": dashboard_id})

    def delete(self, dashboard_id: str):
        return self.base_delete("/sessions", params={"dashboard": dashboard_id})

    def upsert(self, dashboard_id: str, user_id: str):
        session_data = self.base_post(
            "/sessions", data={"dashboard": dashboard_id, "user": user_id}
        )
        return {**session_data, "url": f"{self.endpoint}{session_data['url']}"}
