import { Card } from "@tremor/react";
import React, { useMemo, useRef } from "react";
import ChartBase from "./ChartBase";
import { toast } from "sonner";
import {
  DocumentChartBarIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PhotoIcon,
  TableCellsIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDashboard } from "../Dashboard";
import { useBackend } from "../Wrapper";
import Dropdown from "./Dropdown";
import { Widget } from "@onvo-ai/js";

const ChartCard: React.FC<{
  widget: Widget;
}> = ({ widget }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { refresh, setSelectedWidget } = useDashboard();
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
          refresh();
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
          refresh();
          return "Widget deleted";
        },
        error: (error) => "Error deleting widget: " + error.message,
      }
    );
  };

  const exportWidget = (format: "svg" | "png" | "csv" | "xlsx") => {
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

  return (
    <Card
      key={widget.id}
      className="onvo-chart-card group foreground-color relative flex h-full w-full flex-col -z-[1] py-3"
      ref={ref}
    >
      <div
        className="z-20 absolute top-4 right-4  hidden group-hover:block"
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
        <Dropdown
          options={[
            [
              {
                title: "Edit widget",
                icon: PencilSquareIcon,
                id: "edit",
                onClick: onRequestEdit,
              },
              {
                title: "Duplicate widget",
                icon: DocumentDuplicateIcon,
                id: "duplicate",
                onClick: duplicate,
              },
            ],
            [
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

              ...(JSON.parse(widget.cache || "{}").type === "table"
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
                  ]),
            ],
            [
              {
                title: "Delete widget",
                icon: TrashIcon,
                id: "delete",
                color: "bg-red-500",
                onClick: deleteWidget,
              },
            ],
          ]}
        />
      </div>
      <ChartBase json={output} title={widget.title} id={widget.id} />
    </Card>
  );
};

export default ChartCard;
