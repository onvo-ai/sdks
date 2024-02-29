from onvo.resources.dashboard_resources.datasources import DashboardDatasources


class Dashboard:
    def __init__(self, dashboard_id: str, endpoint: str, api_key: str):
        params = [dashboard_id, endpoint, api_key]

        self.datasources = DashboardDatasources(*params)
