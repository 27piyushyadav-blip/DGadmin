"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, UserX, Mail, Calendar, TrendingUp, Clock } from "lucide-react";
import { mockUsers } from "@/data/mock-data";
import type { TableColumn, User } from "@/types/admin";

const columns: TableColumn<User>[] = [
  {
    key: "name",
    label: "Name"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "createdAt",
    label: "Member Since"
  },
  {
    key: "lastLogin",
    label: "Last Login",
    render: (value: string) => {
      const lastLogin = new Date(value);
      const now = new Date();
      const daysAgo = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));

      if (daysAgo === 0) return <span className="text-green-600">Today</span>;
      if (daysAgo === 1) return <span className="text-blue-600">Yesterday</span>;
      if (daysAgo <= 7) return <span className="text-yellow-600">{daysAgo} days ago</span>;
      return <span className="text-gray-600">{daysAgo} days ago</span>;
    }
  }
];

export default function ActiveUsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeUsers = mockUsers.filter(user => user.status === "active");

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleSuspend = (user: User) => {
    console.log("Suspending user:", user.id);
  };

  const handleContact = (user: User) => {
    console.log("Sending email to:", user.email);
  };

  const renderActions = (user: User) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(user)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleContact(user)}
        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
        title="Send Email"
      >
        <Mail className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleSuspend(user)}
        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
        title="Suspend User"
      >
        <UserX className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Active Users</h1>
        <p className="text-muted-foreground mt-2">
          Manage currently active user accounts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeUsers.length}</p>
              <p className="text-sm text-muted-foreground">Currently Active</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">18</p>
              <p className="text-sm text-muted-foreground">Active Today</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4.2h</p>
              <p className="text-sm text-muted-foreground">Avg. Session Time</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={activeUsers}
        columns={columns}
        actions={renderActions}
      />

      {/* User Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="User Details"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">{selectedUser.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">{selectedUser.lastLogin}</p>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold text-foreground">47</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Session Duration</p>
                  <p className="text-2xl font-bold text-foreground">4.2h</p>
                  <p className="text-xs text-green-600">+8% this month</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Pages Viewed</p>
                  <p className="text-2xl font-bold text-foreground">234</p>
                  <p className="text-xs text-green-600">+15% this month</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-foreground">12%</p>
                  <p className="text-xs text-green-600">+3% this month</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed booking with Dr. Michael Chen</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Updated profile information</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Booked online consultation</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">User Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Email Notifications</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">SMS Alerts</span>
                  <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Newsletter</span>
                  <Badge className="bg-green-100 text-green-800">Subscribed</Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleContact(selectedUser)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send Email
              </button>
              <button
                onClick={() => handleSuspend(selectedUser)}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Suspend User
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
