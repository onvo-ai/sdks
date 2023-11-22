"use client";

import ChartCard from "./ChartCard";
import { Responsive, WidthProvider } from "react-grid-layout";
import "chart.js/auto";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import NewChartModal from "./NewChartModal";
import { updateWidgetById, updateWidgetCache } from "@endpoints";
import { Dashboard, DecryptedWidget } from "@types";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import React, { useEffect } from "react";
import { defaults } from "chart.js";

const GridLayout: React.FC<{
  embed?: boolean;
  dashboard: Dashboard;
  widgets: DecryptedWidget[];
}> = ({ dashboard, embed, widgets }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const editing = useDashboard((state) => state.editing);
  const { theme, setTheme } = useColorScheme();

  const [open, setOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<DecryptedWidget>();

  useEffect(() => {
    const r = document.querySelector(":root") as any;
    if (r && dashboard && dashboard.settings) {
      const settings = dashboard.settings;
      r.style.setProperty(
        "--background-color",
        theme === "dark" ? settings.dark_background : settings.light_background
      );
      r.style.setProperty(
        "--foreground-color",
        theme === "dark" ? settings.dark_foreground : settings.light_foreground
      );

      if (dashboard.settings.font !== "inter") {
        r.style.setProperty("--font-override", settings.font);
        defaults.font.family = settings.font;
      }
      setTheme(dashboard?.settings?.theme || "auto");
    }

    return () => {
      r.style.setProperty("--background-color", "");
      r.style.setProperty("--foreground-color", "");
      r.style.setProperty("--font-override", "");
      defaults.font.family = undefined;
      setTheme("auto");
    };
  }, [dashboard, theme]);

  useEffect(() => {
    if (
      dashboard &&
      new Date(dashboard.last_updated_at).getTime() + 60000 <
        new Date().getTime()
    ) {
      updateWidgetCache(dashboard.id).then((data) => {
        router.refresh();
      });
    }
  }, [dashboard]);

  let children = useMemo(() => {
    return widgets.map((i: any) => (
      <div
        className="hover:z-20"
        key={i.id}
        data-grid={{ x: i.x, y: i.y, w: i.w, h: i.h }}
      >
        <ChartCard
          editable={!embed || (embed && dashboard.settings?.editable)}
          widget={i}
          onUpdate={() => router.refresh()}
          onRequestEdit={() => {
            setSelectedWidget(i);
            setOpen(true);
          }}
        />
      </div>
    ));
  }, [widgets]);

  const ResponsiveGridLayout = useMemo(
    () => WidthProvider(Responsive) as any,
    []
  );

  return (
    <div
      ref={ref}
      className="font-override background-color relative w-full pb-safe mt-2 bg-gray-50 dark:bg-gray-950"
      id="screenshot-content"
    >
      <ResponsiveGridLayout
        resizeHandle={
          <div className="react-resizable-handle absolute bottom-2 right-2 cursor-pointer rounded-br-lg border-b-[3px] border-r-[3px] border-gray-300 dark:border-gray-700" />
        }
        className="layout"
        rowHeight={120}
        breakpoints={{ lg: 1280, md: 1024, sm: 768, xs: 640, xxs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        isDraggable={!embed || editing}
        isResizable={!embed || editing}
        onLayoutChange={(layout: any) => {
          let updatedWidgets = widgets.map((i: any) => {
            let item = layout.find((j: any) => j.i === i.id);
            if (!item) return i;
            return {
              ...i,
              x: item.x,
              y: item.y,
              w: item.w,
              h: item.h,
            };
          });
          if (dashboard && dashboard.settings && dashboard.settings.editable) {
            updatedWidgets.forEach((i) => {
              updateWidgetById(i.dashboard, i.id, {
                x: i.x,
                y: i.y,
                w: i.w,
                h: i.h,
              });
            });
          }
        }}
      >
        {children}
      </ResponsiveGridLayout>

      {(!embed || (embed && dashboard.settings?.editable)) && (
        <NewChartModal
          dashboardId={dashboard.id}
          open={selectedWidget && open}
          onClose={() => {
            setOpen(false);
            setSelectedWidget(undefined);
          }}
          existingWidget={selectedWidget}
        />
      )}
    </div>
  );
};

export default GridLayout;
