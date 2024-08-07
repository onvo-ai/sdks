# Onvo AI web components library

This web components package can be used to display the list of dashboards available to a user or single dashboard from Onvo AI. The components are also completely customizable.

## Installation

You can install this UI library using npm or yarn:

```bash
npm install @onvo-ai/web-components
```

```bash
yarn add @onvo-ai/web-components
```

You can also include it as a script tag in your html web pages

```html
<script src="http://cdn.jsdelivr.net/npm/@onvo-ai/web-components"></script>
```

You can also load a specific version of the SDK

```html
<script src="http://cdn.jsdelivr.net/npm/@onvo-ai/web-components@0.0.16"></script>
```

## Usage

To use this demo UI library in your project, import the components you need from the library and use them in your React components.

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

## Copilot component

You can also programmatically control the opening and closing of the copilot component using the `Onvo.setCopilotOpen()` method

```javascript
// Opening the copilot component
Onvo.setCopilotOpen(true);

// Closing the copilot component
Onvo.setCopilotOpen(false);
```

## Contributing

You can fork the repository and make a pull request with your changes. Make sure to also update the docs with any relevant changes you have made.

### Steps

- Fork the repository.
- Clone the repository to your local machine.
- Install the dependencies using `npm install`.
- View the components in the browser using `npm run storybook`.
- Make your changes.
- Test the changes using `npm test`.
- Build the library using `npm run build`.
- Commit the changes and push them to your forked repository.
- Publish the package on [npm](https://www.npmjs.com/).
- Install and use the package in your project.
