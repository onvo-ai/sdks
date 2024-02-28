from .base_test import BaseTest

SAMPLE_EMBED_USER_PARAMS = {
    "id": "sample-embed-user-id",
    "name": "Python Integration Test User",
    "email": "test@test.com",
    "metadata": {"hello": "world"},
}


class TestEmbedUsers(BaseTest):

    def setUp(self):
        super().setUp()
        self.sampleEmbedUserId = self.onvoSDK.embed_users.upsert(
            SAMPLE_EMBED_USER_PARAMS
        )[
            "id"
        ]  # Skipping test create

    def test_list(self):
        self.assertShouldRaise(None, self.onvoSDK.embed_users.list)

    def test_get(self):
        self.assertShouldRaise(
            None, lambda: self.onvoSDK.embed_users.get(self.sampleEmbedUserId)
        )

    def test_get_access_token(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.embed_users.get_access_token(self.sampleEmbedUserId),
        )

    def test_upsert_update(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.embed_users.upsert(
                {"id": self.sampleEmbedUserId, "name": "Renamed Python Test User"},
            ),
        )

    def tearDown(self) -> None:
        self.onvoSDK.embed_users.delete(self.sampleEmbedUserId)  # Skipping test delete
