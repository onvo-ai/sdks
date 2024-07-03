# frozen_string_literal: true

require_relative '../resource'

# Datasource endpoints
class Datasources < Resource
  # List all datasources
  #
  # @return [Array] the list of datasources
  def list
    base_get('/datasources')
  end

  # Get details on a specific datasource by id
  #
  # @param id [String] ID of the datasource
  # @return [Hash] details on the datasource
  def get(id)
    base_get("/datasources/#{id}")
  end

  # Create a new datasource 
  #
  # @param body [Hash] details of the datasource to be created
  # @return [Hash] details on the created datasource
  def create(body)
    base_put('/datasources', body: body)
  end

  # Update an existing datasource
  #
  # @param id [String] ID of the datasource
  # @param body [Hash] details to update on the datasource
  # @return [Hash] details on the updated datasource
  def update(id, body)
    base_post("/datasources/#{id}", body: body)
  end

  # Delete an existing datasource
  #
  # @param id [String] ID of the datasource
  # @return [Hash] status of delete. Returns {"success": true} if successful.
  def delete(id)
    base_delete("/datasources/#{id}")
  end

  # Upload a file to a datasource
  #
  # @param id [String] ID of the datasource
  # @param file_path [String] path of the file to be uploaded
  # @return [Hash] details on the uploaded file
  def upload_file(id, file_path)
    base_post(
      "/datasources/#{id}/upload-file", body: { "file": File.open(file_path) }
    )
  end

  # Initialize a datasource
  #
  # @param id [String] ID of the datasource
  # @return [Hash] details on the initialized datasource
  def initialize_datasource(id)
    base_get("/datasources/#{id}/initialize")
  end
end
