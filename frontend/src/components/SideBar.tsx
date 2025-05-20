import { useEffect, useState } from "react";
import DarkLogo from "../assets/images/OrangeWhite.png";
import LightLogo from "../assets/images/OrangeBrown.png";
import DashboardIcon from "../assets/icons/DashboardIcon";
import ContentIcon from "../assets/icons/ContentIcon";
import TodoListIcon from "../assets/icons/TodoListIcon";
import SettingsIcon from "../assets/icons/SettingsIcon";

const SideBar = () => {
  const [active, setActive] = useState("Dashboard");
  const [logo, setLogo] = useState("");

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon height={20} width={20} /> },
    { label: "Content Library", icon: <ContentIcon height={20} width={20} /> },
    { label: "Todo List", icon: <TodoListIcon height={20} width={20} /> },
    { label: "Setting", icon: <SettingsIcon height={20} width={20} /> },
  ];

  const baseStyle =
    "w-full rounded-md p-2 hover:cursor-pointer hover:bg-accent-dark-900/30";
  const activeStyle = "bg-primary-600 hover:bg-primary-600";

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  useEffect(() => {
    setLogo(isDarkMode ? DarkLogo : LightLogo);
  }, [isDarkMode]);

  return (
    <div className="border-primary-600/35 bg-secondary-200 dark:bg-secondary-950 h-full border-r p-2">
      <div className="mb-7 p-2">
        <img src={logo} alt="Logo" width={150} />
      </div>

      <div className="dark:text-text-dark-100 flex flex-col items-start justify-center gap-3 text-lg">
        {menuItems.map(({ label, icon }) => (
          <div
            key={label}
            className={`${baseStyle} ${active === label ? activeStyle : ""} flex items-center gap-2`}
            onClick={() => setActive(label)}
          >
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
