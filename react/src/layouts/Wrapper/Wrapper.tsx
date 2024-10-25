import React, { createContext, useContext, useEffect, useState } from "react";
import Onvo, { Account, EmbedUser, Team } from "@onvo-ai/js";
import { Subscription, SubscriptionPlan } from "@onvo-ai/js";
import { jwtDecode } from "jwt-decode";

type OnvoWrapperContext = {
  backend: Onvo | undefined;
  subscription: Subscription | undefined;
  subscriptionPlan: SubscriptionPlan | undefined;
  subscriptionLoaded: boolean;
  team: Team | undefined;
  adminMode: boolean;
  account: Account | undefined;
  embedUser: EmbedUser | undefined
};

const Context = createContext<OnvoWrapperContext>({
  backend: undefined,
  subscriptionLoaded: false,
  subscription: undefined,
  subscriptionPlan: undefined,
  team: undefined,
  adminMode: false,
  account: undefined,
  embedUser: undefined
});

export const Wrapper: React.FC<{
  token: string;
  baseUrl?: string;
  children: any;
  adminMode?: boolean;
}> = ({
  token,
  children,
  baseUrl = "https://dashboard.onvo.ai",
  adminMode,
}): React.ReactNode => {
    const [subscription, setSubscription] = useState<Subscription>();
    const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>();
    const [subscriptionLoaded, setSubscriptionLoaded] = useState(false);
    const [team, setTeam] = useState<Team>();
    const [account, setAccount] = useState<Account>();
    const [embedUser, setEmbedUser] = useState<EmbedUser>();
    const [backend, setBackend] = useState<Onvo | undefined>(undefined);

    useEffect(() => {
      if (!baseUrl || baseUrl.trim() === "") return;
      if (!token || token.trim() === "") return;
      // Initialize Onvo backend with token and base URL
      let back = new Onvo(token, {
        endpoint: baseUrl,
      });
      setBackend(back);

    }, [token, baseUrl, adminMode]);

    const getSubscription = async (teamId: string) => {
      if (!backend) return;

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
      if (token && token !== "" && backend) {
        let decoded = jwtDecode(token) as any;
        if (decoded.app_metadata.team) {
          backend.accounts.get(decoded.sub).then(setAccount);
        } else if (decoded.app_metadata.parent_team) {
          backend.embed_users.get(decoded.sub).then(setEmbedUser);
        }
        getSubscription(
          decoded.app_metadata.team || decoded.app_metadata.parent_team
        );
      }
    }, [token, backend]);

    return (
      <Context.Provider
        value={{
          backend,
          subscription,
          subscriptionPlan,
          subscriptionLoaded,
          team,
          adminMode: adminMode || false,
          account,
          embedUser
        }}
      >
        {children}
      </Context.Provider>
    );
  };

export const useBackend = () => useContext(Context);
