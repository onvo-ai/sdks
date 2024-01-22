import React, { createContext, useContext, useMemo, useState } from "react";
import Backend from "../../backend";

type OnvoWrapperContext = {
  token: string | undefined;
  baseUrl: string;
  backend: Backend | undefined;
};

const Context = createContext<OnvoWrapperContext>({
  token: undefined,
  baseUrl: "https://dashboard.onvo.ai",
  backend: undefined,
});

const Wrapper: React.FC<{ token: string; baseUrl: string; children: any }> = ({
  token,
  children,
  baseUrl = "https://dashboard.onvo.ai",
}) => {
  let backend = new Backend({ baseUrl, token });

  return (
    <Context.Provider value={{ token, baseUrl, backend }}>
      {children}
    </Context.Provider>
  );
};
export default Wrapper;
export const useToken = () => useContext(Context);
