import { useMemo } from "react";
import React from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import ChartCard from "../Chart/ChartCard";
import { useDashboard } from "../Dashboard/Dashboard";
import { useBackend } from "../Wrapper";
import { Widget } from "@onvo-ai/js";
import CreateSeparatorModal from "../Chart/CreateSeparatorModal";

import FilterBar from "./FilterBar";
import EditChartModal from "./EditWidgetModal";

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
    return (widgets || []).map((i: Widget) => (
      <div className="z-0 hover:z-[1]" key={i.id}>
        <ChartCard widget={i} />
      </div>
    ));
  }, [widgets, dashboard]);

  let layouts = useMemo(() => {
    if (widgets.length === 0) return { lg: [] };
    return {
      lg: widgets.map((i: Widget) => {
        let layouts = i.layouts as any;
        return {
          i: i.id,
          x: layouts.lg?.x,
          y: layouts.lg?.y,
          w: layouts.lg?.w,
          h: layouts.lg?.h,
        };
      }),
      sm: widgets.map((i: Widget) => {
        let layouts = i.layouts as any;
        return {
          i: i.id,
          x: layouts.sm?.x || layouts.lg?.x,
          y: layouts.sm?.y || layouts.lg?.y,
          w: layouts.sm?.w || layouts.lg?.w,
          h: layouts.sm?.h || layouts.lg?.h,
        };
      }),
    };
  }, [widgets, dashboard]);

  const maxHeight = useMemo(() => {
    let h = 0;
    layouts.lg.forEach((i: any) => {
      if (i.y + i.h > h) h = i.y + i.h;
    });
    return h;
  }, [layouts]);

  if (!dashboard || layouts.lg.length === 0)
    return (
      <div
        className={
          "onvo-dashboard-grid-wrapper overflow-y-auto flex-grow font-override background-color relative w-full"
        }
      ></div>
    );

  const editable = adminMode || dashboard?.settings?.can_edit_widget_layout;

  return (
    <div
      className={
        "onvo-dashboard-grid-wrapper overflow-y-auto flex-grow font-override background-color w-full"
      }
    >
      <EditChartModal />
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
        breakpoints={{ lg: 768, sm: 480 }}
        cols={{ lg: 12, sm: 3 }}
        isDraggable={editable}
        isResizable={editable}
        layouts={layouts}
        onLayoutChange={(layout: any, allLayouts: any) => {
          if (!dashboard || !editable) return;

          let newWidgets = widgets.map((i: any) => {
            let lgLayout = { ...allLayouts.lg.find((j: any) => j.i === i.id) };
            let smLayout = { ...allLayouts.sm.find((j: any) => j.i === i.id) };

            return {
              ...i,
              layouts: {
                lg: {
                  ...i.layouts.lg,
                  ...{
                    h: lgLayout.h,
                    w: lgLayout.w,
                    x: lgLayout.x,
                    y: lgLayout.y,
                  },
                },
                sm: {
                  ...i.layouts.sm,
                  ...{
                    h: smLayout.h,
                    w: smLayout.w,
                    x: smLayout.x,
                    y: smLayout.y,
                  },
                },
              },
            };
          });

          // UPDATE ONLY THE WIDGETS THAT CHANGED
          let updatedWidgets = newWidgets.filter((widget) => {
            let oldWidget = widgets.find((i: any) => i.id === widget.id);
            if (!oldWidget) return true;
            return (
              JSON.stringify(oldWidget.layouts) !==
              JSON.stringify(widget.layouts)
            );
          });

          if (dashboard && editable && updatedWidgets.length > 0) {
            setWidgets(newWidgets);
            updatedWidgets.forEach((i) => {
              backend?.widgets.update(i.id, {
                layouts: i.layouts,
              });
            });
          }
        }}
      >
        {children}
        <CreateSeparatorModal maxHeight={maxHeight} />
      </ResponsiveGridLayout>
    </div>
  );
};
