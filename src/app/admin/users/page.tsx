"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, UserX, UserCheck, Mail, Calendar, Activity } from "lucide-react";
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
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusColors = {
        active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        suspended: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800"
      };
      return (
        <Badge className={statusColors[value as keyof typeof statusColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  },
  {
    key: "createdAt",
    label: "Joined"
  },
  {
    key: "lastLogin",
    label: "Last Login"
  }
];

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleSuspend = (user: User) => {
    console.log("Suspending user:", user.id);
  };

  const handleActivate = (user: User) => {
    console.log("Activating user:", user.id);
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
      {user.status === "active" && (
        <button
          onClick={() => handleSuspend(user)}
          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
          title="Suspend User"
        >
          <UserX className="h-4 w-4" />
        </button>
      )}
      {user.status === "suspended" && (
        <button
          onClick={() => handleActivate(user)}
          className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
          title="Activate User"
        >
          <UserCheck className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  const activeUsers = mockUsers.filter(user => user.status === "active");
  const suspendedUsers = mockUsers.filter(user => user.status === "suspended");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Users</h1>
        <p className="text-muted-foreground mt-2">
          Manage all user accounts on the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockUsers.length}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeUsers.length}</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{suspendedUsers.length}</p>
              <p className="text-sm text-muted-foreground">Suspended Users</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">New This Week</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={mockUsers}
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
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{selectedUser.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-medium">{selectedUser.id}</p>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">{selectedUser.createdAt}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">{selectedUser.lastLogin}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="font-medium">12</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="font-medium">$1,245</p>
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

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              {selectedUser.status === "active" && (
                <>
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
                </>
              )}
              {selectedUser.status === "suspended" && (
                <button
                  onClick={() => handleActivate(selectedUser)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Activate User
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
