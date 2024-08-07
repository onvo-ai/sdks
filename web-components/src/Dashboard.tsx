import r2wc from "@r2wc/react-to-web-component";
import { Wrapper, Dashboard } from "@onvo-ai/react";

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
      <Dashboard id={dashboardId} />
    </Wrapper>
  );
};
export const DashboardWC = r2wc(OnvoDashboard, {
  props: {
    userToken: "string",
    baseUrl: "string",
    dashboardId: "string",
  },
});
