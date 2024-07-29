import { useMemo } from "react";
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import { Widget } from "@onvo-ai/js";
import ChartCard from "../Chart/ChartCard";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { useBackend } from "../../layouts/Wrapper";
import { TextWidgetModal } from "../TextWidgetModal";

import { FilterBar } from "../FilterBar";
import { EditWidgetModal } from "../EditWidgetModal";
import { ImageWidgetModal } from "../ImageWidgetModal";

export const DashboardGrid: React.FC<{}> = ({}) => {
  const { dashboard, widgets, setWidgets, adminMode } = useDashboard();
  const { backend } = useBackend();

  const ResponsiveGridLayout = useMemo(
    () => WidthProvider(Responsive) as any,
    []
  );

  let [layouts, children] = useMemo(() => {
    return [
      widgets.length === 0
        ? { lg: [] }
        : {
            lg: widgets.map((i: Widget) => {
              let layouts = i.layouts;
              return {
                i: i.id,
                x: layouts.lg.x,
                y: layouts.lg.y,
                w: layouts.lg.w,
                h: layouts.lg.h,
                minH: 4,
              };
            }),
            sm: widgets.map((i: Widget) => {
              let layouts = i.layouts;
              return {
                i: i.id,
                x: layouts.sm?.x || layouts.lg.x,
                y: layouts.sm?.y || layouts.lg.y,
                w: layouts.sm?.w || layouts.lg.w,
                h: layouts.sm?.h || layouts.lg.h,
                minH: 4,
              };
            }),
          },
      (widgets || []).map((i: Widget) => (
        <div className="z-0 hover:z-[1]" key={i.id}>
          <ChartCard widget={i} />
        </div>
      )),
    ];
  }, [widgets, dashboard]);

  const editable = useMemo(() => {
    return adminMode || dashboard?.settings?.can_edit_widget_layout;
  }, [adminMode, dashboard]);

  const spacing = useMemo(() => {
    return dashboard?.settings?.grid_spacing === undefined
      ? 10
      : dashboard?.settings?.grid_spacing;
  }, [dashboard]);

  if (!dashboard)
    return (
      <div
        className={
          "onvo-dashboard-grid-wrapper onvo-overflow-y-auto onvo-flex-grow onvo-pt-2 onvo-font-override onvo-background-color onvo-relative onvo-w-full"
        }
      ></div>
    );

  if (
    layouts.lg.length === 0 &&
    (dashboard?.settings?.can_create_widgets || adminMode)
  ) {
    return (
      <>
        <TextWidgetModal />
        <ImageWidgetModal />
      </>
    );
  }
  return (
    <>
      <EditWidgetModal />
      <TextWidgetModal />
      <ImageWidgetModal />

      <div
        className={
          "onvo-dashboard-grid-wrapper onvo-overflow-y-auto onvo-scrollbar-thin onvo-flex-grow onvo-font-override onvo-background-color onvo-w-full"
        }
      >
        <FilterBar />
        <ResponsiveGridLayout
          resizeHandle={
            editable ? (
              <div className="onvo-dashboard-grid-handle react-resizable-handle onvo-absolute onvo-bottom-2 onvo-right-2 onvo-cursor-pointer onvo-rounded-br-lg onvo-border-b-[3px] onvo-border-r-[3px] onvo-border-gray-300 dark:onvo-border-white/30" />
            ) : (
              <></>
            )
          }
          draggableHandle=".onvo-chart-card-drag-handle"
          className="onvo-dashboard-grid-layout onvo-layout"
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
              let lgLayout = {
                ...allLayouts.lg.find((j: any) => j.i === i.id),
              };
              let smLayout = {
                ...allLayouts.sm.find((j: any) => j.i === i.id),
              };

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
        </ResponsiveGridLayout>
      </div>
    </>
  );
};
