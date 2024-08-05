// @ts-nocheck
import r2wc from "@r2wc/react-to-web-component";
import { Wrapper, Dashboard, DashboardList, Copilot } from "@onvo-ai/react";
import React from "react";

const ChatButton: React.FC<{
  onClick: () => void;
  variant: "none" | "small" | "large";
}> = ({ onClick, variant = "large" }) => {
  const buttonStyle = {
    position: "fixed",
    bottom: "1.25rem",
    right: "1.25rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    borderRadius: "9999px",
    cursor: "pointer",
    backgroundColor: "black",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "0.75rem",
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
    alignItems: "center",
  };

  const iconStyle = {
    width: "1.75rem",
    height: "1.75rem",
  };

  const labelStyle = {
    color: "#cbd5e0",
    lineHeight: "1",
    width: "4rem",
  };

  if (variant === "none") {
    return <></>;
  }

  return (
    <div style={buttonStyle} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        style={iconStyle}
      >
        <defs>
          <linearGradient
            id="sparkleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00f260" />
            <stop offset="100%" stopColor="#0575e6" />
          </linearGradient>
        </defs>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="url(#sparkleGradient)"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        />
      </svg>
      {variant === "large" && <p style={labelStyle}>Chat with your data</p>}
    </div>
  );
};

const OnvoDashboardList = ({
  token,
  baseUrl,
  id,
  onClickItem,
  variant = "grid",
  columns,
}: {
  token: string;
  baseUrl: string;
  id: string;
  onClickItem: (dashboard: any) => void;
  columns: number;
  variant: "list" | "grid";
}) => {
  return (
    <Wrapper token={token} baseUrl={baseUrl}>
      <DashboardList
        columns={columns}
        variant={variant}
        onClickItem={onClickItem}
      />
    </Wrapper>
  );
};

customElements.define(
  "onvo-dashboard-list",
  r2wc(OnvoDashboardList, {
    props: {
      token: "string",
      baseUrl: "string",
      onClickItem: "function",
      variant: "string",
      columns: "number",
    },
  })
);

const OnvoDashboard = ({
  token,
  baseUrl,
  dashboardId,
}: {
  token: string;
  baseUrl: string;
  dashboardId: string;
}) => {
  return (
    <Wrapper token={token} baseUrl={baseUrl}>
      <Dashboard id={dashboardId} />
    </Wrapper>
  );
};

customElements.define(
  "onvo-dashboard",
  r2wc(OnvoDashboard, {
    props: { token: "string", baseUrl: "string", dashboardId: "string" },
  })
);

const OnvoCopilot = ({
  token,
  baseUrl,
  dashboardId,
  variant,
  icon,
}: {
  token: string;
  baseUrl: string;
  dashboardId: string;
  variant: "fullscreen" | "copilot";
  icon: "none" | "small" | "large";
}) => {
  return (
    <Wrapper token={token} baseUrl={baseUrl}>
      <Copilot
        dashboardId={dashboardId}
        trigger={<ChatButton variant={icon} />}
        variant={variant}
      />
    </Wrapper>
  );
};

customElements.define(
  "onvo-copilot",
  r2wc(OnvoCopilot, {
    props: {
      token: "string",
      baseUrl: "string",
      dashboardId: "string",
      variant: "string",
      icon: "string",
    },
  })
);
