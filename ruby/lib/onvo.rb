# frozen_string_literal: true

require_relative './onvo/accounts'
require_relative './onvo/teams'
require_relative './onvo/embed_users'
require_relative './onvo/datasources'
require_relative './onvo/automations'
require_relative './onvo/dashboards'

# The Onvo Ruby SDK
class Onvo
  attr_accessor :accounts, :teams, :embed_users, :datasources, :automations, :dashboards

  def initialize(endpoint = ENV['ONVO_API_ENDPOINT'], api_key = ENV['ONVO_API_KEY'])
    params = [endpoint, api_key]

    @accounts = Accounts.new(*params)
    @teams = Teams.new(*params)
    @embed_users = EmbedUsers.new(*params)
    @datasources = Datasources.new(*params)
    @automations = Automations.new(*params)
    @dashboards = Dashboards.new(*params)
  end
end
