import { useMemo } from "react";
import React from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import ChartCard from "../Chart/ChartCard";
import { useDashboard } from "../Dashboard/Dashboard";
import { useBackend } from "../Wrapper";
import { Widget } from "@onvo-ai/js";
import UpdateChartModal from "./EditWidgetModal";
import CreateSeparatorModal from "../Chart/CreateSeparatorModal";

import FilterBar from "./FilterBar";

export const DashboardGrid: React.FC<{ spacing?: number }> = ({
  spacing = 10,
}) => {
  const { dashboard, widgets, setWidgets, adminMode } = useDashboard();
  const backend = useBackend();

  const ResponsiveGridLayout = useMemo(
    () => WidthProvider(Responsive) as any,
    []
  );

  let children = useMemo(() => {
    if (!dashboard) return [];
    return widgets.map((i: Widget) => (
      <div
        className="z-0 hover:z-[1]"
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

  const editable = adminMode || dashboard?.settings?.can_edit_widget_layout;
  return (
    <div
      className={
        "onvo-dashboard-grid-wrapper flex-grow font-override background-color relative w-full pb-safe"
      }
      id="screenshot-content"
    >
      <UpdateChartModal />
      <FilterBar />
      <ResponsiveGridLayout
        resizeHandle={
          editable ? (
            <div className="onvo-dashboard-grid-handle react-resizable-handle absolute bottom-2 right-2 cursor-pointer rounded-br-lg border-b-[3px] border-r-[3px] border-gray-300 dark:border-gray-700" />
          ) : (
            <></>
          )
        }
        draggableHandle=".chart-drag-handle"
        className="onvo-dashboard-grid-layout layout"
        rowHeight={10}
        margin={[spacing, spacing]}
        breakpoints={{ lg: 1280, md: 768, sm: 480 }}
        cols={{ lg: 12, md: 12, sm: 3 }}
        isDraggable={editable}
        isResizable={editable}
        onLayoutChange={(layout: any, allLayouts: any) => {
          let keys = Object.keys(allLayouts);
          if (keys.length > 1 || keys[0] !== "lg") return;
          if (!dashboard || !editable) return;
          let newWidgets = widgets.map((i: any) => {
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

          // UPDATE ONLY THE WIDGETS THAT CHANGED
          let updatedWidgets = newWidgets.filter((widget) => {
            let oldWidget = widgets.find((i: any) => i.id === widget.id);
            if (!oldWidget) return true;
            return (
              oldWidget.x !== widget.x ||
              oldWidget.y !== widget.y ||
              oldWidget.w !== widget.w ||
              oldWidget.h !== widget.h
            );
          });

          if (dashboard && editable && updatedWidgets.length > 0) {
            setWidgets(newWidgets);
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
        {editable && (
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
