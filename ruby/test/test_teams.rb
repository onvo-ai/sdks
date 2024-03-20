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

  def test_team_list
    assert_silent { @onvo.teams.list }
  end

  def test_team_get
    sample_test_id = @onvo.teams.list[0]['id']
    assert_silent { @onvo.teams.get(sample_test_id) }
  end
end
