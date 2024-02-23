from onvo.resource import Resource


class Teams(Resource):
    def list(self):
        return self.base_get("/teams")

    def get(self, id):
        return self.base_get(f"/teams/{id}")
