# frozen_string_literal: true

require_relative './dashboard/datasources'

# The Dashboard API
class Dashboard
  attr_accessor :datasources, :widgets, :questions, :sessions

  def initialize(dashboard_id, endpoint, api_key)
    params = [dashboard_id, endpoint, api_key]

    @datasources = DashboardDatasources.new(*params)
  end
end
