import React, { createContext, useContext, useMemo, useState } from "react";
import Backend from "../../backend";

type OnvoWrapperContext = {
  token: string | undefined;
  baseUrl: string;
  dashboard: string | undefined;
  report: string | undefined;
  backend: Backend | undefined;
};

const Context = createContext<OnvoWrapperContext>({
  token: undefined,
  baseUrl: "https://dashboard.onvo.ai",
  dashboard: undefined,
  report: undefined,
  backend: undefined,
});

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const Wrapper: React.FC<{ token: string; baseUrl: string; children: any }> = ({
  token,
  children,
  baseUrl = "https://dashboard.onvo.ai",
}) => {
  let obj = useMemo(() => {
    let dashboard: string | undefined;
    let report: string | undefined;
    let backend: Backend | undefined;

    if (token) {
      let tokenDecoded = parseJwt(token);
      if (tokenDecoded.app_metadata.dashboard) {
        dashboard = tokenDecoded.app_metadata.dashboard;
      }
      if (tokenDecoded.app_metadata.report) {
        report = tokenDecoded.app_metadata.report;
      }
    }
    document.cookie = "embedAuth=" + token;
    return {
      dashboard,
      report,
      backend: new Backend({ baseUrl, token, id: dashboard || "" }),
    };
  }, [token]);

  return (
    <Context.Provider value={{ token, baseUrl, ...obj }}>
      {children}
    </Context.Provider>
  );
};
export default Wrapper;
export const useToken = () => useContext(Context);
