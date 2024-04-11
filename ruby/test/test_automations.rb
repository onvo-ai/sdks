# frozen_string_literal: true

require_relative './base_template'

# All tests related to Onvo's automation endpoints
class AutomationsTest < BaseTemplate
  def setup
    super
    @sample_dashboard_id = @onvo.dashboards.create(SAMPLE_DASHBOARD_PARAMS)['id']
  end

  SAMPLE_DASHBOARD_PARAMS = {
    'description': 'Sample dashboard for widget testing',
    'title': 'Widget Testing Dashboard'
  }.freeze

  SAMPLE_AUTOMATION_PARAMS = {
    description: 'A sample description',
    email_format: 'This is an automation from Onvo',
    email_subject: 'This is an automation from Onvo',
    enabled: false,
    output_format: 'link',
    recipients: [],
    recipient_type: 'internal',
    schedule: '',
    timezone: 'Asia/Calcutta',
    title: 'API datasource test'
  }.freeze

  def create_sample_automation
    @onvo.automations.create(
      SAMPLE_AUTOMATION_PARAMS.merge(dashboard: @sample_dashboard_id, created_by: @sample_user_id)
    )
  end

  def with_sample_automation
    id = create_sample_automation['id']
    yield id
    @onvo.automations.delete(id)
  end

  def test_list_automations
    assert_silent { @onvo.automations.list }
  end

  def test_create_and_delete_automation
    assert_silent do
      id = create_sample_automation['id']
      @onvo.automations.delete(id)
    end
  end

  def test_get_automation
    with_sample_automation do |automation_id|
      assert_silent { @onvo.automations.get(automation_id) }
    end
  end

  def test_get_automation_runs
    with_sample_automation do |automation_id|
      assert_silent { @onvo.automations.get_runs(automation_id) }
    end
  end

  def test_update_automation
    with_sample_automation do |automation_id|
      assert_silent { @onvo.automations.update(automation_id, { description: 'test new description' }) }
    end
  end
end
