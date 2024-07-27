import unittest
from onvo import Onvo


class BaseTest(unittest.TestCase):

    def assertShouldRaise(self, expected_exception, callable):
        if expected_exception is None:
            try:
                callable()
            except Exception as error:
                self.fail(f"{error}")
        else:
            self.assertRaises(expected_exception, callable)

    @classmethod
    def setUpClass(cls):
        cls.onvoSDK = Onvo()
        cls.sample_user_id = "96460c6b-87e9-464c-a0fe-5e47b5dae3d9"
