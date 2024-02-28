import requests
import json


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

    # TODO : Add documentation marking 'params' as the query & 'data' as the body
    def base_request(self, handler, subdirectory, additional_options):
        url = f"{self.endpoint}{subdirectory}"
        options = {"headers": self.headers, **additional_options}
        if "data" in options:
            options["data"] = json.dumps(options["data"])

        response = handler(url, **options)
        return self.handle_response(response)

    def base_get(self, subdirectory, **options):
        return self.base_request(requests.get, subdirectory, options)

    def base_put(self, subdirectory, **options):
        return self.base_request(requests.put, subdirectory, options)

    def base_post(self, subdirectory, **options):
        return self.base_request(requests.post, subdirectory, options)

    def base_delete(self, subdirectory, **options):
        return self.base_request(requests.delete, subdirectory, options)
