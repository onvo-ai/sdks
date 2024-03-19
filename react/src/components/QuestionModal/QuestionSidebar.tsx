import { Text, Icon, Bold, Button } from "@tremor/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TrashIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import Empty from "./Empty";
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
        "group relative flex w-full flex-row items-start justify-start gap-3 rounded-lg p-2 hover:bg-gray-200 hover:dark:bg-gray-900" +
        (selected ? " bg-gray-200 dark:bg-gray-900" : "")
      }
    >
      <div className="flex-grow cursor-pointer" onClick={onClick}>
        <Text>
          <Bold>{question.query}</Bold>
        </Text>
      </div>
      {onDelete && (
        <Icon
          variant="shadow"
          className="absolute right-2 top-2 cursor-pointer opacity-0 group-hover:opacity-100"
          icon={TrashIcon}
          onClick={onDelete}
          color="red"
          size="xs"
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
    <div className="background-color w-[320px] flex-shrink-0 overflow-y-auto border-r border-gray-200 p-2 dark:border-gray-800">
      {loading && questions.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="relative inline-flex h-12">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
          </div>
          <Text>Loading questions...</Text>
        </div>
      )}
      {onSelect && (
        <Button
          variant="secondary"
          className="mb-2 w-full"
          disabled={loading}
          onClick={() => onSelect(undefined)}
        >
          New Question / Chart
        </Button>
      )}
      {!loading && questions.length === 0 && (
        <div className="flex h-full flex-col justify-center">
          <Empty
            title="No questions yet..."
            subtitle={
              "You can ask any question to the datasources connected to this dashboard"
            }
            icon={<QuestionMarkCircleIcon className="h-10 w-10" />}
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
