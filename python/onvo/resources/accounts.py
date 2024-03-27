from onvo.base_resource import BaseResource


class Accounts(BaseResource):
    """Endpoints to get Onvo accounts"""

    def list(self):
        """Get a list of all existing accounts in an organization

        Returns:
            list: A list of all existing accounts in an organization
        """
        return self.base_get("/accounts")

    def get(self, id):
        """Get details on a specific account

        Args:
            id (str): The account id to get details on

        Returns:
            dict: A dictionary containing details on the account
        """
        return self.base_get(f"/accounts/{id}")
