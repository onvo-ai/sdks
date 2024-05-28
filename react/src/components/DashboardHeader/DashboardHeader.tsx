import { Badge, Button, Icon, Metric, Text } from "@tremor/react";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDashboard } from "../Dashboard/Dashboard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChevronDownIcon,
  DocumentIcon,
  DocumentChartBarIcon,
  PhotoIcon,
  PresentationChartBarIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { toast } from "sonner";
import { useBackend } from "../Wrapper";
import Dropdown from "../Chart/Dropdown";

dayjs.extend(relativeTime);

export const LastUpdatedBadge: React.FC<{ date: string }> = ({ date }) => {
  const [key, setKey] = useState(date);

  useEffect(() => {
    let interval = setInterval(() => {
      setKey(new Date().toISOString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Badge key={key} size="xs" className="onvo-last-updated-badge">
      Last updated {dayjs(date).fromNow()}
    </Badge>
  );
};

export const DashboardHeader: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { dashboard } = useDashboard();
  const backend = useBackend();

  const exportDashboard = useCallback(
    (format: "csv" | "xlsx" | "pdf" | "png" | "jpeg") => {
      if (!backend || !dashboard) {
        return;
      }
      toast.promise(
        async () => {
          const blob = await backend.dashboard(dashboard.id).export(format);
          return window.URL.createObjectURL(blob);
        },
        {
          loading: `Exporting dashboard as ${format}...`,
          success: (url: string) => {
            let a = document.createElement("a");
            a.download = dashboard.title + "." + format;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            a.remove();
            return "Dashboard exported successfully";
          },
          error: (e: any) => {
            return "Failed to export dashboard: " + e.message;
          },
        }
      );
    },
    [dashboard, backend]
  );

  const ImageDownloadEnabled = useMemo(() => {
    if (dashboard?.settings && dashboard.settings.disable_download_images)
      return false;
    return true;
  }, [dashboard]);

  const ReportDownloadEnabled = useMemo(() => {
    if (dashboard?.settings && dashboard.settings.disable_download_reports)
      return false;
    return true;
  }, [dashboard]);

  const options = [
    ...(ReportDownloadEnabled
      ? [
          {
            title: "Download as excel",
            icon: DocumentChartBarIcon,
            id: "download-excel",
            onClick: () => exportDashboard("xlsx"),
          },
          {
            title: "Download as csv",
            icon: TableCellsIcon,
            id: "download-csv",
            onClick: () => exportDashboard("csv"),
          },
        ]
      : []),

    ...(!ImageDownloadEnabled
      ? []
      : [
          {
            title: "Download as PDF",
            icon: PhotoIcon,
            id: "download-pdf",
            onClick: () => exportDashboard("pdf"),
          },
          {
            title: "Download as png",
            icon: PhotoIcon,
            id: "download-png",
            onClick: () => exportDashboard("png"),
          },
          {
            title: "Download as jpeg",
            icon: PhotoIcon,
            id: "download-jpeg",
            onClick: () => exportDashboard("jpeg"),
          },
        ]),
  ];

  return (
    <section
      className={`onvo-dashboard-header backdrop-blur-lg sticky z-10 border-b border-gray-200 dark:border-gray-800 top-0 ${className ? className : ""}`}
    >
      <div className="absolute top-0 left-0 w-full h-full z-0 foreground-color opacity-30 dark:opacity-50" />
      <main className="mx-auto px-6 pt-4 lg:px-8 z-10 relative">
        <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Icon
            icon={PresentationChartBarIcon}
            variant="shadow"
            size="lg"
            className="hidden md:block"
            tooltip="Back to dashboards"
          />

          <div className="w-full">
            {dashboard ? (
              <>
                <Metric className="onvo-dashboard-header-title font-override text-xl">
                  {dashboard?.title || " "}
                </Metric>
                <span className="onvo-dashboard-header-description text-tremor-default text-tremor-content dark:text-dark-tremor-content font-override mt-1">
                  {dashboard?.description || " "}{" "}
                  <LastUpdatedBadge date={dashboard.last_updated_at} />
                </span>
              </>
            ) : (
              <div className="w-3/5 animate-pulse">
                <div className="mb-2 h-6 w-4/5 rounded-md bg-gray-100 dark:bg-gray-700" />
                <div className="h-4 w-2/5 rounded-md bg-gray-100 dark:bg-gray-700" />
              </div>
            )}
          </div>
          <div className="flex flex-row gap-2">
            {(ImageDownloadEnabled || ReportDownloadEnabled) && (
              <Dropdown options={[options]}>
                <Button
                  icon={ChevronDownIcon}
                  iconPosition="right"
                  size="xs"
                  variant="secondary"
                  disabled={!dashboard}
                >
                  Download
                </Button>
              </Dropdown>
            )}
            {children}
          </div>
        </div>
      </main>
    </section>
  );
};
