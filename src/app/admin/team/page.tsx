"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Eye, Edit, Trash2, Shield, Crown, UserX, UserCheck, Mail, Calendar, CheckCircle } from "lucide-react";
import type { TableColumn } from "@/types/admin";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "moderator" | "viewer";
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@digitaloffices.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-01-20 14:30:22",
    createdAt: "2024-01-15 09:00:00",
    permissions: ["all"]
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@digitaloffices.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-20 12:15:45",
    createdAt: "2024-01-18 14:30:00",
    permissions: ["experts", "users", "bookings", "reports"]
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@digitaloffices.com",
    role: "moderator",
    status: "active",
    lastLogin: "2024-01-19 16:45:30",
    createdAt: "2024-01-10 11:20:00",
    permissions: ["experts", "users", "bookings"]
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@digitaloffices.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "2024-01-15 09:30:00",
    createdAt: "2024-01-12 16:45:00",
    permissions: ["reports", "analytics"]
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james@digitaloffices.com",
    role: "admin",
    status: "pending",
    lastLogin: "Never",
    createdAt: "2024-01-20 10:00:00",
    permissions: ["experts", "users", "bookings", "reports"]
  }
];

const columns: TableColumn<TeamMember>[] = [
  {
    key: "name",
    label: "Name",
    render: (value: string, record: TeamMember) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-medium">
            {value.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">{record.email}</p>
        </div>
      </div>
    )
  },
  {
    key: "role",
    label: "Role",
    render: (value: string) => {
      const roleConfig = {
        super_admin: { icon: Crown, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-800", label: "Super Admin" },
        admin: { icon: Shield, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-800", label: "Admin" },
        moderator: { icon: Users, color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800", label: "Moderator" },
        viewer: { icon: UserX, color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-800", label: "Viewer" }
      };
      const config = roleConfig[value as keyof typeof roleConfig];
      const Icon = config.icon;
      return (
        <Badge className={config.color}>
          <Icon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      );
    }
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusColors = {
        active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-800",
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-800"
      };
      return (
        <Badge className={statusColors[value as keyof typeof statusColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  },
  {
    key: "lastLogin",
    label: "Last Login",
    render: (value: string) => (
      <div>
        <p className="text-sm">{value === "Never" ? "Never" : value.split(' ')[0]}</p>
        <p className="text-xs text-muted-foreground">{value === "Never" ? "" : value.split(' ')[1]}</p>
      </div>
    )
  },
  {
    key: "createdAt",
    label: "Added",
    render: (value: string) => (
      <div>
        <p className="text-sm">{value.split(' ')[0]}</p>
        <p className="text-xs text-muted-foreground">{value.split(' ')[1]}</p>
      </div>
    )
  }
];

export default function TeamManagementPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeMembers = mockTeamMembers.filter(m => m.status === "active");
  const pendingMembers = mockTeamMembers.filter(m => m.status === "pending");

  const handleView = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDrawerOpen(true);
  };

  const renderActions = (member: TeamMember) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(member)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      {member.status === "active" ? (
        <button
          className="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/20 text-yellow-600 transition-colors"
          title="Deactivate"
        >
          <UserX className="h-4 w-4" />
        </button>
      ) : (
        <button
          className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
          title="Activate"
        >
          <UserCheck className="h-4 w-4" />
        </button>
      )}
      {member.role !== "super_admin" && (
        <button
          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
          title="Remove"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  const getRolePermissions = (role: string) => {
    const permissions = {
      super_admin: ["Full system access", "User management", "Billing management", "System settings"],
      admin: ["Expert management", "User management", "Booking management", "Reports access", "Basic settings"],
      moderator: ["Expert verification", "User support", "Booking moderation", "Limited reports"],
      viewer: ["Read-only access", "Reports viewing", "Analytics dashboard"]
    };
    return permissions[role as keyof typeof permissions] || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage admin team members and their permissions
          </p>
        </div>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockTeamMembers.length}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeMembers.length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingMembers.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Crown className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockTeamMembers.filter(m => m.role === "admin").length}</p>
              <p className="text-sm text-muted-foreground">Admins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage team member roles and permissions
          </p>
        </div>
        
        <DataTable
          data={mockTeamMembers}
          columns={columns}
          actions={renderActions}
          pagination={true}
          searchable={true}
        />
      </div>

      {/* Member Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Team Member Details"
        size="lg"
      >
        {selectedMember && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Member Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedMember.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedMember.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium capitalize">{selectedMember.role.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{selectedMember.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">{selectedMember.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">{selectedMember.lastLogin}</p>
                </div>
              </div>
            </div>

            {/* Role Permissions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Role Permissions</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="space-y-2">
                  {getRolePermissions(selectedMember.role).map((permission, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
