# frozen_string_literal: true

require 'minitest/autorun'
require 'minitest/hooks'

require_relative '../../lib/onvo'
require_relative '../../lib/onvo/dashboard'

# All tests related to Onvo's dashboard question endpoints
class DashboardTestBase < Minitest::Test
  include Minitest::Hooks

  def before_all
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)

    @sample_dashboard_id = @onvo.dashboards.create(SAMPLE_DASHBOARD_PARAMS)['id']
    @sample_datasource_id = @onvo.datasources.create(SAMPLE_DATASOURCE_PARAMS)['id']

    @dashboard = @onvo.dashboard(@sample_dashboard_id)
  end

  SAMPLE_DASHBOARD_PARAMS = {
    description: 'Sample dashboard for widget testing',
    title: 'Widget Testing Dashboard'
  }.freeze

  SAMPLE_DATASOURCE_PARAMS = {
    description: 'Ruby Integration Test Data Source',
    title: 'Ruby Integration Test Data Source',
    source: 'api',
    config: '{"type":"json","method":"GET","transform":"products","url":"https://dummyjson.com/products","headers":"{}"}'
  }.freeze

  def after_all
    @onvo.dashboards.delete(@sample_dashboard_id)
    @onvo.datasources.delete(@sample_datasource_id)
  end
end
