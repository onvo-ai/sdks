import { Textarea } from "../../tremor/Textarea";
import { Input } from "../../tremor/Input";
import { Label, Text, Title } from "../../tremor/Text";
import { Button } from "../../tremor/Button";
import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../tremor/Tabs";

import { useEffect, useMemo, useState } from "react";
import { Widget, WidgetMessage, WidgetSettings } from "@onvo-ai/js";
import {
  ArrowUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Editor from "@monaco-editor/react";
import { toast } from "sonner";
import ChartBase from "../Chart/ChartBase";
import { SuggestionsBar } from "../SuggestionsBar";
import React from "react";
import Logo from "../QuestionModal/Logo";
import { UserIcon } from "@heroicons/react/24/solid";
import { useBackend } from "../Wrapper";
import { useDashboard } from "../Dashboard/Dashboard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Divider } from "../../tremor/Divider";
import { twMerge } from "tailwind-merge";

const Message: React.FC<{
  message: WidgetMessage;
  onDelete: () => void;
  onEdit: (msg: string) => void;
}> = ({ message, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const [newMessage, setNewMessage] = useState(message.content);

  return (
    <div className="onvo-message-wrapper onvo-relative onvo-mb-3 onvo-flex onvo-flex-row onvo-items-start onvo-justify-start onvo-gap-3 onvo-group">
      {message.role === "assistant" ? (
        <Icon variant="shadow" icon={() => <Logo height={20} width={20} />} />
      ) : (
        <Icon variant="shadow" icon={UserIcon} />
      )}
      <div className="onvo-message-text onvo-w-full">
        {editing ? (
          <Textarea
            defaultValue={message.content}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        ) : (
          <Text>{message.content}</Text>
        )}

        {editing ? (
          <div className="onvo-message-edit-options onvo-flex onvo-flex-row onvo-gap-2 onvo-mt-2">
            <Button
              className="onvo-py-1"
              onClick={() => {
                onEdit(newMessage);
                setEditing(false);
              }}
            >
              Regenerate chart
            </Button>
            <Button
              className="onvo-py-1"
              variant="destructive"
              onClick={() => {
                onDelete();
                setEditing(false);
              }}
            >
              Delete prompt
            </Button>
            <div className="onvo-flex-grow onvo-h-1" />
            <Button
              className="onvo-py-1"
              variant="secondary"
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : message.role === "user" ? (
          <Icon
            onClick={() => setEditing(true)}
            variant="shadow"
            className="onvo-message-edit-button onvo-absolute onvo-top-1 onvo-right-1 onvo-hidden group-hover:onvo-block"
            icon={PencilIcon}
            size="sm"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const EditChartModal: React.FC<{}> = ({}) => {
  // EXTERNAL HOOKS
  const backend = useBackend();
  const { refreshWidgets, setSelectedWidget, selectedWidget, dashboard } =
    useDashboard();

  // REVERT CHANGES STATES
  const [changesMade, setChangesMade] = useState(false);
  const [cachedWidget, setCachedWidget] = useState<
    Pick<Widget, "cache" | "code" | "messages">
  >({ cache: "", code: "", messages: [] });

  // WIDGET STATES
  const [title, setTitle] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [code, setCode] = useState("");
  const [settings, setSettings] = useState<WidgetSettings>({
    disable_download_images: false,
    disable_download_reports: false,
    title_hidden: false,
  });

  // UI STATES
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"chat" | "editor" | "settings">("chat");

  useEffect(() => {
    if (selectedWidget) {
      updateStates(selectedWidget);
      setCachedWidget({
        cache: selectedWidget.cache,
        code: selectedWidget.code,
        messages: selectedWidget.messages,
      });
    } else {
      updateStates(undefined);
    }
  }, [selectedWidget]);

  const updateStates = (widget: Widget | undefined) => {
    if (widget) {
      let out = JSON.parse(widget && widget.cache ? widget.cache : "{}");

      setTitle(widget.title || "");
      setCode(widget.code);
      setOutput(out);
      setSettings(
        widget.settings || {
          disable_download_images: false,
          disable_download_reports: false,
          title_hidden: false,
        }
      );
      setMessages(widget.messages || []);
    } else {
      setTitle("");
      setCode("");
      setOutput(null);
      setMessages([]);
    }
  };

  const requestEditWidget = async (msg: WidgetMessage[]) => {
    if (!selectedWidget) return;
    setCode("");
    setLoading(true);

    try {
      let widget = await backend?.widget(selectedWidget.id).updatePrompts(msg);
      setChangesMade(true);
      toast.success("Your widget has been updated!");

      updateStates(widget);
      setLoading(false);
    } catch (e: any) {
      toast.error("Failed to create widget: " + e.message);
      setLoading(false);
    }
  };

  const saveChanges = () => {
    if (!selectedWidget) return;
    toast.promise(
      () => {
        return backend?.widgets.update(selectedWidget.id, {
          title: title,
          code: code,
          cache: JSON.stringify(output),
          settings: settings,
          messages: messages,
        }) as Promise<any>;
      },
      {
        loading: "Saving changes...",
        success: () => {
          cleanup();

          refreshWidgets();
          return "Changes saved!";
        },
        error: (error) => "Failed to save changes: " + error.message,
      }
    );
  };

  const cleanup = () => {
    setSelectedWidget(undefined);

    updateStates(undefined);

    setNewMessage("");
    setLoading(false);
    setTab("chat");
  };

  const executeCode = async () => {
    setLoading(true);
    if (!selectedWidget) return;
    toast.promise(
      async () => {
        let data = await backend?.widget(selectedWidget.id).executeCode(code);
        setOutput(data);
      },
      {
        loading: "Executing code...",
        success: () => {
          setLoading(false);
          setChangesMade(true);
          return "Successfully executed code";
        },
        error: (e: any) => {
          setLoading(false);
          return "Failed to execute code: " + e.message;
        },
      }
    );
  };

  const open = useMemo(() => {
    return selectedWidget !== undefined;
  }, [selectedWidget]);

  return (
    <>
      <dialog open={open}>
        <div
          className={twMerge(
            "onvo-@container/widgetmodal onvo-h-full onvo-animate-dialogOpen onvo-w-full onvo-z-50 onvo-fixed onvo-left-0 onvo-foreground-color"
          )}
        >
          <div
            className={
              "onvo-foreground-color onvo-w-full onvo-left-0 onvo-top-0 onvo-z-10 onvo-flex onvo-flex-row onvo-justify-start onvo-items-center onvo-gap-4 onvo-border-b onvo-border-gray-200 onvo-p-2 dark:onvo-border-gray-800"
            }
          >
            <Icon
              icon={ChevronLeftIcon}
              variant="shadow"
              className="onvo-ml-2"
              onClick={cleanup}
            />

            <div className="onvo-flex onvo-flex-row onvo-w-full onvo-gap-1 onvo-flex-grow onvo-justify-start onvo-items-center">
              <Text className="onvo-hidden @xl/widgetmodal:onvo-block">
                {dashboard?.title}
              </Text>
              <ChevronRightIcon className="onvo-hidden @xl/widgetmodal:onvo-block onvo-h-4 onvo-w-4 dark:onvo-fill-slate-500" />
              <Label>Edit {title}</Label>
            </div>
            <div className="onvo-flex onvo-flex-row onvo-gap-2 onvo-flex-shrink-0">
              {changesMade && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setChangesMade(false);
                    setCode(cachedWidget.code);
                    setMessages(cachedWidget.messages || []);
                    setOutput(
                      JSON.parse(
                        cachedWidget && cachedWidget.cache
                          ? cachedWidget.cache
                          : "{}"
                      )
                    );
                  }}
                  className="onvo-flex-shrink-0"
                >
                  Revert changes
                </Button>
              )}
              <Button
                onClick={saveChanges}
                className="onvo-flex-shrink-0"
                isLoading={loading}
              >
                Save changes
              </Button>
            </div>
          </div>
          <div className="onvo-relative onvo-flex onvo-flex-grow onvo-h-[calc(100%-52px)] onvo-w-full onvo-flex-col-reverse @xl/widgetmodal:onvo-flex-row">
            <div className="onvo-relative onvo-flex-grow onvo-h-full onvo-w-full onvo-pt-3 onvo-border-r onvo-border-gray-200 dark:onvo-border-gray-800">
              {tab === "editor" && (
                <Button
                  variant="secondary"
                  className="!onvo-absolute onvo-top-1.5 onvo-right-1 onvo-z-10"
                  onClick={executeCode}
                >
                  Execute code
                </Button>
              )}
              <Tabs
                defaultValue="chat"
                onValueChange={(val) => {
                  setTab(val as "chat" | "editor" | "settings");
                }}
                className="onvo-h-full onvo-flex onvo-flex-col"
              >
                <TabsList>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="editor">Code editor</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <div className="onvo-relative onvo-flex-grow onvo-h-[calc(100%-33px)] onvo-w-full">
                  <TabsContent value="chat" className="onvo-h-full">
                    <div className="onvo-h-full onvo-relative onvo-flex onvo-flex-col">
                      <div className="onvo-overflow-y-auto onvo-scrollbar-thin onvo-flex-grow onvo-pt-4 onvo-px-4 onvo-w-full">
                        {messages.map((a, index) => (
                          <Message
                            key={"message-" + index}
                            message={a}
                            onDelete={() => {
                              let newMessages = messages.filter(
                                (m, i) => i !== index
                              );
                              requestEditWidget(newMessages);
                              setMessages(newMessages);
                            }}
                            onEdit={(msg) => {
                              let newMessages = messages.map((m, i) => {
                                if (i === index) {
                                  return {
                                    ...m,
                                    content: msg,
                                  };
                                }
                                return m;
                              });
                              requestEditWidget(newMessages);
                              setMessages(newMessages);
                            }}
                          />
                        ))}
                      </div>
                      <div
                        className={
                          "onvo-foreground-color onvo-w-full onvo-input-text-wrapper onvo-bg-white dark:onvo-bg-slate-800 onvo-z-10 onvo-pb-4 onvo-px-2"
                        }
                      >
                        <SuggestionsBar
                          onSelect={(val) => setNewMessage(val)}
                        />
                        <div className="onvo-relative onvo-mx-auto onvo-flex onvo-w-full onvo-max-w-2xl onvo-flex-row onvo-items-center onvo-gap-2">
                          <Textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="onvo-ask-textarea onvo-background-color onvo-pr-[52px]"
                            placeholder={`Ask for changes to your chart...`}
                            autoFocus
                            onKeyUp={(evt) => {
                              if (evt.key === "Enter" && !evt.shiftKey) {
                                requestEditWidget([
                                  ...messages,
                                  { role: "user", content: newMessage },
                                ]);
                                setMessages((m) => [
                                  ...m,
                                  { role: "user", content: newMessage },
                                ]);
                                setNewMessage("");
                              }
                            }}
                          />
                          <Icon
                            className="onvo-absolute onvo-right-2 onvo-top-2 onvo-z-10"
                            icon={ArrowUpIcon}
                            variant="solid"
                            onClick={() => {
                              requestEditWidget([
                                ...messages,
                                { role: "user", content: newMessage },
                              ]);
                              setMessages((m) => [
                                ...m,
                                { role: "user", content: newMessage },
                              ]);
                              setNewMessage("");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="editor"
                    className="onvo-h-full onvo-w-full"
                  >
                    <Editor
                      defaultLanguage="python"
                      value={code}
                      height="100%"
                      options={{
                        padding: {
                          top: 10,
                        },
                      }}
                      className="onvo-code-editor onvo-w-full"
                      theme="vs-dark"
                      onChange={(val) => setCode(val || "")}
                    />
                  </TabsContent>
                  <TabsContent value="settings" className="onvo-h-full">
                    <div className="onvo-p-2">
                      <div className="onvo-flex onvo-flex-row onvo-items-center onvo-justify-between">
                        <Text className="onvo-text-xs">Title</Text>{" "}
                        <Icon
                          icon={settings.title_hidden ? EyeSlashIcon : EyeIcon}
                          onClick={() => {
                            setSettings((s: any) => ({
                              ...s,
                              title_hidden: !s.title_hidden,
                            }));
                          }}
                        />
                      </div>
                      <Input
                        placeholder="Title"
                        className="onvo-text-xs"
                        value={title}
                        onChange={(val) => setTitle(val.target.value)}
                        disabled={settings.title_hidden}
                      />

                      <Divider />
                      <Text className="onvo-text-xs">CSS id</Text>
                      <Input
                        placeholder="CSS id"
                        className="onvo-text-xs"
                        value={settings.css_id}
                        onChange={(val) => {
                          setSettings((s: any) => ({
                            ...s,
                            css_id: val.target.value,
                          }));
                        }}
                      />

                      <Text className="onvo-text-xs onvo-mt-2">
                        CSS class names
                      </Text>
                      <Input
                        placeholder="CSS class names"
                        className="onvo-text-xs"
                        value={settings.css_classnames}
                        onChange={(val) => {
                          setSettings((s: any) => ({
                            ...s,
                            css_classnames: val.target.value,
                          }));
                        }}
                      />

                      <Divider />
                      <div className="onvo-mt-2 onvo-flex onvo-flex-row onvo-items-center onvo-justify-start onvo-gap-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={settings.disable_download_images}
                          onChange={(val) => {
                            setSettings((s: any) => ({
                              ...s,
                              disable_download_images: val.target.checked,
                            }));
                          }}
                          className="onvo-w-4 onvo-h-4 onvo-text-blue-600 onvo-bg-gray-100 onvo-border-gray-300 onvo-rounded-md focus:onvo-ring-blue-500 dark:focus:onvo-ring-blue-600 dark:onvo-ring-offset-gray-800 focus:onvo-ring-2 dark:onvo-bg-gray-700 dark:onvo-border-gray-600"
                        />
                        <Text className="onvo-text-xs">
                          Disable image downloads
                        </Text>
                      </div>
                      <div className="onvo-mt-2 onvo-flex onvo-flex-row onvo-items-center onvo-justify-start onvo-gap-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={settings.disable_download_reports}
                          onChange={(val) => {
                            setSettings((s: any) => ({
                              ...s,
                              disable_download_reports: val.target.checked,
                            }));
                          }}
                          className="onvo-w-4 onvo-h-4 onvo-text-blue-600 onvo-bg-gray-100 onvo-border-gray-300 onvo-rounded-md focus:onvo-ring-blue-500 dark:focus:onvo-ring-blue-600 dark:onvo-ring-offset-gray-800 focus:onvo-ring-2 dark:onvo-bg-gray-700 dark:onvo-border-gray-600"
                        />
                        <Text className="onvo-text-xs">
                          Disable csv / excel downloads
                        </Text>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            <div className="onvo-background-color onvo-flex onvo-flex-shrink-0 @xl/widgetmodal:onvo-flex-shrink onvo-flex-col onvo-justify-center onvo-w-full onvo-flex-grow onvo-relative onvo-p-4 onvo-overflow-y-auto onvo-bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:onvo-bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
              {loading && (
                <div className="onvo-absolute onvo-top-0 onvo-left-0 onvo-bottom-0 onvo-right-0 onvo-z-10 onvo-backdrop-blur-md onvo-bg-white/50 dark:onvo-bg-gray-900/50 onvo-flex onvo-justify-center onvo-items-center">
                  <Card className="onvo-loading-card onvo-flex onvo-flex-row onvo-gap-6 onvo-items-center !onvo-w-72">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="onvo-inline onvo-w-10 onvo-h-10 onvo-text-gray-200 onvo-animate-spin dark:onvo-text-gray-600 onvo-fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                    <Title>Regenerating chart</Title>
                  </Card>
                </div>
              )}

              <Card
                className={
                  "onvo-foreground-color onvo-relative onvo-flex onvo-w-full onvo-flex-col onvo-py-3 " +
                  (output?.type === "metric"
                    ? "onvo-h-32"
                    : "onvo-h-72 @xl/widgetmodal:onvo-h-96")
                }
              >
                {output && (
                  <ChartBase
                    json={output}
                    id={selectedWidget?.id || ""}
                    title={title}
                    settings={settings}
                    key={title + JSON.stringify(settings)}
                  />
                )}
              </Card>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditChartModal;
