from onvo.base_resource import BaseResource


class Sessions(BaseResource):
    """Endpoints to get and update sessions. A session creates a link between a user under your organisation and a dashboard.

    Args:
        BaseResource (_type_): _description_
    """

    def list(self, dashboard_id: str):
        """List all sessions for a dashboard

        Args:
            dashboard_id (str): ID of the dashboard to list sessions for

        Returns:
            list: A list of all sessions for a dashboard
        """
        return self.base_get("/sessions", params={"parent_dashboard": dashboard_id})

    def revoke(self, dashboard_id: str):
        """Delete all sessions for a dashboard

        Args:
            dashboard_id (str): ID of the dashboard to delete all sessions for

        Returns:
            dict: A dictionary that shows status of deleting all sessions. Returns {"success": true} if successful.
        """
        return self.base_delete("/sessions", params={"parent_dashboard": dashboard_id})

    def upsert(self, dashboard_id: str, user_id: str):
        """If a session already exists, it is retrieved to save the user's changes and edits. If a session does not exist, one is created and is retrieved.

        Args:
            dashboard_id (str): ID of the dashboard to create a session for
            user_id (str): ID of the user to create a session for

        Returns:
            dict: A dictionary containing the details of the created/retrieved session
        """
        return self.base_post(
            "/sessions", data={"dashboard": dashboard_id, "user": user_id}
        )

    def delete(self, id):
        """Delete an existing session

        Args:
            id (str): The session id to delete

        Returns:
            dict: A dictionary that shows status of the delete. Returns {"success": true} if successful.
        """
        return self.base_delete(f"/sessions/{id}")
