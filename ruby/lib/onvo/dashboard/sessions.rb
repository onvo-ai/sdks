# frozen_string_literal: true

require_relative './dashboard_resource'

# Dashboard session endpoints
class DashboardSessions < DashboardResource
  def list
    base_get("/dashboards/#{@dashboard_id}/sessions")
  end

  # TODO: check if rename to delete_all
  def delete
    base_delete("/dashboards/#{@dashboard_id}/sessions")
  end

  def upsert(user_id, parameters = {})
    session_data = base_post(
      "/dashboards/#{@dashboard_id}/sessions",
      user: user_id,
      parameters: parameters
    )
    session_data.merge({ 'url': "#{@endpoint}#{session_data['url']}" })
  end
end
