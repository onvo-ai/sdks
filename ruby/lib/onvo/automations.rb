# frozen_string_literal: true

# Automation endpoints
module Automations
  def get_automations
    base_get('/automations')
  end

  def get_automation_by_id(id)
    base_get("/automations/#{id}")
  end

  def delete_automation_by_id(id)
    base_delete("/automations/#{id}")
  end

  def update_automation_by_id(id, body)
    base_post("/automations/#{id}", body)
  end

  def create_automation(body)
    base_put('/automations', body)
  end
end
