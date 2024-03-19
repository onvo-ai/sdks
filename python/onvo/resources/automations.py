from onvo.base_resource import BaseResource


class Automations(BaseResource):
    def list(self):
        return self.base_get("/automations")

    def get(self, id):
        return self.base_get(f"/automations/{id}")

    def create(self, data):
        return self.base_put(f"/automations", data=data)

    def update(self, id, data):
        return self.base_post(f"/automations/{id}", data=data)

    def delete(self, id):
        return self.base_delete(f"/automations/{id}")
