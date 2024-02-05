# frozen_string_literal: true

require 'httparty'
require 'json'
require 'uri'

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

  def delete_embed_user_by_id(id)
    base_delete("/embed-users/#{id}")
  end

  def upsert_embed_user(id, name, email, metadata = {})
    base_post(
      '/embed-users',
      {
        'id': id,
        'name': name,
        'email': email,
        'metadata': metadata
      }
    )
  end

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

  def populate_data_source_by_id(id)
    base_post("/datasources/#{id}/populate-columns")
  end

  def delete_datasource_by_id(id)
    base_delete("/datasources/#{id}")
  end

  def update_datasource_by_id(id, body)
    base_post("/datasources/#{id}", body)
  end

  def create_datasource(body)
    base_put('/datasources', body)
  end

  # ---- Dashboard endpoints ----

  def get_dashboards
    base_get('/dashboards')
  end

  def get_dashboard_by_id(id)
    base_get("/dashboards/#{id}")
  end

  def delete_dashboard_by_id(id)
    base_delete("/dashboards/#{id}")
  end

  def update_dashboard_by_id(id, body)
    base_post("/dashboards/#{id}", body)
  end

  def create_dashboard(body)
    base_put('/dashboards', body)
  end

  # ---- Automation endpoints ----

  def get_automations
    base_get('/automations')
  end

  def get_automation_by_id(id)
    base_get("/automations/#{id}")
  end

  def delete_automation_by_id(id)
    base_delete("/automations/#{id}")
  end

  def update_automation_by_id(id, body)
    base_post("/automations/#{id}", body)
  end

  def create_automation(body)
    base_put('/automations', body)
  end

  # ---- Dashboard Widget endpoints ----
  def get_dashboard_widgets(dashboard_id)
    base_get("/dashboards/#{dashboard_id}/widgets")
  end

  def get_dashboard_widget_by_id(dashboard_id, widget_id)
    base_get("/dashboards/#{dashboard_id}/widgets/#{widget_id}")
  end

  # def delete_dashboard_widget_by_id(dashboard_id, widget_id)
  #   base_delete("/dashboards/#{dashboard_id}/widgets/#{widget_id}")
  # end

  # def update_dashboard_widget_by_id(dashboard_id, widget_id, body)
  #   base_post("/dashboards/#{dashboard_id}/widgets/#{widget_id}", body)
  # end

  # TODO: fix in node/src/index.ts
  # def create_dashboard_widget(dashboard_id, query)
  #   processed_query = URI.encode_www_form_component(query)
  #   base_put("/dashboards/#{dashboard_id}/widgets?query=#{processed_query}")
  # end

  # ---- Dashboard Question Endpoints ----
  def get_dashboard_questions_by_id(dashboard_id)
    base_get("/dashboards/#{dashboard_id}/questions")
  end

  def ask_dashboard_question(dashboard_id, query)
    processed_query = URI.encode_www_form_component(query)
    base_put("/dashboards/#{dashboard_id}/questions?query=#{processed_query}")
  end

  # ---- Dashboard Session Endpoints ----

  def get_dashboard_sessions_by_id(dashboard_id)
    base_get("/dashboards/#{dashboard_id}/sessions")
  end

  def delete_dashboard_sessions_by_id(dashboard_id)
    base_delete("/dashboards/#{dashboard_id}/sessions")
  end

  def upsert_dashboard_session(dashboard_id, user_id, parameters = {})
    session_data = base_post(
      "/dashboards/#{dashboard_id}/sessions",
      { 'user': user_id, 'parameters': parameters }
    )
    session_data.merge({ 'url': "#{endpoint}#{session_data['url']}" })
  end
end