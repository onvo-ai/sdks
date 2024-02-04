require 'minitest/autorun'
require_relative '../lib/onvo'

class OnvoTest < Minitest::Test
  def setup
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)
  end

  def test_onvo_initializer
    options = {
      headers: {
        'x-api-key': @api_key,
        'Content-Type': 'application/json'
      }
    }
    assert_equal options, @onvo.options
  end

  # ---- Accounts Endpoints ----

  def test_invalid_api_key_error
    @onvo.options[:headers][:"x-api-key"] = 'incorrect_api_key'
    assert_raises(RuntimeError) { @onvo.get_dashboards }
  end

  def test_get_accounts
    assert_silent { @onvo.get_accounts }
  end

  def test_get_account_by_id
    sample_account_id = @onvo.get_accounts[0]['id']
    assert_silent { @onvo.get_account_by_id(sample_account_id) }
  end

  # ---- Team endpoints ----
  def test_get_teams
    assert_silent { @onvo.get_teams }
  end

  def test_get_team_by_id
    sample_test_id = @onvo.get_teams[0]['id']
    assert_silent { @onvo.get_team_by_id(sample_test_id) }
  end

  # ---- Dashboard Widget endpoints ----

  def test_get_dashboard_widgets
    sample_dashboard_id = @onvo.get_dashboards[0]["id"]
    assert_silent { @onvo.get_dashboard_widgets(sample_dashboard_id) }
  end

  def test_get_dashboard_widget_by_id
    sample_dashboard_id = @onvo.get_dashboards[0]["id"]
    sample_widget_id = @onvo.get_dashboard_widgets(sample_dashboard_id)[0]["id"]
    assert_silent { @onvo.get_dashboard_widget_by_id(sample_dashboard_id, sample_widget_id) }
  end

  # def test_delete_dashboard_widget_by_id
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   sample_widget_id = @onvo.get_dashboard_widgets(sample_dashboard_id)[0]["id"]
  #   assert_silent { @onvo.delete_dashboard_widget_by_id(sample_dashboard_id, sample_widget_id) }
  # end

  # def test_update_dashboard_widget_by_id
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   sample_widget_id = @onvo.get_dashboard_widgets(sample_dashboard_id)[0]["id"]
  #   assert_silent { @onvo.delete_dashboard_widget_by_id(sample_dashboard_id, sample_widget_id, sample_body) }
  # end

  # def test_create_dashboard_widget
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   assert_silent { @onvo.create_dashboard_widget(sample_dashboard_id, sample_body) }
  # end

  # ---- Dashboard Question Endpoints ----
  def test_get_dashboard_questions_by_id
    sample_dashboard_id = @onvo.get_dashboards[0]["id"]
    assert_silent { @onvo.get_dashboard_questions_by_id(sample_dashboard_id) }
  end

  # def test_ask_dashboard_question
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   assert_silent { @onvo.ask_dashboard_question(sample_dashboard_id, sample_query) }
  # end

  # ---- Dashboard Session Endpoints ----

  def test_get_dashboard_sessions_by_id
    sample_dashboard_id = @onvo.get_dashboards[0]["id"]
    assert_silent { @onvo.get_dashboard_sessions_by_id(sample_dashboard_id) }
  end

  # def test_delete_dashboard_sessions_by_id
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   assert_silent { @onvo.delete_dashboard_sessions_by_id(sample_dashboard_id) }
  # end

  # def test_upsert_dashboard_session
  #   sample_dashboard_id = @onvo.get_dashboards[0]["id"]
  #   sample_embed_user_id = @onvo.get_embed_users[0]["id"]
  #   assert_silent { @onvo.upsert_dashboard_session(sample_dashboard_id, sample_embed_user_id, sample_parameters) }
  # end
end
