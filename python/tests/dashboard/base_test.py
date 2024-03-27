# from ..base_test import BaseTest

# SAMPLE_DASHBOARD_PARAMS = {
#     "description": "Test Description.",
#     "title": "Python Integration Test Dashboard. Delete if seen.",
# }

# SAMPLE_DATASOURCE_PARAMS = {
#     "description": "Python Integration Test Data Source. Delete if seen.",
#     "title": "Python Integration Test Data Source",
#     "source": "api",
#     "config": '{"type":"json","method":"GET","transform":"products","url":"https://dummyjson.com/products","headers":"{}"}',
# }


# class DashboardBaseTest(BaseTest):
#     @classmethod
#     def setUpClass(cls):
#         super().setUpClass()

#         cls.sampleDashboardId = cls.onvoSDK.dashboards.create(SAMPLE_DASHBOARD_PARAMS)[
#             "id"
#         ]
#         cls.sampleDatasourceId = cls.onvoSDK.datasources.create(
#             SAMPLE_DATASOURCE_PARAMS
#         )["id"]

#         # cls.onvoSDK.datasources.populate_columns(cls.sampleDatasourceId)

#         cls.sampleDashboard = cls.onvoSDK.dashboard(cls.sampleDashboardId)

#     @classmethod
#     def tearDownClass(cls) -> None:
#         cls.onvoSDK.dashboards.delete(cls.sampleDashboardId)
#         cls.onvoSDK.datasources.delete(cls.sampleDatasourceId)
