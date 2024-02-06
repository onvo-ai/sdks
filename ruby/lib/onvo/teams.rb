# frozen_string_literal: true

require_relative '../resource_template'

# Team endpoints
class Teams < ResourceTemplate
  def list
    base_get('/teams')
  end

  def get(id)
    base_get("/teams/#{id}")
  end
end
