import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import React, { useMemo, useState } from "react";
import ChartBase from "./ChartBase";
import { toast } from "sonner";
import {
  ArrowDownTrayIcon,
  DocumentChartBarIcon,
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PhotoIcon,
  TableCellsIcon,
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

const DragHandle = () => {
  return (
    <div className="group chart-drag-handle hidden group-hover:grid absolute grid-cols-4 py-1 cursor-move px-1 items-center justify-center h-6 w-10 bg-gray-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-blue-900 rounded-md z-10 top-2 left-[50%] -ml-5">
      <div className="h-1 w-1 ml-0.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-1 w-1 ml-0.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-1 w-1 ml-0.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-1 w-1 ml-0.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-1 w-1 ml-0.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-1 w-1 ml-0.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-1 w-1 ml-0.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-1 w-1 ml-0.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
  );
};

const ChartCard: React.FC<{
  widget: Widget;
}> = ({ widget }) => {
  const { dashboard, refreshWidgets, setSelectedWidget, adminMode } =
    useDashboard();
  const { setOpen } = useSeparatorModal();
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
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
      <div className="group relative h-full w-full py-0 !bg-transparent !border-0 !ring-0 !shadow-none px-0">
        {layout_editable && <DragHandle />}
        {(widget_editable || deletable) && (
          <div
            className={
              "z-20 absolute top-1 right-4  hidden group-hover:block " +
              (editDropdownOpen ? "!block" : "")
            }
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
          >
            <DropdownMenu onOpenChange={setEditDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Icon icon={PencilSquareIcon} variant="shadow" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-56">
                {widget_editable && (
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpen(true, {
                          id: widget.id,
                          title: widget.title,
                          subtitle:
                            output.options.plugins.subtitle.text.join("\n") ||
                            "",
                        });
                      }}
                    >
                      <span className="flex items-center gap-x-2">
                        <PencilSquareIcon className="size-4" />
                        <span>Edit separator</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                )}
                {widget_editable && deletable && <DropdownMenuSeparator />}
                {deletable && (
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={deleteWidget}>
                      <span className="flex items-center gap-x-2">
                        <TrashIcon className="size-4 text-red-500" />
                        <span className="text-red-500">Delete separator</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

  const editOptions = [] as any[];
  if (widget_editable) {
    editOptions.push({
      title: "Edit widget",
      icon: PencilSquareIcon,
      id: "edit",
      onClick: onRequestEdit,
    });
  }
  if (addable) {
    editOptions.push({
      title: "Duplicate widget",
      icon: DocumentDuplicateIcon,
      id: "duplicate",
      onClick: duplicate,
    });
  }

  const options = [] as any;

  if (editOptions.length > 0) {
    options.push(editOptions);
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
      className="onvo-chart-card group foreground-color relative flex h-full w-full flex-col -z-[1] py-3"
    >
      {layout_editable && <DragHandle />}
      <div
        className={
          "onvo-chart-card-dropdown-wrapper z-20 absolute top-1 right-4 flex-row gap-2 hidden group-hover:flex " +
          (downloadDropdownOpen || editDropdownOpen ? "!flex" : "")
        }
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
      >
        {(ReportDownloadEnabled || ImageDownloadEnabled) && (
          <DropdownMenu onOpenChange={setDownloadDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Icon
                icon={ArrowDownTrayIcon}
                className="relative"
                variant="shadow"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56">
              {ReportDownloadEnabled && (
                <>
                  <DropdownMenuLabel>Reports</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => exportWidget("xlsx")}>
                      <span className="flex items-center gap-x-2">
                        <DocumentChartBarIcon className="size-4" />
                        <span>Download as excel</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportWidget("csv")}>
                      <span className="flex items-center gap-x-2">
                        <DropdownMenuIconWrapper>
                          <DocumentChartBarIcon className="size-4 text-inherit" />
                        </DropdownMenuIconWrapper>
                        <span>Download as CSV</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
              {ImageDownloadEnabled && ReportDownloadEnabled && (
                <DropdownMenuSeparator />
              )}
              {ImageDownloadEnabled && (
                <>
                  <DropdownMenuLabel>Images</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => exportWidget("svg")}>
                      <span className="flex items-center gap-x-2">
                        <PhotoIcon className="size-4 " />
                        <span>Download as SVG</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportWidget("png")}>
                      <span className="flex items-center gap-x-2">
                        <DropdownMenuIconWrapper>
                          <PhotoIcon className="size-4 text-inherit" />
                        </DropdownMenuIconWrapper>
                        <span>Download as PNG</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportWidget("jpeg")}>
                      <span className="flex items-center gap-x-2">
                        <DropdownMenuIconWrapper>
                          <PhotoIcon className="size-4 text-inherit" />
                        </DropdownMenuIconWrapper>
                        <span>Download as JPEG</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {(addable || deletable || widget_editable) && (
          <DropdownMenu onOpenChange={setEditDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Icon icon={PencilSquareIcon} variant="shadow" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={onRequestEdit}>
                  <span className="flex items-center gap-x-2">
                    <PencilSquareIcon className="size-4 " />
                    <span>Edit widget</span>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={duplicate}>
                  <span className="flex items-center gap-x-2">
                    <DropdownMenuIconWrapper>
                      <DocumentDuplicateIcon className="size-4 text-inherit" />
                    </DropdownMenuIconWrapper>
                    <span>Duplicate widget</span>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              {(addable || widget_editable) && deletable && (
                <DropdownMenuSeparator />
              )}
              {deletable && (
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={deleteWidget}>
                    <span className="flex items-center gap-x-2">
                      <TrashIcon className="size-4 text-red-500" />
                      <span className="text-red-500">Delete widget</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
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
