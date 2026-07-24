import Image from "next/image";
import { PhulkariSidebar } from "@/components/layout/PhulkariSidebar";
import { NotificationBell } from "@/components/layout/NotificationBell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "#2E3B27" }}>
      {/* Persistent Phulkari Header Banner */}
      <header
        style={{
          width: "100%",
          flexShrink: 0,
          position: "relative",
          borderBottom: "2px solid",
          borderImage: "repeating-linear-gradient(90deg, #C84B31 0px, #C84B31 6px, #D4A853 6px, #D4A853 12px, #4F5E44 12px, #4F5E44 18px) 2",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          background: "#1E2B1A",
        }}
      >
        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <Image
            src="/phulkari_rectangle.jpg"
            alt="Phulkari by Preeth Design Studios"
            width={1920}
            height={400}
            style={{ width: "100%", height: "auto", maxHeight: "180px", objectFit: "contain" }}
            priority
          />
        </div>
        {/* Notification bell overlay */}
        <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}>
          <NotificationBell />
        </div>
      </header>

      {/* Below header: sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        <PhulkariSidebar />
        <main
          className="flex-1 overflow-y-auto"
          style={{ padding: "24px", background: "#2E3B27" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
