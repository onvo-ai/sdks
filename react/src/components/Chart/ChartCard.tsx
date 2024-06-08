import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import React, { useMemo, useState } from "react";
import ChartBase from "./ChartBase";
import { toast } from "sonner";
import {
  ArrowDownTrayIcon,
  DocumentChartBarIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDashboard } from "../Dashboard";
import { useBackend } from "../Wrapper";
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
import { Widget } from "@onvo-ai/js";
import { useSeparatorModal } from "./CreateSeparatorModal";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const DragHandle = () => {
  return (
    <div className="chart-drag-handle onvo-hidden group-hover/chartcard:onvo-grid onvo-absolute onvo-grid-cols-4 onvo-py-1 onvo-cursor-move onvo-px-1 onvo-items-center onvo-justify-center onvo-h-6 onvo-w-10 onvo-bg-gray-50 hover:onvo-bg-blue-100 dark:onvo-bg-gray-800 dark:hover:onvo-bg-blue-900 onvo-rounded-md onvo-z-10 onvo-top-2 onvo-left-[50%] -onvo-ml-5">
      <div className="onvo-h-1 onvo-w-1 onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
      <div className="onvo-h-1 onvo-w-1 onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
      <div className="onvo-h-1 onvo-w-1 onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
      <div className="onvo-h-1 onvo-w-1 onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
      <div className="onvo-h-1 onvo-w-1 onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
      <div className="onvo-h-1 onvo-w-1 onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
      <div className="onvo-h-1 onvo-w-1 onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
      <div className="onvo-h-1 onvo-w-1 onvo-ml-0.5 onvo-rounded-full onvo-bg-gray-300 dark:onvo-bg-gray-700"></div>
    </div>
  );
};

const ChartCard: React.FC<{
  widget: Widget;
}> = ({ widget }) => {
  const { dashboard, refreshWidgets, setSelectedWidget, adminMode } =
    useDashboard();
  const { setOpen } = useSeparatorModal();
  const backend = useBackend();

  const duplicate = async () => {
    let newObj: any = { ...widget };
    delete newObj.id;

    toast.promise(
      () => {
        return backend?.widgets.create(newObj) as Promise<any>;
      },
      {
        loading: "Duplicating widget...",
        success: () => {
          refreshWidgets();
          return "Widget duplicated";
        },
        error: (error) => "Error duplicating widget: " + error.message,
      }
    );
  };

  const onRequestEdit = () => {
    setSelectedWidget(widget);
  };

  const deleteWidget = async () => {
    toast.promise(
      () => {
        return backend?.widgets.delete(widget.id) as Promise<any>;
      },
      {
        loading: "Deleting widget...",
        success: () => {
          refreshWidgets();
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
      return JSON.parse(widget.cache);
    } else {
      return undefined;
    }
  }, [widget]);

  const layout_editable =
    adminMode || dashboard?.settings?.can_edit_widget_layout;
  const widget_editable = adminMode || dashboard?.settings?.can_edit_widgets;
  const addable = adminMode || dashboard?.settings?.can_create_widgets;
  const deletable = adminMode || dashboard?.settings?.can_delete_widgets;

  if (output.type === "separator") {
    return (
      <div className="onvo-group/chartcard onvo-relative onvo-h-full onvo-w-full onvo-py-0 !onvo-bg-transparent !onvo-border-0 !onvo-ring-0 !onvo-shadow-none onvo-px-0">
        {layout_editable && <DragHandle />}
        {(widget_editable || deletable) && (
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
                        setOpen(true, {
                          id: widget.id,
                          title: widget.title,
                          subtitle:
                            output.options.plugins.subtitle.text.join("\n") ||
                            "",
                        });
                      }, 30);
                    }}
                  >
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                      <PencilSquareIcon className="onvo-size-4" />
                      <span>Edit separator</span>
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
                      <span className="onvo-text-red-500">
                        Delete separator
                      </span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ChartBase
          json={output}
          id={widget.id}
          title={widget.title}
          settings={{}}
        />
      </div>
    );
  }

  const ImageDownloadEnabled = useMemo(() => {
    const isTable =
      widget &&
      widget.cache &&
      JSON.parse(widget.cache || "{}").type === "table";
    if (isTable) return false;
    if (adminMode) return true;
    if (dashboard?.settings && dashboard.settings.disable_download_images)
      return false;
    if (widget.settings && (widget.settings as any).disable_download_images)
      return false;
    return true;
  }, [dashboard, widget, adminMode]);

  const ReportDownloadEnabled = useMemo(() => {
    if (adminMode) return true;
    if (dashboard?.settings && dashboard.settings.disable_download_reports)
      return false;
    if (widget.settings && (widget.settings as any).disable_download_reports)
      return false;
    return true;
  }, [dashboard, widget, adminMode]);

  return (
    <Card
      key={widget.id}
      className="onvo-chart-card onvo-group/chartcard onvo-foreground-color onvo-relative onvo-flex onvo-h-full onvo-w-full onvo-flex-col -onvo-z-[1] onvo-py-3"
    >
      {layout_editable && <DragHandle />}

      {(addable ||
        deletable ||
        widget_editable ||
        ImageDownloadEnabled ||
        ReportDownloadEnabled) && (
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
              className="onvo-z-20 onvo-cursor-pointer onvo-absolute onvo-top-1 onvo-right-1 onvo-font-override"
              icon={EllipsisVerticalIcon}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="onvo-min-w-56">
            {(addable || widget_editable) && (
              <>
                <DropdownMenuLabel>Edit widget</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {widget_editable && (
                    <DropdownMenuItem onClick={onRequestEdit}>
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
      <ChartBase
        json={output}
        title={widget.title}
        id={widget.id}
        settings={widget.settings}
      />
    </Card>
  );
};

export default ChartCard;
