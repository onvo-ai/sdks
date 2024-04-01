from onvo.base_resource import BaseResource
import re
import json


class Widgets(BaseResource):
    def __init__(self, endpoint, api_key, questions):
        super().__init__(endpoint, api_key)
        self.questions = questions

    def list(self, dashboard_id):
        """List out the widgets linked to a dashboard

        Args:
            dashboard_id (str): The dashboard id to list widgets for

        Returns:
            list: A list of all the widgets
        """
        return self.base_get("/widgets", params={"dashboard": dashboard_id})

    def get(self, id):
        """Get details on a specific widget

        Args:
            id (str): The widget id to get details on

        Returns:
            dict: A dictionary containing details on the widget
        """
        return self.base_get(f"/widgets/{id}")

    def export(self, id, format):
        """Export a widget

        Args:
            id (str): The widget id to export
            format (str): The export format to export the widget in. Must be one of: png, jpg, svg

        Returns:
            Any: The file in the requested format
        """
        return self.base_get(f"/widgets/{id}/export?format={format}")

    def create(self, dashboard_id: str, query: str):
        """Create a new widget

        Args:
            dashboard_id (str): The dashboard id to create the widget for
            query (str): The query string to ask a question

        Returns:
            dict: A dictionary containing the details of the newly created widget
        """
        conversation = self.questions.create(dashboard_id, query)
        question_text = conversation["messages"][-1]["content"]

        def extract_pattern(pattern):
            return re.findall(pattern, question_text)[0].strip()

        code = extract_pattern(r"```python([\S\n\t\v ]*)```\n```json")
        cache = extract_pattern(r"```json([\S\n\t\v ]*)```")

        return self.base_put(
            "/widgets",
            data={
                "dashboard": dashboard_id,
                "code": code,
                "cache": json.loads(cache),
                "messages": [{"role": "user", "content": query}],
            },
        )

    def update(self, id, data):
        """Update an existing widget. Note: the code is not re-run when using this endpoint.

        Args:
            id (str): The widget id to update
            data (dict[str, Any]): The data within the widget to be updated

        Returns:
            dict: A dictionary containing the details of the updated widget
        """
        return self.base_post(f"/widgets/{id}", data=data)

    def request_edit(self, id, data):
        """Request an edit to an existing widget. Note: the code will be rebuilt based on changes to the messages

        Args:
            id (str): The widget id to request an edit
            data (dict[str, Any]): The data within the widget to be updated

        Returns:
            dict: A dictionary containing the details of the updated widget
        """
        return self.base_patch(f"/widgets/{id}", data=data)

    def execute_code(self, id, code):
        """Execute code. The code given to this endpoint will be run in the context of the widget. The code in the widget will not be replaced. Use this endpoint as a test bed to verify that your edits to the widget work.

        Args:
            id (str): The widget id to execute the code in
            code (str): The code to execute in the widget

        Returns:
            dict: A dictionary containing the details of the updated widget
        """
        return self.base_post(f"/widgets/{id}/execute-code", data={"code": code})

    def delete(self, id):
        """Delete an existing widget

        Args:
            id (str): The widget id to delete

        Returns:
            dict: A dictionary that shows status of the delete. Returns {"success": true} if successful.
        """
        return self.base_delete(f"/widgets/{id}")
