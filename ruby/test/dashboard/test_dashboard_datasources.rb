# frozen_string_literal: true

require_relative './dashboard_test_base'

# All tests related to Onvo's dashboard question endpoints
class DashboardDatasourcesTest < DashboardTestBase
  def test_list_datasources
    assert_silent { @dashboard.datasources.list }
  end

  def test_link_datasource
    assert_silent { @dashboard.datasources.link(@sample_datasource_id) }
  end

  def test_unlink_datasource
    assert_silent { @dashboard.datasources.unlink(@sample_datasource_id) }
  end
end
