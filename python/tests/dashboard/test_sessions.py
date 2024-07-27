from .base_test import DashboardBaseTest


class TestSessions(DashboardBaseTest):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.sample_embed_user_id = cls.onvoSDK.embed_users.upsert(
            {
                "id": cls.sample_user_id,
                "name": "Python Integration Test User",
                "email": "test@test.com",
            }
        )["id"]

    def test_list(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.sessions.list(self.sample_dashboard_id),
        )

    def test_upsert(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.sessions.upsert(
                self.sample_dashboard_id, self.sample_embed_user_id
            ),
        )

    # TODO: remove if not needed
    # def test_delete(self):
    #     sample_session_token = self.onvoSDK.sessions.upsert(
    #         self.sample_dashboard_id, self.sample_embed_user_id
    #     )["token"]
    #     self.assertShouldRaise(
    #         None,
    #         lambda: self.onvoSDK.sessions.delete(sample_session_token),
    #     )

    def test_revoke(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.sessions.revoke(self.sample_dashboard_id),
        )
