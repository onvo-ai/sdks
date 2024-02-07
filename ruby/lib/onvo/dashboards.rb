# frozen_string_literal: true

require_relative './dashboard/widgets'
require_relative './dashboard/questions'
require_relative './dashboard/sessions'

require_relative '../resource_template'

# Dashboard endpoints
class Dashboards < ResourceTemplate
  # include Widgets
  # include Questions
  # include Sessions

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
    base_post("/dashboards/#{id}", body)
  end

  def create(body)
    base_put('/dashboards', body)
  end
end
