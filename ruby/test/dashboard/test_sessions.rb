# frozen_string_literal: true

require_relative './base_dashboard_template'

# All tests related to Onvo's dashboard question endpoints
class SessionsTest < BaseDashboardTemplate
  def test_list_dashboard_sessions
    assert_silent { @onvo.sessions.list(@sample_dashboard_id) }
  end

  def test_upsert_session
    assert_silent do
      @onvo.sessions.upsert(@sample_dashboard_id, @sample_user_id)
    end
  end

  def test_revoke_session
    assert_silent do
      @onvo.sessions.revoke(@sample_dashboard_id)
    end
  end

  # TODO: Remove if not needed
  # def test_delete_session
  #   sample_session_id = @onvo.sessions.upsert(@sample_dashboard_id, @sample_user_id)
  #   assert_silent do
  #     @onvo.sessions.delete(sample_session_id)
  #   end
  # end
end
