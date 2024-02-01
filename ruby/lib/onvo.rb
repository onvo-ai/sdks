# frozen_string_literal: true

require 'httparty'
require 'json'

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

  def base_request
    response = yield
    body = JSON.parse(response.body)
    raise "#{response.code} Error : #{body["message"]}" if response.code >= 400 #TODO: Replace Runtime w/ custom errors

    body
  end

  def base_get(subdirectory)
    base_request { self.class.get(subdirectory, options) }
  end

  # def base_put(subdirectory, body)
  #   base_request { self.class.put(subdirectory, options, body) }
  # end

  # def base_post(subdirectory, body)
  #   base_request { self.class.post(subdirectory, options, body) }
  # end

  # def base_delete(subdirectory)
  #   base_request { self.class.delete(subdirectory, options) }
  # end

  # ------ EOI ------

  # ---- Dashboard endpoints ----
  def get_dashboards
    base_get('/dashboards')
  end

  # ---- Account endpoints ----
  def get_accounts
    base_get('/accounts')
  end

  def get_account_by_id(id)
    base_get("/accounts/#{id}")
  end

  # ---- Team endpoints ----
  def get_teams
    base_get('/teams')
  end

  def get_team_by_id(id)
    base_get("/teams/#{id}")
  end

  # ---- Embed user endpoints ----
  def get_embed_users
    base_get('/embed-users')
  end

  def get_embed_user_by_id(id)
    base_get("/embed-users/#{id}")
  end

  # def delete_embed_user_by_id(id)
  #   base_delete(`embed-users/#{id}`)
  # end

  # def upsert_embed_user(id, name, email, metadata)
  #   base_post('/embed-users', {
  #     id: id,
  #     name: name,
  #     email: email,
  #     metadata: metadata
  #   })
  # end

  def get_embed_user_access_token(id)
    base_get("/embed-users/#{id}/token")
  end

  # ---- Datasource user endpoints ----

  def get_datasources
    base_get('/datasources')
  end

  def get_datasource_by_id(id)
    base_get("/datasources/#{id}")
  end

  def get_datasource_data_by_id(id)
    base_get("/datasources/#{id}/data")
  end

  # def populate_data_source_by_id(id)
  #   base_post("/datasources/#{id}/populate-columns")
  # end

  # def delete_datasource_by_id(id)
  #   base_delete("/datasources/#{id}")
  # end

  # def update_datasource_by_id(id, body)
  #   base_post("/datasources/#{id}", body)
  # end

  # def create_datasource(body)
  #   base_put('/datasources', body)
  # end
end
