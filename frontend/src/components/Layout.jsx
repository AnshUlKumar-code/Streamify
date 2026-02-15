import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="flex min-h-screen w-full bg-base-100 overflow-hidden">
      {showSidebar && <Sidebar />}

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
