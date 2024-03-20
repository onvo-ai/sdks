from .base_test import BaseTest

SAMPLE_DASHBOARD_PARAMS = {
    "description": "Test Description.",
    "title": "Python Integration Test Dashboard. Delete if seen.",
}


class TestDashboards(BaseTest):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.sampleDashboardId = cls.onvoSDK.dashboards.create(SAMPLE_DASHBOARD_PARAMS)[
            "id"
        ]  # Skipping test create

    def test_list(self):
        self.assertShouldRaise(None, self.onvoSDK.dashboards.list)

    def test_get(self):
        self.assertShouldRaise(
            None, lambda: self.onvoSDK.dashboards.get(self.sampleDashboardId)
        )

    def test_update(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.dashboards.update(
                self.sampleDashboardId,
                {"description": "A New Test Description. Delete if seen."},
            ),
        )

    @classmethod
    def tearDownClass(cls) -> None:
        cls.onvoSDK.dashboards.delete(cls.sampleDashboardId)  # Skipping test delete
        super().tearDownClass()
