import React, { useEffect, useMemo, useState } from "react";

import { Card } from "../../tremor/Card";
import ChartCard from "../Chart/ChartCard";
import { Button } from "../../tremor/Button";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { useBackend } from "../../layouts/Wrapper";
import { toast } from "sonner";
import { Text, Title } from "../../tremor/Text";
import { Widget } from "@onvo-ai/js";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { ChartLoader } from "../ChartLoader";
import { Badge } from "../../tremor/Badge";

export const WidgetLibrary: React.FC<{
  onExpanded: (val: boolean) => void;
}> = ({ onExpanded }) => {
  const [library, setLibrary] = useState<Widget[]>([]);
  const { dashboard, adminMode } = useDashboard();
  const [expanded, setExpanded] = useState(false);
  const { backend } = useBackend();
  const [loading, setLoading] = useState(true);

  const getLibrary = async () => {
    setLibrary([]);
    if (!dashboard) return;
    setLoading(true);
    let newSuggestions = await backend?.widgets.list({
      dashboard: dashboard.id,
      use_in_library: true,
    });
    if (newSuggestions && newSuggestions.length > 0) {
      setLibrary(newSuggestions);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dashboard && dashboard.id) {
      getLibrary();
    }
  }, [dashboard]);

  const removeFromLibrary = async (id: string) => {
    toast.promise(
      async () => {
        return backend?.widgets.delete(id);
      },
      {
        loading: "Deleting widget...",
        success: () => {
          getLibrary();
          return "Widget deleted";
        },
        error: (error) => "Error deleting widget: " + error.message,
      }
    );
  };

  const addToDashboard = async (id: string) => {};

  const AddToDashboardEnabled = useMemo(() => {
    if (adminMode) return true;
    if (dashboard?.settings?.can_create_widgets) return true;
    return false;
  }, [dashboard, adminMode]);

  const filteredLibrary = useMemo(() => {
    if (expanded) return library;
    else return library.slice(0, 4);
  }, [expanded, library]);

  if (!loading && library.length === 0 && !adminMode) {
    return <></>;
  }
  return (
    <div className="onvo-flex onvo-flex-col onvo-w-full">
      <div className="onvo-flex onvo-w-full onvo-pt-2 onvo-pb-2 onvo-flex-row onvo-items-center onvo-justify-between">
        <Title>Library</Title>
        {!loading && filteredLibrary.length > 0 && (
          <div className="onvo-flex onvo-flex-row onvo-items-center">
            {expanded ? (
              <Button
                variant="ghost"
                onClick={() => {
                  setExpanded(false);
                  onExpanded(false);
                }}
              >
                View less
                <XMarkIcon className="onvo-size-4 onvo-ml-1" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setExpanded(true);
                  onExpanded(true);
                }}
              >
                View more
                <ArrowRightIcon className="onvo-size-4 onvo-ml-1" />
              </Button>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div className="onvo-question-modal-suggestions-list onvo-grid onvo-grid-cols-1 @xl/questionmodal:onvo-grid-cols-2 onvo-gap-2 onvo-w-full">
          {[1, 2, 3, 4].map((a) => (
            <ChartLoader
              key={"library-loading-" + a}
              className="onvo-h-72"
              variant="card"
            />
          ))}
        </div>
      )}

      {!loading && filteredLibrary.length > 0 && (
        <div className="onvo-question-modal-suggestions-list onvo-grid onvo-grid-cols-1 @xl/questionmodal:onvo-grid-cols-2 onvo-gap-2 onvo-w-full">
          {filteredLibrary.map((a) => (
            <ChartCard
              key={a.id}
              widget={a}
              hideOptions={true}
              className="onvo-h-96 onvo-z-10"
              footer={
                <div className="onvo-chart-card-dropdown-wrapper onvo-py-2 onvo-px-2 onvo-z-20 onvo-border-t onvo-border-black/10 dark:onvo-border-white/10 onvo-rounded-b-md onvo-bg-slate-50 dark:onvo-bg-slate-800 onvo-flex onvo-w-full onvo-justify-between onvo-flex-row onvo-items-center">
                  <div className="onvo-flex onvo-gap-2 onvo-items-center">
                    {adminMode && (
                      <Button
                        variant="ghost"
                        onClick={() => removeFromLibrary(a.id)}
                      >
                        Remove from library
                      </Button>
                    )}
                  </div>
                  <div className="onvo-flex onvo-gap-2 onvo-items-center">
                    {AddToDashboardEnabled && (
                      <Button
                        variant="secondary"
                        onClick={() => addToDashboard(a.id)}
                      >
                        Add to dashboard
                      </Button>
                    )}
                  </div>
                </div>
              }
            />
          ))}
        </div>
      )}
      {!loading && filteredLibrary.length === 0 && (
        <Card>
          <Text>
            You have not added any widgets to the library yet. <br />
            You can add widgets to the library by asking a question and clicking
            on the <Badge>Add to Library</Badge> button
          </Text>
        </Card>
      )}
    </div>
  );
};
