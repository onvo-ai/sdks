import React from "react";
import { Textarea } from "../../tremor/Textarea";
import { Input } from "../../tremor/Input";
import { Button } from "../../tremor/Button";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useDashboard } from "../Dashboard";
import { useBackend } from "../Wrapper";
import { Text } from "../../tremor/Text";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../tremor/Dialog";

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
  const { dashboard, refreshWidgets, container } = useDashboard();
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
        layouts: {
          lg: {
            x: 0,
            y: maxHeight,
            w: 24,
            h: 1,
          },
        },
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
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex h-full justify-center items-center transition-opacity duration-300 opacity-30 hover:opacity-100 cursor-pointer border-dashed border-gray-200 dark:border-gray-700 border-2 rounded-lg">
            <Text>+ Add separator</Text>
          </div>
        </DialogTrigger>
        <DialogContent container={container} className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {widget ? "Edit separator" : "Create separator"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
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
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
              >
                Go back
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={createSeparator}>
                {widget ? "Save" : "Create"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateSeparatorModal;
