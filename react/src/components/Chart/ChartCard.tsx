import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import React, { useMemo } from "react";
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
import Dropdown from "./Dropdown";
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
    const options = [] as any[];
    if (widget_editable) {
      options.push([
        {
          title: "Edit separator",
          icon: PencilSquareIcon,
          id: "edit",
          onClick: () =>
            setOpen(true, {
              id: widget.id,
              title: widget.title,
              subtitle: output.options.plugins.subtitle.text.join("\n") || "",
            }),
        },
      ]);
    }
    if (deletable) {
      options.push([
        {
          title: "Delete separator",
          icon: TrashIcon,
          id: "delete",
          color: "bg-red-500",
          onClick: deleteWidget,
        },
      ]);
    }
    return (
      <div className="group relative h-full w-full py-0 !bg-transparent !border-0 !ring-0 !shadow-none px-0">
        {layout_editable && <DragHandle />}
        {(widget_editable || deletable) && (
          <div
            className="z-20 absolute top-1 right-4  hidden group-hover:block"
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
            <Dropdown options={options}>
              <Icon icon={PencilSquareIcon} variant="shadow" />
            </Dropdown>
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

  const deleteOptions = [
    {
      title: "Delete widget",
      icon: TrashIcon,
      id: "delete",
      color: "bg-red-500",
      onClick: deleteWidget,
    },
  ];

  const options = [] as any;

  if (editOptions.length > 0) {
    options.push(editOptions);
  }
  if (deletable) {
    options.push(deleteOptions);
  }

  const ImageDownloadEnabled = useMemo(() => {
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

  const exportOptions = [
    ...(ReportDownloadEnabled
      ? [
          {
            title: "Download as excel",
            icon: DocumentChartBarIcon,
            id: "download-excel",
            onClick: () => exportWidget("xlsx"),
          },
          {
            title: "Download as csv",
            icon: TableCellsIcon,
            id: "download-csv",
            onClick: () => exportWidget("csv"),
          },
        ]
      : []),

    ...((widget &&
      widget.cache &&
      JSON.parse(widget.cache || "{}").type === "table") ||
    !ImageDownloadEnabled
      ? []
      : [
          {
            title: "Download as svg",
            icon: PhotoIcon,
            id: "download-svg",
            onClick: () => exportWidget("svg"),
          },
          {
            title: "Download as png",
            icon: PhotoIcon,
            id: "download-png",
            onClick: () => exportWidget("png"),
          },
          {
            title: "Download as jpeg",
            icon: PhotoIcon,
            id: "download-jpeg",
            onClick: () => exportWidget("jpeg"),
          },
        ]),
  ];

  return (
    <Card
      key={widget.id}
      className="onvo-chart-card group foreground-color relative flex h-full w-full flex-col -z-[1] py-3"
    >
      {layout_editable && <DragHandle />}
      <div
        className="onvo-chart-card-dropdown-wrapper z-20 absolute top-1 right-4 hidden group-hover:flex flex-row gap-2"
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
          <Dropdown options={[exportOptions]}>
            <Icon icon={ArrowDownTrayIcon} variant="shadow" />
          </Dropdown>
        )}
        {(addable || deletable || widget_editable) && (
          <Dropdown options={options}>
            <Icon icon={PencilSquareIcon} variant="shadow" />
          </Dropdown>
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
