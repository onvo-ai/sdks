# frozen_string_literal: true

require_relative '../resource_template'

# Automation endpoints
class Automations < ResourceTemplate
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
    base_post("/automations/#{id}", body)
  end

  def create(body)
    base_put('/automations', body)
  end
end
