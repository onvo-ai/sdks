import r2wc from "@r2wc/react-to-web-component";
import { Wrapper, DashboardList } from "@onvo-ai/react";

const OnvoDashboardList = ({
  userToken,
  baseUrl,
  onClickItem,
  listVariant = "grid",
  numColumns,
}: {
  userToken: string;
  baseUrl: string;
  onClickItem: (dashboard: any) => void;
  numColumns: number;
  listVariant: "list" | "grid";
}) => {
  return (
    <Wrapper token={userToken} baseUrl={baseUrl}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@onvo-ai/react/dist/styles.css" />
      <DashboardList
        columns={numColumns}
        variant={listVariant}
        onClickItem={onClickItem}
      />
    </Wrapper>
  );
};

export const DashboardListWC = r2wc(OnvoDashboardList, {
  shadow: "closed",
  props: {
    userToken: "string",
    baseUrl: "string",
    onClickItem: "function",
    listVariant: "string",
    numColumns: "number",
  },
});