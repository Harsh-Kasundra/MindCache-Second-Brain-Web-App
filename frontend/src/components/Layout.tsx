import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          mobileMenuOpen ? "block" : "hidden"
        } xl:hidden`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-50 h-full w-64 transition-transform duration-300 xl:relative xl:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } xl:block`}
      >
        <SideBar />
      </aside>

      <div className="bg-background-light flex flex-1 flex-col dark:bg-black">
        <header className="p-4 xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="hover:bg-primary-600/20 flex items-center justify-center rounded-md p-3"
          >
            {/* Simple hamburger icon using spans */}
            <div className="space-y-2">
              <span className="bg-primary-600 block h-0.5 w-7"></span>
              <span className="bg-primary-600 block h-0.5 w-7"></span>
              <span className="bg-primary-600 block h-0.5 w-7"></span>
            </div>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
