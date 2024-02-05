# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'
require 'minitest/hooks'

# All tests related to Onvo's dashboard widget endpoints
class DashboardWidgetTest < Minitest::Test
  include Minitest::Hooks

  def before_all
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)

    @sample_dashboard_id = @onvo.create_dashboard(SAMPLE_DASHBOARD_PARAMS)['id']
    # @sample_widget = @onvo.create_dashboard_widget('')
  end

  SAMPLE_DASHBOARD_PARAMS = {
    'description': 'Sample dashboard for widget testing',
    'title': 'Widget Testing Dashboard'
  }.freeze

  def test_get_dashboard_widgets
    sample_dashboard_id = @sample_dashboard['id']
    assert_silent { @onvo.get_dashboard_widgets(sample_dashboard_id) }
  end

  # def test_get_dashboard_widget_by_id
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   sample_widget_id = @onvo.get_dashboard_widgets(sample_dashboard_id)[0]["id"]
  #   assert_silent { @onvo.get_dashboard_widget_by_id(sample_dashboard_id, sample_widget_id) }
  # end

  # def test_delete_dashboard_widget_by_id
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   sample_widget_id = @onvo.get_dashboard_widgets(sample_dashboard_id)[0]["id"]
  #   assert_silent { @onvo.delete_dashboard_widget_by_id(sample_dashboard_id, sample_widget_id) }
  # end

  # def test_update_dashboard_widget_by_id
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   sample_widget_id = @onvo.get_dashboard_widgets(sample_dashboard_id)[0]["id"]
  #   assert_silent { @onvo.delete_dashboard_widget_by_id(sample_dashboard_id, sample_widget_id, sample_body) }
  # end

  # def test_create_dashboard_widget
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   assert_silent { @onvo.create_dashboard_widget(sample_dashboard_id, sample_body) }
  # end

  Minitest.after_run do
    @onvo.delete_dashboard_by_id(@sample_dashboard['id'])
  end
end
