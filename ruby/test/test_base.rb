# frozen_string_literal: true

require_relative './base_template'
require_relative '../lib/onvo'

# Tests for the base template class
class BaseTest < BaseTemplate
  def test_onvo_initializer
    options = {
      headers: {
        'x-api-key': @api_key,
        'Content-Type': 'application/json'
      }
    }

    assert_equal @onvo.endpoint, ENV['ONVO_API_ENDPOINT']
    assert_equal @onvo.api_key, ENV['ONVO_API_KEY']
  end

  def test_invalid_api_key_error
    endpoint = ENV['ONVO_API_ENDPOINT']
    incorrect_api_key = 'incorrect_api_key'
    alt_onvo = Onvo.new(endpoint, incorrect_api_key)
    assert_raises(RuntimeError) { alt_onvo.accounts.list }
  end
end
