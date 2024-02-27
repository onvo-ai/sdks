from onvo.resource import Resource


class Datasources(Resource):
    def list(self):
        return self.base_get("/datasources")

    def get(self, id):
        return self.base_get(f"/datasources/{id}")

    def get_data(self, id):
        return self.base_get(f"/datasources/{id}/data")

    def populate_columns(self, id):
        return self.base_post(f"/datasources/{id}/populate-columns")

    def create(self, data):
        return self.base_put(f"/datasources", data=data)

    def update(self, id, data):
        return self.base_post(f"/datasources/{id}", data=data)

    def delete(self, id):
        return self.base_delete(f"/datasources/{id}")
