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
