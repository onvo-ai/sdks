import React from "react";
import { Icon } from "../../tremor/Icon";
import { Input } from "../../tremor/Input";
import { Button } from "../../tremor/Button";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { useBackend } from "../../layouts/Wrapper";
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
import ChartBase from "../Chart/ChartBase";
import { Tabs, TabsList, TabsTrigger } from "../../tremor/Tabs";
import { Card } from "../../tremor/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../tremor/Accordion";
import { Textarea } from "../../tremor/Textarea";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import { useMaxHeight } from "../../lib/useMaxHeight";

export const useTextWidgetModal = create<{
  open: boolean;
  widget?: {
    id: string;
    title: string;
    subtitle: string;
    prompt: string;
    titleAlignment: string;
    descriptionAlignment: string;
  };
  setOpen: (
    open: boolean,
    widget?: {
      id: string;
      title: string;
      subtitle: string;
      prompt: string;
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
      prompt: string;
      titleAlignment: string;
      descriptionAlignment: string;
    }
  ) => set({ open: op, widget: wid }),
}));

export const TextWidgetModal: React.FC<{}> = ({ }) => {
  const { dashboard, refreshWidgets } = useDashboard();
  const { backend, adminMode } = useBackend();
  const { open, setOpen, widget } = useTextWidgetModal();
  const { lg, sm } = useMaxHeight();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
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

      setPrompt(widget.prompt);
    } else {
      setTitle("");
      setSubtitle("");
      setPrompt("");
      setTitleAlignment("start");
      setDescriptionAlignment("start");
    }
  }, [widget]);

  const createWidget = async () => {
    if (!dashboard || !backend) return;
    setLoading(true);
    let cache = {
      type: "text",
      data: { datasets: [{ data: [], label: "" }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: title, align: titleAlignment },
          text: {
            prompt: prompt,
          },
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
    prompt = "${prompt}"
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
                    "text": {
                        "prompt": prompt,
                    },
                    if subtitle:
                        .set("plugins", {"subtitle": {"display": False, "text": subtitle, "align": "${descriptionAlignment}"}})
                },
            },
        }
      `;

    if (widget) {
      await backend.widgets.update(widget.id, {
        title: title,
        code: code,
        cache: cache,
      });
    } else {
      await backend.widgets.create({
        dashboard: dashboard.id,
        layouts: {
          lg: {
            x: 0,
            y: lg,
            w: 12,
            h: 10,
          },
          sm: {
            x: 0,
            y: sm,
            w: 3,
            h: 10,
          },
        },
        use_as_example: false,
        use_in_library: false,
        cache: cache,
        title: title,
        team: dashboard.team,
        code: code,
        messages: [],
        settings: {},
      });
    }
    setOpen(false);
    setLoading(false);
    setTitle("");
    setSubtitle("");
    refreshWidgets(backend);
  };

  const summarize = async () => {
    if (!backend || !dashboard) return;
    setSummaryLoading(true);
    try {
      let data = await backend.dashboard(dashboard.id).summarize(prompt);
      setTitle(data.title);
      setSubtitle(data.description);
      setSummaryLoading(false);
    } catch (e: any) {
      toast.error("Failed to summarize: " + e.message);
      setSummaryLoading(false);
    }
  };

  if (!dashboard?.settings?.can_create_widgets && !adminMode) return <></>;

  return (
    <>
      <dialog open={open}>
        <div
          className={twMerge(
            "onvo-@container/widgetmodal onvo-h-full onvo-animate-dialogOpen onvo-w-full onvo-z-50 onvo-fixed onvo-top-0 onvo-left-0 onvo-foreground-color"
          )}
        >
          <div
            className={
              "onvo-foreground-color onvo-w-full onvo-left-0 onvo-top-0 onvo-z-10 onvo-flex onvo-flex-row onvo-justify-start onvo-items-center onvo-gap-4 onvo-border-solid onvo-border-b onvo-border-black/10 onvo-p-2 dark:onvo-border-white/10"
            }
          >
            <Icon
              icon={ChevronLeftIcon}
              variant="shadow"
              className="onvo-ml-2 onvo-background-color onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10"
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
                onClick={createWidget}
                className="onvo-flex-shrink-0"
                isLoading={loading}
              >
                {widget ? "Save" : "Create"}
              </Button>
            </div>
          </div>
          <div className="onvo-relative onvo-flex onvo-flex-grow onvo-h-[calc(100%-52px)] onvo-w-full onvo-flex-col-reverse @xl/widgetmodal:onvo-flex-row">
            <div className="onvo-relative onvo-overflow-y-auto onvo-scrollbar-thin onvo-flex-grow onvo-h-full onvo-w-full onvo-p-4 onvo-flex onvo-flex-col onvo-justify-center">
              <Text>Title</Text>
              <Input
                placeholder="Type in a title"
                value={title}
                inputClassName="onvo-background-color onvo-border-black/10 dark:onvo-border-white/10"
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
              <div className="onvo-min-h-48 onvo-max-w-full onvo-prose onvo-prose-slate onvo-prose-sm dark:onvo-prose-invert">
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

              <div className="onvo-mt-2 onvo-flex onvo-items-center onvo-justify-between">
                <Card className="!onvo-p-0 onvo-background-color">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="onvo-border-b-0">
                      <AccordionTrigger className="onvo-background-color onvo-px-3 onvo-rounded-md">
                        <div className="onvo-flex onvo-gap-2 onvo-items-center onvo-justify-start">
                          <SparklesIcon className="onvo-h-4 onvo-w-4" />
                          Generate text with AI
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="onvo-px-3 onvo-relative">
                        <Textarea
                          placeholder="Enter prompt for AI"
                          className="onvo-mt-2 onvo-foreground-color"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                        <div className="onvo-w-full onvo-flex onvo-justify-end onvo-mt-2">
                          <Button
                            isLoading={summaryLoading}
                            onClick={summarize}
                          >
                            Generate
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </div>
            </div>
            <div className="onvo-border onvo-border-black/10 dark:onvo-border-white/10 onvo-rounded-lg onvo-m-4 onvo-background-color onvo-flex onvo-flex-shrink-0 @xl/widgetmodal:onvo-flex-shrink onvo-flex-col onvo-justify-center onvo-w-full onvo-flex-grow onvo-relative onvo-p-4 onvo-overflow-y-auto onvo-bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:onvo-bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]">
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
