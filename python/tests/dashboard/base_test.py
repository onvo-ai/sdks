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
    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        cls.sample_dashboard_id = cls.onvoSDK.dashboards.create(
            SAMPLE_DASHBOARD_PARAMS
        )["id"]
        cls.sample_datasource_id = cls.onvoSDK.datasources.create(
            SAMPLE_DATASOURCE_PARAMS
        )["id"]

        cls.onvoSDK.datasources.initialize(cls.sample_datasource_id)

        cls.sample_dashboard = cls.onvoSDK.dashboard(cls.sample_dashboard_id)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.onvoSDK.dashboards.delete(cls.sample_dashboard_id)
        cls.onvoSDK.datasources.delete(cls.sample_datasource_id)
