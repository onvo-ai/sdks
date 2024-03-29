from .base_test import BaseTest

SAMPLE_DASHBOARD_PARAMS = {
    "description": "Sample dashboard for widget testing",
    "title": "Widget Testing Dashboard",
}

SAMPLE_AUTOMATION_PARAMS = {
    "description": "A sample description",
    "email_format": "This is an automation from Onvo",
    "email_subject": "This is an automation from Onvo",
    "enabled": "false",
    "output_format": "link",
    "recipient_type": "internal",
    "recipients": [],
    "schedule": "",
    "timezone": "Asia/Calcutta",
    "title": "API datasource test",
}


class TestAutomations(BaseTest):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.sample_dashboard_id = cls.onvoSDK.dashboards.create(
            SAMPLE_DASHBOARD_PARAMS
        )["id"]
        # Skipping test create
        cls.sample_automation_id = cls.onvoSDK.automations.create(
            {
                **SAMPLE_AUTOMATION_PARAMS,
                "dashboard": cls.sample_dashboard_id,
                "created_by": cls.sample_user_id,
            }
        )["id"]

    def test_list(self):
        self.assertShouldRaise(None, self.onvoSDK.automations.list)

    def test_get(self):
        self.assertShouldRaise(
            None, lambda: self.onvoSDK.automations.get(self.sample_automation_id)
        )

    def test_get_runs(self):
        self.assertShouldRaise(
            None, lambda: self.onvoSDK.automations.get_runs(self.sample_automation_id)
        )

    def test_update(self):
        self.assertShouldRaise(
            None,
            lambda: self.onvoSDK.automations.update(
                self.sample_automation_id,
                {"description": "A New Test Description. Delete if seen."},
            ),
        )

    @classmethod
    def tearDownClass(cls) -> None:
        cls.onvoSDK.dashboards.delete(cls.sample_dashboard_id)
        cls.onvoSDK.automations.delete(cls.sample_automation_id)  # Skipping test delete
        super().tearDownClass()
