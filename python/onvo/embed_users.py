from onvo.resource import Resource


class EmbedUsers(Resource):
    def list(self):
        return self.base_get("/embed-users")

    def get(self, id):
        return self.base_get(f"/embed-users/{id}")

    def delete(self, id):
        return self.base_delete(f"/embed-users/{id}")

    def upsert(self, data):
        return self.base_post("/embed-users", data=data)

    def get_access_token(self, id):
        return self.base_get(f"/embed-users/#{id}/token")
