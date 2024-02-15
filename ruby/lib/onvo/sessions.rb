# frozen_string_literal: true

require_relative '../resource'

# Dashboard session endpoints
class Sessions < Resource
  def list(dashboard_id)
    base_get('/sessions', query: { dashboard: dashboard_id })
  end

  def delete(dashboard_id)
    base_delete('/sessions', query: { dashboard: dashboard_id })
  end

  def upsert(dashboard_id, user_id)
    session_data = base_post(
      '/sessions',
      body: { dashboard: dashboard_id, user: user_id }
    )
    session_data.merge({ 'url': "#{@endpoint}#{session_data['url']}" })
  end
end
