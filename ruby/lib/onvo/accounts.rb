# frozen_string_literal: true

require_relative '../resource_template'

# Account endpoints
class Accounts < ResourceTemplate
  def list
    base_get('/accounts')
  end

  def get(id)
    base_get("/accounts/#{id}")
  end
end
