from onvo.resources.dashboard_resources.base_resource import DashboardBaseResource


class DashboardDatasources(DashboardBaseResource):
    def list(self):
        return self.base_get(f"/dashboards/{self.dashboard_id}/datasources")

    def link(self, datasource_id):
        return self.base_put(
            f"/dashboards/{self.dashboard_id}/datasources",
            data={"datasourceId": datasource_id},
        )

    def unlink(self, datasource_id):
        return self.base_delete(
            f"/dashboards/{self.dashboard_id}/datasources/{datasource_id}"
        )
