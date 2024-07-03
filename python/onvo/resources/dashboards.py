from onvo.base_resource import BaseResource


class Dashboards(BaseResource):
    """Endpoints to manage Onvo dashboards"""

    def list(self):
        """Get a list of all dashboards under an organization

        Returns:
            list: A list of all existing dashboards
        """
        return self.base_get("/dashboards")

    def get(self, id):
        """Get details on a specific dashboard

        Args:
            id (str): The dashboard id to get details on

        Returns:
            dict: A dictionary containing details on the dashboard
        """
        return self.base_get(f"/dashboards/{id}")

    def create(self, data):
        """Create a new dashboard

        Args:
            data (dict[str, Any]): The data within the dashboard to be created

        Returns:
            dict: A dictionary containing the details of the newly created dashboard
        """
        return self.base_put(f"/dashboards", data=data)

    def update(self, id, data):
        """Update an existing dashboard

        Args:
            id (str): The dashboard id to update
            data (dict[str, Any]): The data within the dashboard to be updated

        Returns:
            dict: A dictionary containing the details of the updated dashboard
        """
        return self.base_post(f"/dashboards/{id}", data=data)

    def delete(self, id):
        """Delete an existing dashboard

        Args:
            id (str): The dashboard id to delete

        Returns:
            dict: A dictionary that shows status of the delete. Returns {"success": true} if successful.
        """
        return self.base_delete(f"/dashboards/{id}")

    def update_cache(self, id):
        """Update the cache of an existing dashboard

        Args:
            id (str): The dashboard id to update the cache of

        Returns:
            dict: A dictionary containing the details of the updated dashboard
        """
        return self.base_post(f"/dashboards/{id}/update-cache")
