import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = () => {
    return (
        <>
            <div className="d-flex flex-nowrap">
                <Sidebar />
                <div className="d-flex flex-column w-100 overflow-hidden">
                    <Topbar />
                    <main className="content-main h-100 bg-light ">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;