"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, User, LogOut, X, CheckCircle, AlertTriangle, Info, Calendar, DollarSign, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

interface TopbarProps {
  onSidebarToggle: () => void;
}

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "New Expert Verified",
    message: "Dr. Sarah Johnson has been successfully verified and is now available for bookings.",
    time: "2 minutes ago",
    read: false
  },
  {
    id: "2",
    type: "warning",
    title: "Payment Processing Delay",
    message: "Payment processing for booking #12345 is experiencing delays. Please check payment gateway status.",
    time: "15 minutes ago",
    read: false
  },
  {
    id: "3",
    type: "info",
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.",
    time: "1 hour ago",
    read: true
  },
  {
    id: "4",
    type: "error",
    title: "Failed Booking Attempt",
    message: "User John Doe's booking attempt failed due to payment processing error.",
    time: "2 hours ago",
    read: true
  },
  {
    id: "5",
    type: "success",
    title: "Revenue Milestone",
    message: "Platform has reached $10,000 in monthly revenue! Great job team!",
    time: "3 hours ago",
    read: true
  }
];

export function Topbar({ onSidebarToggle }: TopbarProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const { logout, user } = useAuth();
  const router = useRouter();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
    setIsProfileOpen(false);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <X className="h-4 w-4 text-red-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800";
      case "error":
        return "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-50 dark:bg-gray-900/10 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <>
      <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-accent transition-colors lg:hidden"
          >
            <User className="h-4 w-4" />
          </button>

          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="relative p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-96 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-primary hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                      <button
                        onClick={() => setIsNotificationOpen(false)}
                        className="p-1 rounded hover:bg-accent transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-80">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-4 hover:bg-accent/50 transition-colors cursor-pointer",
                            !notification.read && "bg-accent/30"
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className={cn(
                              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
                              getNotificationBg(notification.type)
                            )}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={cn(
                                  "text-sm font-medium truncate",
                                  !notification.read ? "text-foreground" : "text-muted-foreground"
                                )}>
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-border">
                  <button className="w-full text-center text-sm text-primary hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="relative">
              <button
                className="flex items-center gap-3 hover:bg-accent/50 rounded-lg p-2 transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{user?.email || "Admin User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "admin@digitaloffices.com"}</p>
                </div>
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user?.email || "Admin User"}</p>
                        <p className="text-xs text-muted-foreground">{user?.email || "admin@digitaloffices.com"}</p>
                        <p className="text-xs text-primary mt-1">Super Admin</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/admin/profile"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-3"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Profile Settings</span>
                    </Link>
                    <Link
                      href="/admin/notifications"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-3"
                    >
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span>Notification Preferences</span>
                    </Link>
                    <Link
                      href="/admin/activity"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-3"
                    >
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Activity Log</span>
                    </Link>
                    <Link
                      href="/admin/billing"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-3"
                    >
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>Billing & Plans</span>
                    </Link>
                    <div className="border-t border-border my-2"></div>
                    <Link
                      href="/admin/team"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-3"
                    >
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Team Management</span>
                    </Link>
                    <Link
                      href="/admin/support"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-3"
                    >
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span>Help & Support</span>
                    </Link>
                    <div className="border-t border-border my-2"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-3 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile */}
      {(isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => {
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
}
