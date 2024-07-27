# frozen_string_literal: true

require_relative './base_template'

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

# All tests related to Onvo's automation endpoints
class AutomationsTest < BaseTemplate
  def before_all
    super
    @sample_dashboard_id = @onvo.dashboards.create(SAMPLE_DASHBOARD_PARAMS)['id']
    @sample_automation_id = @onvo.automations.create(
      SAMPLE_AUTOMATION_PARAMS.merge(dashboard: @sample_dashboard_id, created_by: @sample_user_id)
    )['id'] # skipping test create
  end

  def test_list_automations
    assert_silent { @onvo.automations.list }
  end

  def test_get_automation
    assert_silent { @onvo.automations.get(@sample_automation_id) }
  end

  def test_get_automation_runs
    assert_silent { @onvo.automations.get_runs(@sample_automation_id) }
  end

  def test_update_automation
    assert_silent { @onvo.automations.update(@sample_automation_id, { description: 'test new description' }) }
  end

  def after_all
    @onvo.automations.delete(@sample_automation_id)
    @onvo.dashboards.delete(@sample_dashboard_id) # skipping test delete
  end
end
