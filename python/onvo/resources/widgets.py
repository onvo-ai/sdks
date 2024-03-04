from onvo.base_resource import BaseResource


class Widgets(BaseResource):
    def list(self, dashboard_id):
        return self.base_get("/widgets", params={"dashboard": dashboard_id})

    def get(self, id):
        return self.base_get(f"/widgets/{id}")

    def get_image(self, id):
        return self.base_get(f"/widgets/{id}/image")

    def create(self, dashboard_id, query):
        return self.base_put(
            "/widgets", params={"query": query}, data={"dashboard": dashboard_id}
        )

    def update(self, id, data):
        return self.base_post(f"/widgets/{id}", data=data)

    def delete(self, id):
        return self.base_delete(f"/widgets/{id}")
