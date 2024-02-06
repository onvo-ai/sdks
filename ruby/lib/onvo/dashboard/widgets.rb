# frozen_string_literal: true

# Dashboard Widget endpoints
module Widgets
  def get_dashboard_widgets(dashboard_id)
    base_get("/dashboards/#{dashboard_id}/widgets")
  end

  def get_dashboard_widget_by_id(dashboard_id, widget_id)
    base_get("/dashboards/#{dashboard_id}/widgets/#{widget_id}")
  end

  # def delete_dashboard_widget_by_id(dashboard_id, widget_id)
  #   base_delete("/dashboards/#{dashboard_id}/widgets/#{widget_id}")
  # end

  # def update_dashboard_widget_by_id(dashboard_id, widget_id, body)
  #   base_post("/dashboards/#{dashboard_id}/widgets/#{widget_id}", body)
  # end

  # def create_dashboard_widget(dashboard_id, query)
  #   processed_query = URI.encode_www_form_component(query)
  #   base_put("/dashboards/#{dashboard_id}/widgets?query=#{processed_query}")
  # end
end
