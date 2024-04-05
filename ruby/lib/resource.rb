# frozen_string_literal: true

require 'httparty'
require 'json'
require 'uri'

# The default template for an Onvo Resource
class Resource
  include HTTParty

  attr_accessor :options

  # Initialize the resource
  #
  # @param endpoint [String]
  # @param api_key [String]
  def initialize(endpoint, api_key)
    self.class.base_uri endpoint
    @options = {
      headers: {
        'x-api-key': api_key,
        'Content-Type': 'application/json'
      }
    }
  end

  # Makes a request, handles errors, parses and returns the body
  #
  # @yieldparam [HTTParty::Response] response
  # @return [Hash, Array]
  def base_request
    response = yield
    body = JSON.parse(response.body)
    # TODO: Replace Runtime w/ custom errors
    raise "#{response.code} Error : #{body['message']}" if response.code >= 400

    body
  rescue JSON::ParserError, TypeError
    response.body
  end

  # Adds query or body options to the request if they are present
  #
  # @param extra_options [Hash]
  # @return [Hash] the modified options with query and/or body
  def merge_options(extra_options)
    filtered_extras = {}
    filtered_extras[:query] = extra_options[:query] if extra_options.key? :query
    filtered_extras[:body] = extra_options[:body].to_json if extra_options.key? :body
    options.merge(filtered_extras)
  end

  # Makes a get request and returns the body
  #
  # @param subdirectory [String]
  # @param extra_options [Hash]
  # @return [Hash, Array]
  def base_get(subdirectory, **extra_options)
    base_request { self.class.get(subdirectory, **merge_options(extra_options)) }
  end

  # Makes a put request and returns the body
  #
  # @param subdirectory [String]
  # @param extra_options [Hash]
  # @return [Hash]
  def base_put(subdirectory, **extra_options)
    base_request { self.class.put(subdirectory, **merge_options(extra_options)) }
  end

  # Makes a post request and returns the body
  #
  # @param subdirectory [String]
  # @param extra_options [Hash]
  # @return [Hash]
  def base_post(subdirectory, **extra_options)
    base_request { self.class.post(subdirectory, **merge_options(extra_options)) }
  end

  # Makes a patch request and returns the body
  #
  # @param subdirectory [String]
  # @param extra_options [Hash]
  # @return [Hash]
  def base_patch(subdirectory, **extra_options)
    base_request { self.class.patch(subdirectory, **merge_options(extra_options)) }
  end

  # Makes a delete request and returns the body
  #
  # @param subdirectory [String]
  # @param extra_options [Hash]
  # @return [Hash]
  def base_delete(subdirectory, **extra_options)
    base_request { self.class.delete(subdirectory, **merge_options(extra_options)) }
  end
end
