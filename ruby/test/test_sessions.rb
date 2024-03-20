# frozen_string_literal: true

require_relative './dashboard/dashboard_test_base'

# All tests related to Onvo's dashboard question endpoints
class SessionsTest < DashboardTestBase
  def test_list_dashboard_sessions
    assert_silent { @onvo.sessions.list(@sample_dashboard_id) }
  end

  def test_upsert_session
    assert_silent do
      @onvo.sessions.upsert(@sample_dashboard_id, '197302e5-88e2-49f4-bbe7-92b5a4dc4264')
    end
  end

  def test_delete_session
    assert_silent do
      @onvo.sessions.delete(@sample_dashboard_id)
    end
  end
end
