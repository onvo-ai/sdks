# frozen_string_literal: true

require_relative '../resource'

# Automation endpoints
class Automations < Resource
  def list
    base_get('/automations')
  end

  def get(id)
    base_get("/automations/#{id}")
  end

  def delete(id)
    base_delete("/automations/#{id}")
  end

  def update(id, body)
    base_post("/automations/#{id}", body: body)
  end

  def create(body)
    base_put('/automations', body: body)
  end
end
