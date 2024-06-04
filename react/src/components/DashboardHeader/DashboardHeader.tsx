import { Badge } from "../../tremor/Badge";
import { Label, Metric } from "../../tremor/Text";
import { Button } from "../../tremor/Button";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDashboard } from "../Dashboard/Dashboard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChevronDownIcon,
  DocumentChartBarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useBackend } from "../Wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIconWrapper,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../tremor/DropdownMenu";

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
    <Badge key={key} className="onvo-last-updated-badge">
      Last updated {dayjs(date).fromNow()}
    </Badge>
  );
};

export const DashboardHeader: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { dashboard, adminMode } = useDashboard();
  const backend = useBackend();

  const exportDashboard = useCallback(
    (format: "csv" | "xlsx" | "pdf" | "png" | "jpeg") => {
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

  const ImageDownloadEnabled = useMemo(() => {
    if (dashboard?.settings && dashboard.settings.disable_download_images)
      return false;
    return true;
  }, [dashboard]);

  const ReportDownloadEnabled = useMemo(() => {
    if (dashboard?.settings && dashboard.settings.disable_download_reports)
      return false;
    return true;
  }, [dashboard]);

  if (dashboard?.settings?.hide_header && !adminMode) return <></>;

  return (
    <section
      className={`onvo-dashboard-header sticky z-10 border-b foreground-color border-gray-200 dark:border-gray-800 top-0 ${
        className ? className : ""
      }`}
    >
      <main className="mx-auto px-6 py-3 lg:px-8 z-10 relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex-grow">
          {dashboard ? (
            <>
              <Metric className="onvo-dashboard-header-title font-override text-xl -mb-1">
                {dashboard?.title || " "}
              </Metric>
              <Label className="onvo-dashboard-header-description font-override">
                {dashboard?.description || " "}{" "}
                <LastUpdatedBadge date={dashboard.last_updated_at} />
              </Label>
            </>
          ) : (
            <div className="w-3/5 animate-pulse">
              <div className="mb-2 h-6 w-4/5 rounded-md bg-gray-100 dark:bg-gray-700" />
              <div className="h-4 w-2/5 rounded-md bg-gray-100 dark:bg-gray-700" />
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2">
          {(ImageDownloadEnabled || ReportDownloadEnabled) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" disabled={!dashboard}>
                  Download <ChevronDownIcon className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-56">
                {ReportDownloadEnabled && (
                  <>
                    <DropdownMenuLabel>Reports</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => exportDashboard("xlsx")}>
                        <span className="flex items-center gap-x-2">
                          <DocumentChartBarIcon className="size-4" />
                          <span>Download as excel</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportDashboard("csv")}>
                        <span className="flex items-center gap-x-2">
                          <DropdownMenuIconWrapper>
                            <DocumentChartBarIcon className="size-4 text-inherit" />
                          </DropdownMenuIconWrapper>
                          <span>Download as CSV</span>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
                {ImageDownloadEnabled && ReportDownloadEnabled && (
                  <DropdownMenuSeparator />
                )}
                {ImageDownloadEnabled && (
                  <>
                    <DropdownMenuLabel>Images</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => exportDashboard("pdf")}>
                        <span className="flex items-center gap-x-2">
                          <PhotoIcon className="size-4" />
                          <span>Download as PDF</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportDashboard("png")}>
                        <span className="flex items-center gap-x-2">
                          <DropdownMenuIconWrapper>
                            <PhotoIcon className="size-4 text-inherit" />
                          </DropdownMenuIconWrapper>
                          <span>Download as PNG</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportDashboard("jpeg")}>
                        <span className="flex items-center gap-x-2">
                          <DropdownMenuIconWrapper>
                            <PhotoIcon className="size-4 text-inherit" />
                          </DropdownMenuIconWrapper>
                          <span>Download as JPEG</span>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {children}
        </div>
      </main>
    </section>
  );
};
