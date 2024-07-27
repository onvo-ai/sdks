# frozen_string_literal: true

require_relative './base_dashboard_template'

# All tests related to Onvo's dashboard question endpoints
class QuestionTest < BaseDashboardTemplate
  def before_all
    super
    @dashboard.datasources.link(@sample_datasource_id)
  end

  def test_list_dashboard_questions
    assert_silent { @onvo.questions.list(@sample_dashboard_id) }
  end

  def test_delete_dashboard_question
    sample_question_id = @onvo.questions.create(@sample_dashboard_id, 'How many rows does the data have?')['id'] # skipping test create
    assert_silent { @onvo.questions.delete(sample_question_id) }
  end
end
