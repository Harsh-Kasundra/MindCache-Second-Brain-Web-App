import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div className="grid h-[100vh] w-full grid-cols-12">
      <div className="col-span-2">
        <SideBar />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
