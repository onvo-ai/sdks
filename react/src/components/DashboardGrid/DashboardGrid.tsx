import { useEffect, useMemo, useRef } from "react";
import React from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import ChartCard from "../Chart/ChartCard";
import { useDashboard } from "../Dashboard/Dashboard";
import { useBackend } from "../Wrapper";
import { defaults } from "chart.js";
import { Widget } from "@onvo-ai/js";
import UpdateChartModal from "./EditWidgetModal";
import CreateSeparatorModal from "../Chart/CreateSeparatorModal";

const r = document.querySelector(":root") as any;
r.style.setProperty(
  "--font-override",
  "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
);
defaults.font.family =
  "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

export const DashboardGrid: React.FC<{ spacing?: number }> = ({
  spacing = 10,
}) => {
  const { dashboard, widgets, theme, refresh } = useDashboard();
  const backend = useBackend();

  const ResponsiveGridLayout = useMemo(
    () => WidthProvider(Responsive) as any,
    []
  );
  const initialized = useRef(false);

  useEffect(() => {
    const r = document.querySelector(":root") as any;

    r.style.setProperty(
      "--font-override",
      "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    );
    defaults.font.family =
      "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

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
    }

    return () => {
      r.style.setProperty("--background-color", "");
      r.style.setProperty("--foreground-color", "");
      r.style.setProperty("--font-override", "");

      defaults.font.family =
        "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    };
  }, [dashboard, theme]);

  useEffect(() => {
    if (
      !initialized.current &&
      dashboard &&
      new Date(dashboard.last_updated_at).getTime() + 60000 <
        new Date().getTime()
    ) {
      initialized.current = true;
      backend
        ?.dashboard(dashboard.id)
        .updateWidgetCache()
        .then((data) => {
          refresh();
        });
    }
  }, [dashboard]);

  let children = useMemo(() => {
    if (!dashboard) return [];
    return widgets.map((i: Widget) => (
      <div
        className="hover:z-10"
        key={i.id}
        data-grid={{ x: i.x, y: i.y, w: i.w, h: i.h }}
      >
        <ChartCard widget={i} />
      </div>
    ));
  }, [widgets, dashboard]);

  const maxHeight = useMemo(() => {
    let h = 0;
    widgets.forEach((i: any) => {
      if (i.y + i.h > h) h = i.y + i.h;
    });
    return h;
  }, [widgets]);

  if (!dashboard) return <></>;
  return (
    <div
      className={
        "onvo-dashboard-grid-wrapper flex-grow font-override background-color relative w-full pb-safe " +
        theme
      }
      id="screenshot-content"
    >
      <UpdateChartModal />
      <ResponsiveGridLayout
        resizeHandle={
          dashboard.settings && dashboard.settings?.editable ? (
            <div className="onvo-dashboard-grid-handle react-resizable-handle absolute bottom-2 right-2 cursor-pointer rounded-br-lg border-b-[3px] border-r-[3px] border-gray-300 dark:border-gray-700" />
          ) : (
            <></>
          )
        }
        draggableHandle=".chart-drag-handle"
        className="onvo-dashboard-grid-layout layout"
        rowHeight={10}
        margin={[spacing, spacing]}
        breakpoints={{ lg: 1280, md: 1024, sm: 768, xs: 640, xxs: 480 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        isDraggable={dashboard.settings && dashboard.settings?.editable}
        isResizable={dashboard.settings && dashboard.settings?.editable}
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
              backend?.widgets.update(i.id, {
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
        {dashboard.settings && dashboard.settings?.editable && (
          <div
            key="create-separator"
            data-grid={{
              x: 0,
              y: maxHeight + 1,
              w: 12,
              h: 2,
              isDraggable: false,
              isResizable: false,
            }}
          >
            <CreateSeparatorModal maxHeight={maxHeight} />
          </div>
        )}
      </ResponsiveGridLayout>
    </div>
  );
};
