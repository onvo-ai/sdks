# @onvo-ai/react

> The react SDK for the Onvo AI dashboard builder

[![NPM](https://img.shields.io/npm/v/@onvo-ai/react.svg)](https://www.npmjs.com/package/@onvo-ai/react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Sample usage

```JSX
import {OnvoWrapper, Dashboard, DashboardHeaderSection, QuestionSection, WidgetGridSection} from '@onvo-ai/react';
import {useState, useEffect} from 'react';

export default function App() {
  const [sessionToken, setSessionToken] = useState("");
  useEffect(() => {
    // Call database to get session token for user
    fetch('/api/onvo-token').then(response => response.json()).then(data => {
      setSessionToken(data.token);
    })
  }, []);

  if(sessionToken === ""){
    return <p>Loading...</p>;
  }

  return (
  <OnvoWrapper sessionToken={sessionToken}>
    <Dashboard>
      <DashboardHeaderSection />
      <QuestionSection />
      <WidgetGridSection />
      </Dashboard>
  </OnvoWrapper>);
}
```

## Install

```bash
npm install --save @onvo-ai/react
```

## Usage

```tsx
import React, { Component } from 'react'

import MyComponent from '@onvo-ai/react'
import '@onvo-ai/react/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [ronneldavis](https://github.com/ronneldavis)
