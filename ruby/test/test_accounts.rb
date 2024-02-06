# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'

# All tests related to Onvo's accounts endpoints
class AccountsTest < Minitest::Test
  def setup
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)
  end

  def test_get_accounts
    assert_silent { @onvo.get_accounts }
  end

  def test_get_account_by_id
    sample_account_id = @onvo.get_accounts[0]['id']
    assert_silent { @onvo.get_account_by_id(sample_account_id) }
  end
end
