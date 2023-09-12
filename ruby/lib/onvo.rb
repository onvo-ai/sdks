# frozen_string_literal: true

require 'httparty'

class Onvo
  include HTTParty

  attr_accessor :options

  def initialize(endpoint, api_key)
    self.class.base_uri endpoint # http://example.io
    @options = {
      headers: {
        'x-api-key': api_key,
        'Content-Type': 'application/json'
      }
    }
  end

  def handle_response_error(response_code)
    case response_code
    when 404
      p 'Not Found'
    when 500...600
      p "#{response_code} Error"
    end
  end

  def base_request
    response = yield
    handle_response_error(response.code) if response.code >= 400
    response.body
  rescue StandardError => e
    e.full_message(highlight: true, order: :top)
  end

  def organisation_index
    base_request { self.class.get('/api/organisations', options) }
  end

  def organisation_create(data)
    base_request { self.class.put('/api/organisations', options.merge(data)) }
  end

  def organisation_show(id)
    base_request { self.class.get(`/api/organisations/#{id}`, options) }
  end

  def organisation_update(id, data)
    base_request { self.class.put(`/api/organisations/#{id}`, options.merge(data)) }
  end
end
