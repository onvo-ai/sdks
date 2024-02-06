# frozen_string_literal: true

# require_relative './onvo/embed_users'
# require_relative './onvo/datasources'
# require_relative './onvo/automations'
# require_relative './onvo/dashboards'
require_relative './onvo/accounts'
# require_relative './onvo/teams'

# The Onvo Ruby SDK
class Onvo
  attr_accessor :accounts

  def initialize(endpoint = ENV['ONVO_API_ENDPOINT'], api_key = ENV['ONVO_API_KEY'])
    @accounts = Accounts.new(endpoint, api_key)
  end
end
