import Button from "../components/Button";
import TotalPostIcon from "../assets/icons/TotalPostIcon";
import TwitterIcon from "../assets/icons/TwitterIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import YTIcon from "../assets/icons/YTIcon";
import StatCard from "../components/StatCard";
import RecentContentCard from "../components/RecentContentCard";
import { useState } from "react";
import TaskItem from "../components/TaskItem";
import PlusIcon from "../assets/icons/PlusIcon";
import { useNavigate } from "react-router-dom";

interface Task {
  text: string;
  completed: boolean;
}
const Dashboard = () => {
  const navigate = useNavigate();
  const contentData = [
    {
      icon: <TwitterIcon height={20} width={20} />,
      title: "Twitter Thread on AI Development",
      time: "2h ago",
      description:
        "A comprehensive thread on the latest developments in AI and machine learning...",
      tags: "AI, Tech",
      views: 128,
    },
    {
      icon: <InstagramIcon height={20} width={20} />,
      title: "Minimalist Workspace Setup",
      time: "1d ago",
      description:
        "My latest workspace setup with minimalist design principles and productivity hacks...",
      tags: "Productivity, Design",
      views: 86,
    },
  ];

  const [tasks, setTasks] = useState<Task[]>([
    { text: "Research content ideas for next week", completed: false },
    { text: "Edit YouTube video on productivity", completed: false },
    { text: "Schedule Twitter posts for today", completed: true },
    { text: "Respond to comments on latest post", completed: false },
    { text: "Plan content calendar for next month", completed: false },
  ]);

  const toggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-background-light h-full px-5 xl:px-10 dark:bg-black">
      <div className="dark:text-text-dark-100 text-text-light-950 flex justify-between p-3 pt-7 pb-1">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Content" value={128} Icon={TotalPostIcon} />
          <StatCard title="Instagram Posts" value={128} Icon={InstagramIcon} />
          <StatCard title="Twitter Posts" value={128} Icon={TwitterIcon} />
          <StatCard title="YouTube Posts" value={128} Icon={YTIcon} />
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
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
              {contentData.map((item, index) => (
                <RecentContentCard key={index} {...item} />
              ))}
            </div>
          </div>
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

            <div className="space-y-3">
              {tasks.map((task, index) => (
                <TaskItem
                  key={index}
                  text={task.text}
                  completed={task.completed}
                  onToggle={() => toggleTask(index)}
                />
              ))}
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
              Add New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
