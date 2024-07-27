//@ts-nocheck
import r2wc from "@r2wc/react-to-web-component"
import {Wrapper, Dashboard, DashboardHeader, DashboardGrid, DashboardList} from "@onvo-ai/react"
import React from "react"

const OnvoDashboardList = ({
  token,
  baseUrl,
  id,
}: {
  token: string;
  baseUrl: string;
  id: string;
}) => {
  return (
    <Wrapper token={token} baseUrl={baseUrl}>
      <DashboardList />
    </Wrapper>
  );
};


const OnvoDashboard = ({
  token,
  baseUrl,
  id,
}: {
  token: string;
  baseUrl: string;
  id: string;
}) => {
  return (
    <Wrapper token={token} baseUrl={baseUrl}>
      <Dashboard id={id}>
        <DashboardHeader />
        <DashboardGrid />
      </Dashboard>
    </Wrapper>
  );
};

const OnvoDashboardListComponent = r2wc(OnvoDashboardList, {
  props: { token: 'string', baseUrl: 'string' },
});

const OnvoDashboardComponent = r2wc(OnvoDashboard, {
  props: { token: 'string', baseUrl: 'string', id: 'string' },
});

customElements.define('onvo-dashboard', OnvoDashboardComponent);
customElements.define('onvo-dashboard-list', OnvoDashboardListComponent);
