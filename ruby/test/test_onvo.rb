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

  # TODO: Integrate FactoryBot and all of these over
  def create_sample_datasource
    @onvo.create_datasource(
      {
        'description': 'Ruby Integration Test Data Source',
        'title': 'Ruby Integration Test Data Source',
        "source": 'file',
        'config': '{"url":"https://eiexmihxmtknazmbqnsa.supabase.co/storage/v1/object/sign/data-sources/357c281c-4347-4778-a575-6aabe4c831bc/datasource:dc66cd9b-7fe8-47e2-8370-2d19f8f3200f/zillow.csv?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkYXRhLXNvdXJjZXMvMzU3YzI4MWMtNDM0Ny00Nzc4LWE1NzUtNmFhYmU0YzgzMWJjL2RhdGFzb3VyY2U6ZGM2NmNkOWItN2ZlOC00N2UyLTgzNzAtMmQxOWY4ZjMyMDBmL3ppbGxvdy5jc3YiLCJpYXQiOjE3MDY5NjQ0ODksImV4cCI6MTczODUwMDQ4OX0.XJHdWIn4ezrOyHZrcMoPldpt98Lu3f8D-W5VW2kllSk","filename":"zillow.csv","type":"csv"}'
      }
    )
  end

  def with_sample_datasource
    id = create_sample_datasource['id']
    yield id
    @onvo.delete_datasource_by_id(id)
  end

  def create_sample_embed_user
    @onvo.upsert_embed_user(
      'sample-embed-user-id',
      'Rails Integration Test User',
      'test@test.com',
      { 'hello': 'world' }
    )
  end

  def with_sample_embed_user
    id = create_sample_embed_user['id']
    yield id
    @onvo.delete_embed_user_by_id(id)
  end

  def create_sample_dashboard
    @onvo.create_dashboard(
      {
        'description': 'Test Description.',
        'title': 'Ruby Integration Test Dashboard'
      }
    )
  end

  def with_sample_dashboard
    id = create_sample_dashboard['id']
    yield id
    @onvo.delete_dashboard_by_id(id)
  end

  def create_sample_automation
    @onvo.create_automation(
      {
        created_by: '197302e5-88e2-49f4-bbe7-92b5a4dc4264',
        dashboard: '9ce5c740-413e-43f6-9d91-38ae7c75d1c8',
        description: 'A sample description',
        email_format: 'This is an automation from Onvo',
        email_subject: 'This is an automation from Onvo',
        enabled: false,
        output_format: 'link',
        recipient_type: 'internal',
        schedule: '',
        title: 'API datasource test'
      }
    )
  end

  def with_sample_automation
    id = create_sample_automation['id']
    yield id
    @onvo.delete_automation_by_id(id)
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

  # ---- Embed user endpoints ----
  def test_get_embed_users
    assert_silent { @onvo.get_embed_users }
  end

  def test_get_embed_user_by_id
    with_sample_embed_user do |user_id|
      assert_silent { @onvo.get_embed_user_by_id(user_id) }
    end
  end

  def test_delete_embed_user_by_id
    sample_embed_user_id = create_sample_embed_user["id"]
    assert_silent { @onvo.delete_embed_user_by_id(sample_embed_user_id) }
  end

  def test_upsert_embed_user
    assert_silent { create_sample_embed_user }
  end

  def test_get_embed_user_access_token
    with_sample_embed_user do |user_id|
      assert_silent { @onvo.get_embed_user_access_token(user_id) }
    end
  end

   # ---- Datasource user endpoints ----

  def test_get_datasources
    assert_silent { @onvo.get_datasources }
  end

  def test_create_datasource
    assert_silent { create_sample_datasource }
  end

  def test_delete_datasource_by_id
    datasource_id = create_sample_datasource['id']
    assert_silent { @onvo.delete_datasource_by_id(datasource_id) }
  end

  def test_get_datasource_by_id
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.get_datasource_by_id(datasource_id) }
    end
  end

  def test_populate_datasource_by_id
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.populate_data_source_by_id(datasource_id) }
    end
  end

  def test_get_datasource_data_by_id
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.get_datasource_data_by_id(datasource_id) }
    end
  end

  def test_update_datasource_by_id
    with_sample_datasource do |datasource_id|
      assert_silent {
        @onvo.update_datasource_by_id(datasource_id, { title: 'Renaming Test' })
      }
    end
  end

  # ---- Dashboard Endpoints ----
  def test_get_dashboards
    assert_silent { @onvo.get_dashboards }
  end

  def test_get_dashboard_by_id
    with_sample_dashboard do |id|
      assert_silent { @onvo.get_dashboard_by_id(id) }
    end
  end

  def test_delete_dashboard_by_id
    sample_dashboard_id = create_sample_dashboard['id']
    assert_silent { @onvo.delete_dashboard_by_id(sample_dashboard_id) }
  end

  def test_update_dashboard_by_id
    with_sample_dashboard do |id|
      assert_silent {
        @onvo.update_dashboard_by_id(id, { 'description': 'A New Test Description.' })
      }
    end
  end

  def test_create_dashboard
    assert_silent { create_sample_dashboard }
  end

  # ---- Automation endpoints ----

  def test_get_automations
    assert_silent { @onvo.get_automations }
  end

  def test_create_automation
    assert_silent { create_sample_automation }
  end

  def test_delete_automation_by_id
    id = create_sample_automation['id']
    assert_silent { @onvo.delete_automation_by_id(id) }
  end

  def test_get_automation_by_id
    with_sample_automation do |automation_id|
      assert_silent { @onvo.get_automation_by_id(automation_id) }
    end
  end

  def test_update_automation_by_id
    with_sample_automation do |automation_id|
      assert_silent { @onvo.update_automation_by_id(automation_id, {description: 'test new description'}) }
    end
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
