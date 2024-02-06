# frozen_string_literal: true

# Datasource endpoints
module Datasources
  def get_datasources
    base_get('/datasources')
  end

  def get_datasource_by_id(id)
    base_get("/datasources/#{id}")
  end

  def get_datasource_data_by_id(id)
    base_get("/datasources/#{id}/data")
  end

  def populate_data_source_by_id(id)
    base_post("/datasources/#{id}/populate-columns")
  end

  def delete_datasource_by_id(id)
    base_delete("/datasources/#{id}")
  end

  def update_datasource_by_id(id, body)
    base_post("/datasources/#{id}", body)
  end

  def create_datasource(body)
    base_put('/datasources', body)
  end
end
