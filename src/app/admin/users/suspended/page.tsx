"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, UserCheck, Mail, AlertTriangle, Calendar, Clock } from "lucide-react";
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
    label: "Last Login"
  }
];

export default function SuspendedUsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const suspendedUsers = mockUsers.filter(user => user.status === "suspended");

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
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
      <button
        onClick={() => handleActivate(user)}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="Activate User"
      >
        <UserCheck className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Suspended Users</h1>
        <p className="text-muted-foreground mt-2">
          Manage suspended user accounts and review suspension cases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{suspendedUsers.length}</p>
              <p className="text-sm text-muted-foreground">Currently Suspended</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">7</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">14</p>
              <p className="text-sm text-muted-foreground">Days Average Suspension</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={suspendedUsers}
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

            {/* Suspension Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Suspension Details</h3>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Suspension Reason</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      User account was suspended due to multiple policy violations including inappropriate behavior
                      and spam activities. The suspension will be reviewed after 30 days.
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      Suspended on: 2024-01-10
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Review date: 2024-02-10
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Violation History */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Violation History</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Policy Violation - Inappropriate Content</p>
                    <p className="text-xs text-muted-foreground">2024-01-08</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Warning</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Spam Activities - Multiple Reports</p>
                    <p className="text-xs text-muted-foreground">2024-01-05</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Harassment - User Complaints</p>
                    <p className="text-xs text-muted-foreground">2024-01-02</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Final Warning</Badge>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-xs text-muted-foreground">Before suspension</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-foreground">$645</p>
                  <p className="text-xs text-muted-foreground">Before suspension</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Reports Filed</p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">By other users</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Warnings Received</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Prior to suspension</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleActivate(selectedUser)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Activate User
              </button>
              <button
                onClick={() => handleContact(selectedUser)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Send Notification
              </button>
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Extend Suspension
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
