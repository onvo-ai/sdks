# frozen_string_literal: true

require_relative './base_template'

# All tests related to Onvo's accounts endpoints
class AccountsTest < BaseTemplate
  def test_accounts_list
    assert_silent { @onvo.accounts.list }
  end

  def test_accounts_get
    sample_account_id = @onvo.accounts.list[0]['id']
    assert_silent { @onvo.accounts.get(sample_account_id) }
  end
end
