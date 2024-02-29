from onvo.base_resource import BaseResource


class Dashboards(BaseResource):
    def list(self):
        return self.base_get("/dashboards")

    def get(self, id):
        return self.base_get(f"/dashboards/{id}")

    def create(self, data):
        return self.base_put(f"/dashboards", data=data)

    def update(self, id, data):
        return self.base_post(f"/dashboards/{id}", data=data)

    def delete(self, id):
        return self.base_delete(f"/dashboards/{id}")
