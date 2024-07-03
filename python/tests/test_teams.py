from .base_test import BaseTest


class TestTeams(BaseTest):

    def test_list(self):
        self.assertShouldRaise(None, self.onvoSDK.teams.list)

    def test_get(self):
        sample_id = self.onvoSDK.teams.list()[0]["id"]
        self.assertShouldRaise(None, lambda: self.onvoSDK.teams.get(sample_id))

    def test_update(self):
        sample_id = self.onvoSDK.teams.list()[0]["id"]
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.teams.update(
                sample_id,
                {"name": "Onvo AI", "phone_number": "+91 807 506 5108"},
            ),
        )
