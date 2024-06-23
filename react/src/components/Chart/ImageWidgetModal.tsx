import React from "react";
import { Icon } from "../../tremor/Icon";
import { Input } from "../../tremor/Input";
import { Button } from "../../tremor/Button";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useDashboard } from "../Dashboard";
import { useBackend } from "../Wrapper";
import { Text, Label, Title } from "../../tremor/Text";

import { twMerge } from "tailwind-merge";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PaperClipIcon,
} from "@heroicons/react/20/solid";
import ChartBase from "./ChartBase";
import { Tabs, TabsList, TabsTrigger } from "../../tremor/Tabs";
import { Divider } from "../../tremor/Divider";
import { Card } from "../../tremor/Card";
import { toast } from "sonner";

export const useImageWidgetModal = create<{
  open: boolean;
  widget?: {
    id: string;
    url: string;
    imageFill: "fit" | "fill";
  };
  setOpen: (
    open: boolean,
    widget?: {
      id: string;
      url: string;
      imageFill: "fit" | "fill";
    }
  ) => void;
}>((set) => ({
  open: false,
  setOpen: (
    op: boolean,
    wid?: {
      id: string;
      url: string;
      imageFill: "fit" | "fill";
    }
  ) => set({ open: op, widget: wid }),
}));

export const ImageWidgetModal: React.FC<{
  maxHeight: number;
}> = ({ maxHeight }) => {
  const { dashboard, refreshWidgets, adminMode } = useDashboard();
  const backend = useBackend();
  const { open, setOpen, widget } = useImageWidgetModal();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFill, setImageFill] = useState<"fit" | "fill">("fill");

  useEffect(() => {
    if (widget) {
      setUrl(widget.url);
      setImageFill(widget.imageFill);
    } else {
      setImageFill("fill");
      setUrl("");
    }
  }, [widget]);

  const createSeparator = async () => {
    if (!dashboard) return;
    setLoading(true);
    let cache = {
      type: "image",
      data: { datasets: [{ data: [], label: "" }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          image: { url: url, fill: imageFill },
        },
      },
    };
    let code = `url = "${url}"
    def main():
      
        return {
            "type": "image",
            "data": {"datasets": [{"data": [], "label": ""}]},
            "options": {
                "responsive": True,
                "maintainAspectRatio": False,
                "plugins": {
                    "image": {
                        "url": "${url}",
                        "fill": "${imageFill}"
                    }
                },
            },
        }
      `;

    if (widget) {
      await backend?.widgets.update(widget.id, {
        title: url,
        code: code,
        cache: cache,
      });
    } else {
      await backend?.widgets.create({
        dashboard: dashboard.id,
        layouts: {
          lg: {
            x: 0,
            y: maxHeight,
            w: 12,
            h: 10,
          },
        },
        cache: cache,
        title: url,
        team: dashboard.team,
        code: code,
        messages: [],
        settings: {
          disable_download_images: false,
          disable_download_reports: false,
          title_hidden: true,
        },
      });
    }
    setOpen(false);
    setLoading(false);
    setUrl("");
    refreshWidgets();
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.promise(
      async () => {
        if (!e.target.files) return;
        await backend?.utils.uploadFile(e.target.files[0]);
      },
      {
        loading: "Uploading file...",
        success: (res: any) => {
          setUrl(res.url);
          return "File uploaded";
        },
        error: (err: any) => {
          return "Failed to upload file: " + err.message;
        },
      }
    );
  };

  if (!dashboard?.settings?.can_create_widgets && !adminMode) return <></>;

  return (
    <>
      <dialog open={open}>
        <div
          className={twMerge(
            "onvo-@container/widgetmodal onvo-h-full onvo-animate-dialogOpen onvo-w-full onvo-z-50 onvo-fixed onvo-left-0 onvo-foreground-color"
          )}
        >
          <div
            className={
              "onvo-foreground-color onvo-w-full onvo-left-0 onvo-top-0 onvo-z-10 onvo-flex onvo-flex-row onvo-justify-start onvo-items-center onvo-gap-4 onvo-border-b onvo-border-gray-200 onvo-p-2 dark:onvo-border-gray-800"
            }
          >
            <Icon
              icon={ChevronLeftIcon}
              variant="shadow"
              className="onvo-ml-2"
              onClick={() => setOpen(false)}
            />

            <div className="onvo-flex onvo-flex-row onvo-w-full onvo-gap-1 onvo-flex-grow onvo-justify-start onvo-items-center">
              <Text className="onvo-hidden @xl/widgetmodal:onvo-block">
                {dashboard?.title}
              </Text>
              <ChevronRightIcon className="onvo-hidden @xl/widgetmodal:onvo-block onvo-h-4 onvo-w-4 dark:onvo-fill-slate-500" />
              <Label>
                {widget ? `Edit image widget` : "Create image widget"}
              </Label>
            </div>
            <div className="onvo-flex onvo-flex-row onvo-gap-2 onvo-flex-shrink-0">
              <Button
                onClick={createSeparator}
                className="onvo-flex-shrink-0"
                isLoading={loading}
              >
                {widget ? "Save" : "Create"}
              </Button>
            </div>
          </div>
          <div className="onvo-relative onvo-flex onvo-flex-grow onvo-h-[calc(100%-52px)] onvo-w-full onvo-flex-col-reverse @xl/widgetmodal:onvo-flex-row">
            <div className="onvo-relative onvo-overflow-y-auto onvo-scrollbar-thin onvo-flex-grow onvo-h-full onvo-w-full onvo-p-4 onvo-border-r onvo-border-gray-200 dark:onvo-border-gray-800">
              <Text>Image URL</Text>
              <Input
                placeholder="Type in a URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <Divider>
                <Text>OR</Text>
              </Divider>
              <Card className="onvo-relative onvo-flex onvo-h-auto onvo-cursor-pointer onvo-flex-row onvo-items-center onvo-justify-center onvo-py-10">
                <Icon icon={PaperClipIcon} />
                <div className="onvo-ml-4 onvo-flex-grow">
                  <Title>Drag and drop an image here or click to add</Title>
                  <Text className="onvo-text-xs onvo-italic">
                    Upload .jpeg, .png, .svg files
                  </Text>
                </div>

                <input
                  onChange={uploadFile}
                  type="file"
                  accept="image/*"
                  className="onvo-absolute onvo-left-0 onvo-top-0 onvo-z-10 onvo-h-full onvo-w-full onvo-cursor-pointer onvo-opacity-0"
                />
              </Card>
              <div className="onvo-mt-4 onvo-flex onvo-items-center onvo-justify-between">
                <Text>Image fill</Text>
                <Tabs
                  value={imageFill}
                  onValueChange={(val) => {
                    setImageFill(val as "fit" | "fill");
                  }}
                >
                  <TabsList variant="solid">
                    <TabsTrigger value="fit">Fit</TabsTrigger>
                    <TabsTrigger value="fill">Fill</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="onvo-background-color onvo-flex onvo-flex-shrink-0 @xl/widgetmodal:onvo-flex-shrink onvo-flex-col onvo-justify-center onvo-w-full onvo-flex-grow onvo-relative onvo-p-4 onvo-overflow-y-auto onvo-bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:onvo-bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]">
              <div
                className={"onvo-relative onvo-flex onvo-w-full onvo-flex-col"}
              >
                <ChartBase
                  json={{
                    type: "image",
                    data: { datasets: [{ data: [], label: "" }] },
                    options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        image: {
                          url: url,
                          fill: imageFill,
                        },
                      },
                    },
                  }}
                  id={widget?.id || ""}
                  title={""}
                />
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
