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
import React, { memo, useEffect, useMemo, useState } from "react";
import { useBackend } from "../../layouts/Wrapper";
import { Question } from "@onvo-ai/js";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { twMerge } from "tailwind-merge";
dayjs.extend(relativeTime);



function groupTextsByTime(entries: Pick<Question, "id" | "created_at" | "query">[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const groups: Record<string, Pick<Question, "id" | "created_at" | "query">[]> = {
    Today: [],
    'Previous 7 Days': [],
    'Previous 30 Days': [],
  };

  // Create month buckets for months until January of current year
  const months: Record<string, Pick<Question, "id" | "created_at" | "query">[]> = {};
  // Create year buckets for previous years
  const years: Record<string, Pick<Question, "id" | "created_at" | "query">[]> = {};

  for (let i = 0; i <= now.getMonth(); i++) {
    const monthDate = new Date(today);
    monthDate.setMonth(today.getMonth() - i);
    const monthName = monthDate.toLocaleString('default', { month: 'long' });
    months[monthName] = [];
  }


  entries.forEach(entry => {
    const entryDate = new Date(entry.created_at);
    const entryDay = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate());

    // Check for today
    if (entryDay.getTime() === today.getTime()) {
      groups['Today'].push(entry);
    }
    // Check for previous 7 days
    else if (entryDay >= sevenDaysAgo && entryDay < today) {
      groups['Previous 7 Days'].push(entry);
    }
    // Check for previous 30 days
    else if (entryDay >= thirtyDaysAgo && entryDay < sevenDaysAgo) {
      groups['Previous 30 Days'].push(entry);
    }
    // Check if it's from current year and before current month
    else if (entryDate.getFullYear() === now.getFullYear() && entryDate.getMonth() <= now.getMonth()) {
      const monthName = entryDate.toLocaleString('default', { month: 'long' });
      if (months[monthName]) {
        months[monthName].push(entry);
      }
    }
    // Group by year for older entries
    else {
      const year = entryDate.getFullYear().toString();
      if (!years[year]) {
        years[year] = [];
      }
      years[year].push(entry);
    }
  });

  // Sort years in descending order
  const sortedYears = Object.keys(years)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .reduce((obj: Record<string, Pick<Question, "id" | "created_at" | "query">[]>, year) => {
      obj[year] = years[year];
      return obj;
    }, {});

  // Merge all groups
  return {
    groups,
    months,
    years: sortedYears
  };
}

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
        "onvo-transition-all onvo-group onvo-relative onvo-flex onvo-w-full onvo-px-4 onvo-py-3 hover:onvo-bg-black/10 hover:onvo-dark:bg-white/10 onvo-rounded-2xl onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10"
      }
    >
      <div className="onvo-flex-grow onvo-flex onvo-flex-col onvo-justify-between onvo-cursor-pointer" onClick={onClick}>
        <Text className="onvo-text-md onvo-mb-2">{truncated}</Text>
        <Label className="onvo-font-semibold onvo-text-xs">
          {dayjs(question.created_at).fromNow()}
        </Label>
      </div>
      {onDelete && (
        <Icon
          variant="shadow"
          size="xs"
          className="onvo-absolute onvo-background-color onvo-border-black/10 dark:onvo-border-white/10 onvo-text-red-500 onvo-right-2 onvo-top-2 onvo-cursor-pointer onvo-opacity-0 group-hover:onvo-opacity-100"
          icon={TrashIcon}
          onClick={onDelete}
        />
      )}
    </div>
  );
};

const QuestionHistoryRaw: React.FC<{
  onSelect: (question: any | undefined) => void;
  onDelete?: () => void;
  onExpanded: (val: boolean) => void;
  onNew?: () => void;
  variant: "default" | "sidebar";
  selectedId?: string;
}> = ({ onSelect, onDelete, onExpanded, variant, onNew, selectedId }) => {
  const { backend } = useBackend();
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

  if (variant === "sidebar") {
    let { groups, months, years } = groupTextsByTime(questions.map(a => ({
      id: a.id,
      created_at: a.created_at,
      query: a.query,
    })));

    const layout = (question: Pick<Question, "id" | "created_at" | "query">) => {
      return <div
        onClick={() => onSelect(questions.find(a => a.id === question.id))}
        className={"onvo-rounded-md onvo-relative onvo-group onvo-px-2 onvo-py-2.5 onvo-cursor-pointer hover:onvo-bg-black/5 dark:hover:onvo-bg-white/5 " + (selectedId === question.id ? "onvo-bg-black/10 dark:onvo-bg-white/10" : "")}
        key={question.id}
      >
        <Text className="onvo-whitespace-nowrap onvo-overflow-hidden onvo-text-ellipsis">{question.query}</Text>

        {onDelete && (
          <Icon
            variant="shadow"
            size="xs"
            className="onvo-absolute onvo-background-color onvo-border-black/10 dark:onvo-border-white/10 onvo-text-red-500 onvo-right-[6px] onvo-top-[6px] onvo-cursor-pointer onvo-opacity-0 group-hover:onvo-opacity-100"
            icon={TrashIcon}
            onClick={onDelete}
          />
        )}
      </div>
    }

    return <div className="onvo-w-[260px] onvo-flex-shrink-0 onvo-overflow-auto onvo-background-color onvo-h-full onvo-scrollbar-thin">
      <Button
        variant="primary"
        className="onvo-w-[calc(100%-16px)] onvo-m-2"
        onClick={() => {
          if (onNew) {
            onNew();
          }
        }}
      >
        + New widget
      </Button>
      {Object.keys(groups).filter(group => groups[group].length > 0).map((group) => {
        return <div key={group} className="onvo-p-2">
          <Text className="onvo-font-semibold onvo-text-xs onvo-p-1">{group}</Text>
          {groups[group].map(layout)}
        </div>
      })}
      {Object.keys(months).filter(month => months[month].length > 0).map((month) => {
        return <div key={month} className="onvo-p-2">
          <Text className="onvo-font-semibold onvo-text-xs onvo-p-1">{month}</Text>
          {months[month].map(layout)}
        </div>
      })}
      {Object.keys(years).map((year) => {
        return <div key={year} className="onvo-p-2">
          <Text className="onvo-font-semibold onvo-text-xs onvo-p-1">{year}</Text>
          {years[year].map(layout)}
        </div>
      })}
    </div>
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
              className="onvo-transition-all onvo-group onvo-relative onvo-flex onvo-flex-col onvo-w-full onvo-px-3 onvo-py-2 onvo-rounded-lg onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10"
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

export const QuestionHistory = memo(QuestionHistoryRaw);
