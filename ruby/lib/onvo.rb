# frozen_string_literal: true

require 'httparty'
require 'json'
require 'uri'

require_relative './onvo/embed_users'
require_relative './onvo/datasources'
require_relative './onvo/automations'
require_relative './onvo/dashboards'
require_relative './onvo/accounts'
require_relative './onvo/teams'

# The Onvo Ruby SDK
class Onvo
  include HTTParty

  include Accounts
  include Teams
  include EmbedUsers
  include Datasources
  include Automations
  include Dashboards

  attr_accessor :options

  def initialize(endpoint = ENV['ONVO_API_ENDPOINT'], api_key = ENV['ONVO_API_KEY'])
    self.class.base_uri endpoint
    @options = {
      headers: {
        'x-api-key': api_key,
        'Content-Type': 'application/json'
      }
    }
  end

  def base_request
    response = yield
    body = JSON.parse(response.body)
    # TODO: Replace Runtime w/ custom errors
    raise "#{response.code} Error : #{body['message']}" if response.code >= 400

    body
  end

  def base_get(subdirectory)
    base_request { self.class.get(subdirectory, options) }
  end

  def base_put(subdirectory, body = nil)
    params = body ? options.merge({ body: body.to_json }) : options
    base_request { self.class.put(subdirectory, params) }
  end

  def base_post(subdirectory, body = nil)
    params = body ? options.merge({ body: body.to_json }) : options
    base_request { self.class.post(subdirectory, params) }
  end

  def base_delete(subdirectory)
    base_request { self.class.delete(subdirectory, options) }
  end
end
