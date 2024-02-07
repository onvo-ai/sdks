# frozen_string_literal: true

require_relative '../resource'

# Account endpoints
class Accounts < Resource
  def list
    base_get('/accounts')
  end

  def get(id)
    base_get("/accounts/#{id}")
  end
end
