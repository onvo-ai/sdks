import requests
from requests.utils import quote
import json


class BaseResource:
    """Defines common functionality among all the resources within Onvo"""

    def __init__(self, endpoint, api_key):
        """Initalize endpoint and API key for rest of the functions

        Args:
            endpoint (str): Endpoint to which all requests go to
            api_key (str): API key to verify user
        """
        self.endpoint = endpoint
        self.headers = {"x-api-key": api_key, "Content-Type": "application/json"}

    def handle_response(self, response):
        """Raises an error if status does not indicate success, returns the processed response body.

        Args:
            response (Response): A standard Response object from the requests library

        Returns:
            list/dict/str: Processes the response body as json or raw text if the JSON processing fails.
        """
        if response.status_code >= 400:
            print(response.text)
        response.raise_for_status()
        try:
            return response.json()
        except ValueError:
            return response.text

    def process_options(self, options):
        """Take the additional parameters for a request and process them before passing them forward

        Args:
            options (dict[str, Any]): A dictionary containing the keys "data" and "params" which are added to the body and query of the request respectively
        """
        if "data" in options:
            options["data"] = json.dumps(options["data"])
        elif "files" in options:
            del options["headers"]["Content-Type"]
        # Standardizing params to use '%20' instead of '+' to replace spaces for all SDK requests
        if "params" in options:
            options["params"] = "&".join(
                [f"{key}={quote(value)}" for key, value in options["params"].items()]
            )

    # TODO : Add documentation marking 'params' as the query & 'data' as the body
    def base_request(self, handler, subdirectory: str, additional_options):
        """The commmon flow for all requests made through Onvo

        Args:
            handler (function): The function that makes the call to the endpoint
            subdirectory (str): The path to the resource(s) to be accessed
            additional_options (dict[str, Any]): Additional options such as body/query

        Returns:
            list/dict/str: returns a list/dict of the resource(s) or a direct string input in a few cases such as Questions and Widgets
        """
        url = f"{self.endpoint}{subdirectory}"
        options = {"headers": self.headers, **additional_options}
        self.process_options(options)

        response = handler(url, **options)
        return self.handle_response(response)

    def base_get(self, subdirectory: str, **options) -> list | dict | str:
        """The base request for the RESTful index and show actions

        Args:
            subdirectory (str): The path to the resource(s)

        Returns:
            list | dict | str: The response object from all possible get requests
        """
        return self.base_request(requests.get, subdirectory, options)

    def base_put(self, subdirectory: str, **options) -> dict:
        """The base request for the RESTful create action

        Args:
            subdirectory (str): The path to the resource

        Returns:
            dict: The body of the newly created object or a success/failure message
        """
        return self.base_request(requests.put, subdirectory, options)

    def base_post(self, subdirectory: str, **options) -> dict:
        """The base request for the RESTful update action

        Args:
            subdirectory (str): The path to the resource

        Returns:
            dict: The body of the newly updated object or a success/failure message
        """
        return self.base_request(requests.post, subdirectory, options)

    def base_patch(self, subdirectory: str, **options) -> dict:
        """The base request for the RESTful update action through the patch channel

        Args:
            subdirectory (str): The path to the resource

        Returns:
            dict: The body of the newly updated object or a success/failure message
        """
        return self.base_request(requests.patch, subdirectory, options)

    def base_delete(self, subdirectory: str, **options) -> dict:
        """The base request for the RESTful delete action

        Args:
            subdirectory (str): The path to the resource

        Returns:
            dict: A success/failure message on deletion
        """
        return self.base_request(requests.delete, subdirectory, options)
