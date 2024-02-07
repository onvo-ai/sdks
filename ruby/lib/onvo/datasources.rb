# frozen_string_literal: true

require_relative '../resource_template'

# Datasource endpoints
class Datasources < ResourceTemplate
  def list
    base_get('/datasources')
  end

  def get(id)
    base_get("/datasources/#{id}")
  end

  def get_data(id)
    base_get("/datasources/#{id}/data")
  end

  def fetch_column_descriptions(id)
    base_post("/datasources/#{id}/populate-columns")
  end

  def delete(id)
    base_delete("/datasources/#{id}")
  end

  def update(id, body)
    base_post("/datasources/#{id}", body)
  end

  def create(body)
    base_put('/datasources', body)
  end
end
