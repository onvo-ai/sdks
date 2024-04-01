from onvo.resources.dashboard_resources.base_resource import DashboardBaseResource


class DashboardDatasources(DashboardBaseResource):
    def list(self):
        """List all datasources linked to a dashboard

        Returns:
            list: A list of all the datasources
        """
        return self.base_get(f"/dashboards/{self.dashboard_id}/datasources")

    def link(self, datasource_id):
        """Link a datasource to a dashboard

        Args:
            datasource_id (str): The datasource id to link

        Returns:
            dict: A dictionary containing the details of the new link between the dashboard and datasource
        """
        return self.base_put(
            f"/dashboards/{self.dashboard_id}/datasources",
            data={"datasourceId": datasource_id},
        )

    def unlink(self, datasource_id):
        """Unlink a datasource from a dashboard

        Args:
            datasource_id (str): The datasource id to unlink

        Returns:
            dict: A dictionary that shows status of the unlink. Returns {"success": true} if successful.
        """
        return self.base_delete(
            f"/dashboards/{self.dashboard_id}/datasources/{datasource_id}"
        )
