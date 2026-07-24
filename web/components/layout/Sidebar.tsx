"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PackageSearch, 
  ShoppingBag, 
  Tags, 
  TrendingUp, 
  Users, 
  CircleDollarSign, 
  Truck, 
  CalendarDays, 
  Ban,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Today", path: "/dashboard/today", icon: LayoutDashboard },
  { name: "Stock Health", path: "/dashboard/stock-health", icon: PackageSearch },
  { name: "Buyer Guide", path: "/dashboard/buyer-guide", icon: ShoppingBag },
  { name: "Markdowns", path: "/dashboard/markdowns", icon: Tags },
  { name: "Trends", path: "/dashboard/trends", icon: TrendingUp },
  { name: "Customers", path: "/dashboard/customers", icon: Users },
  { name: "Financials", path: "/dashboard/financials", icon: CircleDollarSign },
  { name: "Suppliers", path: "/dashboard/suppliers", icon: Truck },
  { name: "Season Debrief", path: "/dashboard/season-debrief", icon: CalendarDays },
  { name: "Lost Sales", path: "/dashboard/lost-sales", icon: Ban },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] flex flex-col h-screen border-r bg-background shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          StockSense
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary border-l-4 border-primary pl-2" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname.startsWith("/dashboard/settings")
              ? "bg-primary/10 text-primary border-l-4 border-primary pl-2" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
