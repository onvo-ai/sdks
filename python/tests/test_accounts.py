from .base_test import BaseTest


class TestAccounts(BaseTest):

    def test_list(self):
        self.assertShouldRaise(None, self.onvoSDK.accounts.list)

    def test_get(self):
        sample_id = self.onvoSDK.accounts.list()[0]["id"]
        self.assertShouldRaise(None, lambda: self.onvoSDK.accounts.get(sample_id))
