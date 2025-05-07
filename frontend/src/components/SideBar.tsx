import { useState } from "react";
import Logo from "../assets/images/mindCachenobg.png";

const SideBar = () => {
  const [active, setActive] = useState("All Post");

  const menuItems = ["All Post", "Instagram", "Twitter", "Youtube", "Document"];

  const baseStyle =
    "w-full rounded-md p-2 hover:cursor-pointer hover:bg-accent-dark-300";
  const activeStyle = "bg-primary-600";

  return (
    <div
      className="border-secondary-950 h-full border-r bg-black p-4"
      style={{
        boxShadow: "10px 10px 10px 10px var(--color-accent-light-800)",
      }}
    >
      <div className="mb-7">
        <img src={Logo} alt="Logo" width={150} />
      </div>

      <div className="dark:text-text-dark-100 flex flex-col items-start justify-center gap-3 text-lg">
        {menuItems.map((item) => (
          <div
            key={item}
            className={`${baseStyle} ${active === item ? activeStyle : ""}`}
            onClick={() => setActive(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
