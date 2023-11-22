import { Button, TextInput, Metric, Text } from "@tremor/react";

import React, { useEffect, useState } from "react";
import { useToken } from "../Wrapper";

const DashboardHeader: React.FC = ({}) => {
  //   const router = useRouter();
  //   const editing = useDashboard((state) => state.editing);
  const [editing, setEditing] = useState(false);
  const [dashboard, setDashboard] = useState<any>();
  const { backend } = useToken();

  async function saveChanges(e: any) {
    e.preventDefault();
    const data = new FormData(e.target);
    // if (!dashboard) return;
    // if ((data.get("title") as string).trim() === "") {
    //   toast.error("You need to specify a title to save");
    //   return;
    // }
    // await updateDashboardById(dashboard.id, {
    //   title: data.get("title") as string,
    //   description: data.get("description") as string,
    //   last_updated_at: new Date().toISOString(),
    // });
    // setEditing(false);
    // router.refresh();
    // toast.success("Dashboard saved");
  }

  useEffect(() => {
    console.log("TOKEN: ", backend);
    if (backend) {
      backend.getDashboard().then((a) => {
        setDashboard(a);
      });
    }
  }, [backend]);

  return (
    <section className="onv-dashboard-header foreground-color sticky z-10 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 top-0">
      <main className="mx-auto max-w-screen-2xl px-6 pt-4 lg:px-8">
        <form onSubmit={saveChanges}>
          <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="w-full">
              {editing ? (
                <>
                  <TextInput
                    name="title"
                    placeholder="Dashboard title"
                    className="text-input-tremor-title md:max-w-3xl"
                    defaultValue={dashboard?.title}
                  />
                  <TextInput
                    name="description"
                    placeholder="Dashboard description"
                    defaultValue={dashboard?.description || ""}
                    className="text-input-tremor-subtitle mt-2 md:max-w-3xl"
                  />
                </>
              ) : (
                <>
                  {dashboard ? (
                    <>
                      <Metric className="font-override">
                        {dashboard?.title || " "}
                      </Metric>
                      <Text className="font-override">
                        {dashboard?.description || " "}
                      </Text>
                    </>
                  ) : (
                    <div className="w-3/5 animate-pulse">
                      <div className="mb-2 h-6 w-4/5 rounded-md bg-gray-100 dark:bg-gray-700" />
                      <div className="h-4 w-2/5 rounded-md bg-gray-100 dark:bg-gray-700" />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-row gap-2">
              {dashboard?.settings?.editable && (
                <>
                  {editing ? (
                    <Button size="xs" disabled={!dashboard}>
                      Save changes
                    </Button>
                  ) : (
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditing(true);
                      }}
                      disabled={!dashboard}
                    >
                      Edit
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </form>
      </main>
    </section>
  );
};

export default DashboardHeader;
