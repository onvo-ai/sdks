require 'minitest/autorun'
require_relative '../lib/onvo'

class OnvoTest < Minitest::Test
  def setup
    @sample_endpoint = 'test@example.com'
    @sample_api_key = 'test_api_key'
    @onvo = Onvo.new(@sample_endpoint, @sample_api_key)
  end

  def test_onvo_initializer
    options = {
      headers: {
        'x-api-key': @sample_api_key,
        'Content-Type': "application/json"
      }
    }
    assert_equal options, @onvo.options
    @onvo.organisation_index
  end
end
