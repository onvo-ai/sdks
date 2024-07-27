import { Icon } from "../../tremor/Icon";
import { Text } from "../../tremor/Text";
import {
  LanguageIcon,
  PhotoIcon,
  SparklesIcon,
  DivideIcon,
} from "@heroicons/react/20/solid";
import { Tooltip } from "../../tremor/Tooltip/Tooltip";
import React from "react";
import { useTextWidgetModal } from "../TextWidgetModal";
import { useImageWidgetModal } from "../ImageWidgetModal";
import { useDashboard } from "../Dashboard";
import { useBackend } from "../Wrapper";
import { useMaxHeight } from "../../lib/maxHeight";

export const CreateToolbar: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  const { setOpen: setTextModalOpen } = useTextWidgetModal();
  const { setOpen: setImageModalOpen } = useImageWidgetModal();
  const { dashboard, adminMode, refreshWidgets } = useDashboard();
  const backend = useBackend();
  const { lg, sm } = useMaxHeight();

  const addDividerWidget = async () => {
    if (!dashboard) return;
    let cache = {
      type: "divider",
      data: { datasets: [{ data: [], label: "" }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          divider: {
            display: true,
          },
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          subtitle: {
            display: false,
          },
        },
      },
    };
    let code = `
    def main():  
        return {
            "type": "divider",
            "data": {"datasets": [{"data": [], "label": ""}]},
            "options": {
                "responsive": True,
                "maintainAspectRatio": False,
                "plugins": {
                    "divider": {
                        "display": True
                    },
                    "title": {
                        "display": False
                    },
                    "subtitle": {
                        "display": False
                    },
                    "legend": {
                        "display": False
                    }
                },
            },
        }
      `;
    await backend?.widgets.create({
      dashboard: dashboard.id,
      layouts: {
        lg: {
          x: 0,
          y: lg,
          w: 12,
          h: 4,
        },
        sm: {
          x: 0,
          y: sm,
          w: 3,
          h: 4,
        },
      },
      use_as_example: false,
      use_in_library: false,
      cache: cache,
      title: "Divider",
      team: dashboard.team,
      code: code,
      messages: [],
      settings: {
        disable_download_images: false,
        disable_download_reports: false,
        title_hidden: true,
      },
    });
    refreshWidgets();
  };

  if (!dashboard?.settings?.can_create_widgets && !adminMode) {
    return <></>;
  }

  return (
    <div
      className={
        "onvo-relative onvo-flex onvo-justify-center onvo-gap-2 onvo-flex-row onvo-right-0 onvo-z-10 onvo-w-full onvo-p-3 onvo-foreground-color onvo-border-t onvo-border-gray-200 dark:onvo-border-gray-800"
      }
    >
      <div
        onClick={onClick}
        className="onvo-bg-slate-100 dark:onvo-bg-slate-700 onvo-border-slate-900/60 onvo-ring-slate-900/20 onvo-border onvo-ring-2 dark:onvo-border-slate-50/60 dark:onvo-ring-slate-50/20 onvo-rounded-lg onvo-cursor-pointer onvo-h- onvo-z-10 onvo-pr-2 onvo-relative onvo-flex onvo-flex-shrink-0 onvo-w-64 onvo-flex-row onvo-items-center onvo-gap-2"
      >
        <div className="onvo-size-7 onvo-ml-1 onvo-bg-blue-500 onvo-rounded-lg onvo-text-white onvo-flex onvo-justify-center onvo-items-center">
          <SparklesIcon className="onvo-size-5" />
        </div>
        <Text className="onvo-z-10 onvo-flex-grow onvo-font-semibold">
          Create a widget with AI
        </Text>
      </div>
      <Tooltip content="Create an image widget">
        <Icon
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            setImageModalOpen(true);
          }}
          size="md"
          icon={PhotoIcon}
        />
      </Tooltip>
      <Tooltip content="Create a text widget">
        <Icon
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            setTextModalOpen(true);
          }}
          size="md"
          icon={LanguageIcon}
        />
      </Tooltip>
      <Tooltip content="Create a divider">
        <Icon
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            addDividerWidget();
          }}
          size="md"
          icon={DivideIcon}
        />
      </Tooltip>
    </div>
  );
};
