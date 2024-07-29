import { Textarea } from "../../tremor/Textarea";
import { Label, Metric, Text } from "../../tremor/Text";
import { Icon } from "../../tremor/Icon";
import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import QuestionMessage from "./QuestionMessage";
import { QuestionHistory } from "../../components/QuestionHistory";
import React from "react";
import { SuggestionsBar } from "../../components/SuggestionsBar";
import { useBackend } from "../Wrapper";
import { useDashboard } from "../Dashboard/useDashboard";
import { ChartLoader } from "../../components/ChartLoader";
import { Question } from "@onvo-ai/js";

import { twMerge } from "tailwind-merge";
import { WidgetLibrary } from "../../components/WidgetLibrary";
import { Button } from "../../tremor/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../tremor/Tabs";
import { WidgetWizard } from "../../components/WidgetWizard";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/16/solid";

dayjs.extend(relativeTime);

export interface MessageType {
  role: "user" | "assistant" | "tool";
  content: string | ({ text: string; type: "text" } | { type: "tool_user" })[];
  tool_calls?: any[];
}

const SimpleCreatorTool: React.FC<{ onSubmit: (val: string) => void }> = ({
  onSubmit,
}) => {
  const [value, setValue] = useState("");
  const { dashboard } = useDashboard();
  return (
    <div className=" onvo-relative onvo-mx-auto onvo-max-w-screen-lg onvo-flex onvo-w-full onvo-flex-col onvo-items-center onvo-justify-center">
      <Textarea
        className="onvo-background-color onvo-min-h-[96px] !onvo-rounded-lg onvo-pr-[52px] onvo-z-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Describe the widget you want to create...`}
        autoFocus
        onKeyUp={(evt) => {
          if (evt.key === "Enter" && !evt.shiftKey) {
            onSubmit(value);
            setValue("");
          }
        }}
      />
      <Icon
        className="onvo-absolute onvo-right-3 onvo-top-3 onvo-z-10"
        variant="solid"
        icon={ArrowUpIcon}
        onClick={() => {
          if (value.trim() !== "") {
            onSubmit(value);
            setValue("");
          }
        }}
      />
      <div className="onvo-w-full onvo-pb-2 onvo-pt-3 -onvo-mt-2 onvo-border onvo-border-slate-200 onvo-bg-slate-100 dark:onvo-bg-slate-900 dark:onvo-border-slate-800 onvo-rounded-b-lg">
        <Text className="onvo-mt-0 onvo-text-center onvo-text-xs">
          Not sure how to write a prompt?{" "}
          <a
            href={
              dashboard?.settings?.help_url &&
              dashboard?.settings?.help_url.trim() !== ""
                ? dashboard?.settings?.help_url
                : "https://onvo.ai/blog/writing-better-ai-prompts-for-dashboard-generation/"
            }
            target="_blank"
            className="onvo-text-blue-500"
          >
            Check out this article
          </a>
        </Text>
      </div>
    </div>
  );
};
export const Copilot: React.FC<{
  dashboardId: string;
  trigger: React.ReactNode;
  variant: "fullscreen" | "copilot";
}> = ({ trigger, variant, dashboardId }) => {
  const { backend, team, adminMode } = useBackend();
  const { dashboard, setId } = useDashboard();

  useEffect(() => {
    if (backend) {
      setId(dashboardId, backend);
    }
  }, [dashboardId, backend]);

  const scroller = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [tab, setTab] = useState<"home" | "history" | "library" | "chat">(
    "home"
  );

  useEffect(() => {
    if (!(window as any).Onvo) {
      (window as any).Onvo = {};
    }
    (window as any).Onvo.setCopilotOpen = (val: boolean) => setOpen(val);
  }, []);

  const scrollToBottom = () => {
    if (scroller.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!open) {
      setMessages([]);
      setTab("home");
      setSelectedQuestion(undefined);
    }
  }, [open]);

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

    return messages.map((a, index) => (
      <QuestionMessage
        key={
          (selectedQuestion?.id || "null") + "-" + messages.length + "-" + index
        }
        logo={team?.logo || ""}
        messages={messages}
        index={index}
        dashboardId={dashboard?.id}
        teamId={dashboard?.team || selectedQuestion?.team || undefined}
        questionId={selectedQuestion?.id || "null"}
        onDelete={() => {
          let newMessages = messages.filter((m, i) => i < index);
          backend?.questions.update(selectedQuestion?.id || "null", {
            messages: newMessages as any,
          });
          setMessages(newMessages);
        }}
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
        onClose={() => {
          setSelectedQuestion(undefined);
          setMessages([]);
          setOpen(false);
        }}
      />
    ));
  }, [messages, dashboard, selectedQuestion, team]);

  if (!dashboard?.settings?.can_ask_questions && !adminMode) return <></>;

  return (
    <>
      <dialog open={open}>
        <div
          className={twMerge(
            "onvo-@container/questionmodal onvo-animate-dialogOpen onvo-z-50 onvo-fixed",
            variant === "fullscreen"
              ? "onvo-h-full onvo-w-full onvo-left-0"
              : "onvo-h-[calc(100vh-40px)] onvo-w-[400px] onvo-right-5 onvo-bottom-5 onvo-rounded-lg onvo-overflow-hidden onvo-border onvo-border-slate-200 dark:onvo-border-slate-800 onvo-shadow-xl"
          )}
        >
          <div className="onvo-question-modal-question-list onvo-flex onvo-flex-col onvo-foreground-color onvo-absolute onvo-w-full onvo-right-0 onvo-top-0 onvo-z-20 onvo-h-full">
            <div
              className={
                "onvo-foreground-color onvo-top-0 onvo-w-full onvo-z-10 onvo-flex onvo-flex-row onvo-justify-between onvo-items-center onvo-gap-4 onvo-border-b onvo-border-gray-200 onvo-px-3 onvo-py-2 dark:onvo-border-gray-800"
              }
            >
              <Icon
                icon={XMarkIcon}
                variant="shadow"
                onClick={() => {
                  setOpen(false);
                }}
              />
              <div className="onvo-flex onvo-w-full @xl/questionmodal:onvo-w-auto onvo-flex-row onvo-gap-1 onvo-justify-start onvo-items-center">
                <Text className="onvo-hidden @xl/questionmodal:onvo-block">
                  {dashboard?.title}
                </Text>
                <ChevronRightIcon className="onvo-hidden @xl/questionmodal:onvo-block onvo-h-4 onvo-w-4 dark:onvo-fill-slate-500" />
                <Label>{dashboard?.settings?.copilot_title || "Copilot"}</Label>
              </div>
              <Button
                variant="primary"
                className="onvo-flex-shrink-0"
                onClick={() => {
                  setSelectedQuestion(undefined);
                  setMessages([]);
                  setQuery("");
                  setTab("home");
                }}
              >
                + New widget
              </Button>
            </div>
            <div className="onvo-flex onvo-flex-grow onvo-w-full onvo-h-[calc(100%-52px)] onvo-overflow-y-auto onvo-scrollbar-thin  onvo-flex-col ">
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
                            <SimpleCreatorTool
                              onSubmit={(val) => {
                                let newMessages = [
                                  ...messages,
                                  {
                                    role: "user" as const,
                                    content: val,
                                  },
                                ];
                                askQuestion(newMessages);
                                setQuery("");
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
                        <SimpleCreatorTool
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
                      onSelect={(q) => {
                        setSelectedQuestion(q);
                        setMessages([]);
                        setQuery("");
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
                <>
                  <div
                    className="onvo-flex onvo-w-full onvo-flex-grow onvo-flex-col onvo-gap-4 onvo-overflow-y-auto onvo-scrollbar-thin onvo-px-2 onvo-py-2"
                    ref={scroller}
                  >
                    <div className="onvo-flex onvo-flex-col onvo-relative onvo-mx-auto onvo-w-full onvo-max-w-screen-lg">
                      {questionMessageList}
                      {questionLoading && (
                        <ChartLoader
                          variant="message"
                          logo={team?.logo || ""}
                        />
                      )}
                    </div>
                  </div>
                  <div className="onvo-relative onvo-mx-auto onvo-mb-2 onvo-mt-4 onvo-w-full onvo-max-w-screen-lg onvo-px-2">
                    {messages.length > 0 && (
                      <SuggestionsBar onSelect={(val) => setQuery(val)} />
                    )}
                    <div className="onvo-relative onvo-flex onvo-w-full onvo-flex-col onvo-items-center onvo-justify-center onvo-gap-2">
                      <Textarea
                        className="onvo-background-color onvo-min-h-[58px] onvo-pr-[52px]"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Describe the widget you want to create...`}
                        autoFocus
                        onKeyUp={(evt) => {
                          if (evt.key === "Enter" && !evt.shiftKey) {
                            let newMessages = [
                              ...messages,
                              {
                                role: "user" as const,
                                content: query,
                              },
                            ];
                            askQuestion(newMessages);
                            setQuery("");
                          }
                        }}
                      />
                      <Icon
                        className="onvo-absolute onvo-right-3 onvo-top-3 onvo-z-10"
                        variant="solid"
                        icon={ArrowUpIcon}
                        onClick={() => {
                          if (query.trim() !== "") {
                            let newMessages = [
                              ...messages,
                              {
                                role: "user" as const,
                                content: query,
                              },
                            ];
                            askQuestion(newMessages);
                            setQuery("");
                          }
                        }}
                      />
                      <Text className="onvo-mt-0 onvo-text-center onvo-text-xs">
                        Not sure how to write a prompt?{" "}
                        <a
                          href={
                            dashboard?.settings?.help_url &&
                            dashboard?.settings?.help_url.trim() !== ""
                              ? dashboard?.settings?.help_url
                              : "https://onvo.ai/blog/writing-better-ai-prompts-for-dashboard-generation/"
                          }
                          target="_blank"
                          className="onvo-text-blue-500"
                        >
                          Check out this article
                        </a>
                      </Text>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </dialog>
      {React.cloneElement(trigger as React.ReactElement, {
        onClick: (e: React.MouseEvent) => {
          setOpen(true);
        },
      })}
    </>
  );
};
