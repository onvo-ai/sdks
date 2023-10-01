"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import "./styles.css";

type OnvoWrapperContext = {
  token: string | undefined;
  dashboard: string | undefined;
  report: string | undefined;
};

const Context = createContext<OnvoWrapperContext>({
  token: undefined,
  dashboard: undefined,
  report: undefined,
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

const OnvoWrapper: React.FC<{ token: string; children: any }> = ({
  token,
  children,
}) => {
  let obj = useMemo(() => {
    let dashboard: string | undefined;
    let report: string | undefined;
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
    };
  }, [token]);

  return (
    <Context.Provider value={{ token, ...obj }}>{children}</Context.Provider>
  );
};
export default OnvoWrapper;
export const useToken = () => useContext(Context);
