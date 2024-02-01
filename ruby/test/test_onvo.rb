require 'minitest/autorun'
require_relative '../lib/onvo'

class OnvoTest < Minitest::Test
  def setup
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)
  end

  def test_onvo_initializer
    options = {
      headers: {
        'x-api-key': @api_key,
        'Content-Type': 'application/json'
      }
    }
    assert_equal options, @onvo.options
  end

  def test_invalid_api_key_error
    @onvo.options[:headers][:"x-api-key"]="incorrect_api_key"
    assert_raises(RuntimeError) { @onvo.get_dashboards }
  end

  def test_get_dashboards
    assert_silent { @onvo.get_dashboards }
  end

  def test_get_accounts
    assert_silent { @onvo.get_accounts }
  end

  def test_get_account_by_id
    sample__account_id = @onvo.get_accounts[0]["id"]
    assert_silent { @onvo.get_account_by_id(sample_id) }
  end

  # Team endpoints
  def test_get_teams
    assert_silent { @onvo.get_teams }
  end

  def test_get_team_by_id
    sample_test_id = @onvo.get_teams[0]["id"]
    assert_silent { @onvo.get_team_by_id(sample_id) }
  end

  # Embed user endpoints
  def test_get_embed_users
    assert_silent { @onvo.get_embed_users }
  end

  def test_get_embed_user_by_id
    sample_embed_user_id = @onvo.get_embed_users[0]["id"]
    assert_silent { @onvo.get_embed_user_by_id }
  end

  # def test_delete_embed_user_by_id(id)
  #   assert_silent { @onvo.delete_embed_user_by_id }
  # end
end
