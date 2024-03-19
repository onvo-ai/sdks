# @onvo-ai/js

The @onvo-ai/js package provides utilities to seamlessly communicate with the Onvo platform, allowing developers to integrate AI-powered dashboards into their products. This README provides an overview of the package's features, installation, and usage instructions.

## Installation

You can install the package using npm:

```bash
npm install @onvo-ai/js
```

OR

```bash
yarn add @onvo-ai/js
```

OR

```bash
bun install @onvo-ai/js
```

## Getting Started

To begin using the `@onvo-ai/js` package, you'll need to have an API key from the Onvo platform. Ensure that your API key is stored as an environment variable named `API_KEY`.

```bash
API_KEY=your_api_key
```

## Usage

Here's an example of how to use the package to interact with the Onvo platform:

```javascript
const Onvo = require("@onvo-ai/js");

// Initialize the Onvo class with your API key
const onvo = new Onvo(process.env.API_KEY);

// Identify a user
await onvo.embed_users.upsert("123456", {
  name: "John Appleseed",
  email: "john@appleseed.com",
  metadata: {
    phone_number: "+1 234 5678",
    organisation_id: "87dfty9872ydq8tg",
  },
});

// Create a session
const sessionUrl = await onvo.sessions.upsert({
  embed_user: "123456",
  parent_dashboard: "ebc7ab74-3fd2-47e6-90df-addaec3a029e",
  parameters: {
    year: 2023,
    sort: "asc",
  },
});
```

## Library Reference

**`new Onvo(apiKey, options)`**
_This is the main class that initializes the connection to the Onvo platform._

- `apiKey (string)`: Your API key for authentication.
- `options`:
  - `baseUrl (string)`: The base URL to the Onvo platform or your self hosted endpoint.

### Accounts

```typescript
onvo.accounts.list()
onvo.accounts.get(id:string)
```

### Automations

```typescript
onvo.automations.list()
onvo.automations.create(body:object)
onvo.automations.get(id:string)
onvo.automations.update(id:string, body:object)
onvo.automations.delete(id:string)

onvo.automation(id:string).getRuns()
```

### Dashboards

```typescript
onvo.dashboards.list()
onvo.dashboards.create(body:object)
onvo.dashboards.get(id:string)
onvo.dashboards.update(id:string, body:object)
onvo.dashboards.delete(id:string)

onvo.dashboard(id:string).updateWidgetCache()
onvo.dashboard(id:string).getWidgetSuggestions()

onvo.dashboard(dashboardId:string).datasources.list()
onvo.dashboard(dashboardId:string).datasources.link(datasourceId:string)
onvo.dashboard(dashboardId:string).datasources.unlink(datasourceId:string)
```

### Datasources

```typescript
onvo.datasources.list()
onvo.datasources.create(body:object)
onvo.datasources.get(id:string)
onvo.datasources.update(id:string, body:object)
onvo.datasources.delete(id:string)

onvo.datasource(id:string).getData()
onvo.datasource(id:string).fetchColumnDescriptions()
```

### Embed Users

```typescript
onvo.embed_users.list()
onvo.embed_users.get(id:string)
onvo.embed_users.upsert(id:string, body:object)
onvo.embed_users.delete(id:string)

onvo.embed_user(id:string).getAccessToken()
```

### Questions

```typescript
onvo.widgets.list(filters: object)
onvo.widgets.create(body:object)
onvo.widgets.delete(id:string)
```

### Sessions

```typescript
onvo.sessions.list(filters: object)
onvo.sessions.delete(id:string)
onvo.sessions.revokeAll(body:object)
onvo.sessions.upsert(body:object)
```

### Teams

```typescript
onvo.teams.list(filters: object)
onvo.teams.get(id:string)
onvo.teams.update(id:string, body:object)
```

### Widgets

```typescript
onvo.widgets.list(filters: object)
onvo.widgets.create(body:object)
onvo.widgets.get(id:string)
onvo.widgets.update(id:string, body:object)
onvo.widgets.delete(id:string)

onvo.widget(id:string).getImage()
```

## Support

For any issues, questions, or feedback, please contact our support team at info@onvo.ai.

## License

This package is distributed under the MIT License.

Thank you for choosing the @onvo-ai/js package to integrate AI-powered dashboards from the Onvo platform into your product! We hope this package enhances your development experience and empowers your applications with advanced analytics capabilities.
