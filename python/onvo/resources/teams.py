from onvo.base_resource import BaseResource


class Teams(BaseResource):
    def list(self):
        return self.base_get("/teams")

    def get(self, id):
        return self.base_get(f"/teams/{id}")
