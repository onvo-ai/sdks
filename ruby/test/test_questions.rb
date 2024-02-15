# frozen_string_literal: true

require_relative './dashboard/dashboard_test_base'
require 'minitest/hooks'

# All tests related to Onvo's dashboard question endpoints
class DashboardQuestionTest < DashboardTestBase
  def before_all
    super
    @dashboard.datasources.link(@sample_datasource_id)
  end

  def test_list_dashboard_questions
    assert_silent { @dashboard.questions.list }
  end

  def test_ask_dashboard_question
    assert_silent { @dashboard.questions.create('How many rows does the data have?') }
  end
end
