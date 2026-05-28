"use client";

import Sidebar from "@/components/admin/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("laa_coffee_admin_auth");
    if (auth !== "true" && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center">
        <div className="animate-spin text-5xl mb-4">☕</div>
        <p className="text-amber-800 font-semibold">Memeriksa hak akses admin...</p>
      </div>
    );
  }

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-amber-50 transition-all duration-300" style={{ marginLeft: "256px" }}>
        <div className="p-6 lg:p-8 pt-20 md:pt-6 lg:pt-8">{children}</div>
      </main>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
