import React from "react";
import { Textarea } from "../../tremor/Textarea";
import { Input } from "../../tremor/Input";
import { Button } from "../../tremor/Button";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useDashboard } from "../Dashboard";
import { useBackend } from "../Wrapper";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "../../tremor/Icon";
import { Title, Text } from "../../tremor/Text";
import { Fragment } from "react";

export const useSeparatorModal = create<{
  open: boolean;
  widget?: { id: string; title: string; subtitle: string };
  setOpen: (
    open: boolean,
    widget?: { id: string; title: string; subtitle: string }
  ) => void;
}>((set) => ({
  open: false,
  setOpen: (
    op: boolean,
    wid?: { id: string; title: string; subtitle: string }
  ) => set({ open: op, widget: wid }),
}));
const CreateSeparatorModal: React.FC<{
  maxHeight: number;
}> = ({ maxHeight }) => {
  const { dashboard, refreshWidgets } = useDashboard();
  const backend = useBackend();
  const { open, setOpen, widget } = useSeparatorModal();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (widget) {
      setTitle(widget.title);
      setSubtitle(widget.subtitle);
    } else {
      setTitle("");
      setSubtitle("");
    }
  }, [widget]);

  const createSeparator = async () => {
    if (!dashboard) return;
    let lines = subtitle.split("\n");
    let cache = JSON.stringify({
      type: "separator",
      data: { datasets: [{ data: [], label: "" }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: title },
          subtitle: {
            display: false,
            text: lines,
          },
        },
      },
    });
    let code = `title = "${title}"
    subtitle = "${subtitle}"
    def main():
        if subtitle_text:
            subtitle_lines = subtitle_text.split("\n")
        else:
            subtitle_lines = None
      
        return {
            "type": "separator",
            "data": {"datasets": [{"data": [], "label": ""}]},
            "options": {
                "responsive": True,
                "maintainAspectRatio": False,
                "plugins": {
                    "title": {
                        "display": True,
                        "text": title_text
                    },
                    if subtitle_lines:
                        .set("plugins", {"subtitle": {"display": False, "text": subtitle_lines}})
                },
            },
        }
      `;
    if (widget) {
      await backend?.widgets.update(widget.id, {
        title: title,
        code: code,
        cache: cache,
      });
    } else {
      await backend?.widgets.create({
        dashboard: dashboard.id,
        x: 0,
        y: maxHeight,
        w: 24,
        h: 1,
        cache: cache,
        title: title,
        team: dashboard.team,
        code: code,
        messages: [],
        settings: {},
      });
    }
    setOpen(false);
    setTitle("");
    setSubtitle("");
    refreshWidgets();
  };

  return (
    <>
      <Modal
        title={widget ? "Edit separator" : "Create separator"}
        onClose={() => setOpen(false)}
        open={open}
        footer={
          <div className="flex flex-row items-center justify-end">
            <Button onClick={createSeparator}>
              {widget ? "Save" : "Create"}
            </Button>
          </div>
        }
      >
        <Text>Title</Text>
        <Input
          placeholder="Type in a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text className="mt-2">Subtitle</Text>
        <Textarea
          placeholder="(Optional) Type in a subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </Modal>
      <div
        onClick={() => setOpen(true)}
        className="flex h-full justify-center items-center transition-opacity duration-300 opacity-30 hover:opacity-100 cursor-pointer border-dashed border-gray-200 dark:border-gray-700 border-2 rounded-lg"
      >
        <Text>+ Add separator</Text>
      </div>
    </>
  );
};

export const Modal: React.FC<{
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: any;
  footer?: any;
  maxWidth?: string;
}> = ({ open, onClose, title, children, footer, maxWidth }) => {
  return (
    <Transition appear show={open} as={Fragment as any}>
      <Dialog
        as="div"
        className="relative z-40"
        onClose={onClose ? onClose : () => {}}
      >
        <Transition.Child
          as={Fragment as any}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment as any}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  "background-color w-full max-h-[calc(100vh-100px)] transform overflow-x-hidden overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 text-left align-middle shadow-xl transition-all dark:border-slate-800 dark:bg-slate-950 " +
                  (maxWidth ? maxWidth : " max-w-lg")
                }
              >
                {title && (
                  <Dialog.Title
                    as="div"
                    className="flex flex-row items-start justify-between p-6 pb-0"
                  >
                    <Title>{title}</Title>
                    {onClose && (
                      <Icon
                        className="cursor-pointer text-gray-500 dark:text-gray-500"
                        onClick={onClose}
                        icon={XMarkIcon}
                      />
                    )}
                  </Dialog.Title>
                )}
                <div className="px-6 w-full pb-4">{children}</div>

                {footer ? (
                  <div className="sticky px-6 pt-2 pb-4 bottom-0 w-full bg-slate-50 dark:bg-slate-950">
                    {footer}
                  </div>
                ) : (
                  <></>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateSeparatorModal;
