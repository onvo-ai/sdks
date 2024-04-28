import { Button, Text, Card, Bold, Icon, Textarea } from "@tremor/react";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useBackend } from "../Wrapper";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import {
  ArrowDownTrayIcon,
  ChevronUpIcon,
  DocumentChartBarIcon,
  PencilIcon,
  PhotoIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import Loader from "./Loader";
import ChartBase from "../Chart/ChartBase";
import { useDashboard } from "../Dashboard";
import Logo from "./Logo";
import { UserIcon } from "@heroicons/react/24/solid";
import Dropdown from "../Chart/Dropdown";
dayjs.extend(relativeTime);

const QuestionMessage: React.FC<{
  index: number;
  dashboardId: string;
  questionId: string;
  messages: { role: "user" | "assistant" | "tool"; content: string }[];
  role: "user" | "assistant" | "tool";
  content: string;
  teamId?: string;
  onClose: () => void;
  onDelete: () => void;
  onEdit: (msg: string) => void;
  onReply: (msg: string) => void;
}> = ({
  index,
  role,
  content,
  questionId,
  dashboardId,
  messages,
  teamId,
  onClose,
  onDelete,
  onEdit,
  onReply,
}) => {
  const backend = useBackend();
  const { refreshWidgets, widgets, editable } = useDashboard();

  const [output, setOutput] = useState<any>();
  const [code, setCode] = useState("");
  const [answer, setAnswer] = useState("");

  const [editing, setEditing] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const title = useMemo(() => {
    if (output?.options?.plugins?.title?.text) {
      return output.options.plugins.title.text;
    }
    return "Chart";
  }, [output]);

  const addToDashboard = async (e: any) => {
    if (!questionId) return;

    e.preventDefault();
    e.stopPropagation();
    let maxHeight = 0;
    widgets.forEach((i: any) => {
      if (i.y + i.h > maxHeight) maxHeight = i.y + i.h;
    });
    let newObj: any = {
      title: title,
      x: 0,
      y: maxHeight,
      w: 4,
      h: output.type === "metric" ? 10 : 20,
      messages: messages,
      dashboard: dashboardId,
      team: teamId || "",
      code: code,
      cache: JSON.stringify(output),
      created_at: new Date().toISOString(),
      settings: {},
    };

    if (!backend) return;

    toast.promise(
      () => {
        return backend.widgets.create(newObj);
      },
      {
        loading: "Adding widget to dashboard...",
        success: () => {
          refreshWidgets();
          onClose();
          return "Widget added to dashboard";
        },
        error: (error) => "Error adding widget to dashboard: " + error.message,
      }
    );
  };

  useEffect(() => {
    if (role === "assistant" || role === "tool") {
      if ((content || "").search("```") >= 0) {
        if (content.split("```python")[1]) {
          let code = content.split("```python")[1].split("```")[0].trim();
          setCode(code);
        }
        if (content.split("```json")[1]) {
          let out = content.split("```json")[1].split("```")[0].trim();
          setOutput(JSON.parse(out));
          let ans = content.split("```json")[1].split("```")[1];
          setAnswer(ans || "");
        }
        setOptions([]);
      } else if ((content || "").search("`") >= 0) {
        let opts = content.match(/(\`.*?\`)/g)?.map((a) => a.replace(/`/g, ""));
        let ans = content.split("`")[0];
        setAnswer(ans);
        setOptions(opts || []);
      } else {
        setAnswer(content);
        setOptions([]);
      }
    } else {
      setAnswer(content);
    }
  }, [content, role]);

  if (!content || content.trim() === "") {
    return <></>;
  }
  if (role === "user") {
    return (
      <div className="onvo-question-message-user group relative mb-3 flex flex-row items-start justify-start gap-3">
        <Icon variant="shadow" icon={UserIcon} size="sm" />
        <div className="w-full">
          {editing ? (
            <Textarea
              defaultValue={content}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          ) : (
            <Text>{content}</Text>
          )}

          {editing ? (
            <div className="flex flex-row gap-2 mt-2">
              <Button
                size="sm"
                className="py-1 rounded-md"
                onClick={() => {
                  onEdit(newMessage);
                  setEditing(false);
                }}
              >
                Regenerate chart
              </Button>
              <Button
                size="sm"
                className="py-1 rounded-md"
                color="red"
                onClick={() => {
                  onDelete();
                }}
              >
                Delete prompt
              </Button>
              <div className="flex-grow h-1" />
              <Button
                size="sm"
                className="py-1 rounded-md"
                variant="secondary"
                color="gray"
                onClick={() => {
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Icon
              onClick={() => setEditing(true)}
              variant="shadow"
              className="absolute top-2 right-2 hidden group-hover:block"
              icon={PencilIcon}
              size="sm"
            />
          )}
        </div>
      </div>
    );
  }

  const exportChart = (format: "svg" | "png" | "csv" | "xlsx" | "jpeg") => {
    if (!backend) return;
    toast.promise(
      () => {
        return backend.question(questionId).export(index, format);
      },
      {
        loading: `Exporting chart as ${format}...`,
        success: (blob) => {
          let blobUrl = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.download = title + "." + format;
          a.href = blobUrl;
          document.body.appendChild(a);
          a.click();
          a.remove();
          return "Chart exported";
        },
        error: (error) => "Error exporting chart: " + error.message,
      }
    );
  };

  const exportOptions = [
    {
      title: "Download as excel",
      icon: DocumentChartBarIcon,
      id: "download-excel",
      onClick: () => exportChart("xlsx"),
    },
    {
      title: "Download as csv",
      icon: TableCellsIcon,
      id: "download-csv",
      onClick: () => exportChart("csv"),
    },

    ...(output && output.type === "table"
      ? []
      : [
          {
            title: "Download as svg",
            icon: PhotoIcon,
            id: "download-svg",
            onClick: () => exportChart("svg"),
          },
          {
            title: "Download as png",
            icon: PhotoIcon,
            id: "download-png",
            onClick: () => exportChart("png"),
          },
          {
            title: "Download as jpeg",
            icon: PhotoIcon,
            id: "download-jpeg",
            onClick: () => exportChart("jpeg"),
          },
        ]),
  ];

  let isLast = index === messages.length - 1;
  let nextMessage = isLast ? "" : messages[index + 1].content || "";
  return (
    <div className="onvo-question-message-assistant relative mb-3 flex flex-row items-start justify-start gap-3">
      <Icon
        variant="shadow"
        icon={() => <Logo height={20} width={20} />}
        size="sm"
      />

      <article className="onvo-question-assistant-code-wrapper prose prose-sm dark:prose-invert w-full">
        {code.trim() !== "" && (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={
                    "flex w-full items-center justify-between bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 " +
                    (open ? "rounded-t-lg" : "rounded-lg")
                  }
                >
                  <span>Show working</span>
                  <div className="flex flex-row items-center gap-2">
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-gray-500`}
                    />
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel>
                  <ErrorBoundary
                    fallbackRender={({ error }) => <Text>{code}</Text>}
                  >
                    <ReactMarkdown className="onvo-question-assistant-code -mt-5">
                      {"```python\n" + code + "\n```"}
                    </ReactMarkdown>
                  </ErrorBoundary>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}
        {output && (
          <Card
            className={
              "group onvo-question-assistant-chart foreground-color relative my-2 py-3 flex flex-col " +
              (output.type === "metric" ? "h-32" : "h-96")
            }
          >
            <div
              className="onvo-chart-card-dropdown-wrapper z-20 absolute top-2 right-4 flex flex-row gap-2 items-center"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {editable && (
                <Button variant="primary" size="xs" onClick={addToDashboard}>
                  Add to dashboard
                </Button>
              )}
              <Dropdown options={[exportOptions]}>
                <Icon variant="shadow" icon={ArrowDownTrayIcon} size="sm" />
              </Dropdown>
            </div>

            <ChartBase json={output} id={questionId} title={title} />
          </Card>
        )}

        {answer && answer.trim() !== "" && (
          <ErrorBoundary fallbackRender={({ error }) => <Text>{answer}</Text>}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
          </ErrorBoundary>
        )}
        {options && options.length > 0 && (
          <div className="flex flex-row gap-2 -mt-2">
            {options.map((a) => (
              <Button
                onClick={() => isLast && onReply(a)}
                size="sm"
                disabled={!isLast}
                key={a}
                color={a === nextMessage ? "blue" : "gray"}
                variant="secondary"
              >
                {a}
              </Button>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default QuestionMessage;
