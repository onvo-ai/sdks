from onvo.base_resource import BaseResource


class EmbedUsers(BaseResource):
    """Endpoints to manage Onvo embed users"""

    def list(self):
        """List all embed users

        Returns:
            list: A list of all embed users
        """
        return self.base_get("/embed-users")

    def get(self, id):
        """Get details on a specific embed user by id

        Args:
            id (str): The embed user id to get details on

        Returns:
            dict: A dictionary containing details on the embed user
        """
        return self.base_get(f"/embed-users/{id}")

    def delete(self, id):
        """Delete an embed user

        Args:
            id (str): The embed user id to delete

        Returns:
            dict: A dictionary that shows status of the delete. Returns {"success": true} if successful.
        """
        return self.base_delete(f"/embed-users/{id}")

    def upsert(self, data):
        """Created or update an embed user

        Args:
            data (dict[str, Any]): The data within the embed user to be created / updated

        Returns:
            dict: A dictionary containing the details of the newly created / updated embed user
        """
        return self.base_post("/embed-users", data=data)

    def get_access_token(self, id):
        """Get access token for an embed user

        Args:
            id (str): The embed user id to get access token for

        Returns:
            dict: A dictionary containing the details of the access token
        """
        return self.base_get(f"/embed-users/#{id}/token")
