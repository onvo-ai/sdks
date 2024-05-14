import {
  Button,
  Card,
  Text,
  Icon,
  TextInput,
  Title,
  Textarea,
  Divider,
  Switch,
} from "@tremor/react";
import { useResizable } from "react-resizable-layout";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Widget } from "@onvo-ai/js";
import {
  ArrowUpIcon,
  BackwardIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Editor from "@monaco-editor/react";
import { toast } from "sonner";
import ChartBase from "../Chart/ChartBase";
import { useMeasure } from "@uidotdev/usehooks";
import SuggestionsBar from "./SuggestionsBar";
import React from "react";
import Logo from "../QuestionModal/Logo";
import { UserIcon } from "@heroicons/react/24/solid";
import { useBackend } from "../Wrapper";
import { useDashboard } from "../Dashboard/Dashboard";

const Message: React.FC<{
  message: { role: "user" | "assistant"; content: string };
  onDelete: () => void;
  onEdit: (msg: string) => void;
}> = ({ message, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const [newMessage, setNewMessage] = useState(message.content);

  return (
    <div className="onvo-message-wrapper relative mb-3 flex flex-row items-start justify-start gap-3 group">
      {message.role === "assistant" ? (
        <Icon
          variant="shadow"
          icon={() => <Logo height={20} width={20} />}
          size="sm"
        />
      ) : (
        <Icon variant="shadow" icon={UserIcon} size="sm" />
      )}
      <div className="onvo-message-text w-full">
        {editing ? (
          <Textarea
            defaultValue={message.content}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        ) : (
          <Text>{message.content}</Text>
        )}

        {editing ? (
          <div className="onvo-message-edit-options flex flex-row gap-2 mt-2">
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
                setEditing(false);
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
        ) : message.role === "user" ? (
          <Icon
            onClick={() => setEditing(true)}
            variant="shadow"
            className="onvo-message-edit-button absolute top-1 right-1 hidden group-hover:block"
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

const UpdateChartModal: React.FC<{}> = ({}) => {
  const [containerRef, { width }] = useMeasure();
  const backend = useBackend();
  const { refreshWidgets, setSelectedWidget, selectedWidget } = useDashboard();

  const [newMessage, setNewMessage] = useState("");
  const [widget, setWidget] = useState<Widget>();
  const [title, setTitle] = useState("");
  let [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    if (selectedWidget) {
      setWidget(selectedWidget);
    } else {
      setWidget(undefined);
    }
  }, [selectedWidget]);

  useEffect(() => {
    if (!widget) return;

    let out = JSON.parse(widget && widget.cache ? widget.cache : "{}");

    setTitle(widget.title || "");
    setCode(widget.code);
    setOutput(out);
    setSettings(widget.settings || {});
    // @ts-ignore
    setMessages(widget.messages || []);
  }, [widget]);

  const getGraph = async (
    msg: { role: "user" | "assistant"; content: string }[]
  ) => {
    if (!selectedWidget) return;
    setCode("");
    setLoading(true);

    try {
      let response = await backend
        ?.widget(selectedWidget.id)
        .updatePrompts(msg);

      toast.success("Your widget has been updated!");
      setWidget(response);
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
          cache: output,
          settings: settings,
        }) as Promise<any>;
      },
      {
        loading: "Saving changes...",
        success: () => {
          cleanup();
          return "Changes saved!";
        },
        error: (error) => "Failed to save changes: " + error.message,
      }
    );
  };

  const { position, separatorProps } = useResizable({
    axis: "y",
    min: 100,
  });

  const cleanup = () => {
    setOutput(null);
    setLoading(false);
    setCode("");
    setTitle("");
    setMessages([]);
    setWidget(undefined);
    setNewMessage("");
    setSelectedWidget(undefined);
    refreshWidgets();
  };

  const executeCode = async () => {
    setLoading(true);
    if (!selectedWidget) return;
    try {
      let data = await backend?.widget(selectedWidget.id).executeCode(code);
      setOutput(data);
    } catch (e: any) {
      toast.error("Failed to execute code: " + e.message);
    }
    setLoading(false);
  };

  const open = useMemo(() => {
    return selectedWidget !== undefined;
  }, [selectedWidget]);

  return (
    <>
      <div
        ref={containerRef}
        className={"onvo-edit-chart-header absolute left-0 right-0 w-full"}
      ></div>
      <Transition appear show={open} as={Fragment as any}>
        <div
          className="foreground-color fixed right-0 top-0 z-20 h-screen"
          style={{
            width: width || 0,
          }}
        >
          <div
            className={
              "foreground-color fixed right-0 top-0 z-10 flex flex-row justify-between items-center gap-4 border-b border-gray-200  p-2 dark:border-gray-800"
            }
            style={{
              width: width || 0,
            }}
          >
            <Button
              variant="light"
              size="sm"
              className="ml-2"
              icon={BackwardIcon}
              onClick={() => {
                cleanup();
              }}
            >
              Back to dashboard
            </Button>
            <div className="flex flex-row w-full flex-grow justify-center items-center">
              <Title>{title}</Title>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={executeCode}
                loading={loading}
              >
                Execute code
              </Button>
              <Button size="sm" onClick={saveChanges} disabled={loading}>
                Save changes
              </Button>
            </div>
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
            <div className="flex h-full w-full flex-row pt-[55px]">
              <div className="relative overflow-y-auto flex w-full flex-grow flex-col border-r border-gray-200 dark:border-gray-800">
                <div className="flex flex-col absolute bottom-8 overflow-y-auto top-0 pt-4 px-4 w-full">
                  {messages.map((a, index) => (
                    <Message
                      key={"message-" + index}
                      message={a}
                      onDelete={() => {
                        let newMessages = messages.filter(
                          (m, i) => i !== index
                        );
                        getGraph(newMessages);
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
                        getGraph(newMessages);
                        setMessages(newMessages);
                      }}
                    />
                  ))}
                </div>

                <div
                  className={
                    "onvo-input-text-wrapper absolute bottom-0 left-0 right-0 z-10 pb-4"
                  }
                >
                  <SuggestionsBar onSelect={(val) => setNewMessage(val)} />
                  <div className="relative mx-auto flex w-full max-w-2xl flex-row items-center gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="onvo-ask-textarea background-color pr-[52px]"
                      placeholder={`Ask for changes to your chart...`}
                      autoFocus
                      onKeyUp={(evt) => {
                        if (evt.key === "Enter" && !evt.shiftKey) {
                          getGraph([
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
                      size="xs"
                      className="absolute right-2 top-1 z-10"
                      icon={ArrowUpIcon}
                      variant="solid"
                      onClick={() => {
                        getGraph([
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
              <div className="background-color w-full flex-grow overflow-y-auto relative">
                <div
                  id="wrapper"
                  className="relative w-full h-[calc(100vh-53px)] flex flex-col"
                >
                  {loading && (
                    <div className="absolute top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-md bg-white/50 dark:bg-gray-900/50 flex justify-center items-center">
                      <Card className="onvo-loading-card flex flex-row gap-6 items-center w-72">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

                  <Editor
                    height={position}
                    defaultLanguage="python"
                    value={code}
                    options={{
                      padding: {
                        top: 10,
                      },
                    }}
                    className="onvo-code-editor"
                    theme="vs-dark"
                    onChange={(val) => setCode(val || "")}
                  />
                  <div
                    className="bg-black flex justify-center items-center hover:bg-blue-500 active:bg-blue-800 h-3 w-full"
                    {...separatorProps}
                  >
                    <div className="h-[4px] w-20 bg-gray-400 rounded-full"></div>
                  </div>

                  <div className="relative p-4 overflow-y-auto">
                    <Card
                      className={
                        "foreground-color relative mt-2 flex w-full flex-col py-3 " +
                        (output?.type === "metric" ? "h-32" : "h-96")
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

              <div className="justify-start h-[calc(100vh-56px)] sticky top-14 gap-2 w-72 flex flex-col flex-shrink-0 border-l border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
                <Text className="font-semibold">Settings</Text>

                <div className="flex flex-row items-center justify-between">
                  <Text className="text-xs">Title</Text>{" "}
                  <Icon
                    icon={settings.title_hidden ? EyeSlashIcon : EyeIcon}
                    size="sm"
                    onClick={() => {
                      setSettings((s: any) => ({
                        ...s,
                        title_hidden: !s.title_hidden,
                      }));
                    }}
                  />
                </div>
                <TextInput
                  placeholder="Title"
                  className="text-xs -mt-2"
                  value={title}
                  onChange={(val) => setTitle(val.target.value)}
                  disabled={settings.title_hidden}
                />

                {false && (
                  <div className="flex flex-row items-center justify-between">
                    <Text className="text-xs">Subtitle</Text>{" "}
                    <Icon
                      icon={settings.subtitle_hidden ? EyeSlashIcon : EyeIcon}
                      size="sm"
                      onClick={() => {
                        setSettings((s: any) => ({
                          ...s,
                          subtitle_hidden: !s.subtitle_hidden,
                        }));
                      }}
                    />
                  </div>
                )}
                {false && (
                  <TextInput
                    placeholder="Subtitle"
                    className="text-xs -mt-2"
                    disabled={settings.subtitle_hidden}
                  />
                )}
                <div className="my-2 h-[1px] w-full bg-gray-200 dark:bg-slate-600" />
                <div className="flex flex-row items-center justify-start gap-2">
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <Text className="text-xs">Disable image downloads</Text>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <Text className="text-xs">Disable csv / excel downloads</Text>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
};

export default UpdateChartModal;
