from .base_test import DashboardBaseTest


class TestSessions(DashboardBaseTest):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.sampleDashboard.datasources.link(cls.sampleDatasourceId)

        cls.onvoSDK.widgets.create(
            cls.sampleDashboardId,
            "Create a pie chart showing the distribution of products by category",
        )
        cls.sampleWidgetId = cls.onvoSDK.widgets.list(cls.sampleDashboardId)[0]["id"]

    def test_list(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.list(self.sampleDashboardId),
        )

    def test_get(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.get(self.sampleWidgetId),
        )

    def test_get_image(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.get_image(self.sampleWidgetId),
        )

    def test_update(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.update(
                self.sampleWidgetId, {"title": "A different title"}
            ),
        )

    @classmethod
    def tearDownClass(cls) -> None:
        cls.onvoSDK.widgets.delete(cls.sampleWidgetId)
        super().tearDownClass()
