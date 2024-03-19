from onvo.base_resource import BaseResource
import re
import json


class Widgets(BaseResource):
    def __init__(self, endpoint, api_key, questions, dashboards):
        super().__init__(endpoint, api_key)
        self.questions = questions
        self.dashboards = dashboards

    def list(self, dashboard_id):
        return self.base_get("/widgets", params={"dashboard": dashboard_id})

    def get(self, id):
        return self.base_get(f"/widgets/{id}")

    def get_image(self, id):
        return self.base_get(f"/widgets/{id}/image")

    def create(self, dashboard_id: str, query: str):
        question_text = self.questions.create(dashboard_id, query)
        team_id = self.dashboards.get(dashboard_id)["team"]

        def extract_pattern(pattern):
            return re.findall(pattern, question_text)[0].strip()

        code = extract_pattern(r"```python([\S\n\t\v ]*)```")
        cache = extract_pattern(r"#### Chart config:([\S\n\t\v ]*)####")

        return self.base_post(
            "/widgets",
            data={
                "dashboard": dashboard_id,
                "team": team_id,  # Remove once not necessary
                "h": 4,  # TODO : Remove once not necessary
                "w": 4,  # TODO : Remove once not necessary
                "code": code,
                "cache": json.loads(cache),
                "messages": [{"role": "user", "content": query}],
            },
        )

    def update(self, id, data):
        return self.base_post(f"/widgets/{id}", data=data)

    def delete(self, id):
        return self.base_delete(f"/widgets/{id}")
