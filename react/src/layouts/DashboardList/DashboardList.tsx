import { Divider } from "../../tremor/Divider";
import { Text, Title } from "../../tremor/Text";
import { Card } from "../../tremor/Card";
import React, { useEffect, useState } from "react";
import { useBackend, Wrapper } from "../../layouts/Wrapper";

import {
  ClockIcon,
  LinkIcon,
  PencilIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dashboard, DashboardMeta } from "@onvo-ai/js";
import r2wc from "@r2wc/react-to-web-component";
dayjs.extend(relativeTime);

const DashboardCard: React.FC<{
  dashboard: Dashboard & { _meta: DashboardMeta };
  onClick?: (dashboard: Dashboard & { _meta: DashboardMeta }) => void;
  variant?: "list" | "grid";
}> = ({ dashboard, onClick, variant = "grid" }) => {
  return (
    <Card
      onClick={() => onClick && onClick(dashboard)}
      className={
        "onvo-dashboard-card onvo-gap-4 onvo-flex " +
        (variant === "grid"
          ? "onvo-flex-col"
          : "onvo-flex-row onvo-items-center")
      }
    >
      <div
        className={
          "onvo-relative onvo-rounded-lg onvo-border onvo-border-gray-200 onvo-bg-gray-50 onvo-object-contain onvo-object-top onvo-transition-all group-hover:onvo-shadow-lg dark:onvo-border-gray-700 dark:onvo-bg-gray-950 " +
          (variant === "grid" ? "onvo-h-56 onvo-w-full" : "onvo-h-32 onvo-w-72")
        }
      >
        <img
          src={dashboard.thumbnail || ""}
          alt={dashboard.title}
          className="onvo-rounded-lg onvo-bg-gray-50 onvo-h-full onvo-w-full onvo-object-cover onvo-object-top dark:onvo-bg-gray-950 hover:onvo-object-bottom onvo-transition-all"
        />
      </div>

      <div className="onvo-flex onvo-flex-grow onvo-flex-row onvo-items-center onvo-gap-2">
        <div className="onvo-flex-grow">
          <Title className="onvo-dashboard-card-title">{dashboard.title}</Title>
          <Text className="onvo-dashboard-card-description">
            {dashboard.description}
          </Text>
        </div>
      </div>

      <Divider
        className={
          "!onvo-my-0 " +
          (variant === "list"
            ? "onvo-h-full onvo-w-[1px]"
            : "onvo-w-full onvo-h-[1px]")
        }
      />

      <div className="onvo-grid onvo-grid-cols-2">
        <div className="onvo-w-36 onvo-flex-shrink-0 onvo-flex onvo-flex-col onvo-gap-1">
          <Text className="onvo-dashboard-card-details-text onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
            <TableCellsIcon height={16} width={16} /> {dashboard._meta.widgets}{" "}
            widgets
          </Text>
          <Text className="onvo-dashboard-card-details-text onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
            <LinkIcon height={16} width={16} /> {dashboard._meta.datasources}{" "}
            datasources
          </Text>
        </div>
        <div className="onvo-w-48 onvo-flex-shrink-0 onvo-flex onvo-flex-col onvo-gap-1">
          <Text className="onvo-dashboard-card-details-text onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
            <ClockIcon height={16} width={16} />
            Created {dayjs(dashboard.created_at).fromNow()}
          </Text>
          <Text className="onvo-dashboard-card-details-text onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
            <PencilIcon height={16} width={16} />
            Updated {dayjs(dashboard.last_updated_at).fromNow()}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export const DashboardList: React.FC<{
  columns?: number;
  onClickItem?: (dashboard: any) => void;
  variant?: "list" | "grid";
}> = ({ columns = 3, onClickItem, variant = "grid" }): React.ReactNode => {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const { backend } = useBackend();

  useEffect(() => {
    if (backend) {
      backend.dashboards
        .list()
        .then((a) => {
          // @ts-ignore
          setDashboards(a);
        })
        .catch((e) => console.log("UNABLE TO FETCH LIST: ", e));
    }
  }, [backend]);

  let cols =
    {
      1: "onvo-grid-cols-1",
      2: "onvo-grid-cols-2",
      3: "onvo-grid-cols-3",
      4: "onvo-grid-cols-4",
      5: "onvo-grid-cols-5",
      6: "onvo-grid-cols-6",
    }[columns] || "onvo-grid-cols-2";

  return (
    <div
      className={"onvo-dashboard-list onvo-w-full onvo-grid onvo-gap-4 " + cols}
    >
      {dashboards.map((a) => (
        <DashboardCard
          key={a.id}
          dashboard={a}
          onClick={onClickItem}
          variant={variant}
        />
      ))}
    </div>
  );
};
