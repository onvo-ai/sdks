import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useBackend } from "../Wrapper";
import {
  Dashboard as DashboardType,
  Subscription,
  SubscriptionPlan,
  Widget,
} from "@onvo-ai/js";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { defaults } from "chart.js";
import { toast } from "sonner";
import { Card } from "../../tremor/Card";
import { Title, Text } from "../../tremor/Text";

type DashboardContext = {
  id: string | undefined;
  dashboard?: DashboardType;
  widgets: Widget[];
  subscription: Subscription | undefined;
  setSubscription: (subscription: Subscription | undefined) => void;
  subscriptionPlan: SubscriptionPlan | undefined;
  setSubscriptionPlan: (subscriptionPlan: SubscriptionPlan | undefined) => void;
  setWidgets: (widgets: Widget[]) => void;
  refreshDashboard: () => Promise<void>;
  refreshWidgets: () => Promise<void>;
  theme: "light" | "dark";
  adminMode?: boolean;
};

const Context = createContext<DashboardContext>({
  id: undefined,
  dashboard: undefined,
  subscription: undefined,
  setSubscription: () => {},
  subscriptionPlan: undefined,
  setSubscriptionPlan: () => {},
  widgets: [],
  setWidgets: () => {},
  refreshDashboard: async () => {},
  refreshWidgets: async () => {},
  theme: "light",
  adminMode: false,
});

const r = document.querySelector(":root") as any;
r.style.setProperty(
  "--font-override",
  "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
);
defaults.font.family =
  "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

export const Dashboard: React.FC<{
  id: string;
  adminMode?: boolean;
  children: any;
  className?: string;
}> = ({ id, children, adminMode, className }) => {
  const backend = useBackend();
  const prefersColorScheme = usePrefersColorScheme();
  const initialized = useRef(false);

  const [dashboard, setDashboard] = useState<DashboardType>();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedWidget, setSelectedWidget] = useState<Widget>();

  const [subscription, setSubscription] = useState<Subscription>();
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>();
  const [subscriptionLoaded, setSubscriptionLoaded] = useState(false);

  const refreshDashboard = async () => {
    if (!backend) return;
    await backend.dashboards.get(id).then((dash) => {
      backend
        .team(dash.team)
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
      setDashboard(dash);
    });
  };

  const refreshWidgets = async () => {
    if (!backend) return;
    await backend.widgets.list({ dashboard: id }).then(setWidgets);
  };

  useEffect(() => {
    if (
      !initialized.current &&
      dashboard &&
      widgets.length > 0 &&
      new Date(dashboard.last_updated_at).getTime() + 300000 <
        new Date().getTime()
    ) {
      initialized.current = true;
      backend
        ?.dashboard(dashboard.id)
        .updateWidgetCache()
        .then((data) => {
          setWidgets(data);
          refreshDashboard();
          toast.success(
            "Your dashboard has been automatically updated in the background"
          );
        });
    }
  }, [dashboard, widgets]);

  useEffect(() => {
    if (id && backend) {
      refreshDashboard();
      refreshWidgets();
    }
  }, [id, backend]);

  useEffect(() => {
    const r = document.documentElement;

    r.style.setProperty(
      "--onvo-font-override",
      "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    );
    defaults.font.family =
      "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    let newTheme: "light" | "dark" =
      prefersColorScheme === "dark" ? "dark" : "light";
    if (dashboard && dashboard.settings) {
      if (dashboard.settings?.theme === "dark") {
        newTheme = "dark";
        document.body.classList.add("onvo-dark");
        defaults.borderColor = "#334155";
      } else if (dashboard.settings?.theme === "light") {
        newTheme = "light";
        document.body.classList.remove("onvo-dark");
        defaults.borderColor = "#cbd5e1";
      } else {
        if (prefersColorScheme === "dark") {
          document.body.classList.add("onvo-dark");
          newTheme = "dark";
          defaults.borderColor = "#334155";
        } else {
          newTheme = "light";
          document.body.classList.remove("onvo-dark");
          defaults.borderColor = "#cbd5e1";
        }
      }

      const settings = dashboard.settings;
      r.style.setProperty("--onvo-background-color", settings.light_background);
      r.style.setProperty(
        "--onvo-dark-background-color",
        settings.dark_background
      );

      r.style.setProperty("--onvo-foreground-color", settings.light_foreground);
      r.style.setProperty(
        "--onvo-dark-foreground-color",
        settings.dark_foreground
      );

      r.style.setProperty(
        "--onvo-dark-font-color",
        settings.dark_text || "#aaaaaa"
      );
      r.style.setProperty(
        "--onvo-font-color",
        settings.light_text || "#666666"
      );

      if (newTheme === "dark") {
        defaults.color = settings.dark_text || "#aaaaaa";
      } else {
        defaults.color = settings.light_text || "#666666";
      }

      if (dashboard.settings.font !== "inter") {
        r.style.setProperty("--onvo-font-override", settings.font);
        defaults.font.family = settings.font;
      }

      setTheme(newTheme);
    }
    return () => {
      r.style.setProperty("--onvo-background-color", "");
      r.style.setProperty("--onvo-foreground-color", "");
      r.style.setProperty("--onvo-font-override", "");

      defaults.font.family =
        "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    };
  }, [dashboard, prefersColorScheme]);

  const style = dashboard?.settings?.custom_css || "";

  let paymentModalOpen =
    subscriptionLoaded && dashboard && subscription === undefined;

  return (
    <Context.Provider
      value={{
        setWidgets,
        id,
        dashboard,
        widgets,
        refreshDashboard,
        refreshWidgets,
        theme,
        adminMode,
        subscription,
        setSubscription,
        subscriptionPlan,
        setSubscriptionPlan,
      }}
    >
      <div
        key={theme === "dark" ? "dark" : "light"}
        className={`onvo-dashboard-context onvo-relative onvo-scrollbar-thumb-rounded-full onvo-scrollbar-track-transparent onvo-translate-x-0 onvo-h-full onvo-background-color onvo-flex onvo-flex-col ${
          theme === "dark"
            ? "onvo-dark onvo-scrollbar-thumb-slate-500"
            : "onvo-scrollbar-thumb-slate-400"
        } ${className}`}
      >
        <style>{style}</style>

        {paymentModalOpen && (
          <div className="onvo-absolute onvo-top-0 onvo-left-0 onvo-right-0 onvo-bottom-0 onvo-bg-black/50 onvo-z-[1000] onvo-backdrop-blur-md onvo-flex onvo-justify-center onvo-items-center">
            <Card className="onvo-max-w-screen-md">
              <Title>Dashboard unavailable</Title>
              <Text>
                The dashboard you are trying to access is currently unavailable.
                If you are the administrator, click{" "}
                <a
                  href="https://dashboard.onvo.ai/settings/billing"
                  className="onvo-text-blue-500 onvo-underline"
                >
                  here
                </a>{" "}
                to update your billing.
              </Text>
            </Card>
          </div>
        )}

        {children}
      </div>
    </Context.Provider>
  );
};
export const useDashboard = () => useContext(Context);
