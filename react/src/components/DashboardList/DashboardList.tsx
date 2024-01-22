import { Text, Title, Divider, Card } from "@tremor/react";

import React, { useEffect, useState } from "react";
import { useToken } from "../Wrapper";

import { LinkIcon, TableCellsIcon } from "@heroicons/react/24/outline";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const DashboardCard: React.FC<{
  dashboard: any;
}> = ({ dashboard }) => {
  return (
    <Card>
      <div className="relative mb-2 h-56 w-full rounded-lg border border-gray-200 bg-gray-50 object-contain object-top transition-all group-hover:shadow-lg dark:border-gray-700 dark:bg-gray-950">
        <img
          src={dashboard.thumbnail || ""}
          alt={dashboard.title}
          className="rounded-lg bg-gray-50 h-full w-full object-cover object-top dark:bg-gray-950 hover:object-bottom transition-all"
        />
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="flex-grow">
          <Title>{dashboard.title}</Title>
          <Text>{dashboard.description}</Text>
        </div>
      </div>
      <Divider className="my-3" />
      <div className="grid grid-cols-2">
        <div className="w-36 flex-shrink-0 flex flex-col gap-1">
          <Text className="flex flex-row items-center gap-2">
            <TableCellsIcon height={16} width={16} /> {dashboard.widgets.length}{" "}
            widgets
          </Text>
          <Text className="flex flex-row items-center gap-2">
            <LinkIcon height={16} width={16} /> {dashboard.datasources.length}{" "}
            datasources
          </Text>
        </div>
        <div className="w-48 flex-shrink-0 flex flex-col gap-1">
          <Text>Updated {dayjs(dashboard.last_updated_at).fromNow()}</Text>
          {dashboard.last_updated_by && (
            <div className="flex flex-row gap-2 items-center">
              <img
                alt={dashboard.last_updated_by.full_name || "Profile picture"}
                src={
                  dashboard.last_updated_by.avatar_url || "/default-user.png"
                }
                height={20}
                width={20}
                className="rounded-full flex-shrink-0 w-5"
              />
              <Text>{dashboard.last_updated_by.full_name}</Text>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const DashboardList: React.FC = ({}) => {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const { backend } = useToken();

  useEffect(() => {
    console.log("TOKEN: ", backend);
    if (backend) {
      backend.getDashboards().then((a) => {
        setDashboards(a);
      });
    }
  }, [backend]);

  return (
    <div className="w-full grid-cols-3 grid">
      {dashboards.map((a) => (
        <DashboardCard dashboard={a} />
      ))}
    </div>
  );
};

export default DashboardList;
