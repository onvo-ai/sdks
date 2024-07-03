from onvo.base_resource import BaseResource


class Questions(BaseResource):
    """Endpoints to manage Onvo questions"""

    def list(self, dashboard_id: str):
        """List all questions linked to a dashboard

        Args:
            dashboard_id (str): The dashboard id to list questions for

        Returns:
            list: A list of all the questions
        """
        return self.base_get("/questions", params={"dashboard": dashboard_id})

    def delete(self, id: str):
        """Delete an existing question

        Args:
            id (str): The question id to delete

        Returns:
            dict: A dictionary that shows status of the delete. Returns {"success": true} if successful.
        """
        return self.base_delete(f"/questions/{id}")

    def create(self, dashboard_id: str, query: str):
        """Create a new question

        Args:
            dashboard_id (str): The dashboard id to create the question for
            query (str): The query string to ask a question

        Returns:
            dict: A dictionary containing the details of the newly created question
        """
        return self.base_post(
            "/questions",
            data={
                "dashboard": dashboard_id,
                "messages": [{"role": "user", "content": query}],
            },
        )

    # TODO: create the update method once the postman shows viable example
