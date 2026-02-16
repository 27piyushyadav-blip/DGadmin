"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, Download, Search, Eye, User, Settings, DollarSign, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { TableColumn } from "@/types/admin";

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
  status: "success" | "warning" | "error";
  category: "user" | "booking" | "payment" | "system" | "security";
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    user: "Admin User",
    action: "Expert Verification",
    details: "Approved Dr. Sarah Johnson's expert application",
    timestamp: "2024-01-20 14:30:22",
    ip: "192.168.1.100",
    status: "success",
    category: "user"
  },
  {
    id: "2",
    user: "Admin User",
    action: "Booking Cancellation",
    details: "Cancelled booking #12345 due to user request",
    timestamp: "2024-01-20 13:45:18",
    ip: "192.168.1.100",
    status: "warning",
    category: "booking"
  },
  {
    id: "3",
    user: "Admin User",
    action: "Payment Processing",
    details: "Processed refund for booking #12344",
    timestamp: "2024-01-20 12:20:45",
    ip: "192.168.1.100",
    status: "success",
    category: "payment"
  },
  {
    id: "4",
    user: "Admin User",
    action: "Login Attempt",
    details: "Failed login attempt - invalid password",
    timestamp: "2024-01-20 11:15:33",
    ip: "192.168.1.101",
    status: "error",
    category: "security"
  },
  {
    id: "5",
    user: "Admin User",
    action: "System Update",
    details: "Updated platform settings and configurations",
    timestamp: "2024-01-20 10:30:12",
    ip: "192.168.1.100",
    status: "success",
    category: "system"
  }
];

const columns: TableColumn<ActivityLog>[] = [
  {
    key: "timestamp",
    label: "Timestamp",
    render: (value: string) => (
      <div>
        <p className="text-sm">{value.split(' ')[0]}</p>
        <p className="text-xs text-muted-foreground">{value.split(' ')[1]}</p>
      </div>
    )
  },
  {
    key: "user",
    label: "User",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
          <User className="h-3 w-3 text-primary-foreground" />
        </div>
        <span className="text-sm">{value}</span>
      </div>
    )
  },
  {
    key: "action",
    label: "Action"
  },
  {
    key: "details",
    label: "Details",
    render: (value: string) => (
      <span className="text-sm truncate max-w-xs">{value}</span>
    )
  },
  {
    key: "category",
    label: "Category",
    render: (value: string) => {
      const categoryColors = {
        user: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-800",
        booking: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        payment: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-800",
        system: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-800",
        security: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800"
      };
      return (
        <Badge className={categoryColors[value as keyof typeof categoryColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusIcons = {
        success: <CheckCircle className="h-4 w-4 text-green-600" />,
        warning: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
        error: <XCircle className="h-4 w-4 text-red-600" />
      };
      return statusIcons[value as keyof typeof statusIcons];
    }
  },
  {
    key: "ip",
    label: "IP Address",
    render: (value: string) => (
      <span className="text-sm font-mono">{value}</span>
    )
  }
];

export default function ActivityLogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = mockActivityLogs.filter(log => {
    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleExport = () => {
    console.log("Exporting activity logs...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Activity Log</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and track all admin activities and system events
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockActivityLogs.length}</p>
              <p className="text-sm text-muted-foreground">Total Activities</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockActivityLogs.filter(log => log.status === "success").length}</p>
              <p className="text-sm text-muted-foreground">Successful</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockActivityLogs.filter(log => log.status === "warning").length}</p>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockActivityLogs.filter(log => log.status === "error").length}</p>
              <p className="text-sm text-muted-foreground">Errors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="user">User</option>
              <option value="booking">Booking</option>
              <option value="payment">Payment</option>
              <option value="system">System</option>
              <option value="security">Security</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Showing {filteredLogs.length} of {mockActivityLogs.length} activities
          </p>
        </div>
        
        <DataTable
          data={filteredLogs}
          columns={columns}
          pagination={true}
          searchable={false}
        />
      </div>
    </div>
  );
}
