"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  Calendar,
  MonitorSpeaker,
  DollarSign,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  User2,
  BookCheck
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin"
  },
  {
    id: "experts",
    label: "Experts",
    icon: UserCheck,
    children: [
      { id: "all-experts", label: "All Experts", href: "/admin/experts" },
      { id: "pending-verification", label: "Pending Verification", href: "/admin/experts/pending" },
      { id: "verified-experts", label: "Verified Experts", href: "/admin/experts/verified" },
      { id: "rejected-experts", label: "Rejected Experts", href: "/admin/experts/rejected" },
      { id: "profile-change-requests", label: "Profile Change Requests", href: "/admin/experts/changes" },
      { id: "Expert-managment", label: "Expert Management", href: "/admin/experts/manage" }
    ]
  },
  {
    id: "organizations",
    label: "Organizations",
    icon: Building2,
    children: [
      { id: "all-organizations", label: "All Organizations", href: "/admin/organizations" },
      { id: "pending-verification-org", label: "Pending Verification", href: "/admin/organizations/pending" },
      { id: "profile-change-requests-org", label: "Profile Change Requests", href: "/admin/organizations/changes" },
      { id: "organizations-managment", label: "organization Managament", href: "/admin/organizations/manage" }
    ]
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    children: [
      { id: "all-users", label: "All", href: "/admin/users" },
      { id: "active-users", label: "Active", href: "/admin/users/active" },
      { id: "suspended-users", label: "Suspended", href: "/admin/users/suspended" }
    ]
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: Calendar,
    children: [
      { id: "all-bookings", label: "All", href: "/admin/bookings" },
      { id: "online-bookings", label: "Online", href: "/admin/bookings/online" },
      { id: "offline-bookings", label: "Offline", href: "/admin/bookings/offline" },
      { id: "completed-bookings", label: "Completed", href: "/admin/bookings/completed" },
      { id: "cancelled-bookings", label: "Cancelled", href: "/admin/bookings/cancelled" }
    ]
  },
  {
    id: "onboarding",
    label: "On-Boarding",
    icon: User2,
    href: "/admin/on-board"
  },
  {
    id: "action-center",
    label: "Action Center",
    icon: BookCheck,
    href: "/admin/action-center"
  },
  {
    id: "live-sessions",
    label: "Live Sessions",
    icon: MonitorSpeaker,
    href: "/admin/live-sessions"
  },
  {
    id: "payments-revenue",
    label: "Payments & Revenue",
    icon: DollarSign,
    href: "/admin/payments"
  },
  {
    id: "reports-disputes",
    label: "Reports / Disputes",
    icon: FileText,
    href: "/admin/reports"
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/admin/settings"
  }
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["experts", "organizations", "users", "bookings"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  const renderMenuItem = (item: any, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const Icon = item.icon;

    return (
      <div key={item.id}>
        <Link
          href={item.href || "#"}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors relative",
            "hover:bg-accent hover:text-accent-foreground",
            isActive(item.href) ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
            level > 0 && "pl-6",
            !isOpen && "justify-center px-2"
          )}
          onClick={(e: any) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.id);
            }
          }}
          title={!isOpen ? item.label : undefined}
        >
          {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
          {isOpen && <span className="flex-1 truncate">{item.label}</span>}
          {isOpen && hasChildren && (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            )
          )}
        </Link>

        {isOpen && hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children.map((child: any) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-card border-r border-border transition-transform duration-300 z-50 flex flex-col",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-16"
        )}
      >
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onToggle} className="p-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0">
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            {isOpen && <h1 className="text-lg font-semibold text-foreground truncate">Admin Panel</h1>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin overflow-x-hidden">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
      </aside>
    </>
  );
}
