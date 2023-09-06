# @onvo-ai/node

The @onvo-ai/node package provides utilities to seamlessly communicate with the Onvo platform, allowing developers to integrate AI-powered dashboards into their products. This README provides an overview of the package's features, installation, and usage instructions.

### Installation

You can install the package using npm:

```bash
npm install @onvo-ai/node
```

OR

```bash
yarn add @onvo-ai/node
```

### Getting Started

To begin using the `@onvo-ai/node` package, you'll need to have an API key from the Onvo platform. Ensure that your API key is stored as an environment variable named `API_KEY`.

### Usage

Here's an example of how to use the package to interact with the Onvo platform:

```javascript
const { Onvo } = require("@onvo-ai/node");

// Initialize the Onvo class with your API key
const onvo = new Onvo("https://dashboard.onvo.ai", process.env.API_KEY);

// Identify a user
await onvo.identifyUser("123456", {
  name: "John Appleseed",
  email: "john@appleseed.com",
  metadata: {
    phone_number: "+1 234 5678",
    organisation_id: "87dfty9872ydq8tg",
  },
});

// Create a session
const sessionUrl = await onvo.createSession({
  dashboardId: "ebc7ab74-3fd2-47e6-90df-addaec3a029e",
  userId: "123456",
  parameters: {
    year: 2023,
    sort: "asc",
  },
});
```

### API Reference

**`Onvo(baseUrl, apiKey)`**
This is the main class that initializes the connection to the Onvo platform.

`baseUrl (string)`: The base URL to the Onvo platform or your self hosted endpoint.
`apiKey (string)`: Your API key for authentication.

---

**`onvo.identifyUser(userId, userData)`**
Identify a user on the Onvo platform.

`userId (string)`: Unique identifier for the user.
`userData (object)`: User data including name, email, and metadata.

---

**`onvo.createSession(sessionData)`**
Create a session on the Onvo platform.

`sessionData (object)`: Session data including dashboardId, userId, and other parameters.

### Support

For any issues, questions, or feedback, please contact our support team at info@onvo.ai.

### License

This package is distributed under the MIT License.

Thank you for choosing the @onvo-ai/node package to integrate AI-powered dashboards from the Onvo platform into your product! We hope this package enhances your development experience and empowers your applications with advanced analytics capabilities.
