import { Label, Text, Title } from "../../tremor/Text";
import { Button } from "../../tremor/Button";
import { Icon } from "../../tremor/Icon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  TrashIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { toast } from "sonner";
import { Empty } from "../Empty";
import React, { useEffect, useMemo, useState } from "react";
import { useBackend } from "../Wrapper";
import { Question } from "@onvo-ai/js";
import { useDashboard } from "../Dashboard";
import { twMerge } from "tailwind-merge";
dayjs.extend(relativeTime);

const QuestionSidebarCard: React.FC<{
  question: Question;
  onDelete?: () => void;
  onClick?: () => void;
  expanded?: boolean;
}> = ({ question, onDelete, onClick, expanded }) => {
  let truncated = expanded
    ? question.query
    : question.query.slice(0, 100) + "...";
  return (
    <div
      className={
        "onvo-transition-all onvo-group onvo-relative onvo-flex onvo-w-full onvo-px-3 onvo-py-2 hover:onvo-bg-black/10 hover:onvo-dark:bg-white/10 onvo-rounded-lg onvo-border dark:onvo-border-slate-700"
      }
    >
      <div className="onvo-flex-grow onvo-cursor-pointer" onClick={onClick}>
        <Text className="!onvo-text-md">{truncated}</Text>
        <Label className="onvo-font-semibold onvo-text-xs">
          {dayjs(question.created_at).fromNow()}
        </Label>
      </div>
      {onDelete && (
        <Icon
          variant="shadow"
          size="xs"
          className="onvo-absolute onvo-text-red-500 onvo-right-2 onvo-top-2 onvo-cursor-pointer onvo-opacity-0 group-hover:onvo-opacity-100"
          icon={TrashIcon}
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export const QuestionHistory: React.FC<{
  onSelect: (question: any | undefined) => void;
  onDelete?: () => void;
  onExpanded: (val: boolean) => void;
}> = ({ onSelect, onDelete, onExpanded }) => {
  const backend = useBackend();
  const { dashboard } = useDashboard();

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  const getQuestions = async () => {
    setLoading(true);
    if (!backend || !dashboard) return;
    let qs: any[] = await backend.questions.list({ dashboard: dashboard.id });

    let sorted = qs.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    setQuestions(sorted);
    setLoading(false);
  };

  useEffect(() => {
    if (dashboard) {
      getQuestions();
    }
  }, [dashboard]);

  const deleteQuestion = (questionId: string) => {
    if (!backend) return;
    toast.promise(backend.questions.delete(questionId), {
      loading: "Deleting question...",
      success: () => {
        if (onDelete) {
          onDelete();
        }
        return "Question deleted";
      },
      error: (e) => {
        return "Failed to delete question: " + e.message;
      },
    });
  };

  const filteredQuestions = useMemo(() => {
    if (expanded) return questions;
    else return questions.slice(0, 6);
  }, [expanded, questions]);

  if (!loading && filteredQuestions.length === 0) {
    return <></>;
  }

  return (
    <div className={"onvo-w-full onvo-flex onvo-flex-col "}>
      <div className="onvo-flex onvo-w-full onvo-p-2 onvo-flex-row onvo-items-center onvo-justify-between">
        <Title>History</Title>
        <div className="onvo-flex onvo-flex-row onvo-items-center">
          {expanded ? (
            <Button
              variant="ghost"
              onClick={() => {
                setExpanded(false);
                onExpanded(false);
              }}
            >
              View less
              <XMarkIcon className="onvo-size-4 onvo-ml-1" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                setExpanded(true);
                onExpanded(true);
              }}
            >
              View more
              <ArrowRightIcon className="onvo-size-4 onvo-ml-1" />
            </Button>
          )}
        </div>
      </div>
      <div
        className={twMerge(
          "onvo-w-full onvo-grid onvo-gap-3",
          expanded
            ? "onvo-grid-cols-1"
            : "onvo-grid-cols-2 @xl/questionmodal:onvo-grid-cols-3"
        )}
      >
        {loading &&
          [1, 2, 3, 4, 5, 6].map((a) => (
            <div
              key={"question-history-loader-" + a}
              className="onvo-transition-all onvo-group onvo-relative onvo-flex onvo-flex-col onvo-w-full onvo-px-3 onvo-py-2 onvo-rounded-lg onvo-border dark:onvo-border-slate-700"
            >
              <div className="onvo-h-6 onvo-bg-slate-200 onvo-rounded-md dark:onvo-bg-slate-700 onvo-w-[95%] onvo-mb-1"></div>
              <div className="onvo-w-[30%] onvo-h-4 onvo-mb-2 onvo-bg-slate-200 onvo-rounded-md dark:onvo-bg-slate-700"></div>
              <div className="onvo-w-[60%] onvo-h-3 onvo-bg-slate-200 onvo-rounded-md dark:onvo-bg-slate-700"></div>
            </div>
          ))}
        {filteredQuestions.map((a) => (
          <QuestionSidebarCard
            onDelete={() => deleteQuestion(a.id)}
            question={a}
            key={a.id}
            onClick={() => onSelect(a)}
            expanded={expanded}
          />
        ))}
      </div>
    </div>
  );
};
