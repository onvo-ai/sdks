# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'

# All tests related to Onvo's dashboard endpoints
class DashboardTest < Minitest::Test
  def setup
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)
  end

  SAMPLE_DASHBOARD_PARAMS = {
    'description': 'Test Description.',
    'title': 'Ruby Integration Test Dashboard'
  }.freeze

  #TODO: Move to appropriate file
  def test_onvo_initializer
    options = {
      headers: {
        'x-api-key': @api_key,
        'Content-Type': 'application/json'
      }
    }
    assert_equal options, @onvo.options
  end

  #TODO: Move to appropriate file
  def test_invalid_api_key_error
    @onvo.options[:headers][:"x-api-key"] = 'incorrect_api_key'
    assert_raises(RuntimeError) { @onvo.get_dashboards }
  end

  def create_sample_dashboard
    @onvo.create_dashboard(SAMPLE_DASHBOARD_PARAMS)
  end

  def with_sample_dashboard
    id = create_sample_dashboard['id']
    yield id
    @onvo.delete_dashboard_by_id(id)
  end

  def test_get_dashboards
    assert_silent { @onvo.get_dashboards }
  end

  def test_get_dashboard_by_id
    with_sample_dashboard do |id|
      assert_silent { @onvo.get_dashboard_by_id(id) }
    end
  end

  def test_create_and_delete_dashboard
    assert_silent do
      sample_dashboard_id = create_sample_dashboard['id']
      @onvo.delete_dashboard_by_id(sample_dashboard_id)
    end
  end

  def test_update_dashboard_by_id
    with_sample_dashboard do |id|
      assert_silent do
        @onvo.update_dashboard_by_id(id, { 'description': 'A New Test Description.' })
      end
    end
  end
end
