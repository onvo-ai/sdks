import os
from onvo.resources.accounts import Accounts
from onvo.resources.automations import Automations
from onvo.resources.dashboards import Dashboards
from onvo.resources.datasources import Datasources
from onvo.resources.embed_users import EmbedUsers
from onvo.resources.teams import Teams
from onvo.resources.sessions import Sessions
from onvo.resources.questions import Questions
from onvo.resources.widgets import Widgets

from onvo.resources.dashboard import Dashboard

try:
    default_endpoint = os.environ["ONVO_API_ENDPOINT"]
    default_api_key = os.environ["ONVO_API_KEY"]
except:
    default_endpoint = None
    default_api_key = None


class Onvo:
    """The Onvo class, needs to be instantiated to be used"""

    def __init__(self, endpoint=default_endpoint, api_key=default_api_key):
        """Initialize the Onvo object

        Args:
            endpoint (str, optional): Takes an endpoint such as "https://dashboard.onvo.ai/api". Defaults to ONVO_API_ENDPOINT in your local environment.
            api_key (str, optional): Takes an API key. Defaults to ONVO_API_KEY in your local environment.
        """
        self.endpoint = endpoint
        self.api_key = api_key
        self.check_init_params()

        params = [endpoint, api_key]

        self.accounts = Accounts(*params)
        self.automations = Automations(*params)
        self.datasources = Datasources(*params)
        self.dashboards = Dashboards(*params)
        self.embed_users = EmbedUsers(*params)
        self.teams = Teams(*params)
        self.sessions = Sessions(*params)
        self.questions = Questions(*params)
        self.widgets = Widgets(*params, self.questions)

    def dashboard(self, dashboard_id):
        """Creates a dashboard object that can be used to modify properties of Dashboard such as the datasources it's connected to.

        Args:
            dashboard_id (str): The id of the dashboard you want to connect.

        Returns:
            Dashboard: A dashboard object that contains sub-resources to manipulate.
        """
        return Dashboard(dashboard_id, self.endpoint, self.api_key)

    def check_init_params(self):
        """Checks if the instance of Onvo was initialized with both endpoint and api key

        Raises:
            Exception: raises errors if either the endpoint or the api key is missing
        """
        if self.endpoint is None:
            raise Exception(
                "Onvo object has no endpoint! Initalize with the endpoint parameter or use ONVO_API_ENDPOINT"
            )
        if self.api_key is None:
            raise Exception(
                "Onvo object has no api key! Initalize with the api_key parameter or use ONVO_API_KEY"
            )
