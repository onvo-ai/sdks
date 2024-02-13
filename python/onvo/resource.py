import requests


class Resource:
    def __init__(self, endpoint, api_key):
        self.endpoint = endpoint
        self.headers = {"x-api-key": api_key, "Content-Type": "application/json"}

    def handle_response(self, response):
        response.raise_for_status()
        try:
            return response.json()
        except ValueError:
            return response.text()

    def get_url(self, subdirectory):
        return f"{self.endpoint}{subdirectory}"

    def base_get(self, subdirectory):
        url = self.get_url(subdirectory)
        response = requests.get(url, headers=self.headers)
        return self.handle_response(response)
