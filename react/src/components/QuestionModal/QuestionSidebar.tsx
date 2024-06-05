import { Text } from "../../tremor/Text";
import { Button } from "../../tremor/Button";
import { Icon } from "../../tremor/Icon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TrashIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import { Empty } from "../Empty";
import React from "react";
import { useBackend } from "../Wrapper";
dayjs.extend(relativeTime);

const QuestionSidebarCard: React.FC<{
  question: any;
  onDelete?: () => void;
  onClick?: () => void;
  selected?: boolean;
}> = ({ question, onDelete, onClick, selected }) => {
  return (
    <div
      className={
        "onvo-group onvo-relative onvo-flex onvo-w-full onvo-flex-row onvo-items-start onvo-justify-start onvo-gap-3 onvo-rounded-lg onvo-p-2 hover:onvo-bg-gray-200 hover:onvo-dark:bg-gray-900" +
        (selected ? " onvo-bg-gray-200 dark:onvo-bg-gray-900" : "")
      }
    >
      <div className="onvo-flex-grow onvo-cursor-pointer" onClick={onClick}>
        <Text className="onvo-font-semibold onvo-text-sm">
          {question.query}
        </Text>
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

const QuestionSidebar: React.FC<{
  onSelect: (question: any | undefined) => void;
  onDelete?: () => void;
  selectedQuestionId?: string;
  loading: boolean;
  questions: any[];
}> = ({ onSelect, onDelete, selectedQuestionId, loading, questions }) => {
  const backend = useBackend();

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

  return (
    <div className="onvo-background-color onvo-w-[320px] onvo-flex-shrink-0 onvo-overflow-y-auto onvo-border-r onvo-border-gray-200 onvo-p-2 dark:onvo-border-gray-800">
      {loading && questions.length === 0 && (
        <div className="onvo-flex onvo-h-full onvo-w-full onvo-flex-col onvo-items-center onvo-justify-center">
          <div className="onvo-relative onvo-inline-flex onvo-h-12">
            <div className="onvo-w-8 onvo-h-8 onvo-bg-blue-500 onvo-rounded-full"></div>
            <div className="onvo-w-8 onvo-h-8 onvo-bg-blue-500 onvo-rounded-full onvo-absolute onvo-top-0 onvo-left-0 onvo-animate-ping"></div>
            <div className="onvo-w-8 onvo-h-8 onvo-bg-blue-500 onvo-rounded-full onvo-absolute onvo-top-0 onvo-left-0 onvo-animate-pulse"></div>
          </div>
          <Text>Loading questions...</Text>
        </div>
      )}
      {onSelect && (
        <Button
          variant="secondary"
          className="onvo-mb-2 onvo-w-full"
          disabled={loading}
          onClick={() => onSelect(undefined)}
        >
          Build a new visualization
        </Button>
      )}
      {!loading && questions.length === 0 && (
        <div className="onvo-flex onvo-h-full onvo-flex-col onvo-justify-center">
          <Empty
            title="No questions yet..."
            subtitle={
              "You can ask any question to the datasources connected to this dashboard"
            }
            icon={<QuestionMarkCircleIcon className="onvo-h-10 onvo-w-10" />}
          />
        </div>
      )}
      {(questions || []).map((a) => (
        <QuestionSidebarCard
          onDelete={() => deleteQuestion(a.id)}
          question={a}
          key={a.id}
          selected={selectedQuestionId === a.id}
          onClick={() => onSelect(a)}
        />
      ))}
    </div>
  );
};

export default QuestionSidebar;
