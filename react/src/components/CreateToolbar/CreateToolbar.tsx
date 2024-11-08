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
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { useBackend } from "../../layouts/Wrapper";
import { useMaxHeight } from "../../lib/useMaxHeight";

export const CreateToolbar: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  const { setOpen: setTextModalOpen } = useTextWidgetModal();
  const { setOpen: setImageModalOpen } = useImageWidgetModal();
  const { dashboard, refreshWidgets } = useDashboard();
  const { backend, adminMode } = useBackend();
  const { lg, sm } = useMaxHeight();

  const addDividerWidget = async () => {
    if (!dashboard || !backend) return;
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
    await backend.widgets.create({
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
    refreshWidgets(backend);
  };

  if (
    !dashboard?.settings?.can_ask_questions &&
    !dashboard?.settings?.can_create_widgets &&
    !adminMode
  ) {
    return <></>;
  }

  return (
    <>
      <div
        className={
          "onvo-absolute onvo-z-40 onvo-shadow-xl onvo-rounded-full onvo-bottom-4 onvo-flex onvo-justify-start onvo-gap-1 onvo-flex-row onvo-left-[50%] -onvo-ml-[160px] onvo-w-[320px] onvo-p-2 onvo-foreground-color onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10"
        }
      >
        {(dashboard?.settings?.can_ask_questions || adminMode) && (
          <div
            onClick={onClick}
            className="onvo-group onvo-relative onvo-cursor-pointer onvo-flex onvo-flex-row onvo-gap-2 onvo-items-center onvo-background-color onvo-rounded-full onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10"
          >

            <div className="onvo-size-10 group-hover:onvo-w-full onvo-overflow-x-hidden onvo-ease-in-out onvo-duration-300 onvo-transition-all onvo-bg-blue-500 onvo-rounded-full onvo-text-white onvo-flex onvo-justify-start onvo-items-center onvo-absolute onvo-left-0 onvo-top-0">
              <Text className="onvo-flex-shrink-0 onvo-relative onvo-whitespace-nowrap onvo-left-12 onvo-text-white onvo-font-semibold !onvo-w-28 onvo-mr-2">
                Ask AI...
              </Text>
            </div>
            <div className="onvo-size-10 onvo-z-10 onvo-bg-blue-500 onvo-rounded-full onvo-text-white onvo-flex onvo-justify-center onvo-items-center">
              <SparklesIcon className="onvo-size-5" />
            </div>
            <Text className=" onvo-flex-grow onvo-font-semibold onvo-w-28 onvo-mr-2">
              Ask AI...
            </Text>
          </div>
        )}

        {(dashboard?.settings?.can_create_widgets || adminMode) && (
          <>
            <Tooltip content="Create an image widget">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setImageModalOpen(true);
                }}
                className="onvo-group onvo-transition-all onvo-size-10 onvo-background-color hover:onvo-bg-blue-500 onvo-rounded-full onvo-text-white onvo-flex onvo-justify-center onvo-items-center onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10">
                <PhotoIcon className="onvo-size-6 onvo-text-blue-500 group-hover:!onvo-text-white onvo-transition-all" />
              </div>
            </Tooltip>
            <Tooltip content="Create a text widget">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setTextModalOpen(true);
                }}
                className="onvo-group onvo-transition-all onvo-size-10 onvo-background-color hover:onvo-bg-blue-500 onvo-rounded-full onvo-text-white onvo-flex onvo-justify-center onvo-items-center onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10">
                <LanguageIcon className="onvo-size-6 onvo-text-blue-500 group-hover:!onvo-text-white onvo-transition-all" />
              </div>
            </Tooltip>
            <Tooltip content="Create a divider">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  addDividerWidget();
                }}
                className="onvo-group onvo-transition-all onvo-size-10 onvo-background-color hover:onvo-bg-blue-500 onvo-rounded-full onvo-text-white onvo-flex onvo-justify-center onvo-items-center onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10">
                <DivideIcon className="onvo-size-6 onvo-text-blue-500 group-hover:!onvo-text-white onvo-transition-all" />
              </div>
            </Tooltip>
          </>
        )}
      </div></>
  );
};
