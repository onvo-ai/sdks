# frozen_string_literal: true

require 'uri'
require_relative '../resource'

# Dashboard Question endpoints
class Questions < Resource
  def list(dashboard_id)
    base_get('/questions', query: { dashboard: dashboard_id })
  end

  def create(dashboard_id, query)
    base_put('/questions', query: { query: query }, body: { dashboard: dashboard_id })
  end

  def delete(id)
    base_delete("/questions/#{id}")
  end
end
