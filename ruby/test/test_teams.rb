# frozen_string_literal: true

require_relative './base_template'

# All tests related to Onvo's teams endpoints
class TeamsTest < BaseTemplate
  def test_team_list
    assert_silent { @onvo.teams.list }
  end

  def test_team_get
    sample_test_id = @onvo.teams.list[0]['id']
    assert_silent { @onvo.teams.get(sample_test_id) }
  end

  def test_update
    sample_test_id = @onvo.teams.list[0]['id']
    assert_silent { @onvo.teams.update(sample_test_id, { 'name': 'Onvo AI', 'phone_number': '+91 807 506 5108' }) }
  end
end