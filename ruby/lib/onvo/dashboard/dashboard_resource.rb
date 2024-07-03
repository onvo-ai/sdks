# frozen_string_literal: true

require_relative '../../resource'

# The default template for an Onvo Dashboard Resource
class DashboardResource < Resource
  include HTTParty

  attr_accessor :dashboard_id

  # Initialize the dashboard resource
  #
  # @param dashboard_id [String] The dashboard id
  # @param endpoint [String] The endpoint for the Onvo SDK
  # @param api_key [String] The api key for the Onvo SDK
  def initialize(dashboard_id, endpoint, api_key)
    @dashboard_id = dashboard_id
    @endpoint = endpoint
    super(endpoint, api_key)
  end
end
