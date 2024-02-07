# frozen_string_literal: true

require 'uri'
require_relative '../../resource'

# Dashboard Widget endpoints
class Datasources < Resource
  def list(dashboard_id)
    base_get("/dashboards/#{dashboard_id}/datasources")
  end

  def link(dashboard_id, data)
    base_put("/dashboards/#{dashboard_id}/datasources", body)
  end

  def unlink(dashboard_id, widget_id)
    base_delete("/dashboards/#{dashboard_id}/widgets/#{widget_id}")
  end
end
