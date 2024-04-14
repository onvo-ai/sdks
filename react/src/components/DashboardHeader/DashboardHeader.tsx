import { Badge, Button, Icon, Metric, Text } from "@tremor/react";

import React, { Fragment, useCallback, useEffect, useState } from "react";
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
    <Badge key={key} size="xs" className="onvo-last-updated-badge ml-2">
      Last updated {dayjs(date).fromNow()}
    </Badge>
  );
};

export const DashboardHeader: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { dashboard } = useDashboard();
  const backend = useBackend();

  const exportDashboard = useCallback(
    (format: "csv" | "xlsx" | "pdf" | "png") => {
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

  return (
    <section className="onvo-dashboard-header foreground-color sticky z-10 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 top-0">
      <main className="mx-auto px-6 pt-4 lg:px-8">
        <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Icon
            icon={PresentationChartBarIcon}
            variant="shadow"
            size="lg"
            tooltip="Back to dashboards"
          />

          <div className="w-full">
            {dashboard ? (
              <>
                <Metric className="onvo-dashboard-header-title font-override text-xl">
                  {dashboard?.title || " "}
                </Metric>
                <span className="onvo-dashboard-header-description text-tremor-default text-tremor-content dark:text-dark-tremor-content font-override mt-1">
                  {dashboard?.description || " "}
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
            <Menu
              as="div"
              className="onvo-dashboard-header-download relative inline-block text-left"
            >
              <Menu.Button
                as="div"
                className="onvo-dashboard-header-download-button"
              >
                <Button
                  icon={ChevronDownIcon}
                  iconPosition="right"
                  size="xs"
                  variant="secondary"
                  disabled={!dashboard}
                >
                  Download
                </Button>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="onvo-download-menu-items absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => exportDashboard("xlsx")}
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } onvo-download-menu-item-xlsx  group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <DocumentChartBarIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Download excel
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => exportDashboard("csv")}
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } onvo-download-menu-item-csv group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <TableCellsIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Download csv
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => exportDashboard("png")}
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } onvo-download-menu-item-png group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PhotoIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Download png
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => exportDashboard("pdf")}
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } onvo-download-menu-item-pdf group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <DocumentIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Download pdf
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {children}
          </div>
        </div>
      </main>
    </section>
  );
};
