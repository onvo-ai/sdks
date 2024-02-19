import unittest
from onvo import Onvo


class TestAccounts(unittest.TestCase):

    def assertShouldRaise(self, expected_exception, callable):
        if expected_exception is None:
            try:
                callable()
            except Exception as error:
                self.fail(f"{error}")
        else:
            self.assertRaises(expected_exception, callable)

    def setUp(self):
        self.onvoSDK = Onvo()

    def test_list(self):
        self.assertShouldRaise(None, self.onvoSDK.accounts.list)

    def test_get(self):
        sample_id = self.onvoSDK.accounts.list()[0]["id"]
        self.assertShouldRaise(None, lambda: self.onvoSDK.accounts.get(sample_id))
