from .base_test import BaseTest

SAMPLE_DATASOURCE_PARAMS = {
    "description": "Ruby Integration Test Data Source",
    "title": "Ruby Integration Test Data Source",
    "source": "api",
    "config": '{"type":"json","method":"GET","transform":"products","url":"https://dummyjson.com/products","headers":"{}"}',
}


class TestDatasources(BaseTest):

    def setUp(self):
        super().setUp()
        self.sampleDatasourceId = self.onvoSDK.datasources.create(
            SAMPLE_DATASOURCE_PARAMS
        )[
            "id"
        ]  # Skipping test create

    def test_list(self):
        self.assertShouldRaise(None, self.onvoSDK.datasources.list)

    def test_get(self):
        self.assertShouldRaise(
            None, lambda: self.onvoSDK.datasources.get(self.sampleDatasourceId)
        )

    def test_get_data(self):
        self.assertShouldRaise(
            None, lambda: self.onvoSDK.datasources.get_data(self.sampleDatasourceId)
        )

    def test_populate_datasource(self):
        pass

    def test_update_datasource(self):
        pass

    def tearDown(self) -> None:
        self.onvoSDK.datasources.delete(self.sampleDatasourceId)  # Skipping test delete
