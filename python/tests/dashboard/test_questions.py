from .base_test import DashboardBaseTest


class TestQuestions(DashboardBaseTest):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.sample_dashboard.datasources.link(cls.sample_datasource_id)

    def test_list(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.questions.list(self.sample_dashboard_id),
        )

    def test_create_and_delete(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.questions.create(
                self.sample_dashboard_id, "How many rows does the data have?"
            ),
        )
        sample_question_id = self.onvoSDK.questions.list(self.sample_dashboard_id)[0][
            "id"
        ]
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.questions.delete(sample_question_id),
        )
