# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'
require 'minitest/hooks'

# All tests related to Onvo's dashboard session endpoints
class DashboardSessionsTest < Minitest::Test
  include Minitest::Hooks

  def before_all
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)

    @sample_dashboard_id = @onvo.create_dashboard(SAMPLE_DASHBOARD_PARAMS)['id']
  end

  SAMPLE_DASHBOARD_PARAMS = {
    'description': 'Sample dashboard for widget testing',
    'title': 'Widget Testing Dashboard'
  }.freeze

  def test_get_dashboard_sessions_by_id
    assert_silent { @onvo.get_dashboard_sessions_by_id(@sample_dashboard_id) }
  end

  # TODO: find mystery error!
  def test_create_and_delete_dashboard_sessions
    assert_silent do
      @onvo.upsert_dashboard_session(
        @sample_dashboard_id,
        '197302e5-88e2-49f4-bbe7-92b5a4dc4264'
      )
      @onvo.delete_dashboard_sessions_by_id(@sample_dashboard_id)
    end
  end

  def after_all
    @onvo.delete_dashboard_by_id(@sample_dashboard_id)
  end
end
