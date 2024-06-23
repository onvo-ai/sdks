import React from "react";
import { Icon } from "../../tremor/Icon";
import { Input } from "../../tremor/Input";
import { Button } from "../../tremor/Button";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useDashboard } from "../Dashboard";
import { useBackend } from "../Wrapper";
import { Text, Label } from "../../tremor/Text";
import {
  Editor,
  EditorProvider,
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { twMerge } from "tailwind-merge";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import ChartBase from "./ChartBase";
import { Tabs, TabsList, TabsTrigger } from "../../tremor/Tabs";

export const useTextWidgetModal = create<{
  open: boolean;
  widget?: {
    id: string;
    title: string;
    subtitle: string;
    titleAlignment: string;
    descriptionAlignment: string;
  };
  setOpen: (
    open: boolean,
    widget?: {
      id: string;
      title: string;
      subtitle: string;
      titleAlignment: string;
      descriptionAlignment: string;
    }
  ) => void;
}>((set) => ({
  open: false,
  setOpen: (
    op: boolean,
    wid?: {
      id: string;
      title: string;
      subtitle: string;
      titleAlignment: string;
      descriptionAlignment: string;
    }
  ) => set({ open: op, widget: wid }),
}));

export const TextWidgetModal: React.FC<{
  maxHeight: number;
}> = ({ maxHeight }) => {
  const { dashboard, refreshWidgets, adminMode } = useDashboard();
  const backend = useBackend();
  const { open, setOpen, widget } = useTextWidgetModal();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleAlignment, setTitleAlignment] = useState<
    "start" | "center" | "end"
  >("start");
  const [descriptionAlignment, setDescriptionAlignment] = useState<
    "start" | "center" | "end"
  >("start");

  useEffect(() => {
    if (widget) {
      setTitle(widget.title);
      setSubtitle(widget.subtitle);

      setTitleAlignment(widget.titleAlignment as "start" | "center" | "end");
      setDescriptionAlignment(
        widget.descriptionAlignment as "start" | "center" | "end"
      );
    } else {
      setTitle("");
      setSubtitle("");
      setTitleAlignment("start");
      setDescriptionAlignment("start");
    }
  }, [widget]);

  const createSeparator = async () => {
    if (!dashboard) return;
    setLoading(true);
    let cache = {
      type: "text",
      data: { datasets: [{ data: [], label: "" }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: title, align: titleAlignment },
          subtitle: {
            display: false,
            text: subtitle,
            align: descriptionAlignment,
          },
        },
      },
    };
    let code = `title = "${title}"
    subtitle = "${subtitle}"
    def main():
      
        return {
            "type": "text",
            "data": {"datasets": [{"data": [], "label": ""}]},
            "options": {
                "responsive": True,
                "maintainAspectRatio": False,
                "plugins": {
                    "title": {
                        "display": True,
                        "text": title_text,
                        "align": "${titleAlignment}",
                    },
                    if subtitle:
                        .set("plugins", {"subtitle": {"display": False, "text": subtitle, "align": "${descriptionAlignment}"}})
                },
            },
        }
      `;

    if (widget) {
      await backend?.widgets.update(widget.id, {
        title: title,
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
        title: title,
        team: dashboard.team,
        code: code,
        messages: [],
        settings: {
          disable_download_images: false,
          disable_download_reports: false,
          title_hidden: false,
        },
      });
    }
    setOpen(false);
    setLoading(false);
    setTitle("");
    setSubtitle("");
    refreshWidgets();
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
              <Label>{widget ? `Edit ${title}` : "Create text widget"}</Label>
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
              <Text>Title</Text>
              <Input
                placeholder="Type in a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="onvo-mt-2 onvo-flex onvo-items-center onvo-justify-between">
                <Text>Title alignment</Text>
                <Tabs
                  value={titleAlignment}
                  onValueChange={(val) => {
                    setTitleAlignment(val as "start" | "center" | "end");
                  }}
                >
                  <TabsList variant="solid">
                    <TabsTrigger value="start">Left</TabsTrigger>
                    <TabsTrigger value="center">Center</TabsTrigger>
                    <TabsTrigger value="end">End</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <Text className="onvo-mt-2">Description</Text>
              <div className="onvo-min-h-48 onvo-max-w-full onvo-prose onvo-prose-sm dark:onvo-prose-invert">
                <EditorProvider>
                  <Editor
                    containerProps={{ style: { minHeight: 192 } }}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                  >
                    <Toolbar>
                      <BtnUndo />
                      <BtnRedo />
                      <Separator />
                      <BtnBold />
                      <BtnItalic />
                      <BtnUnderline />
                      <BtnStrikeThrough />
                      <Separator />
                      <BtnNumberedList />
                      <BtnBulletList />
                      <Separator />
                      <BtnLink />
                      <BtnClearFormatting />
                      <HtmlButton />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
              </div>
              <div className="onvo-mt-2 onvo-flex onvo-items-center onvo-justify-between">
                <Text>Description alignment</Text>
                <Tabs
                  value={descriptionAlignment}
                  onValueChange={(val) => {
                    setDescriptionAlignment(val as "start" | "center" | "end");
                  }}
                >
                  <TabsList variant="solid">
                    <TabsTrigger value="start">Left</TabsTrigger>
                    <TabsTrigger value="center">Center</TabsTrigger>
                    <TabsTrigger value="end">End</TabsTrigger>
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
                    type: "text",
                    data: { datasets: [{ data: [], label: "" }] },
                    options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        title: {
                          display: true,
                          text: title,
                          align: titleAlignment,
                        },
                        subtitle: {
                          display: false,
                          text: subtitle,
                          align: descriptionAlignment,
                        },
                      },
                    },
                  }}
                  id={widget?.id || ""}
                  title={title}
                />
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
