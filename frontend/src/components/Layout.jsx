import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{backgroundColor:""}}>
      <Navbar />

      <div className="d-flex flex-grow-1">
        {showSidebar && (
          <div className="bg " style={{ width: "250px" }}>
            <Sidebar />
          </div>
        )}

        <main className="flex-grow-1 overflow-auto p-3">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
