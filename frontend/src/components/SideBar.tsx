import { act, useState } from "react";
import Logo from "../assets/images/mindCachenobg.png";

const SideBar = () => {
  const [active, SetActive] = useState("All Post");
  return (
    <div
      className="border-secondary-950 h-full border-r bg-black p-4"
      style={{
        boxShadow: "10px 10px 10px 10px var(--color-accent-light-800)",
      }}
    >
      <div className="mb-7">
        <img src={Logo} alt="" width={150} />
      </div>
      <div className="dark:text-text-dark-100 flex flex-col items-start justify-center gap-3 text-lg">
        <div
          className={`w-full rounded-md p-2 hover:cursor-pointer ${active === "All Post" ? "bg-primary-600" : "hover:bg-accent-dark-300"}`}
          onClick={() => {
            SetActive("All Post");
          }}
        >
          All Post
        </div>
        <div
          className={`w-full rounded-md p-2 hover:cursor-pointer ${active === "Instagram" ? "bg-primary-600" : "hover:bg-accent-dark-300"}`}
          onClick={() => {
            SetActive("Instagram");
          }}
        >
          Instagram
        </div>
        <div
          className={`w-full rounded-md p-2 hover:cursor-pointer ${active === "Twitter" ? "bg-primary-600" : "hover:bg-accent-dark-300"}`}
          onClick={() => {
            SetActive("Twitter");
          }}
        >
          Twitter
        </div>
        <div
          className={`w-full rounded-md p-2 hover:cursor-pointer ${active === "Youtube" ? "bg-primary-600" : "hover:bg-accent-dark-300"}`}
          onClick={() => {
            SetActive("Youtube");
          }}
        >
          Youtube
        </div>
        <div
          className={`w-full rounded-md p-2 hover:cursor-pointer ${active === "Document" ? "bg-primary-600" : "hover:bg-accent-dark-300"}`}
          onClick={() => {
            SetActive("Document");
          }}
        >
          Document
        </div>
      </div>
    </div>
  );
};

export default SideBar;
