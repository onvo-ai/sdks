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

  def test_invalid_api_key_error
    @onvo.options[:headers][:"x-api-key"]="incorrect_api_key"
    assert_raises(RuntimeError) { @onvo.get_dashboards }
  end

  def test_get_dashboards
    assert_silent { @onvo.get_dashboards }
  end

  def test_get_accounts
    assert_silent { @onvo.get_accounts }
  end

  def test_get_account_by_id
    sample_account_id = @onvo.get_accounts[0]["id"]
    assert_silent { @onvo.get_account_by_id(sample_account_id) }
  end

  # ---- Team endpoints ----
  def test_get_teams
    assert_silent { @onvo.get_teams }
  end

  def test_get_team_by_id
    sample_test_id = @onvo.get_teams[0]["id"]
    assert_silent { @onvo.get_team_by_id(sample_test_id) }
  end

  # ---- Embed user endpoints ----
  def test_get_embed_users
    assert_silent { @onvo.get_embed_users }
  end

  def test_get_embed_user_by_id
    sample_embed_user_id = @onvo.get_embed_users[0]["id"]
    assert_silent { @onvo.get_embed_user_by_id(sample_embed_user_id) }
  end

  # def test_delete_embed_user_by_id
  #   assert_silent { @onvo.delete_embed_user_by_id }
  # end

  # def test_upsert_embed_user
  #   assert_silent { @onvo.upsert_embed_user(123, 'test-user', 'test-email@test.com', {}) }
  # end

  def test_get_embed_user_access_token
    sample_embed_user_id = @onvo.get_embed_users[0]["id"]
    assert_silent { @onvo.get_embed_user_access_token(sample_embed_user_id) }
  end

   # ---- Datasource user endpoints ----

  def test_get_datasources
    assert_silent { @onvo.get_datasources }
  end

  def test_get_datasource_by_id
    sample_datasource_id = @onvo.get_datasources[0]["id"]
    assert_silent { @onvo.get_datasource_by_id(sample_datasource_id) }
  end

  # def test_get_datasource_data_by_id
  #   sample_datasource_id = @onvo.get_datasources[0]["id"] #TODO : Create a new table before getting data
  #   assert_silent { @onvo.get_datasource_data_by_id(sample_datasource_id) }
  # end

  # def test_populate_data_source_by_id
  #   assert_silent { @onvo.populate_data_source_by_id(sample_datasource_id) }
  # end

  # def test_delete_datasource_by_id
  #   assert_silent { @onvo.delete_datasource_by_id(sample_datasource_id) }
  # end

  # def test_update_datasource_by_id
  #   assert_silent { @onvo.update_datasource_by_id(sample_datasource_id, test_body) }
  # end

  # def test_create_datasource(body)
  #   assert_silent { @onvo.create_datasource(test_datasource) }
  # end

  # ---- Automation endpoints ----

  def test_get_automations
    assert_silent { @onvo.get_automations }
  end

  # def test_get_automation_by_id
  #   sample_automation_id = @onvo.get_automations[0]["id"] #TODO : Create a new automation before getting data
  #   assert_silent { @onvo.get_automation_by_id(sample_automation_id) }
  # end

  # def test_delete_automation_by_id
  #   assert_silent { @onvo.delete_automation_by_id(sample_automation_id) }
  # end

  # def test_update_automation_by_id
  #   assert_silent { @onvo.update_automation_by_id(sample_automation_id, sample_body) }
  # end

  # def test_create_automation
  #   assert_silent { @onvo.create_automation(sample_body) }
  # end

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
end
