from onvo.base_resource import BaseResource


class Teams(BaseResource):
    """Endpoints to get and update Onvo teams. Note: endpoints are scoped by API key to the organisation the user belongs to"""

    def list(self):
        """Retrieve all organisations a user has access to.

        Returns:
            list: A list of all the teams in an organization
        """
        return self.base_get("/teams")

    def get(self, id):
        """This endpoint returns the details of a given organisation.

        Args:
            id (str): The team id to get details on

        Returns:
            dict: A dictionary containing details on the team
        """
        return self.base_get(f"/teams/{id}")

    def update(self, id, data):
        """This endpoint allows you to edit an organisation.

        Args:
            id (str): The team id to update
            data (dict[str, Any]): A dictionary containing team data to be updated

        Returns:
            dict: A dictionary containing details on the team
        """
        return self.base_post(f"/teams/{id}", data=data)
