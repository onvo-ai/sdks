# frozen_string_literal: true

require 'uri'
require_relative './dashboard_resource'

# Dashboard Widget endpoints
class DashboardDatasources < DashboardResource
  def list
    base_get("/dashboards/#{@dashboard_id}/datasources")
  end

  def link(datasource_id)
    base_put("/dashboards/#{@dashboard_id}/datasources", datasourceId: datasource_id) #TODO: check if not "datasourceId"
  end

  def unlink(datasource_id)
    base_delete("/dashboards/#{@dashboard_id}/datasources/#{datasource_id}")
  end
end
