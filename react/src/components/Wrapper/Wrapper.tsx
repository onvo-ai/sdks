import React, { createContext, useContext } from "react";
import Onvo from "@onvo-ai/js";
import { Toaster } from "sonner";

type OnvoWrapperContext = {
  backend: Onvo | undefined;
};

const Context = createContext<OnvoWrapperContext>({
  backend: undefined,
});

export const Wrapper: React.FC<{
  token: string;
  baseUrl?: string;
  children: any;
}> = ({ token, children, baseUrl = "https://dashboard.onvo.ai" }) => {
  // Initialize Onvo backend with token and base URL
  let backend = new Onvo(token, {
    endpoint: baseUrl,
  });

  return (
    <Context.Provider value={{ backend }}>
      <Toaster position="bottom-right" richColors />
      {children}
    </Context.Provider>
  );
};
export const useBackend = () => useContext(Context).backend;
