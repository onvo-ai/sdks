from .base_test import BaseTest
import os

SAMPLE_DATASOURCE_PARAMS = {
    "description": "Python Integration Test Data Source. Delete if seen.",
    "title": "Python Integration Test Data Source",
    "source": "api",
    "config": '{"type":"json","method":"GET","transform":"products","url":"https://dummyjson.com/products","headers":"{}"}',
}


class TestDatasources(BaseTest):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.sampleDatasourceId = cls.onvoSDK.datasources.create(
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

    def test_initialize(self):
        self.assertShouldRaise(
            None, lambda: self.onvoSDK.datasources.initialize(self.sampleDatasourceId)
        )

    def test_update(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.datasources.update(
                self.sampleDatasourceId, {"title": "Renaming Test"}
            ),
        )

    # TODO: diagnose and fix 500: Internal server error
    # def test_upload_file(self):
    #     test_file_path = os.path.join(os.path.dirname(__file__), "python_onvo_test.csv")
    #     with open(test_file_path, "ab") as f:
    #         f.write(b"a,b,c\n1,2,3\n4,5,6\n")
    #     self.assertShouldRaise(
    #         None,
    #         lambda: self.onvoSDK.datasources.upload_file(
    #             self.sampleDatasourceId, test_file_path
    #         ),
    #     )
    #     os.remove(test_file_path)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.onvoSDK.datasources.delete(cls.sampleDatasourceId)  # Skipping test delete
        super().tearDownClass()
