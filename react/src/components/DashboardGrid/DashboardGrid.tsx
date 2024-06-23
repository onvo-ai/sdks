import { useMemo } from "react";
import React from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import ChartCard from "../Chart/ChartCard";
import { useDashboard } from "../Dashboard/Dashboard";
import { useBackend } from "../Wrapper";
import { Text } from "../../tremor/Text";
import { Widget } from "@onvo-ai/js";
import { TextWidgetModal, useTextWidgetModal } from "../Chart/TextWidgetModal";

import { FilterBar } from "../FilterBar";
import EditChartModal from "./EditWidgetModal";
import {
  ImageWidgetModal,
  useImageWidgetModal,
} from "../Chart/ImageWidgetModal";

export const DashboardGrid: React.FC<{}> = ({}) => {
  const { dashboard, widgets, setWidgets, adminMode, refreshWidgets } =
    useDashboard();
  const backend = useBackend();
  const { setOpen: setTextModalOpen } = useTextWidgetModal();
  const { setOpen: setImageModalOpen } = useImageWidgetModal();

  const ResponsiveGridLayout = useMemo(
    () => WidthProvider(Responsive) as any,
    []
  );

  const addDividerWidget = async () => {
    if (!dashboard) return;
    let cache = {
      type: "divider",
      data: { datasets: [{ data: [], label: "" }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          divider: {
            display: true,
          },
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          subtitle: {
            display: false,
          },
        },
      },
    };
    let code = `
    def main():  
        return {
            "type": "divider",
            "data": {"datasets": [{"data": [], "label": ""}]},
            "options": {
                "responsive": True,
                "maintainAspectRatio": False,
                "plugins": {
                    "divider": {
                        "display": True
                    },
                    "title": {
                        "display": False
                    },
                    "subtitle": {
                        "display": False
                    },
                    "legend": {
                        "display": False
                    }
                },
            },
        }
      `;
    await backend?.widgets.create({
      dashboard: dashboard.id,
      layouts: {
        lg: {
          x: 0,
          y: maxHeight,
          w: 12,
          h: 4,
        },
      },
      cache: cache,
      title: "Divider",
      team: dashboard.team,
      code: code,
      messages: [],
      settings: {
        disable_download_images: false,
        disable_download_reports: false,
        title_hidden: true,
      },
    });
    refreshWidgets();
  };

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

  const maxHeight = useMemo(() => {
    let h = 0;
    layouts.lg.forEach((i: any) => {
      if (i.y + i.h > h) h = i.y + i.h;
    });
    return h;
  }, [layouts]);

  const editable = useMemo(() => {
    return adminMode || dashboard?.settings?.can_edit_widget_layout;
  }, [adminMode, dashboard]);

  const spacing = useMemo(() => {
    return dashboard?.settings?.grid_spacing === undefined
      ? 10
      : dashboard?.settings?.grid_spacing;
  }, [dashboard]);

  if (!dashboard || layouts.lg.length === 0)
    return (
      <div
        className={
          "onvo-dashboard-grid-wrapper onvo-overflow-y-auto onvo-flex-grow onvo-pt-2 onvo-font-override onvo-background-color onvo-relative onvo-w-full"
        }
      >
        <TextWidgetModal maxHeight={0} />
      </div>
    );

  return (
    <>
      <EditChartModal />
      <TextWidgetModal maxHeight={maxHeight} />
      <ImageWidgetModal maxHeight={maxHeight} />

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
        {(dashboard?.settings?.can_create_widgets || adminMode) && (
          <div className="onvo-relative onvo-mx-[10px] onvo-mb-[10px] onvo-grid onvo-grid-cols-3 onvo-h-10 onvo-justify-center onvo-items-center onvo-gap-2">
            <div
              onClick={() => setTextModalOpen(true)}
              className="onvo-flex onvo-justify-center onvo-items-center onvo-h-full onvo-flex-grow onvo-transition-opacity onvo-duration-300 onvo-opacity-50 hover:onvo-opacity-100 onvo-cursor-pointer onvo-border-dashed onvo-border-gray-200 dark:onvo-border-gray-700 onvo-border-2 onvo-rounded-lg"
            >
              <Text>+ Add text widget</Text>
            </div>
            <div
              onClick={() => setImageModalOpen(true)}
              className="onvo-flex onvo-justify-center onvo-items-center onvo-h-full onvo-flex-grow onvo-transition-opacity onvo-duration-300 onvo-opacity-50 hover:onvo-opacity-100 onvo-cursor-pointer onvo-border-dashed onvo-border-gray-200 dark:onvo-border-gray-700 onvo-border-2 onvo-rounded-lg"
            >
              <Text>+ Add image widget</Text>
            </div>
            <div
              onClick={() => addDividerWidget()}
              className="onvo-flex onvo-justify-center onvo-items-center onvo-h-full onvo-flex-grow onvo-transition-opacity onvo-duration-300 onvo-opacity-50 hover:onvo-opacity-100 onvo-cursor-pointer onvo-border-dashed onvo-border-gray-200 dark:onvo-border-gray-700 onvo-border-2 onvo-rounded-lg"
            >
              <Text>+ Add divider</Text>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
