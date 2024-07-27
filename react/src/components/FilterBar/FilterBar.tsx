import { useState } from "react";
import { useDashboard } from "../Dashboard/Dashboard";
import { useBackend } from "../Wrapper";
import React from "react";
import { Button } from "../../tremor/Button";
import { Card } from "../../tremor/Card";
import { Label, Text, Title } from "../../tremor/Text";
import { SearchSelect } from "../../tremor/SearchSelect";
import { MultiSelect } from "../../tremor/MultiSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../tremor/Accordion";
import { toast } from "sonner";
import { DatePicker } from "../../tremor/DatePicker";
import dayjs from "dayjs";
import { DashboardFilter } from "@onvo-ai/js";
export const FilterBar = () => {
  const { dashboard, refreshWidgets, setWidgets } = useDashboard();
  const backend = useBackend();
  const [reloading, setReloading] = useState(false);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    {}
  );

  const updateDashboard = async () => {
    if (!dashboard || !dashboard.id) return;
    setReloading(true);
    if (!dashboard.parent_dashboard) {
      let newFilters: DashboardFilter[] = dashboard.filters || [];
      Object.keys(filterValues).forEach((key) => {
        newFilters = newFilters.map((filter) => {
          if (filter.parameter === key) {
            filter.default = filterValues[key];
          }
          return filter;
        });
      });
      await backend?.dashboards.update(dashboard.id, {
        filters: newFilters,
      });
    } else {
      let session = await backend?.sessions.get({ dashboard: dashboard?.id });
      let params = session?.parameters || {};

      await backend?.sessions.upsert({
        // @ts-ignore
        embed_user: session?.embed_user.id,
        parent_dashboard: dashboard?.parent_dashboard,
        parameters: { ...params, ...filterValues },
      });
    }
    let wids = await backend?.dashboard(dashboard?.id).updateWidgetCache();
    if (wids) {
      setWidgets(wids);
    }
    toast.success("Dashboard filters successfully updated");
    setReloading(false);
  };

  const filtersEnabled = dashboard?.settings?.filters;
  const filters = dashboard?.filters || [];

  const FiltersInner = () => (
    <div className="onvo-flex onvo-flex-col @xl:onvo-flex-row @xl:onvo-overflow-x-auto onvo-gap-2 onvo-items-end @xl:onvo-items-center">
      {filters.map((a) => {
        let options = (a.options || "")
          .split(",")
          .map((b: string) => b.trim()) as string[];

        return (
          <div
            key={a.title}
            className="onvo-flex onvo-flex-row onvo-w-full @xl:onvo-w-auto onvo-justify-between @xl:onvo-justify-start onvo-items-center onvo-gap-2"
          >
            <Text className="onvo-w-full @xl:onvo-w-auto">{a.title}</Text>
            {a.type === "picker" && (
              <SearchSelect
                value={
                  filterValues[a.parameter] === undefined
                    ? a.default
                    : filterValues[a.parameter]
                }
                onValueChange={(e) =>
                  setFilterValues({ ...filterValues, [a.parameter]: e })
                }
                items={options.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
              />
            )}

            {a.type === "multi-picker" && (
              <MultiSelect
                value={(filterValues[a.parameter] === undefined
                  ? a.default
                  : filterValues[a.parameter]
                )
                  .split(",")
                  .map((b: string) => b.trim())}
                onValueChange={(e) => {
                  setFilterValues({
                    ...filterValues,
                    [a.parameter]: e.join(","),
                  });
                }}
                items={options.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
              />
            )}

            {a.type === "date-picker" && (
              <DatePicker
                enableYearNavigation
                value={dayjs(
                  filterValues[a.parameter] === undefined
                    ? a.default
                    : filterValues[a.parameter],
                  a.options
                ).toDate()}
                onChange={(e) => {
                  setFilterValues({
                    ...filterValues,
                    [a.parameter]: dayjs(e).format(a.options),
                  });
                }}
              />
            )}
          </div>
        );
      })}
      <Button className="!onvo-py-1" onClick={updateDashboard}>
        Apply filters
      </Button>
    </div>
  );

  return (
    <>
      {reloading && (
        <div
          className="onvo-absolute onvo-top-0 onvo-left-0 onvo-z-50 onvo-w-full onvo-h-full onvo-flex onvo-items-center onvo-justify-center"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <Card className="onvo-loading-card onvo-flex onvo-flex-row onvo-gap-6 onvo-items-center !onvo-w-72">
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
            <Title>Regenerating widgets</Title>
          </Card>
        </div>
      )}

      {filtersEnabled && (
        <div className="onvo-@container/filters onvo-mx-[10px] onvo-mt-[10px]">
          <Card className="onvo-foreground-color onvo-hidden @xl/filters:onvo-flex onvo-py-2 onvo-flex-row onvo-gap-2 onvo-justify-between onvo-items-center">
            <Text className="onvo-font-semibold onvo-text-lg">Filters</Text>
            <FiltersInner />
          </Card>

          <Card className="onvo-foreground-color onvo-block @xl/filters:onvo-hidden onvo-py-2">
            <Accordion type="single" className="onvo-w-full" collapsible>
              <AccordionItem value="item-1" className="onvo-border-b-0">
                <AccordionTrigger className="onvo-py-1.5">
                  <Text className="onvo-font-semibold onvo-text-lg">
                    Filters
                  </Text>
                </AccordionTrigger>
                <AccordionContent>
                  <FiltersInner />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      )}
    </>
  );
};
