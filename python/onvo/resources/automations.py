from onvo.base_resource import BaseResource


class Automations(BaseResource):
    """Endpoints to manage Onvo automations"""

    def list(self):
        """List all automations linked to an organization

        Returns:
            list: A list of all the automations
        """
        return self.base_get("/automations")

    def get(self, id):
        """Get details on a specific automation by id

        Args:
            id (str): The automation id to get details on

        Returns:
            dict: A dictionary containing details on the automation
        """
        return self.base_get(f"/automations/{id}")

    def get_runs(self, id):
        """Get all runs for an automation

        Args:
            id (str): The automation id to get runs for

        Returns:
            dict: A dictionary containing details on the automation
        """
        return self.base_get(f"/automations/{id}/runs")

    def create(self, data):
        """Create a new automation

        Args:
            data (dict[str, Any]): The data within the automation to be created

        Returns:
            dict: A dictionary containing the details of the newly created automation
        """
        return self.base_put(f"/automations", data=data)

    def update(self, id, data):
        """Update an existing automation

        Args:
            id (str): The automation id to update
            data (dict[str, Any]): The data within the automation to be updated

        Returns:
            dict: A dictionary containing the details of the updated automation
        """
        return self.base_post(f"/automations/{id}", data=data)

    def delete(self, id):
        """Delete an existing automation

        Args:
            id (str): The automation id to delete

        Returns:
            dict: A dictionary that shows status of the delete. Returns {"success": true} if successful.
        """
        return self.base_delete(f"/automations/{id}")
