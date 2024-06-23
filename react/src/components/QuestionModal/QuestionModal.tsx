import { Textarea } from "../../tremor/Textarea";
import { Label, Metric, Text } from "../../tremor/Text";
import { Icon } from "../../tremor/Icon";
import { Card } from "../../tremor/Card";
import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import QuestionMessage from "./QuestionMessage";
import QuestionSidebar from "./QuestionSidebar";
import React from "react";
import { SuggestionsBar } from "../SuggestionsBar";
import { useBackend } from "../Wrapper";
import { useDashboard } from "../Dashboard";
import { Logo } from "../Logo";
import { ChartLoader } from "../ChartLoader";
import { Question } from "@onvo-ai/js";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { twMerge } from "tailwind-merge";

dayjs.extend(relativeTime);

export const QuestionModal: React.FC<{}> = ({}) => {
  const backend = useBackend();
  const { dashboard, adminMode } = useDashboard();

  const input = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [logo, setLogo] = useState("");

  const getQuestions = async () => {
    setLoading(true);
    if (!backend || !dashboard) return;
    let qs: any[] = await backend.questions.list({ dashboard: dashboard.id });
    setLoading(false);
    let sorted = qs.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    setQuestions(sorted);
    if (questionLoading) {
      if (sorted.length > 0) {
        setSelectedQuestion(sorted[0]);
      }
      setQuestionLoading(false);
    }
  };

  const getWidgetSuggestions = async () => {
    setSuggestions([]);
    if (!dashboard) return;
    let newSuggestions = await backend
      ?.dashboard(dashboard.id)
      .getWidgetSuggestions();
    if (newSuggestions && newSuggestions.length > 0) {
      setSuggestions(newSuggestions);
    }
  };

  const scrollToBottom = () => {
    if (scroller.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (open) {
      getQuestions();
      getWidgetSuggestions();
    } else {
      setMessages([]);
      setSelectedQuestion(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (!dashboard) return;
    backend?.teams.get(dashboard?.team).then((team) => {
      if (team && team.logo) {
        setLogo(team.logo);
      }
    });
  }, [dashboard]);

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

  const askQuestion = async (
    msg: { role: "user" | "assistant"; content: string }[]
  ) => {
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
        messages: msg,
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
        logo={logo}
        index={index}
        dashboardId={dashboard?.id}
        teamId={dashboard?.team || selectedQuestion?.team || undefined}
        questionId={selectedQuestion?.id || "null"}
        onDelete={() => {
          let newMessages = messages.filter((m, i) => i < index);
          backend?.questions.update(selectedQuestion?.id || "null", {
            messages: newMessages,
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
        key={
          (selectedQuestion?.id || "null") +
          "-" +
          messages.length +
          "-" +
          index +
          "-" +
          (a.content || "").substring(0, 10)
        }
        onClose={() => {
          setSelectedQuestion(undefined);
          setMessages([]);
          setOpen(false);
        }}
        messages={messages}
        role={a.role}
        content={a.content}
      />
    ));
  }, [messages, dashboard, selectedQuestion, logo]);

  const LogoIcon = useMemo(() => {
    return logo && logo.trim() !== "" ? (
      <Icon
        size="lg"
        variant="shadow"
        className="!onvo-p-0"
        icon={() => (
          <img
            src={logo}
            className="onvo-object-contain onvo-rounded-lg onvo-h-[88px] onvo-w-[88px]"
          />
        )}
      />
    ) : (
      <Icon
        size="lg"
        variant="shadow"
        icon={() => <Logo height={72} width={72} />}
      />
    );
  }, [logo]);

  if (!dashboard?.settings?.can_ask_questions && !adminMode) return <></>;

  return (
    <>
      <dialog open={open}>
        <div
          className={twMerge(
            "onvo-@container/questionmodal onvo-h-full onvo-animate-dialogOpen onvo-w-full onvo-z-50 onvo-fixed onvo-left-0"
          )}
        >
          <div className="onvo-question-modal-question-list onvo-flex onvo-flex-col onvo-foreground-color onvo-absolute onvo-w-full onvo-right-0 onvo-top-0 onvo-z-20 onvo-h-full">
            <div
              className={
                "onvo-foreground-color onvo-top-0 onvo-w-full onvo-z-10 onvo-flex onvo-flex-row onvo-items-center onvo-gap-4 onvo-border-b onvo-border-gray-200 onvo-px-3 onvo-py-2 dark:onvo-border-gray-800"
              }
            >
              <Icon
                icon={ChevronLeftIcon}
                variant="shadow"
                onClick={() => setOpen(false)}
              />
              <div className="onvo-flex onvo-flex-row onvo-w-full onvo-gap-1 onvo-flex-grow onvo-justify-start onvo-items-center">
                <Text className="onvo-hidden @xl/questionmodal:onvo-block">
                  {dashboard?.title}
                </Text>
                <ChevronRightIcon className="onvo-hidden @xl/questionmodal:onvo-block onvo-h-4 onvo-w-4 dark:onvo-fill-slate-500" />
                <Label>Create a chart</Label>
              </div>
              <div className="onvo-w-[170px] onvo-h-4" />
            </div>
            <div className="onvo-flex onvo-flex-grow onvo-w-full onvo-h-[calc(100%-52px)] onvo-flex-row">
              <QuestionSidebar
                className="onvo-hidden @xl/questionmodal:onvo-block"
                loading={loading}
                questions={questions}
                selectedQuestionId={selectedQuestion?.id || undefined}
                onSelect={(q) => {
                  setSelectedQuestion(q);
                  setMessages([]);
                  setQuery("");
                }}
                onDelete={() => {
                  setSelectedQuestion(undefined);
                  getQuestions();
                }}
              />
              <div className="onvo-flex onvo-h-full onvo-w-full onvo-flex-col onvo-justify-between">
                <div
                  className="onvo-flex onvo-w-full onvo-flex-grow onvo-flex-col onvo-gap-4 onvo-overflow-y-auto onvo-scrollbar-thin onvo-px-2 onvo-py-4"
                  ref={scroller}
                >
                  <div className="onvo-mx-auto onvo-flex onvo-flex-col onvo-max-w-2xl onvo-w-full">
                    {messages.length === 0 && !questionLoading && (
                      <>
                        <div className="onvo-flex onvo-w-full onvo-pt-8 onvo-pb-12 onvo-flex-col onvo-items-center onvo-justify-center">
                          {LogoIcon}
                          <Metric className="onvo-mt-2 onvo-text-center">
                            Ask me for a widget or visualisation
                          </Metric>
                        </div>
                        <div className="onvo-question-modal-suggestions-list onvo-grid onvo-grid-cols-2 onvo-gap-2">
                          {suggestions.length > 0
                            ? suggestions.map((a) => (
                                <Card
                                  key={a}
                                  className="onvo-foreground-color onvo-cursor-pointer onvo-p-3"
                                  onClick={() => {
                                    let newMessages = [
                                      ...messages,
                                      {
                                        role: "user" as const,
                                        content: a,
                                      },
                                    ];

                                    askQuestion(newMessages);
                                  }}
                                >
                                  <Text>{a}</Text>
                                </Card>
                              ))
                            : [1, 2, 3, 4].map((a) => (
                                <Card
                                  className="onvo-foreground-color onvo-animate-pulse"
                                  key={"skeleton-" + a}
                                >
                                  <div className="onvo-mb-2 onvo-h-2 onvo-w-10/12 onvo-rounded-full onvo-bg-gray-200 dark:onvo-bg-gray-700"></div>
                                  <div className="onvo-h-2 onvo-w-7/12 onvo-rounded-full onvo-bg-gray-200 dark:onvo-bg-gray-700"></div>
                                </Card>
                              ))}
                        </div>
                      </>
                    )}
                    {questionMessageList}
                    {questionLoading && <ChartLoader logo={logo} />}
                  </div>
                </div>

                <div className="onvo-relative onvo-mx-auto onvo-mb-2 onvo-mt-4 onvo-w-full onvo-max-w-2xl onvo-px-2">
                  {messages.length > 0 && (
                    <SuggestionsBar onSelect={(val) => setQuery(val)} />
                  )}
                  <div className="onvo-relative onvo-flex onvo-w-full onvo-flex-col onvo-items-center onvo-justify-center onvo-gap-2">
                    <Textarea
                      className="onvo-background-color onvo-min-h-[58px] onvo-pr-[52px]"
                      ref={input}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Describe the chart or visualization you want to make...`}
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
                        let newMessages = [
                          ...messages,
                          {
                            role: "user" as const,
                            content: query,
                          },
                        ];
                        askQuestion(newMessages);
                        setQuery("");
                      }}
                    />
                    <Text className="onvo-mt-0 onvo-text-center onvo-text-xs">
                      Not sure how to write a prompt?{" "}
                      <a
                        href="https://onvo.ai/blog/writing-better-ai-prompts-for-dashboard-generation/"
                        target="_blank"
                        className="onvo-text-blue-500"
                      >
                        Check out this article
                      </a>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>

      <div
        className={
          "onvo-relative onvo-right-0 onvo-z-10 onvo-w-full onvo-p-3 onvo-foreground-color onvo-border-t onvo-border-gray-200 dark:onvo-border-gray-800"
        }
      >
        <div
          onClick={() => setOpen(true)}
          className="onvo-rounded-lg onvo-cursor-text onvo-shadow-lg onvo-h-9 onvo-z-10 onvo-px-2 onvo-relative onvo-mx-auto onvo-flex onvo-w-full onvo-flex-grow onvo-flex-shrink-0 onvo-max-w-2xl onvo-flex-row onvo-items-center onvo-gap-2"
        >
          <div className="onvo-gradient-border onvo-foreground-color" />
          <SparklesIcon className="onvo-h-5 onvo-w-5 onvo-text-blue-500 onvo-z-10" />
          <Text className="onvo-z-10 onvo-flex-grow">
            Describe the chart you want to make...
          </Text>
          <Icon
            className="onvo-z-10"
            icon={ArrowUpIcon}
            size="xs"
            variant="solid"
          />
        </div>
      </div>
    </>
  );
};
