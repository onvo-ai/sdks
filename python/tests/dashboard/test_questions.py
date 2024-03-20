from .base_test import DashboardBaseTest


class TestQuestions(DashboardBaseTest):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.sampleDashboard.datasources.link(cls.sampleDatasourceId)

    def test_list(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.questions.list(self.sampleDashboardId),
        )

    def test_create_and_delete(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.questions.create(
                self.sampleDashboardId, "How many rows does the data have?"
            ),
        )
        sample_question_id = self.onvoSDK.questions.list(self.sampleDashboardId)[0][
            "id"
        ]
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.questions.delete(sample_question_id),
        )
