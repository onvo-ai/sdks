from .base_test import DashboardBaseTest


class TestSessions(DashboardBaseTest):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.sample_dashboard.datasources.link(cls.sample_datasource_id)

        cls.sample_widget = cls.onvoSDK.widgets.create(
            cls.sample_dashboard_id,
            "Create a pie chart showing the distribution of products by category",
        )

        cls.sample_widget_id = cls.sample_widget["id"]
        cls.sample_widget_code = cls.sample_widget["code"]

    def test_list(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.list(self.sample_dashboard_id),
        )

    def test_get(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.get(self.sample_widget_id),
        )

    def test_export(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.export(self.sample_widget_id, "png"),
        )

    def test_update(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.update(
                self.sample_widget_id, {"title": "A different title"}
            ),
        )

    def test_request_edit(self):
        sample_edit = {
            "messages": self.sample_widget["messages"]
            + [{"role": "user", "content": "Make the pie chart blue"}]
        }
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.request_edit(
                self.sample_widget_id, sample_edit
            ),
        )

    def test_execute_code(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.widgets.execute_code(
                self.sample_widget_id, self.sample_widget_code
            ),
        )

    @classmethod
    def tearDownClass(cls) -> None:
        cls.onvoSDK.widgets.delete(cls.sample_widget_id)
        super().tearDownClass()
