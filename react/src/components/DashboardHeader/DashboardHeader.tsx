import { Badge } from "../../tremor/Badge";
import { Label, Metric } from "../../tremor/Text";
import { Button } from "../../tremor/Button";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChevronDownIcon,
  DocumentChartBarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useBackend } from "../../layouts/Wrapper";
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
  const { dashboard } = useDashboard();
  const { backend, adminMode } = useBackend();

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
      className={`onvo-dashboard-header onvo-sticky onvo-z-10 onvo-border-b onvo-foreground-color onvo-border-black/10 dark:onvo-border-white/10 onvo-top-0 ${className ? className : ""
        }`}
    >
      <main className="onvo-mx-auto onvo-px-6 onvo-py-3 lg:onvo-px-8 onvo-z-10 onvo-relative onvo-flex onvo-flex-col onvo-items-start onvo-justify-between onvo-gap-4 md:onvo-flex-row md:onvo-items-center">
        <div className="onvo-flex-grow">
          {dashboard ? (
            <>
              <Metric className="onvo-dashboard-header-title onvo-font-override onvo-text-xl">
                {dashboard?.title || " "}
              </Metric>
              <Label className="onvo-dashboard-header-description onvo-font-override">
                {dashboard?.description || " "}{" "}
                <LastUpdatedBadge date={dashboard.last_updated_at} />
              </Label>
            </>
          ) : (
            <div className="onvo-w-3/5 onvo-animate-pulse">
              <div className="onvo-mb-2 onvo-h-6 onvo-w-4/5 onvo-rounded-md onvo-bg-gray-100 dark:onvo-bg-gray-700" />
              <div className="onvo-h-4 onvo-w-2/5 onvo-rounded-md onvo-bg-gray-100 dark:onvo-bg-gray-700" />
            </div>
          )}
        </div>
        <div className="onvo-flex onvo-flex-row onvo-gap-2">
          {(ImageDownloadEnabled || ReportDownloadEnabled) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="onvo-background-color onvo-border-black/10 dark:onvo-border-white/10" variant="secondary" disabled={!dashboard}>
                  Download{" "}
                  <ChevronDownIcon className="onvo-h-4 onvo-w-4 onvo-ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="onvo-min-w-56 onvo-background-color onvo-border-black/10 dark:onvo-border-white/10">
                {ReportDownloadEnabled && (
                  <>
                    <DropdownMenuLabel>Reports</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => exportDashboard("xlsx")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <DocumentChartBarIcon className="onvo-size-4" />
                          <span>Download as excel</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportDashboard("csv")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <DropdownMenuIconWrapper>
                            <DocumentChartBarIcon className="onvo-size-4 onvo-text-inherit" />
                          </DropdownMenuIconWrapper>
                          <span>Download as CSV</span>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
                {ImageDownloadEnabled && ReportDownloadEnabled && (
                  <DropdownMenuSeparator className="onvo-border-black/10 dark:onvo-border-white/10" />
                )}
                {ImageDownloadEnabled && (
                  <>
                    <DropdownMenuLabel>Images</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => exportDashboard("pdf")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <PhotoIcon className="onvo-size-4" />
                          <span>Download as PDF</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportDashboard("png")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <DropdownMenuIconWrapper>
                            <PhotoIcon className="onvo-size-4 onvo-text-inherit" />
                          </DropdownMenuIconWrapper>
                          <span>Download as PNG</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportDashboard("jpeg")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <DropdownMenuIconWrapper>
                            <PhotoIcon className="onvo-size-4 onvo-text-inherit" />
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
