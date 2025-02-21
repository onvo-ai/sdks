import { Label, Metric, Text } from "../../tremor/Text";
import { Icon } from "../../tremor/Icon";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast, Toaster } from "sonner";
import { QuestionMessage } from "../../components/QuestionMessage";
import { QuestionHistory } from "../../components/QuestionHistory";
import React from "react";
import { useBackend } from "../Wrapper";
import { useDashboard } from "../Dashboard/useDashboard";
import { ChartLoader } from "../../components/ChartLoader";
import { LogType, Question } from "@onvo-ai/js";

import { twMerge } from "tailwind-merge";
import { WidgetLibrary } from "../../components/WidgetLibrary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../tremor/Tabs";
import { WidgetWizard } from "../../components/WidgetWizard";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useTheme } from "../Dashboard/useTheme";
import { PromptInput } from "../../components/PromptInput";
import { useMaxHeight } from "../../lib/useMaxHeight";

dayjs.extend(relativeTime);

export interface MessageType {
  role: "user" | "assistant" | "tool";
  content: string | ({ text: string; type: "text" } | { type: "tool_user" })[];
  tool_calls?: any[];
}


const CopilotRaw: React.FC<{
  dashboardId: string;
  variant: "fullscreen" | "copilot";
  trigger?: React.ReactNode;
  coupled?: boolean;
}> = ({ trigger, variant, dashboardId, coupled }): React.ReactNode => {
  const { backend, team } = useBackend();
  const { dashboard, setId, refreshWidgets } = useDashboard();
  const theme = useTheme();
  const scroller = useRef<HTMLDivElement>(null);
  const { lg, sm } = useMaxHeight();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [tab, setTab] = useState<"home" | "history" | "library" | "chat">(
    "home"
  );

  useEffect(() => {
    if (dashboard && dashboard.id) {
      setLoading(false);
    }
  }, [dashboard]);

  useEffect(() => {
    if (backend && (!dashboard || dashboard.id !== dashboardId) && !loading) {
      setLoading(true);
      setId(dashboardId, backend);
    }
  }, [dashboard, dashboardId, backend, loading]);

  useEffect(() => {
    if (!(window as any).Onvo) {
      (window as any).Onvo = {};
    }
    (window as any).Onvo.setCopilotOpen = (val: boolean) => setOpen(val);
  }, []);

  useEffect(() => {
    if (!open) {
      setMessages([]);
      setTab("home");
      setSelectedQuestion(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (!trigger) {
      setOpen(true);
    }
  }, [trigger]);

  useEffect(() => {
    if (selectedQuestion) {
      // @ts-ignore
      let questionMessages = selectedQuestion.messages as any[];
      setMessages(questionMessages);
      setTimeout(scrollToBottom, 100);
    } else {
      setMessages([]);
    }
  }, [selectedQuestion]);

  const scrollToBottom = () => {
    if (scroller.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight;
    }
  };


  const addToDashboard = async (message: string | any, library?: boolean) => {
    if (!selectedQuestion || !dashboard || !team) return;

    let textContent =
      typeof message === "string"
        ? message
        : message.map((a: any) => (a.type === "text" ? a.text : "")).join("\n");
    let output = {} as any;
    let code = "";

    if ((textContent || "").search("```") >= 0) {
      if (textContent.split("```python")[1]) {
        let code = textContent.split("```python")[1].split("```")[0].trim();
        code = code;
      }
      if (textContent.split("```json")[1]) {
        let out = textContent.split("```json")[1].split("```")[0].trim();
        output = JSON.parse(out);
      }
    }

    const title = output?.options?.plugins?.title?.text || "Chart";

    let newObj: any = {
      title: title,
      layouts: {
        lg: {
          x: 0,
          y: lg,
          w: 4,
          h: output.type === "metric" ? 8 : 20,
        },
        sm: {
          x: 0,
          y: sm,
          w: 3,
          h: output.type === "metric" ? 8 : 20,
        },
      },
      messages: messages.filter((a) => (a.role === "user" || a.role === "assistant") && a.content && (a.content + "").trim() !== ""),
      dashboard: dashboard.id,
      team: team.id || "",
      code: code,
      cache: output,
      created_at: new Date().toISOString(),
      settings: {},
      use_in_library: library
    };

    if (!backend) return;

    toast.promise(
      () => {
        return backend.widgets.create(newObj);
      },
      {
        loading: library
          ? "Adding widget to library..."
          : "Adding widget to dashboard...",
        success: (widget) => {
          refreshWidgets(backend);
          if (backend) {
            backend.logs.create({
              type: LogType.EditWidget,
              dashboard: widget.dashboard,
              widget: widget.id,
            })
          }
          if (library) {
            return "Widget added to library";
          } else {
            return "Widget added to dashboard";
          }
        },
        error: (error) =>
          library
            ? "Error adding widget to library: " + error.message
            : "Error adding widget to dashboard: " + error.message,
      }
    );
  };


  const exportWidget = (index: number, format: "svg" | "png" | "csv" | "xlsx" | "jpeg") => {
    if (!backend || !selectedQuestion) return;
    toast.promise(
      () => {
        return backend.question(selectedQuestion?.id).export(index, format, theme);
      },
      {
        loading: `Exporting widget as ${format}...`,
        success: (blob) => {
          let blobUrl = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.download = "Download." + format;
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

  const askQuestion = async (msg: MessageType[]) => {
    setMessages(msg);
    setQuestionLoading(true);
    window.setTimeout(scrollToBottom, 300);
    if (!dashboard) {
      toast.error("Failed to find associated dashboard.");
      return;
    }
    try {
      let response = await backend?.questions.create({
        dashboardId: dashboard?.id,
        questionId: selectedQuestion?.id || undefined,
        messages: msg as any,
      });
      setSelectedQuestion(response);
    } catch (e: any) {
      toast.error("Failed to ask question: ", e.message);
      setMessages((m) => {
        return [
          ...m,
          {
            role: "assistant",
            content:
              "I could not answer your question. Could you try adding some more details about the question?",
          },
        ];
      });
    }

    setQuestionLoading(false);
  };

  const questionMessageList = useMemo(() => {
    if (!dashboard) {
      return null;
    }

    return messages.map((message, index) => (
      <QuestionMessage
        key={
          (selectedQuestion?.id || "null") + "-" + messages.length + "-" + index
        }
        message={message}
        isLast={index === messages.length - 1}
        onReply={(msg) => {
          let newMessages = [
            ...messages,
            {
              role: "user" as const,
              content: msg,
            },
          ];
          askQuestion(newMessages);
        }}
        onDownload={(format) => {
          exportWidget(index, format);
        }}
        onEdit={(msg) => {
          let newMessages = messages
            .map((m, i) => {
              if (i === index) {
                return {
                  ...m,
                  content: msg,
                };
              }
              return m;
            })
            .filter((m, i) => i <= index);
          askQuestion(newMessages);
        }}
        onAdd={(library) => {
          addToDashboard(message.content, library).then(() => {

            setSelectedQuestion(undefined);
            setMessages([]);
            setOpen(false);
          });
        }}
      />
    ));
  }, [messages, dashboard, selectedQuestion, team]);

  return (
    <>
      <dialog open={open}>

        <div
          className={twMerge(
            "onvo-root-style onvo-copilot-modal onvo-@container/questionmodal onvo-foreground-color onvo-animate-dialogOpen onvo-z-[50] onvo-fixed",
            variant === "fullscreen"
              ? "onvo-h-full onvo-w-full onvo-left-0"
              : "onvo-h-[calc(100vh-40px)] onvo-w-[480px] onvo-right-5 onvo-bottom-5 onvo-rounded-2xl onvo-overflow-hidden onvo-border-solid onvo-border onvo-border-slate-200 dark:onvo-border-slate-800 onvo-shadow-xl"
          )}
        >
          {!coupled && <Toaster position="bottom-right" richColors />}
          <div className="onvo-question-modal-question-list onvo-flex onvo-flex-col onvo-foreground-color onvo-absolute onvo-w-full onvo-right-0 onvo-top-0 onvo-z-20 onvo-h-full">
            <div
              className={
                "onvo-foreground-color onvo-h-12 onvo-top-0 onvo-w-full onvo-z-10 onvo-flex onvo-flex-row onvo-justify-between onvo-items-center onvo-gap-4 onvo-border-solid onvo-border-b onvo-px-3 onvo-border-black/10 onvo-py-2 dark:onvo-border-white/10"
              }
            >
              {trigger ? (
                <Icon
                  icon={XMarkIcon}
                  variant="shadow" className="onvo-border-black/10 onvo-background-color dark:onvo-border-white/10"
                  onClick={() => {
                    setOpen(false);
                  }}
                />) : <div></div>}
              <div className="onvo-flex onvo-w-full @xl/questionmodal:onvo-w-auto onvo-flex-row onvo-gap-1 onvo-justify-start onvo-items-center">
                <Text className="onvo-hidden @xl/questionmodal:onvo-block">
                  {dashboard?.title}
                </Text>
                <ChevronRightIcon className="onvo-hidden @xl/questionmodal:onvo-block onvo-h-4 onvo-w-4 dark:onvo-fill-slate-500" />
                <Label>{dashboard?.settings?.copilot_title || "Copilot"}</Label>
              </div>
              <div></div>
            </div>
            <div className="onvo-flex onvo-flex-grow onvo-w-full onvo-h-[calc(100%-52px)] onvo-overflow-y-auto onvo-scrollbar-thin onvo-flex-col ">
              {["home", "library", "history"].indexOf(tab) >= 0 && (
                <div className="onvo-py-2 onvo-px-2 onvo-w-full onvo-max-w-screen-lg onvo-flex onvo-mx-auto onvo-flex-col onvo-gap-4">
                  {tab === "home" && (
                    <div className="onvo-w-full onvo-flex onvo-flex-col onvo-items-center">
                      <Metric className="onvo-pt-10 onvo-text-center onvo-mb-4">
                        {dashboard?.settings?.copilot_description ||
                          "Create a widget"}
                      </Metric>
                      {dashboard?.settings?.enable_advanced_widget_creator ? (
                        <Tabs
                          className="onvo-w-full onvo-flex onvo-flex-col onvo-items-center"
                          defaultValue="simple"
                        >
                          <TabsList className="onvo-mx-auto" variant="solid">
                            <TabsTrigger value="simple">Simple</TabsTrigger>
                            <TabsTrigger value="advanced">Advanced</TabsTrigger>
                          </TabsList>
                          <TabsContent
                            value="simple"
                            className="onvo-w-full onvo-mt-2"
                          >
                            <PromptInput
                              hideSuggestions={true}
                              url={dashboard?.settings?.help_url}
                              onSubmit={(val) => {
                                let newMessages = [
                                  ...messages,
                                  {
                                    role: "user" as const,
                                    content: val,
                                  },
                                ];
                                askQuestion(newMessages);
                                setTab("chat");
                              }}
                            />
                          </TabsContent>
                          <TabsContent
                            value="advanced"
                            className="onvo-w-full onvo-mt-2"
                          >
                            <WidgetWizard
                              onSubmit={(val) => {
                                let newMessages = [
                                  ...messages,
                                  {
                                    role: "user" as const,
                                    content: val,
                                  },
                                ];
                                askQuestion(newMessages);
                                setTab("chat");
                              }}
                            />
                          </TabsContent>
                        </Tabs>
                      ) : (
                        <PromptInput
                          hideSuggestions={true}
                          url={dashboard?.settings?.help_url}
                          onSubmit={(val) => {
                            let newMessages = [
                              ...messages,
                              {
                                role: "user" as const,
                                content: val,
                              },
                            ];
                            askQuestion(newMessages);
                            setTab("chat");
                          }}
                        />
                      )}
                    </div>
                  )}
                  {(tab === "home" || tab === "library") && (
                    <WidgetLibrary
                      onExpanded={(bool) =>
                        bool ? setTab("library") : setTab("home")
                      }
                    />
                  )}

                  {(tab === "home" || tab === "history") && (
                    <QuestionHistory
                      variant="default"
                      onSelect={(q) => {
                        setSelectedQuestion(q);
                        setMessages([]);
                        setTab("chat");
                      }}
                      onExpanded={(bool) =>
                        bool ? setTab("history") : setTab("home")
                      }
                      onDelete={() => {
                        setSelectedQuestion(undefined);
                      }}
                    />
                  )}
                </div>
              )}

              {tab === "chat" && (
                <div className="onvo-flex onvo-flex-row onvo-w-full onvo-h-full">
                  <QuestionHistory
                    variant="sidebar"
                    onSelect={(q) => {
                      setSelectedQuestion(q);
                      setMessages([]);
                      setTab("chat");
                    }}
                    selectedId={selectedQuestion?.id}
                    onNew={() => {
                      setSelectedQuestion(undefined);
                      setMessages([]);
                      setTab("home");
                    }}
                    onExpanded={(bool) =>
                      bool ? setTab("history") : setTab("home")
                    }
                    onDelete={() => {
                      setSelectedQuestion(undefined);
                    }}
                  />
                  <div className="onvo-w-full onvo-h-full onvo-flex onvo-flex-col">
                    <div
                      className="onvo-flex onvo-w-full onvo-flex-grow onvo-flex-col onvo-gap-4 onvo-overflow-y-auto onvo-scrollbar-thin onvo-px-2 onvo-py-2"
                      ref={scroller}
                    >
                      <div className="onvo-flex onvo-flex-col onvo-relative onvo-mx-auto onvo-w-full onvo-max-w-screen-md">
                        {questionMessageList}
                        {questionLoading && (
                          <ChartLoader variant="message" />
                        )}
                      </div>
                    </div>
                    <PromptInput url={dashboard?.settings?.help_url} className="onvo-mb-4" onSubmit={val => {
                      let newMessages = [
                        ...messages,
                        {
                          role: "user" as const,
                          content: val,
                        },
                      ];
                      askQuestion(newMessages);
                    }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </dialog>
      {trigger && React.cloneElement(trigger as React.ReactElement, {
        onClick: (e: React.MouseEvent) => {
          setOpen(true);
        },
      })}
    </>
  );
};

export const Copilot = memo(CopilotRaw);
