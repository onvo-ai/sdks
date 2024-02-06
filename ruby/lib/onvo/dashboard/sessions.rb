# frozen_string_literal: true

# Dashboard session endpoints
module Sessions
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
