import { Badge, Icon, Metric, Text } from "@tremor/react";

import React, { useEffect, useState } from "react";
import { useDashboard } from "../Dashboard/Dashboard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
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
    <Badge key={key} size="xs" className="ml-2">
      Last updated {dayjs(date).fromNow()}
    </Badge>
  );
};

export const DashboardHeader: React.FC = ({}) => {
  const { dashboard } = useDashboard();

  return (
    <section className="onv-dashboard-header foreground-color sticky z-10 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 top-0">
      <main className="mx-auto px-6 pt-4 lg:px-8">
        <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Icon
            icon={PresentationChartBarIcon}
            variant="shadow"
            size="xl"
            tooltip="Back to dashboards"
          />

          <div className="w-full">
            {dashboard ? (
              <>
                <Metric className="font-override text-xl">
                  {dashboard?.title || " "}
                </Metric>
                <span className=" text-tremor-default text-tremor-content dark:text-dark-tremor-content font-override mt-1">
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
        </div>
      </main>
    </section>
  );
};
