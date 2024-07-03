# frozen_string_literal: true

require_relative '../resource'

# Dashboard endpoints
class Dashboards < Resource
  # List all dashboards
  #
  # @return [Array] the list of dashboards
  def list
    base_get('/dashboards')
  end

  # Get details on a specific dashboard by id
  #
  # @param id [String] ID of the dashboard
  # @return [Hash] details on the dashboard
  def get(id)
    base_get("/dashboards/#{id}")
  end

  # Delete an existing dashboard
  #
  # @param id [String] ID of the dashboard
  # @return [Hash] status of delete. Returns {"success": true} if successful.
  def delete(id)
    base_delete("/dashboards/#{id}")
  end

  # Update an existing dashboard
  #
  # @param id [String] ID of the dashboard
  # @param body [Hash] details of the dashboard to be created
  # @return [Hash] details on the created dashboard
  def update(id, body)
    base_post("/dashboards/#{id}", body: body)
  end

  # Create a new dashboard
  #
  # @param body [Hash] details of the dashboard to be created
  # @return [Hash] details on the created dashboard
  def create(body)
    base_put('/dashboards', body: body)
  end

  # Update the cache of an existing dashboard
  #
  # @param id [String] ID of the dashboard
  # @return [Hash] details on the updated dashboard
  def update_cache(id)
    base_post("/dashboards/#{id}/update-cache")
  end
end
