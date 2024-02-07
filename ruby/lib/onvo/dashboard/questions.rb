# frozen_string_literal: true

require 'uri'
require_relative '../../resource'

# Dashboard Question endpoints
class Questions < Resource
  def list(dashboard_id)
    base_get("/dashboards/#{dashboard_id}/questions")
  end

  # TODO: ask?
  def create(dashboard_id, query)
    processed_query = URI.encode_www_form_component(query)
    base_put("/dashboards/#{dashboard_id}/questions?query=#{processed_query}")
  end
end
