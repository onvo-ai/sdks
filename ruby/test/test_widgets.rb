# frozen_string_literal: true

require_relative './dashboard_test_base'
require 'minitest/hooks'

# All tests related to Onvo's dashboard widget endpoints (Skipping create and delete. Every test has it)
class DashboardWidgetTest < DashboardTestBase
  def before_all
    super
    @dashboard.datasources.link(@sample_datasource_id)
    @dashboard.widgets.create('Display the number of rows the data has.')
    @sample_widget_id = @dashboard.widgets.list[0]['id']
  end

  def test_list_widgets
    assert_silent { @dashboard.widgets.list }
  end

  def test_get_widget
    assert_silent { @dashboard.widgets.get(@sample_widget_id) }
  end

  def test_update_widget
    assert_silent { @dashboard.widgets.update(@sample_widget_id, { title: 'A different title' }) }
  end

  def after_all
    super
    @dashboard.widgets.delete(@sample_widget_id)
  end
end
