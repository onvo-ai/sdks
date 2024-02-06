# frozen_string_literal: true

# Account endpoints
module Accounts
  def get_accounts
    base_get('/accounts')
  end

  def get_account_by_id(id)
    base_get("/accounts/#{id}")
  end
end
