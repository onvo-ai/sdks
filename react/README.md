# Onvo AI react library

This react package can be used to display the list of dashboards available to a user or single dashboard from Onvo AI. The components are also completely customizable.

## Installation

You can install this demo UI library using npm:

```
npm install @onvo-ai/react
```

## Usage

To use this demo UI library in your project, import the components you need from the library and use them in your React components.

```jsx
import { Wrapper, DashboardList } from "@onvo-ai/react";
const baseUrl = "https://dashboard.onvo.ai";

const ListPage = () => {
  const [accessToken, setAccessToken] = useState("");
  const userId = "123456";

  useEffect(() => {
    fetch("/api/get-token/" + userId)
      .then((data) => data.json())
      .then((data) => {
        setAccessToken(data.token);
      });
  }, []);

  return (
    <Wrapper baseUrl={baseUrl} token={accessToken}>
      <DashboardList />
    </Wrapper>
  );
};

const DashboardPage = (id) => {
  const [accessToken, setAccessToken] = useState("");
  const userId = "123456";

  useEffect(() => {
    fetch("/api/get-token/" + userId)
      .then((data) => data.json())
      .then((data) => {
        setAccessToken(data.token);
      });
  }, []);

  return (
    <Wrapper baseUrl={baseUrl} token={accessToken}>
      <Dashboard id={id}>
        <DashboardHeader />
        <DashboardGrid />
      </Dashboard>
    </Wrapper>
  );
};
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
