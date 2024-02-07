# frozen_string_literal: true

require_relative './onvo/accounts'
require_relative './onvo/teams'
require_relative './onvo/embed_users'
require_relative './onvo/datasources'
require_relative './onvo/automations'
require_relative './onvo/dashboards'

require_relative './onvo/dashboard'

# The Onvo Ruby SDK
class Onvo
  attr_reader :accounts, :teams, :embed_users, :datasources, :automations, :dashboards
  attr_accessor :endpoint, :api_key

  def initialize(endpoint = ENV['ONVO_API_ENDPOINT'], api_key = ENV['ONVO_API_KEY'])
    @endpoint = endpoint
    @api_key = api_key
    params = [@endpoint, @api_key]

    @accounts = Accounts.new(*params)
    @teams = Teams.new(*params)
    @embed_users = EmbedUsers.new(*params)
    @datasources = Datasources.new(*params)
    @automations = Automations.new(*params)
    @dashboards = Dashboards.new(*params)
  end

  def dashboard(dashboard_id)
    Dashboard.new(dashboard_id, @endpoint, @api_key)
  end
end
