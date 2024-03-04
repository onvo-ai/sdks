from .base_test import DashboardBaseTest


class TestSessions(DashboardBaseTest):

    # TODO: Fix breakage in create widget

    def setUp(self):
        super().setUp()
        self.sampleDashboard.datasources.link(self.sampleDatasourceId)
        # self.onvoSDK.widgets.create(
        #     self.sampleDashboardId, "Display the number of rows the data has."
        # )
        # self.sampleWidgetId = self.onvoSDK.widgets.list(self.sampleDashboardId)[0]["id"]

    def test_list(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.list(self.sampleDashboardId),
        )

    # def test_get(self):
    #     self.assertShouldRaise(
    #         None,
    #         lambda: self.onvoSDK.widgets.get(self.sampleWidgetId),
    #     )

    # def test_get_image(self):
    #     self.assertShouldRaise(
    #         None,
    #         lambda: self.onvoSDK.widgets.get_image(self.sampleWidgetId),
    #     )

    # def test_update(self):
    #     self.assertShouldRaise(
    #         None,
    #         lambda: self.onvoSDK.widgets.update(
    #             self.sampleWidgetId, {"title": "A different title"}
    #         ),
    #     )

    def tearDown(self) -> None:
        # self.onvoSDK.widgets.delete(self.sampleWidgetId)
        super().tearDown()
