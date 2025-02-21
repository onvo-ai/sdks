
import { Input } from "../../tremor/Input";
import { Label, Text, Title } from "../../tremor/Text";
import { Button } from "../../tremor/Button";
import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../tremor/Tabs";

import { useEffect, useState } from "react";
import { LogType, Widget, WidgetMessage, WidgetSettings } from "@onvo-ai/js";

import Editor from "@monaco-editor/react";
import { toast } from "sonner";
import ChartBase from "../Chart/ChartBase";
import React from "react";
import { useBackend } from "../../layouts/Wrapper";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { PromptInput } from "../PromptInput";
import { QuestionMessage } from "../QuestionMessage";

const hashCode = function (s: string) {
  return s.split("").reduce(function (a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

export const useEditWidgetModal = create<{
  open: boolean;
  widget: Widget | undefined;
  setOpen: (open: boolean, widget?: Widget) => void;
}>((set) => ({
  open: false,
  widget: undefined,
  setOpen: (op: boolean, wid?: Widget) => set({ open: op, widget: wid }),
}));

export const EditWidgetModal: React.FC<{}> = ({ }) => {
  // EXTERNAL HOOKS
  const { backend, adminMode } = useBackend();
  const { refreshWidgets, dashboard } = useDashboard();
  const { widget, setOpen, open } = useEditWidgetModal();

  // REVERT CHANGES STATES
  const [changesMade, setChangesMade] = useState(false);
  const [cachedWidget, setCachedWidget] = useState<
    Pick<Widget, "cache" | "code" | "messages">
  >({ cache: "", code: "", messages: [] });

  // WIDGET STATES
  const [title, setTitle] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [code, setCode] = useState("");
  const [settings, setSettings] = useState<WidgetSettings>({
  });

  // UI STATES
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"chart" | "editor">("chart");

  useEffect(() => {
    if (widget) {
      updateStates(widget);
      setCachedWidget({
        cache: widget.cache,
        code: widget.code,
        messages: widget.messages,
      });
    } else {
      updateStates(undefined);
    }
  }, [widget]);

  const updateStates = (widget: Widget | undefined) => {
    if (widget) {
      let out = widget && widget.cache ? widget.cache : {};

      setTitle(widget.title || "");
      setCode(widget.code);
      setOutput(out);
      setSettings(
        widget.settings || {}
      );
      setMessages(widget.messages || []);
    } else {
      setTitle("");
      setCode("");
      setOutput(null);
      setMessages([]);
    }
  };

  const requestEditWidget = async (msg: WidgetMessage[]) => {
    if (!widget) return;
    setCode("");
    setLoading(true);

    try {
      let wid = await backend?.widget(widget.id).updatePrompts(msg);
      setChangesMade(true);
      toast.success("Your widget has been updated!");

      updateStates(wid);
      setLoading(false);
      if (backend) {
        backend.logs.create({
          type: LogType.EditWidget,
          dashboard: widget.dashboard,
          widget: widget.id,
        })
      }
    } catch (e: any) {
      toast.error("Failed to create widget: " + e.message);
      setLoading(false);
    }
  };

  const saveChanges = () => {
    if (!widget || !backend) return;
    toast.promise(
      () => {
        return backend.widgets.update(widget.id, {
          title: title,
          code: code,
          cache: output,
          settings: settings,
          messages: messages,
        }) as Promise<any>;
      },
      {
        loading: "Saving changes...",
        success: () => {
          cleanup();
          refreshWidgets(backend);
          return "Changes saved!";
        },
        error: (error) => "Failed to save changes: " + error.message,
      }
    );
  };

  const cleanup = () => {
    setOpen(false, undefined);

    updateStates(undefined);

    setNewMessage("");
    setLoading(false);
    setTab("chart");
  };

  const executeCode = async () => {
    setLoading(true);
    if (!widget) return;
    toast.promise(
      async () => {
        let data = await backend?.widget(widget.id).executeCode(code);
        setOutput(data);
        if (backend) {
          backend.logs.create({
            type: LogType.EditWidget,
            dashboard: widget.dashboard,
            widget: widget.id,
          })
        }
      },
      {
        loading: "Executing code...",
        success: () => {
          setLoading(false);
          setChangesMade(true);
          return "Successfully executed code";
        },
        error: (e: any) => {
          setLoading(false);
          return "Failed to execute code: " + e.message;
        },
      }
    );
  };

  const Preview = (<div className="onvo-h-full onvo-w-full onvo-p-4 onvo-background-color onvo-bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:onvo-bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px] onvo-flex onvo-justify-center onvo-items-center">
    {loading && (
      <div className="onvo-absolute onvo-top-0 onvo-left-0 onvo-bottom-0 onvo-right-0 onvo-z-10 onvo-backdrop-blur-md onvo-bg-white/50 dark:onvo-bg-black-900/50 onvo-flex onvo-justify-center onvo-items-center">
        <Card className="onvo-loading-card onvo-foreground-color onvo-flex onvo-flex-row onvo-gap-6 onvo-items-center !onvo-w-72 onvo-border-white/10 dark:onvo-border-black-900/10">
          <div role="status">
            <svg
              aria-hidden="true"
              className="onvo-inline onvo-w-10 onvo-h-10 onvo-text-gray-200 onvo-animate-spin dark:onvo-text-gray-600 onvo-fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <Title>Regenerating chart</Title>
        </Card>
      </div>
    )}

    <Card
      className={
        "onvo-foreground-color onvo-relative onvo-flex onvo-w-full onvo-flex-col onvo-py-3 " +
        (output?.type === "metric"
          ? "onvo-h-32"
          : "onvo-h-72 @xl/widgetmodal:onvo-h-96")
      }
    >
      {output && (
        <ChartBase
          json={output}
          title={title}
          settings={settings}
          key={title + hashCode(JSON.stringify(settings) + JSON.stringify(output))}
        />
      )}
    </Card></div>)

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
              "onvo-foreground-color onvo-w-full onvo-left-0 onvo-top-0 onvo-z-10 onvo-flex onvo-flex-row onvo-justify-start onvo-items-center onvo-gap-4 onvo-border-solid onvo-border-b onvo-border-black/10 onvo-p-2 dark:onvo-border-white/10"
            }
          >
            <Icon
              icon={ChevronLeftIcon}
              variant="shadow"
              className="onvo-ml-2 onvo-background-color onvo-border-black/10 dark:onvo-border-white/10"
              onClick={cleanup}
            />

            <div className="onvo-flex onvo-flex-row onvo-w-full onvo-gap-1 onvo-flex-grow onvo-justify-start onvo-items-center">
              <Text className="onvo-hidden @xl/widgetmodal:onvo-block">
                {dashboard?.title}
              </Text>
              <ChevronRightIcon className="onvo-hidden @xl/widgetmodal:onvo-block onvo-h-4 onvo-w-4 dark:onvo-fill-slate-500" />
              <Label>Edit {title}</Label>
            </div>
            <div className="onvo-flex onvo-flex-row onvo-gap-2 onvo-flex-shrink-0">
              {changesMade && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setChangesMade(false);
                    setCode(cachedWidget.code);
                    setMessages(cachedWidget.messages || []);
                    setOutput(
                      cachedWidget && cachedWidget.cache
                        ? cachedWidget.cache
                        : {}
                    );
                  }}
                  className="onvo-flex-shrink-0"
                >
                  Revert changes
                </Button>
              )}
              <Button
                onClick={saveChanges}
                className="onvo-flex-shrink-0"
                isLoading={loading}
              >
                Save changes
              </Button>
            </div>
          </div>
          <div className="onvo-relative onvo-flex onvo-flex-grow onvo-h-[calc(100%-52px)] onvo-w-full onvo-flex-col-reverse @xl/widgetmodal:onvo-flex-row">
            <div className="onvo-relative onvo-flex-grow onvo-h-full onvo-w-full onvo-pt-2 onvo-max-w-3xl">

              <div className="onvo-relative onvo-flex-grow onvo-h-[calc(100%-16px)] onvo-w-full onvo-flex onvo-flex-col">
                <div className="onvo-overflow-y-auto onvo-scrollbar-thin onvo-flex-grow onvo-pt-4 onvo-px-4 onvo-w-full">
                  <div className="onvo-relative onvo-mx-auto onvo-w-full">
                    {messages.map((message, index) => (
                      <QuestionMessage
                        key={"message-" + index}
                        message={message}
                        isLast={index === messages.length - 1}
                        onDownload={() => { }}
                        onAdd={() => { }}
                        onReply={(msg) => {
                          let newMessages = [...messages, {
                            role: "user" as const,
                            content: msg,
                          }];
                          requestEditWidget(newMessages);
                          setMessages(newMessages);
                        }}
                        onEdit={(msg) => {
                          let newMessages = messages.map((m, i) => {
                            if (i === index) {
                              return {
                                ...m,
                                content: msg,
                              };
                            }
                            return m;
                          });
                          requestEditWidget(newMessages);
                          setMessages(newMessages);
                        }}
                      />
                    ))}</div>
                </div>
                <div className="onvo-px-4">
                  <PromptInput
                    url={dashboard?.settings?.help_url}
                    onSubmit={(msg) => {
                      setMessages([...messages, {
                        role: "user",
                        content: msg
                      }])
                      requestEditWidget([...messages, {
                        role: "user",
                        content: msg
                      }])
                      setNewMessage("")
                    }} /></div>
              </div>
            </div>
            <div className="onvo-border onvo-border-black/10 dark:onvo-border-white/10 onvo-rounded-2xl onvo-m-4 onvo-ml-0 onvo-flex onvo-flex-shrink-0 @xl/widgetmodal:onvo-flex-shrink onvo-flex-col onvo-justify-center onvo-w-full onvo-flex-grow onvo-relative onvo-overflow-y-auto">

              {tab === "editor" && (
                <Button
                  variant="secondary"
                  className="!onvo-absolute onvo-top-[62px] onvo-right-2 onvo-z-10"
                  onClick={executeCode}
                >
                  Execute code
                </Button>
              )}

              <div className="onvo-border-b onvo-border-black/10 dark:onvo-border-white/10 onvo-p-3 onvo-w-full onvo-flex onvo-flex-row onvo-items-center onvo-justify-between onvo-gap-2">
                <Text className="onvo-text-sm">Title</Text>
                <Input
                  placeholder="Title"
                  className="onvo-text-xs"
                  value={title} inputClassName="onvo-background-color onvo-border-black/10 dark:onvo-border-white/10"
                  onChange={(val) => setTitle(val.target.value)}
                />
              </div>
              {adminMode ? (
                <Tabs
                  value={tab}
                  onValueChange={(val) => {
                    setTab(val as "chart" | "editor");
                  }}
                  className="onvo-h-full onvo-flex onvo-flex-col"
                >
                  <TabsList className="onvo-mt-3 onvo-border-black/10 dark:onvo-border-white/10">
                    <TabsTrigger value="chart">Chart</TabsTrigger>
                    {(adminMode ||
                      dashboard?.settings?.can_edit_widget_code) && (
                        <TabsTrigger value="editor">Code editor</TabsTrigger>
                      )}
                  </TabsList>
                  <TabsContent value="chart" className="onvo-h-full">
                    {Preview}
                  </TabsContent>
                  {adminMode && (
                    <TabsContent
                      value="editor"
                      className="onvo-h-full onvo-w-full"
                    >
                      <div className="onvo-flex onvo-flex-col onvo-h-full">
                        <div className=" onvo-flex-grow onvo-h-full onvo-relative" >
                          <Editor
                            defaultLanguage="python"
                            value={code}
                            height="100%"
                            options={{
                              padding: {
                                top: 10,
                              },
                            }}
                            className="onvo-code-editor onvo-w-full"
                            theme="vs-dark"
                            onChange={(val) => setCode(val || "")}
                          /></div>
                        <div className="onvo-p-2 onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                          <div className="onvo-flex-grow">
                            <Text className="onvo-text-xs">CSS id</Text>
                            <Input
                              placeholder="CSS id"
                              className="onvo-text-xs"
                              value={settings.css_id}
                              inputClassName="onvo-background-color onvo-border-black/10 dark:onvo-border-white/10"
                              onChange={(val) => {
                                setSettings((s: any) => ({
                                  ...s,
                                  css_id: val.target.value,
                                }));
                              }}
                            />
                          </div> <div className="onvo-flex-grow">
                            <Text className="onvo-text-xs">
                              CSS class names
                            </Text>
                            <Input
                              placeholder="CSS class names"
                              className="onvo-text-xs onvo-w-24"
                              inputClassName="onvo-background-color onvo-border-black/10 dark:onvo-border-white/10"
                              value={settings.css_classnames}
                              onChange={(val) => {
                                setSettings((s: any) => ({
                                  ...s,
                                  css_classnames: val.target.value,
                                }));
                              }}
                            />
                          </div>

                        </div></div>
                    </TabsContent>
                  )}
                </Tabs>) : Preview}
            </div>
          </div>
        </div>
      </dialog >
    </>
  );
};
