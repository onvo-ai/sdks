# frozen_string_literal: true

require_relative './dashboard_test_base'

# All tests related to Onvo's dashboard question endpoints
class DashboardSessionsTest < DashboardTestBase
  def test_list_dashboard_sessions
    assert_silent { @dashboard.sessions.list }
  end

  def test_upsert_session #TODO: Check 400 error : Failed to fetch existing session: column sessions.parent_dashboard does not exist
    assert_silent do
      @dashboard.sessions.upsert('197302e5-88e2-49f4-bbe7-92b5a4dc4264')
    end
  end

  def test_delete_session
    assert_silent do
      @dashboard.sessions.delete
    end
  end
end
