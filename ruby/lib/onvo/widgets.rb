# frozen_string_literal: true

require 'uri'
require_relative '../resource'

# Dashboard Widget endpoints
class Widgets < Resource
  def list(dashboard_id)
    base_get('/widgets', query: { dashboard: dashboard_id })
  end

  def get(widget_id)
    base_get("/widgets/#{widget_id}")
  end

  def get_image(widget_id)
    base_get("/widgets/#{widget_id}/image")
  end

  def delete(widget_id)
    base_delete("/widgets/#{widget_id}")
  end

  def update(widget_id, body)
    base_post("/widgets/#{widget_id}", body: body)
  end

  def create(query, dashboard_id)
    base_put('/widgets', query: { query: query }, body: { dashboard: dashboard_id })
  end
end
