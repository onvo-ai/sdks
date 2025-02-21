import { Textarea } from "../../tremor/Textarea";
import { Button } from "../../tremor/Button";
import { Text } from "../../tremor/Text";
import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useBackend } from "../../layouts/Wrapper";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ErrorBoundary } from "react-error-boundary";
import {
  ArrowDownTrayIcon,
  DocumentChartBarIcon,
  PencilIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import ChartBase from "../Chart/ChartBase";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
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
import { MessageType } from "../../layouts/Copilot/Copilot";
import { useTheme } from "../../layouts/Dashboard/useTheme";

dayjs.extend(relativeTime);

export const QuestionMessage: React.FC<{
  isLast?: boolean;
  message: MessageType;
  onDownload: (format: "svg" | "png" | "csv" | "xlsx" | "jpeg") => void;
  onAdd: (library?: boolean) => void;
  onEdit: (msg: string) => void;
  onReply: (msg: string) => void;
}> = ({
  isLast,
  message,
  onAdd,
  onEdit,
  onReply,
  onDownload
}) => {
    const { adminMode } = useBackend();
    const { dashboard } = useDashboard();
    const theme = useTheme();

    const elementRef = useRef<any>(null);

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

    const { role, content } = message;


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
      let text = content as string;
      let code = "";
      if (text.search("```") >= 0) {
        text =
          text.split("```json")[0] + text.split("```json")[1].split("```")[1];
        code = (content as string).split("```json")[1].split("```")[0].trim();
      }
      return (
        <div className="onvo-w-full onvo-flex onvo-flex-col onvo-group">
          <div className={"onvo-question-message-user onvo-rounded-2xl onvo-py-3 onvo-px-4 onvo-bg-black/5 dark:onvo-bg-white/10 onvo-relative onvo-mb-3 onvo-flex onvo-flex-row onvo-items-start onvo-justify-start onvo-gap-3 onvo-self-end " + (editing ? "onvo-w-full" : "onvo-max-w-[80%]")}>
            <div className="onvo-w-full onvo-max-w-none">
              {editing ? (
                <Textarea
                  className="!onvo-text-[0.875rem] !onvo-outline-none focus:onvo-outline-none focus:onvo-border-transparent focus:onvo-ring-0 !onvo-p-0 !onvo-leading-[1.5142857rem] !onvo-bg-transparent !onvo-shadow-none onvo-border-none"
                  defaultValue={content as string}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              ) : (
                <ErrorBoundary fallbackRender={({ error }) => <Text>{text}</Text>}>
                  <ReactMarkdown
                    className="onvo-prose onvo-prose-slate onvo-prose-sm dark:onvo-prose-invert "
                    remarkPlugins={[remarkGfm]}
                  >
                    {text}
                  </ReactMarkdown>
                  {code.trim() !== "" && adminMode && (
                    <Accordion
                      type="single"
                      className="onvo-leading-none onvo-mb-2 onvo-mt-2"
                      collapsible
                    >
                      <AccordionItem value="item-1" className="onvo-border-b-0">
                        <AccordionTrigger className="onvo-border-b-0 !onvo-py-2 !onvo-px-2 onvo-rounded-md onvo-background-color">
                          <span>Show advanced widget builder output</span>
                        </AccordionTrigger>
                        <AccordionContent className="onvo-pt-2">
                          <ErrorBoundary
                            fallbackRender={({ error }) => <Text>{code}</Text>}
                          >
                            <article className="onvo-question-assistant-code-wrapper onvo-prose onvo-prose-slate onvo-prose-sm dark:onvo-prose-invert onvo-inline onvo-w-full">
                              <ReactMarkdown className="onvo-question-assistant-code -onvo-mt-5">
                                {"```json\n" + code + "\n```"}
                              </ReactMarkdown>
                            </article>
                          </ErrorBoundary>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </ErrorBoundary>
              )}

              {editing ? (
                <div className="onvo-flex onvo-flex-row onvo-justify-end onvo-items-center onvo-gap-2 onvo-mt-2">
                  <Button
                    className="!onvo-rounded-full"
                    variant="secondary"
                    color="gray"
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className=" !onvo-rounded-full"
                    onClick={() => {
                      onEdit(newMessage);
                      setEditing(false);
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <Icon
                  onClick={() => {
                    setEditing(true)
                    setNewMessage(content as string);
                  }}
                  className="onvo-absolute onvo-cursor-pointer onvo-top-2 -onvo-left-8 onvo-hidden group-hover:onvo-block"
                  icon={PencilIcon}
                  variant="shadow"
                  size="xs"
                />
              )}
            </div>
          </div></div>
      );
    }


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

    if (role === "assistant" && (!answer || answer.trim() === "")) return null;
    return (
      <div ref={elementRef} className="onvo-question-message-assistant onvo-relative onvo-mb-3 onvo-flex onvo-flex-row onvo-items-start onvo-justify-start onvo-gap-3">

        <div className="onvo-w-full">
          {adminMode && code.trim() !== "" && (
            <Accordion
              type="single"
              className="onvo-leading-none onvo-mb-2"
              collapsible
            >
              <AccordionItem value="item-1" className="onvo-border-b-0">
                <AccordionTrigger className="onvo-border-b-0 !onvo-py-2 !onvo-px-3 onvo-rounded-2xl onvo-bg-slate-100 dark:onvo-bg-slate-700">
                  <span>Show working</span>
                </AccordionTrigger>
                <AccordionContent className="onvo-pt-2">
                  <ErrorBoundary
                    fallbackRender={({ error }) => <Text>{code}</Text>}
                  >
                    <article className="onvo-question-assistant-code-wrapper onvo-prose onvo-prose-slate onvo-prose-sm dark:onvo-prose-invert onvo-inline onvo-w-full">
                      <ReactMarkdown className="onvo-question-assistant-code !onvo-rounded-2xl -onvo-mt-5">
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
                <ChartBase json={output} title={title} />
              </div>
              <div
                className="onvo-chart-card-dropdown-wrapper onvo-py-2 onvo-px-2 onvo-z-20 onvo-border-solid onvo-border-t onvo-border-black/5 dark:onvo-border-white/10 onvo-rounded-b-2xl onvo-background-color onvo-flex onvo-w-full onvo-justify-between onvo-flex-row onvo-items-center"
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
                      onClick={() => onAdd(true)}
                    >
                      Add to library
                    </Button>
                  )}
                </div>
                <div className="onvo-flex onvo-gap-2 onvo-items-center">
                  {AddToDashboardEnabled && (
                    <Button
                      variant="primary"
                      onClick={() => onAdd()}
                    >
                      Add to dashboard
                    </Button>
                  )}
                  {(ImageDownloadEnabled || ReportDownloadEnabled) && (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Icon variant="shadow" className="onvo-foreground-color onvo-border-black/10 dark:onvo-border-white/10" icon={ArrowDownTrayIcon} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent container={elementRef.current} className="onvo-min-w-56 onvo-background-color onvo-border-black/10 dark:onvo-border-white/10">
                        {ReportDownloadEnabled && (
                          <>
                            <DropdownMenuLabel>Reports</DropdownMenuLabel>
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onClick={() => onDownload("xlsx")}
                              >
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                  <DocumentChartBarIcon className="onvo-size-4" />
                                  <span>Download as excel</span>
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onDownload("csv")}
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
                          <DropdownMenuSeparator className="onvo-border-black/10 dark:onvo-border-white/10" />
                        )}
                        {ImageDownloadEnabled && (
                          <>
                            <DropdownMenuLabel>Images</DropdownMenuLabel>
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onClick={() => onDownload("svg")}
                              >
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                  <PhotoIcon className="onvo-size-4" />
                                  <span>Download as SVG</span>
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onDownload("png")}
                              >
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                  <DropdownMenuIconWrapper>
                                    <PhotoIcon className="onvo-size-4 onvo-text-inherit" />
                                  </DropdownMenuIconWrapper>
                                  <span>Download as PNG</span>
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onDownload("jpeg")}
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
            {options && options.length > 0 && isLast && (
              <div className="onvo-flex onvo-flex-row onvo-gap-2 -onvo-mt-2">
                {options.map((a) => (
                  <Button className="!onvo-rounded-full"
                    onClick={() => onReply(a)}
                    key={a}
                    color={"gray"}
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