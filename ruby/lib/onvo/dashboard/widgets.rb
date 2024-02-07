# frozen_string_literal: true

require 'uri'
require_relative '../../resource'

# Dashboard Widget endpoints
class Widgets < Resource
  def list(dashboard_id)
    base_get("/dashboards/#{dashboard_id}/widgets")
  end

  def get(dashboard_id, widget_id)
    base_get("/dashboards/#{dashboard_id}/widgets/#{widget_id}")
  end

  def delete(dashboard_id, widget_id)
    base_delete("/dashboards/#{dashboard_id}/widgets/#{widget_id}")
  end

  def update(dashboard_id, widget_id, body)
    base_post("/dashboards/#{dashboard_id}/widgets/#{widget_id}", body)
  end

  def create(dashboard_id, query)
    processed_query = URI.encode_www_form_component(query)
    base_put("/dashboards/#{dashboard_id}/widgets?query=#{processed_query}")
  end
end
