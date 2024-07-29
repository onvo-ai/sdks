import React, { createContext, useContext, useEffect, useState } from "react";
import Onvo, { Team } from "@onvo-ai/js";
import { Toaster } from "sonner";
import { Subscription, SubscriptionPlan } from "@onvo-ai/js";
import { jwtDecode } from "jwt-decode";

type OnvoWrapperContext = {
  backend: Onvo | undefined;
  subscription: Subscription | undefined;
  subscriptionPlan: SubscriptionPlan | undefined;
  subscriptionLoaded: boolean;
  team: Team | undefined;
};

const Context = createContext<OnvoWrapperContext>({
  backend: undefined,
  subscriptionLoaded: false,
  subscription: undefined,
  subscriptionPlan: undefined,
  team: undefined,
});

export const Wrapper: React.FC<{
  token: string;
  baseUrl?: string;
  children: any;
}> = ({ token, children, baseUrl = "https://dashboard.onvo.ai" }) => {
  const [subscription, setSubscription] = useState<Subscription>();
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>();
  const [subscriptionLoaded, setSubscriptionLoaded] = useState(false);
  const [team, setTeam] = useState<Team>();

  // Initialize Onvo backend with token and base URL
  let backend = new Onvo(token, {
    endpoint: baseUrl,
  });

  const getSubscription = async (teamId: string) => {
    backend.teams.get(teamId).then(setTeam);

    backend
      .team(teamId)
      .getSubscription()
      .then((sub) => {
        let { subscription_plans, ...rest } = sub;

        if (
          new Date(rest.period_end).getTime() + 86400000 >=
          new Date().getTime()
        ) {
          setSubscriptionPlan(subscription_plans);
          setSubscription(rest);
        } else {
          setSubscriptionPlan(undefined);
          setSubscription(undefined);
        }
        setSubscriptionLoaded(true);
      });
  };

  useEffect(() => {
    if (token && token !== "") {
      let decoded = jwtDecode(token) as any;
      getSubscription(
        decoded.app_metadata.team || decoded.app_metadata.parent_team
      );
    }
  }, [token]);

  return (
    <Context.Provider
      value={{
        backend,
        subscription,
        subscriptionPlan,
        subscriptionLoaded,
        team,
      }}
    >
      <Toaster position="bottom-right" richColors />
      {children}
    </Context.Provider>
  );
};

export const useBackend = () => useContext(Context);
