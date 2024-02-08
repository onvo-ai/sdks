# frozen_string_literal: true

require 'httparty'
require 'json'
require 'uri'

# The default template for an Onvo Resource
class Resource
  include HTTParty

  attr_accessor :options

  def initialize(endpoint, api_key)
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
  rescue JSON::ParserError, TypeError
    response.body
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
