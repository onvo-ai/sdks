# frozen_string_literal: true

require_relative '../resource'

# Dashboard endpoints
class Dashboards < Resource
  def list
    base_get('/dashboards')
  end

  def get(id)
    base_get("/dashboards/#{id}")
  end

  def delete(id)
    base_delete("/dashboards/#{id}")
  end

  def update(id, body)
    base_post("/dashboards/#{id}", body: body)
  end

  def create(body)
    base_put('/dashboards', body: body)
  end
end
