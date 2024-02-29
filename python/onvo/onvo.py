import os
from onvo.resources.accounts import Accounts
from onvo.resources.automations import Automations
from onvo.resources.dashboards import Dashboards
from onvo.resources.datasources import Datasources
from onvo.resources.embed_users import EmbedUsers
from onvo.resources.teams import Teams

try:
    default_endpoint = os.environ["ONVO_API_ENDPOINT"]
    default_api_key = os.environ["ONVO_API_KEY"]
except:
    default_endpoint = None
    default_api_key = None


class Onvo:
    def __init__(self, endpoint=default_endpoint, api_key=default_api_key):
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

    def check_init_params(self):
        if self.endpoint is None:
            raise Exception(
                "Onvo object has no endpoint! Initalize with the endpoint parameter or use ONVO_API_ENDPOINT"
            )
        if self.api_key is None:
            raise Exception(
                "Onvo object has no api key! Initalize with the api_key parameter or use ONVO_API_KEY"
            )
