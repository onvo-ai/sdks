import { useState } from "react";
import { useDashboard } from "../Dashboard/Dashboard";
import { useBackend } from "../Wrapper";
import React from "react";
import { Button } from "../../tremor/Button";
import { Card } from "../../tremor/Card";
import { Text } from "../../tremor/Text";
import { SearchSelect } from "../../tremor/SearchSelect";
import { MultiSelect } from "../../tremor/MultiSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../tremor/Accordion";
export const FilterBar = () => {
  const { dashboard, refreshWidgets } = useDashboard();
  const backend = useBackend();
  const [reloading, setReloading] = useState(false);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    {}
  );

  const updateDashboard = async () => {
    if (!dashboard || !dashboard.id) return;
    setReloading(true);
    if (!dashboard.parent_dashboard) {
      let newFilters = (dashboard.filters || []) as {
        title: string;
        parameter: string;
        default: string;
        type: string;
        options: string;
      }[];
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
      return;
    } else {
      let session = await backend?.sessions.get({ dashboard: dashboard?.id });
      let params = JSON.parse(session?.parameters || "{}");

      console.log("SESSION PARAMS: ", params);
      console.log("FILTER VALUES: ", filterValues);

      await backend?.sessions.upsert({
        // @ts-ignore
        embed_user: session?.embed_user.id,
        parent_dashboard: dashboard?.parent_dashboard,
        parameters: { ...params, ...filterValues },
      });
    }
    await backend?.dashboard(dashboard?.id).updateWidgetCache();
    await refreshWidgets();
    setReloading(false);
  };

  const filtersEnabled = dashboard?.settings?.filters;
  const filters = (dashboard?.filters as any[]) || [];

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
                defaultValue={a.default}
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
                defaultValue={a.default.split(",").map((b: string) => b.trim())}
                onValueChange={(e) =>
                  setFilterValues({
                    ...filterValues,
                    [a.parameter]: e.join(","),
                  })
                }
                items={options.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
              />
            )}
          </div>
        );
      })}
      <Button onClick={updateDashboard}>Apply filters</Button>
    </div>
  );

  return (
    <>
      {reloading && (
        <div
          className="onvo-fixed onvo-top-0 onvo-left-0 onvo-z-50 onvo-w-screen onvo-h-screen onvo-flex onvo-items-center onvo-justify-center"
          style={{ background: "rgba(0, 0, 0, 0.3)" }}
        >
          <div className="onvo-bg-white onvo-border onvo-py-2 onvo-px-5 onvo-rounded-lg onvo-flex onvo-items-center onvo-flex-col">
            <div className="onvo-loader-dots onvo-block onvo-relative onvo-w-20 onvo-h-5 onvo-mt-2">
              <div className="onvo-absolute onvo-top-0 onvo-mt-1 onvo-w-3 onvo-h-3 onvo-rounded-full onvo-bg-blue-500"></div>
              <div className="onvo-absolute onvo-top-0 onvo-mt-1 onvo-w-3 onvo-h-3 onvo-rounded-full onvo-bg-blue-500"></div>
              <div className="onvo-absolute onvo-top-0 onvo-mt-1 onvo-w-3 onvo-h-3 onvo-rounded-full onvo-bg-blue-500"></div>
              <div className="onvo-absolute onvo-top-0 onvo-mt-1 onvo-w-3 onvo-h-3 onvo-rounded-full onvo-bg-blue-500"></div>
            </div>
            <div className="onvo-text-gray-500 onvo-text-xs onvo-font-medium onvo-mt-2 onvo-text-center">
              Refreshing dashboard...
            </div>
          </div>
        </div>
      )}

      {filtersEnabled && (
        <div className="onvo-@container onvo-mx-[10px] onvo-mt-[10px]">
          <Card className="onvo-foreground-color onvo-hidden @xl:onvo-flex onvo-py-2 onvo-flex-row onvo-gap-2 onvo-justify-between onvo-items-center">
            <Text className="onvo-font-semibold onvo-text-lg">Filters</Text>
            <FiltersInner />
          </Card>

          <Card className="onvo-foreground-color onvo-block @xl:onvo-hidden onvo-py-2">
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
