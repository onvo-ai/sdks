# Onvo AI web components library

This web components package can be used to display the list of dashboards available to a user or single dashboard from Onvo AI. The components are also completely customizable.

## Installation

In your frontend environment, install the @onvo-ai/react package, this lets you display the list of dashboards, individual dashboards, and the copilot component.

```html
<script src="http://cdn.jsdelivr.net/npm/@onvo-ai/web-components"></script>
```

```sh
npm install @onvo-ai/web-components
```

```sh
yarn add @onvo-ai/web-components
```

## Usage

Begin by creating an API key by going to https://dashboard.onvo.ai/settings/api-keys , filling in a name for your API key and clicking Generate.

Next, use this token to setup a backend endpoint that can fetch the user access token from a secure environment.

You can then use this token to render the web components in your frontend environment.

```html
<script src="http://cdn.jsdelivr.net/npm/@onvo-ai/web-components"></script>
<script>
  function clickHandler(dashboard) {
    console.log("Dashboard clicked");
    console.log(dashboard);
  }
</script>

<onvo-dashboard-list
  base-url="https:dashboard.onvo.ai"
  list-variant="list|grid"
  on-click-item="clickHandler"
  num-columns="3"
  user-token="..."
></onvo-dashboard-list>

<onvo-dashboard
  base-url="https:dashboard.onvo.ai"
  user-token="..."
  dashboard-id="31f4f9ec-3881-448a-b3e7-02485290ca9f"
></onvo-dashboard>

<onvo-copilot
  base-url="https:dashboard.onvo.ai"
  user-token="..."
  icon-variant="none|small|large"
  dashboard-id="31f4f9ec-3881-448a-b3e7-02485290ca9f"
  copilot-variant="fullscreen|copilot"
></onvo-copilot>
```

## Library reference

### Dashboard List

The Dashboard list provides a list of all the dashboards an embed user has access to. You can render it as a list or as a grid and you get a callback when a dashboard is clicked.

```html
<script>
  function clickHandler(dashboard) {
    console.log("Dashboard clicked");
    console.log(dashboard);
  }
</script>

<onvo-dashboard-list
  base-url="https://dashboard.onvo.ai"
  list-variant="list|grid"
  on-click-item="clickHandler"
  num-columns="3"
  user-token="..."
></onvo-dashboard-list>
```

### Dashboard

This component is used to show a single dashboard.

```html
<onvo-dashboard
  base-url="https://dashboard.onvo.ai"
  user-token="..."
  dashboard-id="31f4f9ec-3881-448a-b3e7-02485290ca9f"
></onvo-dashboard>
```

### Copilot

This component allows a user to ask questions to the dashboard and create new widgets. You can also programmatically control the opening and closing of the copilot component using the `Onvo.setCopilotOpen()` method

```html
<onvo-copilot
  base-url="https://dashboard.onvo.ai"
  user-token="..."
  icon-variant="none|small|large"
  dashboard-id="31f4f9ec-3881-448a-b3e7-02485290ca9f"
  copilot-variant="fullscreen|copilot"
></onvo-copilot>

<script>
  // Opening the copilot component
  Onvo.setCopilotOpen(true);

  // Closing the copilot component
  Onvo.setCopilotOpen(false);
</script>
```
