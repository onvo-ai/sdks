from onvo.resource import Resource


class Automations(Resource):
    def list(self):
        return self.base_get("/automations")

    def get(self, id):
        return self.base_get(f"/automations/{id}")

    def create(self, body):
        return self.base_put(f"/automations", body=body)

    def update(self, id, body):
        return self.base_post(f"/automations/{id}", body=body)

    def delete(self, id):
        return self.base_delete(f"/automations/{id}")
