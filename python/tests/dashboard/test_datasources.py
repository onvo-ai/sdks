from .base_test import DashboardBaseTest


class TestDashboardDatasources(DashboardBaseTest):

    def test_list(self):
        self.assertShouldRaise(None, self.sampleDashboard.datasources.list)

    def test_link_and_unlink(self):
        self.assertShouldRaise(
            None, lambda: self.sampleDashboard.datasources.link(self.sampleDatasourceId)
        )
        self.assertShouldRaise(
            None,
            lambda: self.sampleDashboard.datasources.unlink(self.sampleDatasourceId),
        )
