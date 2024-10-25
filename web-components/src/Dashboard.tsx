import r2wc from "@r2wc/react-to-web-component";
import { Wrapper, Dashboard } from "@onvo-ai/react";
// @ts-ignore
import css from '!!css-loader?{"sourceMap":false,"exportType":"string"}!./sonner.css';

const OnvoDashboard = ({
  userToken,
  baseUrl,
  dashboardId,
}: {
  userToken: string;
  baseUrl: string;
  dashboardId: string;
}) => {
  return (
    <Wrapper token={userToken} baseUrl={baseUrl}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@onvo-ai/react/dist/styles.css" />
      <style>{css}</style>
      <Dashboard id={dashboardId} />
    </Wrapper>
  );
};
export const DashboardWC = r2wc(OnvoDashboard, {
  shadow: "closed",
  props: {
    userToken: "string",
    baseUrl: "string",
    dashboardId: "string",
  },
});
