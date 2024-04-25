import "react-data-grid/lib/styles.css";
import DataGrid, { SortDirection } from "react-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Icon, MultiSelect, MultiSelectItem, Title } from "@tremor/react";
import { FunnelIcon as FunnelIconOutline } from "@heroicons/react/24/outline";
import { FunnelIcon as FunnelIconSolid } from "@heroicons/react/24/solid";
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/20/solid";
import React from "react";

function urlify(text: string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return (text + "").replace(urlRegex, function (url) {
    return '<a target="_blank" href="' + url + '">' + url + "</a>";
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

  let [objects, fields] = useMemo(() => {
    let newRows: any[] = [];
    let label = data.options?.scales?.x?.title?.text || "Label";
    data.data.datasets[0].data.map((item: any, i: number) => {
      let row: any = {
        [label]: data.data.labels[i],
      };
      data.data.datasets.map((a: any, j: number) => {
        row[a.label] = a.data[i];
      });
      newRows.push(row);
    });
    return [newRows, [label, ...data.data.datasets.map((a: any) => a.label)]];
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
            className="onvo-table-widget-header flex h-full flex-col justify-center gap-2"
            style={{ lineHeight: "12px" }}
          >
            <div className="onvo-table-widget-header-title flex flex-row items-center justify-between">
              {p.column.name}
              <div className={`${filterTypeClass} flex flex-row`}>
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
                  tooltip="Toggle filters"
                />
              </div>
            </div>
            {filterEnabled && (
              <MultiSelect
                placeholder="Filter"
                className="-mt-2"
                onValueChange={(val) => {
                  console.log(val);
                  setFilters({
                    ...filters,
                    [p.column.key]: val,
                  });
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                {options[a].map((b) => (
                  <MultiSelectItem key={a + "-" + b} value={b + ""}>
                    {b + ""}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            )}
          </div>
        );
      },
    }));
  }, [options, filterEnabled, sorting]);

  return (
    <div className="onvo-table-widget h-full flex flex-col relative">
      <Title className="onvo-table-widget-title text-md text-gray-600 dark:text-gray-500 my-0">
        {data.options.plugins.title.text}
      </Title>
      <DataGrid
        className="onvo-table-widget-data-grid fill-grid mt-3 h-full rounded-md border border-gray-200 dark:border-gray-800"
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
