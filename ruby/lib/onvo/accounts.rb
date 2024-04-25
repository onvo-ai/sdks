# frozen_string_literal: true

require_relative '../resource'

# Account endpoints
class Accounts < Resource
  # List accounts
  #
  # @return [Array] the list of accounts
  def list
    base_get('/accounts')
  end

  # Get an account
  #
  # @param id [String]
  # @return [Hash] the account
  def get(id)
    base_get("/accounts/#{id}")
  end
end
