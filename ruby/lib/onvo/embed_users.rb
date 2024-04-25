# frozen_string_literal: true

require_relative '../resource'

# Embed user endpoints
class EmbedUsers < Resource
  # List all embed users
  #
  # @return [Array] the list of embed users
  def list
    base_get('/embed-users')
  end

  # Get details on a specific embed user by id
  #
  # @param id [String] ID of the embed user
  # @return [Hash] details on the embed user
  def get(id)
    base_get("/embed-users/#{id}")
  end

  # Delete an existing embed user
  #
  # @param id [String] ID of the embed user
  # @return [Hash] status of delete. Returns {"success": true} if successful.
  def delete(id)
    base_delete("/embed-users/#{id}")
  end

  # Upsert an existing embed user
  #
  # @param body [Hash] details of the embed user
  # @return [Hash] details on the created/updated embed user
  def upsert(body)
    base_post('/embed-users', body: body)
  end

  # Get access token for an embed user
  #
  # @param id [String] ID of the embed user
  # @return [Hash] details on the access token
  def get_access_token(id)
    base_get("/embed-users/#{id}/token")
  end
end
