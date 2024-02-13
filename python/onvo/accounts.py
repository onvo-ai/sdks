from onvo.resource import Resource


class Accounts(Resource):
    def list(self):
        return self.base_get("/accounts")

    def get(self, id):
        return self.base_get(f"/accounts/{id}")
