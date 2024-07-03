# frozen_string_literal: true

require_relative '../resource'

# Team endpoints
class Teams < Resource
  # List teams
  #
  # @return [Array] the list of teams
  def list
    base_get('/teams')
  end

  # Get a team
  #
  # @param id [String] ID of the team
  # @return [Hash] details of the created team
  def get(id)
    base_get("/teams/#{id}")
  end

  # Update a team
  #
  # @param id [String] ID of the team
  # @param data [Hash] data of the team to update
  # @return [Hash] details of the updated team
  def update(id, body)
    base_post("/teams/#{id}", body: body)
  end
end
