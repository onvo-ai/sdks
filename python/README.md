# Onvo

The Onvo package provides utilities to seamlessly communicate with the Onvo platform, allowing developers to integrate AI-powered dashboards into their products. This README provides an overview of the package's features, installation, and usage instructions.

## Installation

You can install the package using pip:

```bash
pip install onvo
```

## Getting Started

To begin using the Onvo package, you'll need an API key from the Onvo platform and an endpoint.

You can store your API key as an environment variable named `ONVO_API_KEY`.

```bash
ONVO_API_KEY="your_api_key"
```

You can store the endpoint as an environment variable named `ONVO_API_ENDPOINT`.

```bash
ONVO_API_ENDPOINT="https://dashboard.onvo.ai/api"
```

## Usage

Here's an example of how to use the package to interact with the Onvo platform:

```python
from onvo import Onvo

# Initialize the Onvo class with your API key, will default to ENV variables if not given.
onvoSDK = Onvo(endpoint="https://dashboard.onvo.ai/api", api_key="your_api_key_here")

# Identify/Create a user
const sample_user_id = onvoSDK.embed_users.upsert({
  "id": 'sample-embed-user-id',
  "name": "John Appleseed",
  "email": "john@appleseed.com",
  "metadata": {
    "phone_number": "+1 234 5678",
    "organisation_id": "87dfty9872ydq8tg",
  },
})["id"]

# Create a dashboard
const sample_dashboard_id = onvoSDK.dashboards.create({
  "title": "Sample Dashboard",
  "description": "Sample Description of a Sample Dashboard."
})["id"]

# Create a session
sessionUrl = onvoSDK.sessions.upsert(
  sample_dashboard_id,
  sample_user_id
)["url"]
```

## Library Reference

Feel free to use the `help()` method on any of the functions to dig deeper.

### Global Variables
- `.api_key`: Your API key for authentication.
- `.endpoint`: The base URL to the Onvo platform or your self-hosted endpoint.

### Accounts
- `.accounts.list()`
- `.accounts.get(id:str)`

### Automations
- `.automations.list()`
- `.automations.get(id:str)`
- `.automations.create(data:dict)`
- `.automations.update(id:str, data:dict)`
- `.automations.delete(id:str)`

- `.automations.get_runs(id:str)`

### Dashboards
- `.dashboards.list()`
- `.dashboards.get(id:str)`
- `.dashboards.create(data:dict)`
- `.dashboards.update(id:str, data:dict)`
- `.dashboards.delete(id:str)`

- `.dashboards.update_cache(id:str)`

- `.dashboard(dashboard_id:str).datasources.list()`
- `.dashboard(dashboard_id:str).datasources.link(datasource_id:str)`
- `.dashboard(dashboard_id:str).datasources.unlink(datasource_id:str)`

### Datasources
- `.datasources.list()`
- `.datasources.get(id:str)`
- `.datasources.create(data:dict)`
- `.datasources.update(id:str, data:dict)`
- `.datasources.delete(id:str)`

- `.datasources.initialize(id:str)`
- `.datasources.upload_file(id:str)`

### Embed Users
- `.embed_users.list()`
- `.embed_users.get(id:str)`
- `.embed_users.upsert(id:str, data:dict)`
- `.embed_users.delete(id:str)`

- `.embed_users.get_access_token(id:str)`

### Sessions
- `.sessions.list(dashboard_id:str)`
- `.sessions.upsert(dashboard_id:str, user_id:dict)`
- `.sessions.delete(dashboard_id:str)`

### Teams
- `.teams.list()`
- `.teams.get(id:str)`
- `.teams.update(id:str)`

### Questions
- `.questions.list(dashboard_id:str)`
- `.questions.create(dashboard_id:str, query:str)`
- `.questions.delete(question_id:str)`
- `.questions.update(question_id:str, data:dict)`

### Widgets
- `.widgets.list(dashboard_id:str)`
- `.widgets.get(id:str)`
- `.widgets.create(dashboard_id:str, query:str)`
- `.widgets.update(id:str, data:dict)`
- `.widgets.delete(id:str)`

- `.widgets.export(id:str, format:str)`
- `.widgets.request_edit(id:str, data:dict)`
- `.widgets.execute_code(id:str, code:str)`

## Support

For any issues, questions, or feedback, please contact our support team at info@onvo.ai.

## License

This package is distributed under the MIT License.

Thank you for choosing the Onvo package to integrate AI-powered dashboards from the Onvo platform into your product! We hope this package enhances your development experience and empowers your applications with advanced analytics capabilities.
