# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'

# All tests related to Onvo's automation endpoints
class AutomationsTest < Minitest::Test
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

  SAMPLE_AUTOMATION_PARAMS = {
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
  }.freeze

  def create_sample_automation
    @onvo.create_automation(SAMPLE_AUTOMATION_PARAMS)
  end

  def with_sample_automation
    id = create_sample_automation['id']
    yield id
    @onvo.delete_automation_by_id(id)
  end

  def test_get_automations
    assert_silent { @onvo.get_automations }
  end

  def test_create_and_delete_automation
    assert_silent do
      id = create_sample_automation['id']
      @onvo.delete_automation_by_id(id)
    end
  end

  def test_get_automation_by_id
    with_sample_automation do |automation_id|
      assert_silent { @onvo.get_automation_by_id(automation_id) }
    end
  end

  def test_update_automation_by_id
    with_sample_automation do |automation_id|
      assert_silent { @onvo.update_automation_by_id(automation_id, { description: 'test new description' }) }
    end
  end
end
