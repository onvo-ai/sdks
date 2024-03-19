import { Card } from "@tremor/react";
import React, { useMemo, useRef } from "react";
import ChartBase from "./ChartBase";
import { toast } from "sonner";
import {
  cleanCell,
  downloadURIToFile,
  exportCSVFile,
  exportExcelFile,
} from "./exportUtils";
import {
  DocumentChartBarIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PhotoIcon,
  TableCellsIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toPng } from "html-to-image";
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

  const download = async () => {
    toast.promise(
      async () => {
        if (!ref || !ref.current) return;
        let dataUrl = await toPng(ref.current, {
          cacheBust: true,
          quality: 1,
          filter: (node) => {
            return (
              !node.className ||
              (node.className?.indexOf("dropdown-container") === -1 &&
                node.className?.indexOf("react-resizable-handle") === -1)
            );
          },
        });
        downloadURIToFile(dataUrl as string, widget.title + ".png");
      },
      {
        loading: "Saving chart as png...",
        success: () => {
          return "Screenshot saved to downloads";
        },
        error: (error) => {
          return "Failed to download chart: " + error.message;
        },
      }
    );
  };

  const downloadSheet = (type: string) => {
    let datasets = JSON.parse(widget.cache || "{}").data.datasets;
    let labels: string[] = [];
    if (widget.cache) {
      labels = JSON.parse(widget.cache || "{}").data.labels;
    }

    let data = [] as any[];
    datasets[0].data.forEach((datapoint: any, index: number) => {
      let obj = {} as any;
      if (labels.length > 0) {
        obj["Label"] = labels[index];
      }
      datasets.forEach((dataset: any) => {
        obj[dataset.label] = dataset.data[index];
      });
      data.push(obj);
    });

    let output = data.map((a) => {
      let obj = { ...a };
      Object.keys(obj).forEach((key) => {
        obj[key] = cleanCell(obj[key]);
      });
      return a;
    });
    if (type === "csv") {
      exportCSVFile(output, widget.title);
    } else {
      exportExcelFile(output, widget.title);
    }
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
                id: "download",
                onClick: () => downloadSheet("excel"),
              },
              {
                title: "Download as csv",
                icon: TableCellsIcon,
                id: "download",
                onClick: () => downloadSheet("csv"),
              },

              ...(JSON.parse(widget.cache || "{}").type === "table"
                ? []
                : [
                    {
                      title: "Download as png",
                      icon: PhotoIcon,
                      id: "download",
                      onClick: download,
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
