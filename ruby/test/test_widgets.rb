# frozen_string_literal: true

require_relative './dashboard/dashboard_test_base'
require 'minitest/hooks'

# All tests related to Onvo's dashboard widget endpoints (Skipping create and delete because hooks)
class WidgetTest < DashboardTestBase
  def before_all
    super
    @dashboard.datasources.link(@sample_datasource_id)
    @onvo.widgets.create(@sample_dashboard_id, 'Display the number of rows the data has.')
    @sample_widget_id = @onvo.widgets.list(@sample_dashboard_id)[0]['id']
  end

  def test_list_widgets
    assert_silent { @onvo.widgets.list(@sample_dashboard_id) }
  end

  def test_get_widget
    assert_silent { @onvo.widgets.get(@sample_widget_id) }
  end

  def test_get_image
    assert_silent { @onvo.widgets.get_image(@sample_widget_id) }
  end

  def test_update_widget
    assert_silent { @onvo.widgets.update(@sample_widget_id, { title: 'A different title' }) }
  end

  def after_all
    super
    @onvo.widgets.delete(@sample_widget_id)
  end
end
