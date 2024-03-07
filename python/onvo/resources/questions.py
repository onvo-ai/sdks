from onvo.base_resource import BaseResource


class Questions(BaseResource):
    def list(self, dashboard_id: str):
        return self.base_get("/questions", params={"dashboard": dashboard_id})

    def delete(self, id: str):
        return self.base_delete(f"/questions/{id}")

    def create(self, dashboard_id: str, query: str):
        return self.base_post(
            "/questions",
            data={
                "dashboard": dashboard_id,
                "messages": [{"role": "user", "content": query}],
            },
        )
