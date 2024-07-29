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
import ChartBase from "../../components/Chart/ChartBase";
import { useDashboard } from "../Dashboard/useDashboard";
import { Logo } from "../../components/Logo";
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
import { MessageType } from "./Copilot";
import { useMaxHeight } from "../../lib/useMaxHeight";

dayjs.extend(relativeTime);

const QuestionMessage: React.FC<{
  index: number;
  dashboardId: string;
  questionId: string;
  messages: MessageType[];
  teamId?: string;
  onClose: () => void;
  onDelete: () => void;
  onEdit: (msg: string) => void;
  onReply: (msg: string) => void;
  logo: string;
}> = ({
  index,
  questionId,
  dashboardId,
  messages,
  teamId,
  onClose,
  onDelete,
  onEdit,
  onReply,
  logo,
}) => {
  const { backend } = useBackend();
  const { dashboard, adminMode, refreshWidgets } = useDashboard();
  const { lg, sm } = useMaxHeight();

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

  const { role, content } = messages[index];

  const addToDashboard =
    ({
      use_in_library,
      use_as_example,
    }: {
      use_in_library: boolean;
      use_as_example: boolean;
    }) =>
    async (e: any) => {
      if (!questionId) return;

      e.preventDefault();
      e.stopPropagation();

      let newObj: any = {
        title: title,
        layouts: {
          lg: {
            x: 0,
            y: lg,
            w: 4,
            h: output.type === "metric" ? 10 : 20,
          },
          sm: {
            x: 0,
            y: sm,
            w: 3,
            h: output.type === "metric" ? 10 : 20,
          },
        },
        messages: messages.filter((a) => a.role === "user"),
        dashboard: dashboardId,
        team: teamId || "",
        code: code,
        cache: output,
        created_at: new Date().toISOString(),
        settings: {},
        use_in_library: use_in_library,
        use_as_example: use_as_example,
      };

      if (!backend) return;

      toast.promise(
        () => {
          return backend.widgets.create(newObj);
        },
        {
          loading: use_in_library
            ? "Adding widget to library..."
            : "Adding widget to dashboard...",
          success: () => {
            refreshWidgets(backend);
            if (use_in_library) {
              return "Widget added to library";
            } else {
              onClose();
              return "Widget added to dashboard";
            }
          },
          error: (error) =>
            use_in_library
              ? "Error adding widget to library: " + error.message
              : "Error adding widget to dashboard: " + error.message,
        }
      );
    };

  useEffect(() => {
    if (role === "assistant" || role === "tool") {
      let textContent = "";
      if (content) {
        textContent =
          typeof content === "string"
            ? content
            : content.map((a) => (a.type === "text" ? a.text : "")).join("\n");
      }

      if ((textContent || "").search("```") >= 0) {
        if (textContent.split("```python")[1]) {
          let code = textContent.split("```python")[1].split("```")[0].trim();
          setCode(code);
        }
        if (textContent.split("```json")[1]) {
          let out = textContent.split("```json")[1].split("```")[0].trim();
          setOutput(JSON.parse(out));
          let ans = textContent.split("```json")[1].split("```")[1];
          setAnswer(ans || "");
        }
        setOptions([]);
      } else if ((textContent || "").search("`") >= 0) {
        let opts = textContent
          .match(/(\`.*?\`)/g)
          ?.map((a) => a.replace(/`/g, ""));
        let ans = textContent.split("`")[0];
        setAnswer(ans);
        setOptions(opts || []);
      } else {
        setAnswer(textContent);
        setOptions([]);
      }
    } else {
      setAnswer(content as string);
    }
  }, [content, role]);

  if (role === "user") {
    return (
      <div className="onvo-question-message-user onvo-group onvo-relative onvo-mb-3 onvo-flex onvo-flex-row onvo-items-start onvo-justify-start onvo-gap-3">
        <Icon variant="shadow" icon={UserIcon} />
        <div className="onvo-w-full onvo-max-w-none onvo-prose onvo-prose-sm dark:onvo-prose-invert ">
          {editing ? (
            <Textarea
              defaultValue={content as string}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          ) : (
            <ErrorBoundary
              fallbackRender={({ error }) => <Text>{content}</Text>}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content as string}
              </ReactMarkdown>
            </ErrorBoundary>
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
                Regenerate visualization
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
        loading: `Exporting widget as ${format}...`,
        success: (blob) => {
          let blobUrl = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.download = title + "." + format;
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

  const ImageDownloadEnabled = useMemo(() => {
    if (output && output.type === "table") return false;
    if (adminMode) return true;
    if (dashboard?.settings?.disable_download_images) return false;
    return true;
  }, [dashboard, adminMode, output]);

  const ReportDownloadEnabled = useMemo(() => {
    if (adminMode) return true;
    if (dashboard?.settings?.disable_download_reports) return false;
    return true;
  }, [dashboard, adminMode]);

  const AddToDashboardEnabled = useMemo(() => {
    if (adminMode) return true;
    if (dashboard?.settings?.can_create_widgets) return true;
    return false;
  }, [dashboard, adminMode]);

  let isLast = index === messages.length - 1;
  let nextMessage = isLast ? "" : messages[index + 1].content || "";
  const LogoIcon = useMemo(() => {
    return logo && logo.trim() !== "" ? (
      <Icon
        variant="shadow"
        className="!onvo-p-0"
        icon={() => (
          <img
            src={logo}
            className="onvo-object-contain onvo-rounded-md onvo-h-[32px] onvo-w-[32px]"
          />
        )}
      />
    ) : (
      <Icon variant="shadow" icon={() => <Logo height={20} width={20} />} />
    );
  }, [logo]);
  if (role === "assistant" && (!answer || answer.trim() === "")) return null;
  return (
    <div className="onvo-question-message-assistant onvo-relative onvo-mb-3 onvo-flex onvo-flex-row onvo-items-start onvo-justify-start onvo-gap-3">
      {LogoIcon}
      <div className="onvo-w-full">
        {adminMode && code.trim() !== "" && (
          <Accordion
            type="single"
            className="onvo-leading-none onvo-mb-2"
            collapsible
          >
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
              "onvo-group onvo-question-assistant-chart onvo-foreground-color onvo-relative onvo-mb-2 onvo-px-0 onvo-py-0 onvo-flex onvo-flex-col"
            }
          >
            <div
              className={
                "onvo-py-3 onvo-px-2 " +
                (output.type === "metric" ? "onvo-h-32" : "onvo-h-96")
              }
            >
              <ChartBase json={output} id={questionId} title={title} />
            </div>
            <div
              className="onvo-chart-card-dropdown-wrapper onvo-py-2 onvo-px-2 onvo-z-20 onvo-border-t onvo-border-black/10 dark:onvo-border-white/10 onvo-rounded-b-md onvo-bg-slate-50 dark:onvo-bg-slate-800 onvo-flex onvo-w-full onvo-justify-between onvo-flex-row onvo-items-center"
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
              <div className="onvo-flex onvo-gap-2 onvo-items-center">
                {adminMode && (
                  <Button
                    variant="secondary"
                    onClick={addToDashboard({
                      use_as_example: false,
                      use_in_library: true,
                    })}
                  >
                    Add to library
                  </Button>
                )}
              </div>
              <div className="onvo-flex onvo-gap-2 onvo-items-center">
                {AddToDashboardEnabled && (
                  <Button
                    variant="primary"
                    onClick={addToDashboard({
                      use_as_example: false,
                      use_in_library: false,
                    })}
                  >
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
                            <DropdownMenuItem
                              onClick={() => exportWidget("csv")}
                            >
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
                            <DropdownMenuItem
                              onClick={() => exportWidget("svg")}
                            >
                              <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                <PhotoIcon className="onvo-size-4" />
                                <span>Download as SVG</span>
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => exportWidget("png")}
                            >
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
            </div>
          </Card>
        )}

        <article className="onvo-question-assistant-code-wrapper onvo-max-w-none onvo-prose onvo-prose-sm dark:onvo-prose-invert onvo-w-full">
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
