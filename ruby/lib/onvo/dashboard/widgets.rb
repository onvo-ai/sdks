# frozen_string_literal: true

require 'uri'
require_relative './dashboard_resource'

# Dashboard Widget endpoints
class DashboardWidgets < DashboardResource
  def list
    base_get("/dashboards/#{@dashboard_id}/widgets")
  end

  def get(widget_id)
    base_get("/dashboards/#{@dashboard_id}/widgets/#{widget_id}")
  end

  def delete(widget_id)
    base_delete("/dashboards/#{@dashboard_id}/widgets/#{widget_id}")
  end

  def update(widget_id, body)
    base_post("/dashboards/#{@dashboard_id}/widgets/#{widget_id}", body)
  end

  def create(query)
    processed_query = URI.encode_www_form_component(query)
    base_put("/dashboards/#{@dashboard_id}/widgets?query=#{processed_query}")
  end
end
