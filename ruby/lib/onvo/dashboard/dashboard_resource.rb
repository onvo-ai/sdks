# frozen_string_literal: true

require_relative '../../resource'

# The default template for an Onvo Dashboard Resource
class DashboardResource < Resource
  include HTTParty

  attr_accessor :dashboard_id

  def initialize(dashboard_id, endpoint, api_key)
    @dashboard_id = dashboard_id
    @endpoint = endpoint
    super(endpoint, api_key)
  end
end
