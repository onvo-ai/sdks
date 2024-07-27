# frozen_string_literal: true

require_relative '../base_template'

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

# All tests related to Onvo's dashboard question endpoints
class BaseDashboardTemplate < BaseTemplate
  def before_all
    super
    @sample_dashboard_id = @onvo.dashboards.create(SAMPLE_DASHBOARD_PARAMS)['id']
    @sample_datasource_id = @onvo.datasources.create(SAMPLE_DATASOURCE_PARAMS)['id']
    @dashboard = @onvo.dashboard(@sample_dashboard_id)
  end

  def after_all
    @onvo.dashboards.delete(@sample_dashboard_id)
    @onvo.datasources.delete(@sample_datasource_id)
  end
end
