import "react-data-grid/lib/styles.css";
import DataGrid, { SortDirection } from "react-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "../../tremor/Icon";
import { Title } from "../../tremor/Text";
import { FunnelIcon as FunnelIconOutline } from "@heroicons/react/24/outline";
import { FunnelIcon as FunnelIconSolid } from "@heroicons/react/24/solid";
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/20/solid";
import React from "react";
import { MultiSelect } from "../../tremor/MultiSelect";
import { useTheme } from "../../layouts/Dashboard/useTheme";

function urlify(text: string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return (text + "").replace(urlRegex, function (url) {
    let properUrl = url.search("http") !== -1 ? url : "https://" + url;
    return '<a target="_blank" href="' + properUrl + '">' + url + "</a>";
  });
}

const cellRenderer = (obj: { row: any; column: any }) => {
  let content = urlify(obj.row[obj.column.key]);
  return <span dangerouslySetInnerHTML={{ __html: content }}></span>;
};

const TableWidget: React.FC<{ data: any }> = ({ data }) => {
  const [sorting, setSorting] = useState<
    { columnKey: string; direction: SortDirection }[]
  >([]);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [options, setOptions] = useState<{ [key: string]: string[] }>({});
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const theme = useTheme();

  let [objects, fields] = useMemo(() => {
    let newRows: any[] = [];
    let label = data.options?.scales?.x?.title?.text || "Label";
    data.data.datasets[0].data.map((item: any, i: number) => {
      let row: any = {};
      if (data.data.labels && data.data.labels[i]) {
        row = {
          [label]: data.data.labels[i],
        };
      }
      data.data.datasets.map((a: any, j: number) => {
        row[a.label] = a.data[i];
      });
      newRows.push(row);
    });
    if (data.data.labels) {
      let newFields: string[] = [
        label,
        ...data.data.datasets.map((a: any) => a.label),
      ];
      return [newRows, newFields];
    } else {
      let newFields: string[] = data.data.datasets.map((a: any) => a.label);
      return [newRows, newFields];
    }
  }, [data]);

  useEffect(() => {
    let newFilters: { [key: string]: string[] } = {};
    let newOptions: { [key: string]: string[] } = {};
    fields.forEach((field) => {
      newFilters[field] = [];
      newOptions[field] = [];
      objects.forEach((row) => {
        if (!newOptions[field].includes(row[field])) {
          newOptions[field].push(row[field]);
        }
      });
    });
    setOptions(newOptions);
    setFilters(newFilters);
  }, [objects, fields]);

  let rows = useMemo(() => {
    let filtered = [...objects];
    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) {
        filtered = filtered.filter((a) =>
          (filters[key] + "").includes(a[key] + "")
        );
      }
    });

    if (sorting.length === 0) {
      return filtered;
    }
    const { columnKey, direction } = sorting[0];
    return filtered.sort((a, b) => {
      let reverse = direction === "ASC" ? 1 : -1;
      if (typeof a[columnKey] === "number") {
        return (a[columnKey] - b[columnKey]) * reverse;
      }
      return (a[columnKey].localeCompare(b[columnKey]) * reverse) as any;
    });
  }, [objects, sorting, filters]);

  let columns = useMemo(() => {
    return Object.keys(options).map((a) => ({
      key: a,
      name: a,
      renderCell: cellRenderer,
      renderHeaderCell: (p: any) => {
        const isMatchingFilterColumn =
          sorting.length > 0 && sorting[0].columnKey === p.column.name;
        const filterTypeClass = isMatchingFilterColumn
          ? "onvo-table-widget-filter-active"
          : "onvo-table-widget-filter-inactive";
        return (
          <div
            className="onvo-table-widget-header onvo-flex onvo-h-full onvo-flex-col onvo-justify-center onvo-gap-2"
            style={{ lineHeight: "12px" }}
          >
            <div className="onvo-table-widget-header-title onvo-flex onvo-flex-row onvo-items-center onvo-justify-between">
              {p.column.name}
              <div className={`${filterTypeClass} onvo-flex onvo-flex-row`}>
                {isMatchingFilterColumn && (
                  <Icon
                    icon={
                      sorting[0].direction === "ASC"
                        ? BarsArrowUpIcon
                        : BarsArrowDownIcon
                    }
                    size="sm"
                  />
                )}
                <Icon
                  onClick={(e) => {
                    setFilterEnabled((a) => !a);
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  icon={filterEnabled ? FunnelIconSolid : FunnelIconOutline}
                  size="sm"
                />
              </div>
            </div>
            {filterEnabled && (
              <MultiSelect
                placeholder="Filter"
                className="-onvo-mt-2"
                onValueChange={(val) => {
                  console.log("FILTER CHANGED: ", val);
                  setFilters({
                    ...filters,
                    [p.column.key]: val,
                  });
                }}
                items={options[a].map((c) => ({
                  label: c,
                  value: c,
                }))}
              />
            )}
          </div>
        );
      },
    }));
  }, [options, filterEnabled, sorting]);

  return (
    <div className="onvo-table-widget onvo-h-full onvo-flex onvo-flex-col onvo-relative">
      <Title className="onvo-table-widget-title onvo-text-md onvo-text-gray-600 dark:onvo-text-gray-500 onvo-font-override onvo-my-0">
        {data.options.plugins.title.text}
      </Title>
      <DataGrid
        className={
          "onvo-table-widget-data-grid onvo-fill-grid onvo-mt-3 onvo-h-full onvo-rounded-md onvo-border onvo-border-gray-200 dark:onvo-border-gray-800 " +
          (theme === "dark" ? "rdg-dark" : "rdg-light")
        }
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        enableVirtualization={true}
        headerRowHeight={filterEnabled ? 80 : 35}
        onSortColumnsChange={setSorting}
        sortColumns={sorting}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};
export default TableWidget;
