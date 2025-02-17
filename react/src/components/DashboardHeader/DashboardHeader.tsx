import { Badge } from "../../tremor/Badge";
import { Label, Metric } from "../../tremor/Text";
import { Button } from "../../tremor/Button";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ClockIcon,
  DocumentChartBarIcon,
  PhotoIcon,
  PresentationChartBarIcon,
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
import { useTheme } from "../../layouts/Dashboard/useTheme";
import { AutomationsModal, useAutomationsModal } from "../AutomationsModal";
import { Popover, PopoverContent, PopoverTrigger } from "../../tremor/Popover";
import { FilterBar } from "../FilterBar";

dayjs.extend(relativeTime);

export const LastUpdatedBadge: React.FC<{ date: string, refreshing: boolean }> = ({ date, refreshing }) => {
  const [key, setKey] = useState(date);

  useEffect(() => {
    let interval = setInterval(() => {
      setKey(new Date().toISOString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (refreshing) {
    return (
      <Badge key="refreshing-badge" className="onvo-last-updated-badge ml-2">
        <ArrowPathIcon className="onvo-size-3 onvo-animate-spin" />
        Auto refreshing...
      </Badge>
    );
  }
  return (
    <Badge key={key} className="onvo-last-updated-badge ml-2">
      Updated {dayjs(date).fromNow()}
    </Badge>
  );
};

export const DashboardHeader: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { setOpen } = useAutomationsModal();
  const { dashboard, refreshing } = useDashboard();
  const theme = useTheme();
  const { backend, adminMode } = useBackend();
  const headerRef = useRef(null);

  const exportDashboard = useCallback(
    (format: "csv" | "xlsx" | "pdf" | "png" | "jpeg" | "pptx") => {
      if (!backend || !dashboard) {
        return;
      }
      toast.promise(
        async () => {
          const blob = await backend.dashboard(dashboard.id).export(format, theme);
          return window.URL.createObjectURL(blob);
        },
        {
          loading: `Exporting dashboard as ${format}...`,
          success: (url: string) => {
            let a = document.createElement("a");
            if (format === "csv") {
              a.download = dashboard.title + ".zip";
            } else {
              a.download = dashboard.title + "." + format;
            }
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


  const DocumentDownloadEnabled = useMemo(() => {
    if (dashboard?.settings && dashboard.settings.disable_download_documents)
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
    <section ref={headerRef}
      className={`onvo-@container/onvo-dashboard-header onvo-leading-tight onvo-background-color onvo-dashboard-header onvo-sticky onvo-z-50 onvo-top-0 ${className ? className : ""}`}
      style={{
        boxShadow: `0px 8px 4px ${theme === "dark" ? dashboard?.settings?.dark_background : dashboard?.settings?.light_background}`,
      }}

    >
      <AutomationsModal />
      <main className="onvo-mx-auto onvo-px-5 onvo-py-4 onvo-z-10 onvo-relative onvo-flex onvo-flex-col onvo-items-start onvo-justify-between onvo-gap-4 @lg/onvo-dashboard-header:onvo-flex-row @lg/onvo-dashboard-header:onvo-items-center">
        <div className="onvo-flex-grow">
          {dashboard ? (
            <>
              <Metric className="onvo-dashboard-header-title !onvo-font-semibold dark:!onvo-text-white !onvo-text-black onvo-font-override onvo-text-xl">
                {dashboard?.title || " "}
              </Metric>
              <Label className="onvo-dashboard-header-description !onvo-font-normal onvo-font-override">
                {dashboard?.description || " "}
                {" "}
                <LastUpdatedBadge refreshing={refreshing} date={dashboard.last_updated_at} />
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
          {dashboard?.settings?.filters && dashboard.filters.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="onvo-foreground-color onvo-border-black/10 dark:onvo-border-white/10" variant="secondary"

                >
                  <AdjustmentsHorizontalIcon className="onvo-size-4 onvo-mr-1" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="!onvo-p-0 onvo-w-[320px]">
                <FilterBar />
              </PopoverContent>
            </Popover>)}
          {(dashboard?.settings?.can_schedule_reports) && (
            <Button className="onvo-foreground-color onvo-border-black/10 dark:onvo-border-white/10" variant="secondary"
              onClick={() => {
                setOpen(true);
              }}
            >
              <ClockIcon className="onvo-size-4 onvo-mr-1" />
              Schedule
            </Button>)}
          {(ImageDownloadEnabled || ReportDownloadEnabled || DocumentDownloadEnabled) && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="onvo-foreground-color onvo-border-black/10 dark:onvo-border-white/10" variant="secondary" disabled={!dashboard}>

                  <ArrowDownTrayIcon className="onvo-size-4 onvo-mr-1" />
                  Download
                  <ChevronDownIcon className="onvo-h-4 onvo-w-4 onvo-ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent container={headerRef.current} className="onvo-min-w-56 onvo-background-color onvo-border-black/10 dark:onvo-border-white/10">
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
                            <DocumentChartBarIcon className="onvo-size-4" />
                          </DropdownMenuIconWrapper>
                          <span>Download as CSV</span>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}

                {DocumentDownloadEnabled && ReportDownloadEnabled && (
                  <DropdownMenuSeparator className="onvo-border-black/10 dark:onvo-border-white/10" />
                )}
                {DocumentDownloadEnabled && (
                  <>
                    <DropdownMenuLabel>Documents</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => exportDashboard("pdf")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <DocumentChartBarIcon className="onvo-size-4" />
                          <span>Download as PDF</span>
                        </span>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => exportDashboard("pptx")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <PresentationChartBarIcon className="onvo-size-4" />
                          <span>Download as Powerpoint</span>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
                {ImageDownloadEnabled && (DocumentDownloadEnabled || ReportDownloadEnabled) && (
                  <DropdownMenuSeparator className="onvo-border-black/10 dark:onvo-border-white/10" />
                )}
                {ImageDownloadEnabled && (
                  <>
                    <DropdownMenuLabel>Images</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => exportDashboard("png")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <DropdownMenuIconWrapper>
                            <PhotoIcon className="onvo-size-4" />
                          </DropdownMenuIconWrapper>
                          <span>Download as PNG</span>
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportDashboard("jpeg")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                          <DropdownMenuIconWrapper>
                            <PhotoIcon className="onvo-size-4" />
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
