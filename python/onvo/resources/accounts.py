from onvo.base_resource import BaseResource


class Accounts(BaseResource):
    def list(self):
        return self.base_get("/accounts")

    def get(self, id):
        return self.base_get(f"/accounts/{id}")
