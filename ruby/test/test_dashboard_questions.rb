# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'
require 'minitest/hooks'

# All tests related to Onvo's dashboard question endpoints
class DashboardQuestionTest < Minitest::Test
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

  # ---- Dashboard Question Endpoints ----
  def test_get_dashboard_questions_by_id
    assert_silent { @onvo.get_dashboard_questions_by_id(@sample_dashboard_id) }
  end

  # TODO: Fix error by linking dashboard with datasource
  def test_ask_dashboard_question
    assert_silent { @onvo.ask_dashboard_question(@sample_dashboard_id, 'aloha!') }
  end

  def after_all
    @onvo.delete_dashboard_by_id(@sample_dashboard_id)
  end
end
