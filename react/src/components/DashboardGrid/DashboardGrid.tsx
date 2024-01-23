"use client";

import { useMemo } from "react";
import React from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import ChartCard from "./ChartCard";
import { useDashboard } from "../Dashboard/Dashboard";
import "./styles.css";

const DashboardGrid: React.FC<{}> = () => {
  const { dashboard, widgets } = useDashboard();

  const ResponsiveGridLayout = useMemo(
    () => WidthProvider(Responsive) as any,
    []
  );

  let children = useMemo(() => {
    return widgets.map((i: any) => (
      <div
        className="hover:z-20"
        key={i.id}
        data-grid={{ x: i.x, y: i.y, w: i.w, h: i.h }}
      >
        <ChartCard
          editable={dashboard.settings?.editable}
          widget={i}
          onUpdate={() => {
            //router.refresh()
          }}
          onRequestEdit={() => {
            // setSelectedWidget(i);
            // setOpen(true);
          }}
        />
      </div>
    ));
  }, [widgets]);

  if (!dashboard) return <></>;

  return (
    <div
      className="font-override background-color relative w-full pb-safe mt-2"
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
        isDraggable={dashboard.settings?.editable}
        isResizable={dashboard.settings?.editable}
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
            // updatedWidgets.forEach((i) => {
            //   updateWidgetById(i.dashboard, i.id, {
            //     x: i.x,
            //     y: i.y,
            //     w: i.w,
            //     h: i.h,
            //   });
            // });
          }
        }}
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  );
};

export default DashboardGrid;
