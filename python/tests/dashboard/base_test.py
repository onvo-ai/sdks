from ..base_test import BaseTest

SAMPLE_DASHBOARD_PARAMS = {
    "description": "Test Description.",
    "title": "Python Integration Test Dashboard. Delete if seen.",
}

SAMPLE_DATASOURCE_PARAMS = {
    "description": "Python Integration Test Data Source. Delete if seen.",
    "title": "Python Integration Test Data Source",
    "source": "api",
    "config": '{"type":"json","method":"GET","transform":"products","url":"https://dummyjson.com/products","headers":"{}"}',
}


class DashboardBaseTest(BaseTest):
    def setUp(self):
        super().setUp()

        self.sampleDashboardId = self.onvoSDK.dashboards.create(
            SAMPLE_DASHBOARD_PARAMS
        )["id"]
        self.sampleDatasourceId = self.onvoSDK.datasources.create(
            SAMPLE_DATASOURCE_PARAMS
        )["id"]

        self.sampleDashboard = self.onvoSDK.dashboard(self.sampleDashboardId)

    def tearDown(self) -> None:
        self.onvoSDK.dashboards.delete(self.sampleDashboardId)
        self.onvoSDK.datasources.delete(self.sampleDatasourceId)
