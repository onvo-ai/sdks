from .base_test import DashboardBaseTest


class TestDashboardDatasources(DashboardBaseTest):

    def test_list(self):
        self.assertShouldRaise(None, self.sample_dashboard.datasources.list)

    def test_link_and_unlink(self):
        self.assertShouldRaise(
            None,
            lambda: self.sample_dashboard.datasources.link(self.sample_datasource_id),
        )
        self.assertShouldRaise(
            None,
            lambda: self.sample_dashboard.datasources.unlink(self.sample_datasource_id),
        )
