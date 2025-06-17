import Button from "../components/Button";
import TotalPostIcon from "../assets/icons/TotalPostIcon";
import TwitterIcon from "../assets/icons/TwitterIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import YTIcon from "../assets/icons/YTIcon";
import StatCard from "../components/StatCard";
import RecentContentCard from "../components/RecentContentCard";
import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import PlusIcon from "../assets/icons/PlusIcon";
import { useNavigate } from "react-router-dom";
import { fetchContentStats, getRecentContents } from "../api/content";
import { ContentProps, ContentStats, TaskProps } from "../utils/types";
import { getTask, markDoneTask } from "../api/task";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<ContentStats | null>(null);
  const [contentData, setContentData] = useState<ContentProps[] | null>(null);
  const [taskData, setTaskData] = useState<TaskProps[] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/signup");
    }

    const getStats = async () => {
      try {
        const res = await fetchContentStats();
        if (res.success) setStats(res.counts);
      } catch (error) {
        console.log(error);
      }
    };
    const getContentData = async () => {
      try {
        const res = await getRecentContents();
        if (res.success) {
          const mappedData: ContentProps[] = res.content.map((item: any) => ({
            content_id: item.content_id,
            content_type: item.Type?.type_name ?? "Unknown",
            content_title: item.content_title,
            content_createdAt: new Date(item.createdAt).toLocaleString(), // format timestamp
            content_description: item.content_description,
            content_tag: item.tags.map((tag: any) => tag.name).join(", "), // comma-separated string
          }));

          setContentData(mappedData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getTaskData = async () => {
      try {
        const res = await getTask();

        if (res.success) {
          const mappedData: TaskProps[] = res.tasks.map((item: any) => ({
            task_id: item.task_id,
            task_title: item.task_title,
            task_description: item.task_description ?? "NA",
            task_createdAt: new Date(item.createdAt).toLocaleString(),
            task_priority: item.task_priority,
            task_due_date: new Date(item.task_due_date).toLocaleString(),
            task_due_time: item.task_due_time,
            task_type: item.task_type,
            completed: item.completed,
            user_id: item.user_id,
          }));

          setTaskData(mappedData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTaskData();
    getStats();
    getContentData();
  }, []);

  const toggleTask = async (
    index: number,
    task_id: string,
    completed: boolean,
  ) => {
    if (!taskData) return;

    // Toggle the value
    const newCompleted = !completed;

    // Update frontend state immediately (optimistic update)
    const updatedTasks = [...taskData];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: newCompleted,
    };
    setTaskData(updatedTasks);

    // Send update to backend
    try {
      const res = await markDoneTask(task_id, completed);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="bg-background-light h-full px-5 xl:px-10 dark:bg-black">
      <div className="dark:text-text-dark-100 text-text-light-950 flex justify-between p-3 pt-7 pb-1">
        {/* header */}
        <div className="flex flex-col justify-start gap-1">
          <div className="text-3xl font-semibold">Dashboard</div>
          <div className="text-md dark:text-text-dark-100/70 text-text-light-950 font-normal">
            Welcome to your Second Brain
          </div>
        </div>
        <Button
          color="primary"
          text="Add Content"
          icon={<PlusIcon height={25} width={25} />}
        />
      </div>
      <div className="mt-5 flex flex-col gap-10 p-4">
        {/* Stats Card section */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Content"
            value={stats?.total ?? 0}
            Icon={TotalPostIcon}
          />
          <StatCard
            title="Instagram Posts"
            value={stats?.instagram ?? 0}
            Icon={InstagramIcon}
          />
          <StatCard
            title="Twitter Posts"
            value={stats?.twitter ?? 0}
            Icon={TwitterIcon}
          />
          <StatCard
            title="YouTube Posts"
            value={stats?.youtube ?? 0}
            Icon={YTIcon}
          />
        </div>
        <div className="grid min-h-96 grid-cols-1 gap-4 xl:grid-cols-3">
          {/* Recent Content section */}

          <div className="dark:bg-secondary-950 bg-secondary-200 border-primary-600/30 rounded-xl border p-6 xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="dark:text-text-dark-100 text-xl font-bold">
                Recent Content
              </h3>
              <a
                onClick={() => {
                  navigate("/contentLibrary");
                }}
                className="text-primary-600 text-sm hover:underline"
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              {contentData ? (
                contentData.map((item, index) => (
                  <RecentContentCard key={index} {...item} />
                ))
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <div className="dark:text-text-dark-100 text-text-light-950:">
                    No data Found
                  </div>
                  <button className="border-primary-600/20 bg-primary-600/10 text-primary-600 hover:bg-primary-600/20 mt-4 flex w-full items-center justify-center rounded-lg border py-2 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add New Content
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Todays Task Section */}

          <div className="border-primary-600/30 dark:bg-secondary-950 bg-secondary-200 rounded-xl border p-6 xl:col-span-1">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="dark:text-text-dark-100 text-xl font-bold">
                Today's Tasks
              </h3>
              <a
                onClick={() => navigate("/todoList")}
                className="text-primary-600 text-sm hover:underline"
              >
                View All
              </a>
            </div>

            <div className="space-y-4">
              {taskData ? (
                taskData.map((task, index) => (
                  <TaskItem
                    key={index}
                    task_title={task.task_title}
                    completed={task.completed}
                    onToggle={() =>
                      toggleTask(index, task.task_id, task.completed)
                    }
                  />
                ))
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <div className="dark:text-text-dark-100 text-text-light-950:">
                    No data Found
                  </div>
                </div>
              )}
              <button className="border-primary-600/20 bg-primary-600/10 text-primary-600 hover:bg-primary-600/20 mt-4 flex w-full items-center justify-center rounded-lg border py-2 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
