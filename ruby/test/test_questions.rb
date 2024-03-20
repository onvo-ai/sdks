# frozen_string_literal: true

require_relative './dashboard/dashboard_test_base'
require 'minitest/hooks'

# All tests related to Onvo's dashboard question endpoints
class QuestionTest < DashboardTestBase
  def before_all
    super
    @dashboard.datasources.link(@sample_datasource_id)
  end

  def test_list_dashboard_questions
    assert_silent { @onvo.questions.list(@sample_dashboard_id) }
  end

  def test_ask_dashboard_question
    assert_silent { @onvo.questions.create(@sample_dashboard_id, 'How many rows does the data have?') }
  end
end
