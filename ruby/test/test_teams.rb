# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'

# All tests related to Onvo's teams endpoints
class TeamsTest < Minitest::Test
  def setup
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)
  end

  def test_get_teams
    assert_silent { @onvo.get_teams }
  end

  def test_get_team_by_id
    sample_test_id = @onvo.get_teams[0]['id']
    assert_silent { @onvo.get_team_by_id(sample_test_id) }
  end
end
