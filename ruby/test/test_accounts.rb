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

  def test_accounts_list
    assert_silent { @onvo.accounts.list }
  end

  def test_accounts_get
    sample_account_id = @onvo.accounts.list[0]['id']
    assert_silent { @onvo.accounts.get(sample_account_id) }
  end
end
