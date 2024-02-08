# frozen_string_literal: true

require_relative './dashboard/datasources'
require_relative './dashboard/widgets'
require_relative './dashboard/questions'
require_relative './dashboard/sessions'

# The Dashboard API
class Dashboard
  attr_accessor :datasources, :widgets, :questions, :sessions

  def initialize(dashboard_id, endpoint, api_key)
    params = [dashboard_id, endpoint, api_key]

    @datasources = DashboardDatasources.new(*params)
    @widgets = DashboardWidgets.new(*params)
    @questions = DashboardQuestions.new(*params)
    @sessions = DashboardSessions.new(*params)
  end
end
