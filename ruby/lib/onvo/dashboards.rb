# frozen_string_literal: true

require_relative './dashboard/widgets'
require_relative './dashboard/questions'
require_relative './dashboard/sessions'

# Dashboard endpoints
module Dashboards
  include Widgets
  include Questions
  include Sessions

  def get_dashboards
    base_get('/dashboards')
  end

  def get_dashboard_by_id(id)
    base_get("/dashboards/#{id}")
  end

  def delete_dashboard_by_id(id)
    base_delete("/dashboards/#{id}")
  end

  def update_dashboard_by_id(id, body)
    base_post("/dashboards/#{id}", body)
  end

  def create_dashboard(body)
    base_put('/dashboards', body)
  end
end
