from .base_test import DashboardBaseTest


class TestQuestions(DashboardBaseTest):

    def setUp(self):
        super().setUp()
        self.sampleDashboard.datasources.link(self.sampleDatasourceId)

    def test_list(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.questions.list(self.sampleDashboardId),
        )

    # TODO: Fix breakage in ask question
    # def test_create_and_delete(self):
    #     self.assertShouldRaise(
    #         None,
    #         lambda: self.onvoSDK.questions.create(
    #             self.sampleDashboardId, "How many rows does the data have?"
    #         ),
    #     )
    #     sample_question_id = self.onvoSDK.questions.list(self.sampleDashboardId)[0][
    #         "id"
    #     ]
    #     self.assertShouldRaise(
    #         None,
    #         lambda: self.onvoSDK.questions.delete(sample_question_id),
    #     )
