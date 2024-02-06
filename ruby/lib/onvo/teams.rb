# frozen_string_literal: true

# Team endpoints
module Teams
  def get_teams
    base_get('/teams')
  end

  def get_team_by_id(id)
    base_get("/teams/#{id}")
  end
end
