# frozen_string_literal: true

require_relative '../resource'

# Dashboard session endpoints
class Sessions < Resource
  # List all sessions for a dashboard
  #
  # @param dashboard_id [String]
  # @return [Array] Array of sessions
  def list(dashboard_id)
    base_get('/sessions', query: { parent_dashboard: dashboard_id })
  end

  # Revoke all sessions for a dashboard
  #
  # @param dashboard_id [String]
  # @return [Hash] status of delete. Returns {"success": true} if successful.
  def revoke(dashboard_id)
    base_delete('/sessions', query: { parent_dashboard: dashboard_id })
  end

  # TODO: Remove is not needed
  # # Delete an existing session
  # #
  # # @param id [String]
  # # @return [Hash] status of delete. Returns {"success": true} if successful.
  # def delete(id)
  #   base_delete("/sessions/#{id}")
  # end

  # Update or Create a session
  #
  # @param dashboard_id [String]
  # @param user_id [String] user id to create a session for
  # @return [Hash] details of session
  def upsert(dashboard_id, user_id)
    base_post(
      '/sessions',
      body: { dashboard: dashboard_id, user: user_id }
    )
  end
end
