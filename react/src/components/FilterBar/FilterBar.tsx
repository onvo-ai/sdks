import { useEffect, useState } from "react";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { useBackend } from "../../layouts/Wrapper";
import React from "react";
import { Button } from "../../tremor/Button";
import { Text, Title } from "../../tremor/Text";
import { MultiSelect } from "../../tremor/MultiSelect";
import { toast } from "sonner";
import { DateRangePicker } from "../../tremor/DatePicker";
import dayjs from "dayjs";
import { DashboardFilter } from "@onvo-ai/js";
import { Slider } from "../../tremor/Slider";

const presets = [
  {
    label: "Today",
    dateRange: {
      from: new Date(),
      to: new Date(),
    },
  },
  {
    label: "Last 7 days",
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date(),
    },
  },
  {
    label: "Last 30 days",
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  },
  {
    label: "Last 3 months",
    dateRange: {
      from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
      to: new Date(),
    },
  },
  {
    label: "Last 6 months",
    dateRange: {
      from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
      to: new Date(),
    },
  },
  {
    label: "Month to date",
    dateRange: {
      from: new Date(new Date().setDate(1)),
      to: new Date(),
    },
  },
  {
    label: "Year to date",
    dateRange: {
      from: new Date(new Date().setFullYear(new Date().getFullYear(), 0, 1)),
      to: new Date(),
    },
  }
];


export const FilterBar = () => {
  const { dashboard, setWidgets, refreshDashboard } = useDashboard();
  const { backend } = useBackend();

  const [reloading, setReloading] = useState(false);
  const [filters, setFilters] = useState<DashboardFilter[]>([]);

  const resetFilters = async () => {
    setFilters([]);
    if (!dashboard || !dashboard.id || !backend) return;
    setReloading(true);

    await backend.dashboards.update(dashboard.id, {
      filters: [],
    });

    let wids = await backend.dashboard(dashboard?.id).updateWidgetCache();
    if (wids) {
      setWidgets(wids);
      refreshDashboard(backend);
    }
    toast.success("Dashboard filters successfully reset");
    setReloading(false);
  }

  const updateDashboard = async () => {
    if (!dashboard || !dashboard.id || !backend) return;
    setReloading(true);

    await backend.dashboards.update(dashboard.id, {
      filters,
    });

    let wids = await backend.dashboard(dashboard?.id).updateWidgetCache();
    if (wids) {
      setWidgets(wids);
    }
    toast.success("Dashboard filters successfully updated");
    setReloading(false);
  };

  const filtersEnabled = dashboard?.settings?.filters;
  useEffect(() => {
    setFilters(dashboard?.filters || []);
  }, [dashboard?.filters]);

  if (!filtersEnabled) return <></>;

  return (
    <>
      {reloading && (
        <div
          className="onvo-absolute onvo-top-0 onvo-left-0 onvo-z-50 onvo-w-full onvo-h-full onvo-flex onvo-items-center onvo-flex-col onvo-gap-2 onvo-justify-center onvo-bg-white dark:onvo-bg-slate-900"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="onvo-inline onvo-w-10 onvo-h-10 onvo-text-gray-200 onvo-animate-spin dark:onvo-text-gray-600 onvo-fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <Title className="onvo-text-center">Refreshing dashboard</Title>

        </div>
      )}

      <div className="onvo-foreground-color onvo-flex onvo-flex-col onvo-gap-2 onvo-justify-start onvo-items-start">

        <div className="onvo-w-full onvo-py-3 onvo-px-4 onvo-flex onvo-flex-row onvo-items-center onvo-justify-between onvo-border-b onvo-border-black/10">
          <Title className="onvo-font-semibold onvo-text-md">Filters</Title>
        </div>
        <div className="onvo-flex onvo-flex-col onvo-py-2 onvo-px-3 onvo-gap-2 onvo-w-full">
          {filters.map((filter) => {
            return (
              <div
                key={filter.label}
                className="onvo-flex onvo-flex-col onvo-w-full onvo-gap-2"
              >
                <Text className="onvo-w-full">{filter.label}</Text>

                {filter.type === "text" && (
                  <MultiSelect
                    footer
                    value={filter.values}
                    onValueChange={(e) => {
                      // @ts-ignore
                      setFilters(filters.map(a => {
                        if (a.label !== filter.label) return a;
                        else {
                          return {
                            ...a,
                            values: e
                          }
                        }
                      }))
                    }}
                    className="onvo-max-w-full"
                    items={filter.options.map((opt) => ({
                      label: opt === "" ? "(blank)" : opt,
                      value: opt,
                    }))}
                  />
                )}

                {filter.type === "number" && (
                  <Slider
                    defaultValue={filter.values}
                    min={filter.options[0]}
                    max={filter.options[1]}
                    className="!onvo-w-full onvo-flex-shrink-0" onValueChange={e => {

                      // @ts-ignore
                      setFilters(filters.map(a => {
                        if (a.label !== filter.label) return a;
                        else {
                          return {
                            ...a,
                            values: e
                          }
                        }
                      }))
                    }}
                  />
                )}

                {filter.type === "date" && (
                  <DateRangePicker
                    presets={presets}
                    enableYearNavigation
                    toDate={dayjs(filter.options[1]).toDate()}
                    fromDate={dayjs(filter.options[0]).toDate()}
                    value={{
                      from: dayjs(filter.values[0]).toDate(),
                      to: dayjs(filter.values[1]).toDate()
                    }}

                    onChange={(e) => {
                      if (!e || !e.from || !e?.to) return;
                      // @ts-ignore
                      setFilters(filters.map(a => {
                        if (a.label !== filter.label) return a;
                        else {
                          return {
                            ...a,
                            values: [dayjs(e.from).format("YYYY-MM-DD"), dayjs(e.to).format("YYYY-MM-DD")]
                          }
                        }
                      }))
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="onvo-w-full onvo-py-2 onvo-px-3 onvo-flex onvo-flex-row onvo-items-center onvo-justify-between onvo-border-t onvo-border-black/10">

          <Button className="onvo-py-1" variant="secondary" onClick={resetFilters}>
            Reset filters
          </Button>

          <Button className="onvo-py-1" onClick={updateDashboard}>
            Apply filters
          </Button>
        </div>
      </div>

    </>
  );
};
