import { useState } from "react";
import { useDashboard } from "../Dashboard/Dashboard";
import { useBackend } from "../Wrapper";
import React from "react";
import {
  Button,
  Card,
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  Text,
} from "@tremor/react";

const FilterBar = () => {
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
  return (
    <>
      {reloading && (
        <div
          className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
          style={{ background: "rgba(0, 0, 0, 0.3)" }}
        >
          <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
            <div className="loader-dots block relative w-20 h-5 mt-2">
              <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <div className="text-gray-500 text-xs font-medium mt-2 text-center">
              Refreshing dashboard...
            </div>
          </div>
        </div>
      )}

      {filtersEnabled && (
        <div className="mx-[10px] mt-[10px]">
          <Card className=" py-2 flex flex-row justify-between items-center">
            <Text className="font-semibold text-lg">Filters</Text>
            <div className="flex flex-row gap-2 items-center">
              {filters.map((a) => {
                let options = (a.options || "")
                  .split(",")
                  .map((b: string) => b.trim());

                return (
                  <div
                    key={a.title}
                    className="flex flex-row items-center gap-2"
                  >
                    <Text>{a.title}</Text>
                    {a.type === "picker" && (
                      <SearchSelect
                        defaultValue={a.default}
                        onValueChange={(e) =>
                          setFilterValues({ ...filterValues, [a.parameter]: e })
                        }
                      >
                        {options.map((c: string) => (
                          <SearchSelectItem key={c} value={c}>
                            {c}
                          </SearchSelectItem>
                        ))}
                      </SearchSelect>
                    )}

                    {a.type === "multi-picker" && (
                      <MultiSelect
                        defaultValue={a.default
                          .split(",")
                          .map((b: string) => b.trim())}
                        onValueChange={(e) =>
                          setFilterValues({
                            ...filterValues,
                            [a.parameter]: e.join(","),
                          })
                        }
                      >
                        {options.map((c: string) => (
                          <MultiSelectItem key={c} value={c}>
                            {c}
                          </MultiSelectItem>
                        ))}
                      </MultiSelect>
                    )}
                  </div>
                );
              })}
              <Button size="xs" onClick={updateDashboard}>
                Apply filters
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default FilterBar;
