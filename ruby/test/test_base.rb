# frozen_string_literal: true

require_relative './base_template'

# Tests for the base template class
class BaseTest < BaseTemplate
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
    @onvo.options[:headers][:"x-api-key"] = 'incorrect_api_key'
    assert_raises(RuntimeError) { @onvo.accounts.list }
  end
end
