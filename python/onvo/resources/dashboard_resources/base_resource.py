from onvo.base_resource import BaseResource


class DashboardBaseResource(BaseResource):
    def __init__(self, dashboard_id, endpoint, api_key):
        super().__init__(endpoint, api_key)
        self.dashboard_id = dashboard_id
