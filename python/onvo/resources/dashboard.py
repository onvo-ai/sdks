from onvo.resources.dashboard_resources.datasources import DashboardDatasources


class Dashboard:
    """The Onvo Dashboard object."""

    def __init__(self, dashboard_id: str, endpoint: str, api_key: str):
        """Intialize the dashboard object. Can be initialized using the onvo.dashboard() method to autofill all fields except the dashboard_id

        Args:
            dashboard_id (str): Takes the id of the dashboard to manipulate
            endpoint (str): Takes an endpoint such as "https://dashboard.onvo.ai/api".
            api_key (str): Takes an API key.
        """
        params = [dashboard_id, endpoint, api_key]

        self.datasources = DashboardDatasources(*params)
