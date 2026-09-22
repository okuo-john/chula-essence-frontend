import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-950">
      <AdminSideBar />
      <main className="flex-1 min-w-0 p-6 md:p-8 dark:text-slate-100">
        <Outlet />
      </main>
    </div>
  );
}