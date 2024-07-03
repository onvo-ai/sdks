# frozen_string_literal: true

require_relative '../resource'

# Automation endpoints
class Automations < Resource
  # List all automations
  #
  # @return [Array] the list of automations
  def list
    base_get('/automations')
  end

  # Get details on a specific automation by id
  #
  # @param id [String] ID of the automation
  # @return [Hash] details on the automation
  def get(id)
    base_get("/automations/#{id}")
  end

  # Get all runs for an automation
  #
  # @param id [String] ID of the automation
  # @return [Hash] details on the automation
  def get_runs(id)
    base_get("/automations/#{id}/runs")
  end

  # Delete an existing automation
  #
  # @param id [String] ID of the automation
  # @return [Hash] status of delete. Returns {"success": true} if successful.
  def delete(id)
    base_delete("/automations/#{id}")
  end

  # Update an existing automation
  #
  # @param id [String] ID of the automation
  # @param body [Hash] details on the automation
  # @return [Hash] details on the automation
  def update(id, body)
    base_post("/automations/#{id}", body: body)
  end

  # Create a new automation
  #
  # @param body [Hash] details on the automation
  # @return [Hash] details on the automation
  def create(body)
    base_put('/automations', body: body)
  end
end
