# frozen_string_literal: true

require_relative './base_dashboard_template'

# All tests related to Onvo's dashboard widget endpoints (Skipping create and delete because hooks)
class WidgetTest < BaseDashboardTemplate
  def before_all
    super
    @dashboard.datasources.link(@sample_datasource_id)

    # skipping test create
    @sample_widget = @onvo.widgets.create(@sample_dashboard_id, 'Display the number of rows the data has.')
    @sample_widget_id = @sample_widget['id']
    @sample_widget_code = @sample_widget['code']
  end

  def test_list_widgets
    assert_silent { @onvo.widgets.list(@sample_dashboard_id) }
  end

  def test_get_widget
    assert_silent { @onvo.widgets.get(@sample_widget_id) }
  end

  def test_update_widget
    assert_silent { @onvo.widgets.update(@sample_widget_id, { title: 'A different title' }) }
  end

  def test_export
    assert_silent { @onvo.widgets.export(@sample_widget_id, 'png') }
  end

  def test_request_edit
    sample_edit = {
      'messages': @sample_widget['messages'] + [{ 'role': 'user', 'content': 'Make the pie chart blue' }]
    }
    assert_silent { @onvo.widgets.request_edit(@sample_widget_id, sample_edit) }
  end

  def test_execute_code
    assert_silent { @onvo.widgets.execute_code(@sample_widget_id, @sample_widget_code) }
  end

  def after_all
    super
    @onvo.widgets.delete(@sample_widget_id) # skipping test delete
  end
end
