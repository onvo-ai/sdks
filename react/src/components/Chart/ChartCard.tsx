import React, { useMemo, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";
import { Widget } from "@onvo-ai/js";
import {
  DocumentChartBarIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import ChartBase from "./ChartBase";
import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { useBackend } from "../../layouts/Wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIconWrapper,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../tremor/DropdownMenu";
import { useTextWidgetModal } from "../TextWidgetModal";
import { useImageWidgetModal } from "../ImageWidgetModal";
import { useEditWidgetModal } from "../EditWidgetModal";

const DragHandle = () => {
  return (
    <div className="onvo-absolute -onvo-top-6 onvo-w-10 onvo-h-6 onvo-z-10 onvo-hidden group-hover/chartcard:onvo-flex  onvo-left-[50%] -onvo-ml-5 onvo-justify-center onvo-items-center onvo-foreground-color onvo-border onvo-border-b-0 onvo-border-black/10 dark:onvo-border-white/10 onvo-rounded-t-md">
      <div className="onvo-chart-card-drag-handle  onvo-absolute onvo-grid-cols-4 onvo-py-1 onvo-cursor-move onvo-grid onvo-px-1 onvo-items-center onvo-justify-center onvo-h-6 onvo-w-10">
        <div className="onvo-h-[3px] onvo-w-[3px] onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
        <div className="onvo-h-[3px] onvo-w-[3px] onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
        <div className="onvo-h-[3px] onvo-w-[3px] onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
        <div className="onvo-h-[3px] onvo-w-[3px] onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
        <div className="onvo-h-[3px] onvo-w-[3px] onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
        <div className="onvo-h-[3px] onvo-w-[3px] onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
        <div className="onvo-h-[3px] onvo-w-[3px] onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
        <div className="onvo-h-[3px] onvo-w-[3px] onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
      </div>
    </div>
  );
};

const ChartCard: React.FC<{
  widget: Widget;
  className?: string;
  hideOptions?: boolean;
  footer?: React.ReactNode;
}> = ({ widget, className, footer, hideOptions }) => {
  const { dashboard, refreshWidgets, widgets } = useDashboard();
  const { setOpen: setEditModalOpen } = useEditWidgetModal();
  const { setOpen: setTextModalOpen } = useTextWidgetModal();
  const { setOpen: setImageModalOpen } = useImageWidgetModal();
  const { backend, adminMode } = useBackend();

  const duplicate = async () => {
    let newObj: any = { ...widget };
    delete newObj.id;

    let limit = dashboard?.settings?.widget_limit || 100;
    if (widgets.length >= limit) {
      return toast.error(
        `You can only have ${limit} widgets in your dashboard. Please delete some of your widgets first or contact the administrator.`
      );
    }

    if (!backend) return;
    toast.promise(
      () => {
        return backend.widgets.create(newObj) as Promise<any>;
      },
      {
        loading: "Duplicating widget...",
        success: () => {
          refreshWidgets(backend);
          return "Widget duplicated";
        },
        error: (error) => "Error duplicating widget: " + error.message,
      }
    );
  };

  const deleteWidget = async () => {
    if (!backend) return;
    toast.promise(
      () => {
        return backend.widgets.delete(widget.id) as Promise<any>;
      },
      {
        loading: "Deleting widget...",
        success: () => {
          refreshWidgets(backend);
          return "Widget deleted";
        },
        error: (error) => "Error deleting widget: " + error.message,
      }
    );
  };

  const exportWidget = (format: "svg" | "png" | "csv" | "xlsx" | "jpeg") => {
    if (!backend) return;
    toast.promise(
      () => {
        return backend.widget(widget.id).export(format);
      },
      {
        loading: `Exporting widget as ${format}...`,
        success: (blob) => {
          let blobUrl = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.download = widget.title + "." + format;
          a.href = blobUrl;
          document.body.appendChild(a);
          a.click();
          a.remove();
          return "Widget exported";
        },
        error: (error) => "Error exporting widget: " + error.message,
      }
    );
  };

  let output = useMemo(() => {
    if (widget && widget.cache) {
      return widget.cache;
    } else {
      return undefined;
    }
  }, [widget]);

  const layout_editable =
    adminMode || dashboard?.settings?.can_edit_widget_layout;
  const widget_editable = adminMode || dashboard?.settings?.can_edit_widgets;
  const addable = adminMode || dashboard?.settings?.can_create_widgets;
  const deletable = adminMode || dashboard?.settings?.can_delete_widgets;

  const ImageDownloadEnabled = useMemo(() => {
    const isTable =
      widget && widget.cache && (widget.cache || {}).type === "table";
    if (isTable) return false;
    if (adminMode) return true;
    if (dashboard?.settings && dashboard.settings.disable_download_images)
      return false;
    if (widget.settings && widget.settings.disable_download_images)
      return false;
    return true;
  }, [dashboard, widget, adminMode]);

  const ReportDownloadEnabled = useMemo(() => {
    if (adminMode) return true;
    if (dashboard?.settings && dashboard.settings.disable_download_reports)
      return false;
    if (widget.settings && widget.settings.disable_download_reports)
      return false;
    return true;
  }, [dashboard, widget, adminMode]);

  if (output.type === "divider") {
    return (
      <div
        className={
          "onvo-group/chartcard onvo-relative onvo-h-full onvo-w-full onvo-py-0 !onvo-bg-transparent !onvo-border-0 !onvo-ring-0 !onvo-shadow-none onvo-px-0 " +
          (className || "")
        }
      >
        {layout_editable && !hideOptions && <DragHandle />}
        {deletable && !hideOptions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Icon
                className="onvo-z-20 onvo-cursor-pointer onvo-font-override onvo-absolute onvo-top-1 onvo-right-1"
                icon={EllipsisVerticalIcon}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="onvo-min-w-56">
              {deletable && (
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={deleteWidget}>
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                      <TrashIcon className="onvo-size-4 onvo-text-red-500" />
                      <span className="onvo-text-red-500">Delete widget</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ChartBase json={output} id={widget.id} title="" />
        {footer}
      </div>
    );
  }
  if (output.type === "text") {
    let sub = output.options.plugins.subtitle.text || "";
    if (typeof sub !== "string") {
      sub = sub.join("<br />");
    }
    return (
      <div
        className={
          "onvo-group/chartcard onvo-relative onvo-h-full onvo-w-full onvo-py-0 !onvo-bg-transparent !onvo-border-0 !onvo-ring-0 !onvo-shadow-none onvo-px-0 " +
          (className || "")
        }
      >
        {layout_editable && !hideOptions && <DragHandle />}
        {(widget_editable || deletable) && !hideOptions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Icon
                className="onvo-z-20 onvo-cursor-pointer onvo-font-override onvo-absolute onvo-top-1 onvo-right-1"
                icon={EllipsisVerticalIcon}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="onvo-min-w-56">
              {widget_editable && (
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      setTimeout(() => {
                        setTextModalOpen(true, {
                          id: widget.id,
                          title: widget.title,
                          subtitle: sub,
                          prompt: output.options.plugins.text.prompt,
                          titleAlignment:
                            output.options.plugins?.title?.align || "start",
                          descriptionAlignment:
                            output.options.plugins?.subtitle?.align || "start",
                        });
                      }, 30);
                    }}
                  >
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                      <PencilSquareIcon className="onvo-size-4" />
                      <span>Edit widget</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
              {widget_editable && deletable && <DropdownMenuSeparator />}
              {deletable && (
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={deleteWidget}>
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                      <TrashIcon className="onvo-size-4 onvo-text-red-500" />
                      <span className="onvo-text-red-500">Delete widget</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ChartBase json={output} id={widget.id} title={widget.title} />
        {footer}
      </div>
    );
  }

  if (output.type === "image") {
    return (
      <div
        className={
          "onvo-group/chartcard onvo-rounded-md onvo-relative onvo-h-full onvo-w-full onvo-py-0 !onvo-bg-transparent !onvo-border-0 !onvo-ring-0 !onvo-shadow-none onvo-px-0 " +
          (className || "")
        }
      >
        {layout_editable && !hideOptions && <DragHandle />}
        {(widget_editable || deletable) && !hideOptions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Icon
                className="onvo-z-20 onvo-cursor-pointer onvo-font-override onvo-absolute onvo-top-1 onvo-right-1"
                icon={EllipsisVerticalIcon}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="onvo-min-w-56">
              {widget_editable && (
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      setTimeout(() => {
                        setImageModalOpen(true, {
                          id: widget.id,
                          url: output.options.plugins?.image?.url || "",
                          imageFill:
                            output.options.plugins?.image?.fill || "fill",
                        });
                      }, 30);
                    }}
                  >
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                      <PencilSquareIcon className="onvo-size-4" />
                      <span>Edit widget</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
              {widget_editable && deletable && <DropdownMenuSeparator />}
              {deletable && (
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={deleteWidget}>
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                      <TrashIcon className="onvo-size-4 onvo-text-red-500" />
                      <span className="onvo-text-red-500">Delete widget</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ChartBase json={output} id={widget.id} title={""} />
        {footer}
      </div>
    );
  }

  return (
    <Card
      key={widget.id}
      id={widget.settings?.css_id}
      className={
        "onvo-chart-card onvo-h-full onvo-group/chartcard onvo-foreground-color onvo-relative -onvo-z-[1] onvo-flex onvo-flex-col onvo-px-0 onvo-py-0 " +
        (className || "") +
        " " +
        (widget.settings?.css_classnames ? widget.settings?.css_classnames : "")
      }
    >
      {layout_editable && !hideOptions && <DragHandle />}

      {(addable ||
        deletable ||
        widget_editable ||
        ImageDownloadEnabled ||
        ReportDownloadEnabled) &&
        !hideOptions && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Icon
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onMouseUp={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className="onvo-z-20 onvo-cursor-pointer onvo-absolute onvo-top-1 onvo-right-1"
                icon={EllipsisVerticalIcon}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="onvo-min-w-56">
              {(addable || widget_editable) && (
                <>
                  <DropdownMenuLabel>Edit widget</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {widget_editable && (
                      <DropdownMenuItem
                        onClick={() => {
                          console.log("Editing widget");
                          setEditModalOpen(true, widget);
                        }}
                      >
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <PencilSquareIcon className="onvo-size-4" />
                          <span>Edit widget</span>
                        </span>
                      </DropdownMenuItem>
                    )}
                    {addable && (
                      <DropdownMenuItem onClick={duplicate}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <DropdownMenuIconWrapper>
                            <DocumentDuplicateIcon className="onvo-size-4 onvo-text-inherit" />
                          </DropdownMenuIconWrapper>
                          <span>Duplicate widget</span>
                        </span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                </>
              )}

              {(addable || widget_editable) && ReportDownloadEnabled && (
                <DropdownMenuSeparator />
              )}
              {ReportDownloadEnabled && (
                <>
                  <DropdownMenuLabel>Download reports</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => exportWidget("xlsx")}>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <DocumentChartBarIcon className="onvo-size-4" />
                        <span>Download as excel</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportWidget("csv")}>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <DropdownMenuIconWrapper>
                          <DocumentChartBarIcon className="onvo-size-4 onvo-text-inherit" />
                        </DropdownMenuIconWrapper>
                        <span>Download as CSV</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
              {(addable || widget_editable || ReportDownloadEnabled) &&
                ImageDownloadEnabled && <DropdownMenuSeparator />}
              {ImageDownloadEnabled && (
                <>
                  <DropdownMenuLabel>Download images</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => exportWidget("svg")}>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <PhotoIcon className="onvo-size-4 onvo-" />
                        <span>Download as SVG</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportWidget("png")}>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <DropdownMenuIconWrapper>
                          <PhotoIcon className="onvo-size-4 onvo-text-inherit" />
                        </DropdownMenuIconWrapper>
                        <span>Download as PNG</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportWidget("jpeg")}>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <DropdownMenuIconWrapper>
                          <PhotoIcon className="onvo-size-4 onvo-text-inherit" />
                        </DropdownMenuIconWrapper>
                        <span>Download as JPEG</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}

              {(addable ||
                widget_editable ||
                ImageDownloadEnabled ||
                ReportDownloadEnabled) &&
                deletable && <DropdownMenuSeparator />}

              {deletable && (
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={deleteWidget}>
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                      <TrashIcon className="onvo-size-4 onvo-text-red-500" />
                      <span className="onvo-text-red-500">Delete widget</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      <div className="onvo-py-3 onvo-px-4 onvo-h-full onvo-w-full onvo-flex onvo-flex-grow onvo-flex-col">
        <ChartBase
          json={output}
          title={widget.title}
          id={widget.id}
          settings={widget.settings}
        />
      </div>
      {footer}
    </Card>
  );
};

export default ChartCard;
