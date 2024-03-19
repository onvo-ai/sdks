import {
  TextInput,
  Text,
  Icon,
  Textarea,
  Title,
  Card,
  Button,
} from "@tremor/react";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import { ArrowUpIcon, BackwardIcon } from "@heroicons/react/24/outline";
import { create } from "zustand";
import QuestionMessage from "./QuestionMessage";
import QuestionSidebar from "./QuestionSidebar";
import React from "react";
import { useMeasure } from "@uidotdev/usehooks";
import SuggestionsBar from "./SuggestionsBar";
import { useBackend } from "../Wrapper";
import { useDashboard } from "../Dashboard";
import Logo from "./Logo";
import QuestionLoader from "./QuestionLoader";
import { Question } from "@onvo-ai/js";

dayjs.extend(relativeTime);

export const useQuestionModal = create<{
  open: boolean;
  setOpen: (o: boolean) => void;
}>((set) => ({
  open: false,
  setOpen: (o: boolean) => set({ open: o }),
}));

export const QuestionModal: React.FC<{}> = ({}) => {
  const backend = useBackend();
  const [containerRef, { width }] = useMeasure();
  const { dashboard } = useDashboard();

  const input = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useQuestionModal((state) => [
    state.open,
    state.setOpen,
  ]);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const getQuestions = async () => {
    setLoading(true);
    if (!backend) return;
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

  useEffect(() => {
    if (dashboard && dashboard.id) {
      getQuestions();
    }
  }, [dashboard]);

  const scrollToBottom = () => {
    if (scroller.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (open && dashboard && dashboard.id) {
      backend
        ?.dashboard(dashboard.id)
        .getWidgetSuggestions()
        .then((newSuggestions: string[]) => {
          if (newSuggestions.length > 0) {
            setSuggestions(newSuggestions);
          }
        });

      scrollToBottom();
      setMessages([]);
      setSelectedQuestion(undefined);
    } else {
      setSuggestions([]);
    }
  }, [open, dashboard]);

  useEffect(() => {
    if (selectedQuestion) {
      // @ts-ignore
      let questionMessages = selectedQuestion.messages as any[];
      setMessages(questionMessages);
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
    try {
      let response = await backend?.questions.create({
        dashboardId: dashboard?.id,
        questionId: selectedQuestion?.id || undefined,
        messages: msg,
      });
      setSelectedQuestion(response);
    } catch (e: any) {
      toast.error("Failed to ask question: ", e.message);
    }

    setQuestionLoading(false);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={"absolute left-0 right-0 w-full"}
      ></div>
      <div className={"h-[55px] w-full"}></div>
      <div
        className={
          "foreground-color fixed bottom-0 right-0 z-10 border-t border-gray-200 p-2 dark:border-gray-800"
        }
        style={{ width: width || 0 }}
      >
        <div
          className="relative mx-auto flex w-full max-w-2xl flex-row items-center gap-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <TextInput
            className="background-color pr-[52px]"
            placeholder={`Ask your dashboard for a chart or a question...`}
          />
          <Icon
            size="xs"
            className="absolute right-2 top-1 z-10"
            icon={ArrowUpIcon}
            variant="solid"
          />
        </div>
      </div>

      <Transition appear show={open} as={Fragment as any}>
        <div
          className="foreground-color fixed right-0 top-0 z-20 h-screen"
          style={{
            width: width || 0,
          }}
        >
          <div
            className={
              "foreground-color fixed right-0 top-0 z-10 flex flex-row items-center gap-4 border-b border-gray-200 p-3 dark:border-gray-800"
            }
            style={{
              width: width || 0,
            }}
          >
            <Button
              variant="light"
              size="sm"
              icon={BackwardIcon}
              onClick={() => {
                setOpen(false);
              }}
            >
              Back to dashboard
            </Button>
            <div className="flex flex-row w-full flex-grow justify-center items-center">
              <Title
                onClick={() => {
                  setOpen(false);
                }}
              >
                {dashboard?.title} / Questions
              </Title>
            </div>
            <div className="w-[170px] h-4" />
          </div>
          <Transition.Child
            as={Fragment as any}
            enter="ease-out delay-200 duration-300"
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-12"
          >
            <div className="flex h-full w-full flex-row pt-[50px]">
              <QuestionSidebar
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
              <div className="flex h-full w-full flex-col justify-between">
                <div
                  className="flex w-full flex-grow flex-col gap-4 overflow-y-auto px-2 py-4"
                  ref={scroller}
                >
                  <div className="mx-auto w-full max-w-2xl">
                    {messages.length === 0 && !questionLoading && (
                      <>
                        <div className="flex h-full w-full flex-col items-center justify-center">
                          <Icon
                            icon={() => <Logo height={72} width={72} />}
                            variant="shadow"
                            size="xl"
                          />
                          <Title className="mt-2">
                            Ask me for a widget or a question
                          </Title>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {suggestions.length > 0
                            ? suggestions.map((a) => (
                                <Card
                                  key={a}
                                  className="foreground-color cursor-pointer p-3"
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
                                  className="foreground-color animate-pulse"
                                  key={"skeleton-" + a}
                                >
                                  <div className="mb-2 h-2 w-10/12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                  <div className="h-2 w-7/12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                </Card>
                              ))}
                        </div>
                      </>
                    )}
                    {messages.map((a, index) => (
                      <QuestionMessage
                        dashboardId={dashboard.id}
                        teamId={
                          dashboard.team || selectedQuestion?.team || undefined
                        }
                        questionId={selectedQuestion?.id || "null"}
                        onDelete={() => {
                          let newMessages = messages.filter(
                            (m, i) => i < index
                          );
                          backend?.questions.update(
                            selectedQuestion?.id || "null",
                            {
                              messages: newMessages,
                            }
                          );
                          setMessages(newMessages);
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
                          a.content.substring(0, 10)
                        }
                        onClose={() => {
                          setSelectedQuestion(undefined);
                          setMessages([]);
                          setOpen(false);
                        }}
                        messages={messages.filter(
                          (a, i) => a.role === "user" && i < index
                        )}
                        role={a.role}
                        content={a.content}
                      />
                    ))}

                    {questionLoading && <QuestionLoader />}
                  </div>
                </div>

                <div className="relative mx-auto mb-2 mt-4 w-full max-w-2xl px-2">
                  {messages.length > 0 && (
                    <SuggestionsBar onSelect={(val) => setQuery(val)} />
                  )}
                  <div className="relative flex w-full flex-col items-center justify-center gap-2">
                    <Textarea
                      className="background-color min-h-[58px] pr-[52px]"
                      ref={input}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Ask your dashboard for a chart or a question...`}
                      autoFocus
                    />
                    <Icon
                      className="absolute right-3 top-3 z-10"
                      icon={ArrowUpIcon}
                      variant="solid"
                      onClick={(e) => {
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
                    <Text className="mt-0 text-center text-xs">
                      Not sure how to write a prompt?{" "}
                      <a
                        href="https://onvo.ai/blog/writing-better-ai-prompts-for-dashboard-generation/"
                        target="_blank"
                        className="text-blue-500"
                      >
                        Check out this article
                      </a>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
};
