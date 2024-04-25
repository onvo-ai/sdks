# frozen_string_literal: true

require_relative './dashboard_resource'

# Dashboard Widget endpoints
class DashboardDatasources < DashboardResource
  # List out the datasources linked to a dashboard
  #
  # @param dashboard_id [String] The dashboard id to list datasources for
  # @return [Array] A list of all the datasources
  def list
    base_get("/dashboards/#{@dashboard_id}/datasources")
  end

  # Link a datasource to a dashboard
  #
  # @param datasource_id [String] The datasource id to link
  # @return [Hash] A dictionary containing the details of the new link between the dashboard and datasource
  def link(datasource_id)
    base_put("/dashboards/#{@dashboard_id}/datasources", body: { datasourceId: datasource_id })
  end

  # Unlink a datasource from a dashboard
  #
  # @param datasource_id [String] The datasource id to unlink
  # @return [Hash] A dictionary containing the details of the new link between the dashboard and datasource
  def unlink(datasource_id)
    base_delete("/dashboards/#{@dashboard_id}/datasources/#{datasource_id}")
  end
end
