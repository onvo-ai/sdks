# frozen_string_literal: true

require_relative '../resource'

# Team endpoints
class Teams < Resource
  def list
    base_get('/teams')
  end

  def get(id)
    base_get("/teams/#{id}")
  end
end
