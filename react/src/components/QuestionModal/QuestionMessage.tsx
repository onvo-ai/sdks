import { Textarea } from "../../tremor/Textarea";
import { Button } from "../../tremor/Button";
import { Text } from "../../tremor/Text";
import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import { useEffect, useMemo, useState } from "react";
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
  DocumentChartBarIcon,
  PencilIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import ChartBase from "../Chart/ChartBase";
import { useDashboard } from "../Dashboard";
import Logo from "./Logo";
import { UserIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIconWrapper,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../tremor/DropdownMenu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../tremor/Accordion";

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
  const { refreshWidgets, widgets, dashboard, adminMode } = useDashboard();

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
      layouts: {
        lg: {
          x: 0,
          y: maxHeight,
          w: 4,
          h: output.type === "metric" ? 10 : 20,
        },
      },
      messages: messages.filter((a) => a.role !== "tool"),
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
      <div className="onvo-question-message-user onvo-group onvo-relative onvo-mb-3 onvo-flex onvo-flex-row onvo-items-start onvo-justify-start onvo-gap-3">
        <Icon variant="shadow" icon={UserIcon} />
        <div className="onvo-w-full">
          {editing ? (
            <Textarea
              defaultValue={content}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          ) : (
            <Text>{content}</Text>
          )}

          {editing ? (
            <div className="onvo-flex onvo-flex-row onvo-gap-2 onvo-mt-2">
              <Button
                className="!onvo-py-1"
                onClick={() => {
                  onEdit(newMessage);
                  setEditing(false);
                }}
              >
                Regenerate chart
              </Button>
              <Button
                className="!onvo-py-1"
                variant="destructive"
                onClick={() => {
                  onDelete();
                }}
              >
                Delete prompt
              </Button>
              <div className="onvo-flex-grow onvo-h-1" />
              <Button
                className="!onvo-py-1"
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
              className="onvo-absolute onvo-top-2 onvo-right-2 onvo-hidden group-hover:onvo-block"
              icon={PencilIcon}
              variant="shadow"
              size="xs"
            />
          )}
        </div>
      </div>
    );
  }

  const exportWidget = (format: "svg" | "png" | "csv" | "xlsx" | "jpeg") => {
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

  const ImageDownloadEnabled = useMemo(() => {
    if (output && output.type === "table") return false;
    if (adminMode) return true;
    if (dashboard?.settings && dashboard.settings.disable_download_images)
      return false;
    return true;
  }, [dashboard, adminMode, output]);

  const ReportDownloadEnabled = useMemo(() => {
    if (adminMode) return true;
    if (dashboard?.settings && dashboard.settings.disable_download_reports)
      return false;
    return true;
  }, [dashboard, adminMode]);

  const AddToDashboardEnabled = useMemo(() => {
    if (adminMode) return true;
    if (dashboard?.settings && dashboard.settings.can_create_widgets)
      return true;
    return false;
  }, [dashboard, adminMode]);

  let isLast = index === messages.length - 1;
  let nextMessage = isLast ? "" : messages[index + 1].content || "";
  return (
    <div className="onvo-question-message-assistant onvo-relative onvo-mb-3 onvo-flex onvo-flex-row onvo-items-start onvo-justify-start onvo-gap-3">
      <Icon variant="shadow" icon={() => <Logo height={20} width={20} />} />
      <div className="onvo-w-full">
        {code.trim() !== "" && (
          <Accordion type="single" className="onvo-leading-none" collapsible>
            <AccordionItem value="item-1" className="onvo-border-b-0">
              <AccordionTrigger className="onvo-border-b-0 !onvo-py-2 !onvo-px-2 onvo-rounded-md onvo-bg-slate-100 dark:onvo-bg-slate-700">
                <span>Show working</span>
              </AccordionTrigger>
              <AccordionContent className="onvo-pt-2">
                <ErrorBoundary
                  fallbackRender={({ error }) => <Text>{code}</Text>}
                >
                  <article className="onvo-question-assistant-code-wrapper onvo-prose onvo-prose-sm dark:onvo-prose-invert onvo-inline onvo-w-full">
                    <ReactMarkdown className="onvo-question-assistant-code -onvo-mt-5">
                      {"```python\n" + code + "\n```"}
                    </ReactMarkdown>
                  </article>
                </ErrorBoundary>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {output && (
          <Card
            className={
              "onvo-group onvo-question-assistant-chart onvo-foreground-color onvo-relative onvo-my-2 onvo-py-3 onvo-flex onvo-flex-col " +
              (output.type === "metric" ? "onvo-h-32" : "onvo-h-96")
            }
          >
            <div
              className="onvo-chart-card-dropdown-wrapper onvo-z-20 onvo-absolute onvo-top-2 onvo-right-4 onvo-flex onvo-flex-row onvo-gap-2 onvo-items-center"
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
              {AddToDashboardEnabled && (
                <Button variant="primary" onClick={addToDashboard}>
                  Add to dashboard
                </Button>
              )}
              {(ImageDownloadEnabled || ReportDownloadEnabled) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Icon variant="shadow" icon={ArrowDownTrayIcon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="onvo-min-w-56">
                    {ReportDownloadEnabled && (
                      <>
                        <DropdownMenuLabel>Reports</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => exportWidget("xlsx")}
                          >
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                              <DocumentChartBarIcon className="onvo-size-4" />
                              <span>Download as excel</span>
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => exportWidget("csv")}>
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                              <DropdownMenuIconWrapper>
                                <DocumentChartBarIcon className="onvo-size-4 onvo-text-inherit" />
                              </DropdownMenuIconWrapper>
                              <span>Download as CSV</span>
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </>
                    )}
                    {ImageDownloadEnabled && ReportDownloadEnabled && (
                      <DropdownMenuSeparator />
                    )}
                    {ImageDownloadEnabled && (
                      <>
                        <DropdownMenuLabel>Images</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => exportWidget("svg")}>
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                              <PhotoIcon className="onvo-size-4" />
                              <span>Download as SVG</span>
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => exportWidget("png")}>
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                              <DropdownMenuIconWrapper>
                                <PhotoIcon className="onvo-size-4 onvo-text-inherit" />
                              </DropdownMenuIconWrapper>
                              <span>Download as PNG</span>
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => exportWidget("jpeg")}
                          >
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                              <DropdownMenuIconWrapper>
                                <PhotoIcon className="onvo-size-4 onvo-text-inherit" />
                              </DropdownMenuIconWrapper>
                              <span>Download as JPEG</span>
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <ChartBase
              json={output}
              id={questionId}
              title={title}
              settings={{}}
            />
          </Card>
        )}

        <article className="onvo-question-assistant-code-wrapper onvo-prose onvo-prose-sm dark:onvo-prose-invert onvo-w-full">
          {answer && answer.trim() !== "" && (
            <ErrorBoundary
              fallbackRender={({ error }) => <Text>{answer}</Text>}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {answer}
              </ReactMarkdown>
            </ErrorBoundary>
          )}
          {options && options.length > 0 && (
            <div className="onvo-flex onvo-flex-row onvo-gap-2 -onvo-mt-2">
              {options.map((a) => (
                <Button
                  onClick={() => isLast && onReply(a)}
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
    </div>
  );
};

export default QuestionMessage;
