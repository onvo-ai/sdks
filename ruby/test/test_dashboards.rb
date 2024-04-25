# frozen_string_literal: true

require_relative './base_template'

# All tests related to Onvo's dashboard endpoints
class DashboardTest < BaseTemplate
  SAMPLE_DASHBOARD_PARAMS = {
    'description': 'Test Description.',
    'title': 'Ruby Integration Test Dashboard'
  }.freeze

  def create_sample_dashboard
    @onvo.dashboards.create(SAMPLE_DASHBOARD_PARAMS)
  end

  def with_sample_dashboard
    id = create_sample_dashboard['id']
    yield id
    @onvo.dashboards.delete(id)
  end

  def test_list_dashboards
    assert_silent { @onvo.dashboards.list }
  end

  def test_get_dashboard
    with_sample_dashboard do |id|
      assert_silent { @onvo.dashboards.get(id) }
    end
  end

  def test_create_and_delete_dashboard
    assert_silent do
      sample_dashboard_id = create_sample_dashboard['id']
      @onvo.dashboards.delete(sample_dashboard_id)
    end
  end

  def test_update_dashboard
    with_sample_dashboard do |id|
      assert_silent do
        @onvo.dashboards.update(id, { 'description': 'A New Test Description.' })
      end
    end
  end

  def test_update_dashboard_cache
    with_sample_dashboard do |id|
      assert_silent { @onvo.dashboards.update_cache(id) }
    end
  end
end
