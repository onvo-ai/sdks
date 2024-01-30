# frozen_string_literal: true

require 'httparty'

class Onvo
  include HTTParty

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

  def base_get(subdirectory)
    base_request { self.class.get(subdirectory, options) }
  end

  def base_post(subdirectory)
    base_request { self.class.post(subdirectory, options) }
  end

  def base_delete(subdirectory)
    base_request { self.class.delete(subdirectory, options) }
  end

  # ------ EOI ------

  # Dashboard endpoints
  def get_dashboards
    base_get('/dashboards')
  end

  # Account endpoints
  def get_accounts
    base_get('/accounts')
  end

  def get_account_by_id(id)
    base_get(`/accounts/#{id}`)
  end

  # Team endpoints
  def get_teams
    base_get('/teams')
  end

  def get_team_by_id(id)
    base_get(`/teams/#{id}`)
  end

  # Embed user endpoints
  def get_embed_users
    base_get('/embed-users')
  end

  def get_embed_user_by_id(id)
    base_get(`/embed-users/#{id}`)
  end

  def delete_embed_user_by_id(id)
    base_delete(`embed-users/#{id}`)
  end
end
