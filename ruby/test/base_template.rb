# frozen_string_literal: true

require 'minitest/autorun'
require 'minitest/hooks'
require_relative '../lib/onvo'

# Common methods, attributes and setup for all tests
class BaseTemplate < Minitest::Test
  include Minitest::Hooks

  def before_all
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)

    @sample_user_id = '96460c6b-87e9-464c-a0fe-5e47b5dae3d9'
  end
end
