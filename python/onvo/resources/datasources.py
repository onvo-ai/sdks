from onvo.base_resource import BaseResource


class Datasources(BaseResource):
    """Endpoints to manage Onvo datasources"""

    def list(self):
        """List all datasources in an organization

        Returns:
            list: A list of all existing datasources along with necessary details
        """
        return self.base_get("/datasources")

    def get(self, id):
        """Get details on a specific datasource

        Args:
            id (str): The datasource id to get details on

        Returns:
            dict: A dictionary containing details on the datasource
        """
        return self.base_get(f"/datasources/{id}")

    def create(self, data):
        """Create a new datasource

        Args:
            data (dict[str, Any]): The data within the datasource to be created

        Returns:
            dict: A dictionary containing the details of the newly created datasource
        """
        return self.base_put(f"/datasources", data=data)

    def upload_file(self, id, file_path):
        """Upload a file to a datasource

        Args:
            id (str): The datasource id to upload the file to
            file_path (str): The path of the file to be uploaded

        Returns:
            dict: A dictionary containing the details of the newly created datasource
        """
        return self.base_post(
            f"/datasources/{id}/upload-file", files={"file": open(file_path, "rb")}
        )

    def initialize(self, id):
        """Initialize a datasource

        Args:
            id (str): The datasource id to initialize

        Returns:
            dict: A dictionary containing the details of the initialized datasource
        """
        return self.base_get(f"/datasources/{id}/initialize")

    def update(self, id, data):
        """Update an existing datasource

        Args:
            id (str): The datasource id to update
            data (dict[str, Any]): The data within the datasource to be updated

        Returns:
            dict: A dictionary containing the details of the updated datasource
        """
        return self.base_post(f"/datasources/{id}", data=data)

    def delete(self, id):
        """Delete an existing datasource

        Args:
            id (str): The datasource id to delete

        Returns:
            dict: A dictionary that shows status of the delete. Returns {"success": true} if successful.
        """
        return self.base_delete(f"/datasources/{id}")
