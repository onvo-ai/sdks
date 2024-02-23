from onvo.resource import Resource


class Dashboards(Resource):
    def list(self):
        return self.base_get("/dashboards")

    def get(self, id):
        return self.base_get(f"/dashboards/{id}")

    def create(self, body):
        return self.base_put(f"/dashboards", body=body)

    def update(self, id, body):
        return self.base_post(f"/dashboards/{id}", body=body)

    def delete(self, id):
        return self.base_delete(f"/dashboards/{id}")
