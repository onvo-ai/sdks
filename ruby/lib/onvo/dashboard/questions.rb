# frozen_string_literal: true

require 'uri'
require_relative './dashboard_resource'

# Dashboard Question endpoints
class DashboardQuestions < DashboardResource
  def list
    base_get("/dashboards/#{@dashboard_id}/questions")
  end

  # TODO: ask?
  def create(query)
    processed_query = URI.encode_www_form_component(query)
    base_put("/dashboards/#{@dashboard_id}/questions?query=#{processed_query}")
  end
end
