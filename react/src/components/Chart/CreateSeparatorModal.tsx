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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  const { dashboard, refreshWidgets, container, adminMode } = useDashboard();
  const backend = useBackend();
  const { open, setOpen, widget } = useSeparatorModal();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
            h: 5,
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
    setLoading(false);
    setTitle("");
    setSubtitle("");
    refreshWidgets();
  };

  if (!dashboard?.settings?.can_create_widgets && !adminMode) return <></>;

  return (
    <>
      <Dialog open={open}>
        <div
          onClick={() => setOpen(true)}
          className="onvo-mx-[10px] onvo-mb-[10px] onvo-flex onvo-h-10 onvo-justify-center onvo-items-center onvo-transition-opacity onvo-duration-300 onvo-opacity-30 hover:onvo-opacity-100 onvo-cursor-pointer onvo-border-dashed onvo-border-gray-200 dark:onvo-border-gray-700 onvo-border-2 onvo-rounded-lg"
        >
          <Text>+ Add separator</Text>
        </div>
        <DialogContent container={container} className="sm:onvo-max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {widget ? "Edit separator" : "Create separator"}
            </DialogTitle>
            <DialogDescription className="onvo-mt-1 onvo-text-sm onvo-leading-6">
              <Text>Title</Text>
              <Input
                placeholder="Type in a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Text className="onvo-mt-2">Subtitle</Text>
              <Textarea
                placeholder="(Optional) Type in a subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="onvo-mt-6">
            <Button
              onClick={() => setOpen(false)}
              className="onvo-mt-2 onvo-w-full sm:onvo-mt-0 sm:onvo-w-fit"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button isLoading={loading} onClick={createSeparator}>
              {widget ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateSeparatorModal;
