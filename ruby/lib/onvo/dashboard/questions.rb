# frozen_string_literal: true

# Dashboard Question endpoints
module Questions
  def get_dashboard_questions_by_id(dashboard_id)
    base_get("/dashboards/#{dashboard_id}/questions")
  end

  # def ask_dashboard_question(dashboard_id, query)
  #   processed_query = URI.encode_www_form_component(query)
  #   base_put("/dashboards/#{dashboard_id}/questions?query=#{processed_query}")
  # end
end
