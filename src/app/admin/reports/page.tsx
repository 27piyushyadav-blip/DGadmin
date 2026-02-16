"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, AlertTriangle, CheckCircle, XCircle, MessageSquare, Download } from "lucide-react";
import type { TableColumn } from "@/types/admin";

interface Report {
  id: string;
  type: "dispute" | "complaint" | "feedback" | "issue";
  category: string;
  reporter: string;
  reported: string;
  subject: string;
  description: string;
  status: "pending" | "investigating" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    type: "dispute",
    category: "Payment Issue",
    reporter: "John Doe",
    reported: "Dr. Michael Chen",
    subject: "Refund Request for Cancelled Session",
    description: "User is requesting a refund for a session that was cancelled by the expert at the last minute.",
    status: "investigating",
    priority: "high",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-21",
    assignedTo: "Admin Team"
  },
  {
    id: "2",
    type: "complaint",
    category: "Professional Conduct",
    reporter: "Jane Smith",
    reported: "Dr. Sarah Johnson",
    subject: "Unprofessional Behavior",
    description: "User reports that the expert was unprofessional and did not provide the promised services.",
    status: "pending",
    priority: "critical",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19"
  },
  {
    id: "3",
    type: "feedback",
    category: "Platform Issue",
    reporter: "Bob Wilson",
    reported: "Platform",
    subject: "Video Quality Problems",
    description: "User experiencing poor video quality during online sessions.",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-20",
    assignedTo: "Tech Support"
  }
];

const columns: TableColumn<Report>[] = [
  {
    key: "type",
    label: "Type",
    render: (value: string) => {
      const typeColors = {
        dispute: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800",
        complaint: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-800",
        feedback: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-800",
        issue: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-800"
      };
      return (
        <Badge className={typeColors[value as keyof typeof typeColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  },
  {
    key: "category",
    label: "Category"
  },
  {
    key: "reporter",
    label: "Reporter"
  },
  {
    key: "reported",
    label: "Reported"
  },
  {
    key: "subject",
    label: "Subject",
    render: (value: string) => (
      <span className="text-sm truncate max-w-xs">{value}</span>
    )
  },
  {
    key: "priority",
    label: "Priority",
    render: (value: string) => {
      const priorityColors = {
        low: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-800",
        medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-800",
        high: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-800",
        critical: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800"
      };
      return (
        <Badge className={priorityColors[value as keyof typeof priorityColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-800",
        investigating: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-800",
        resolved: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        closed: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-800"
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
    label: "Created"
  }
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pendingReports = mockReports.filter(r => r.status === "pending");
  const investigatingReports = mockReports.filter(r => r.status === "investigating");
  const resolvedReports = mockReports.filter(r => r.status === "resolved");
  const criticalReports = mockReports.filter(r => r.priority === "critical");

  const handleView = (report: Report) => {
    setSelectedReport(report);
    setIsDrawerOpen(true);
  };

  const handleAssign = (report: Report) => {
    console.log("Assigning report:", report.id);
  };

  const handleResolve = (report: Report) => {
    console.log("Resolving report:", report.id);
  };

  const handleClose = (report: Report) => {
    console.log("Closing report:", report.id);
  };

  const renderActions = (report: Report) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(report)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      {report.status === "pending" && (
        <button
          onClick={() => handleAssign(report)}
          className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
          title="Assign"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
      )}
      {report.status !== "resolved" && report.status !== "closed" && (
        <>
          <button
            onClick={() => handleResolve(report)}
            className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
            title="Resolve"
          >
            <CheckCircle className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleClose(report)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/20 text-gray-600 transition-colors"
            title="Close"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Disputes</h1>
        <p className="text-muted-foreground mt-2">
          Manage user reports, disputes, and platform issues
        </p>
      </div>

      {/* Reports Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{criticalReports.length}</p>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingReports.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{investigatingReports.length}</p>
              <p className="text-sm text-muted-foreground">Investigating</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{resolvedReports.length}</p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports by Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Reports by Type</h3>
          <div className="space-y-3">
            {["dispute", "complaint", "feedback", "issue"].map((type) => {
              const count = mockReports.filter(r => r.type === type).length;
              const colors = {
                dispute: "bg-red-100 text-red-800",
                complaint: "bg-orange-100 text-orange-800",
                feedback: "bg-blue-100 text-blue-800",
                issue: "bg-purple-100 text-purple-800"
              };
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${colors[type as keyof typeof colors].split(' ')[0]}`}></div>
                    <span className="text-sm capitalize">{type}</span>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Resolution Time</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Average Resolution Time</span>
              <span className="text-sm font-medium">2.5 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Critical Issues</span>
              <span className="text-sm font-medium">4 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Standard Issues</span>
              <span className="text-sm font-medium">3 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Feedback</span>
              <span className="text-sm font-medium">1 day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">All Reports</h3>
            <p className="text-sm text-muted-foreground mt-1">
              User reports and disputes requiring attention
            </p>
          </div>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
        
        <DataTable
          data={mockReports}
          columns={columns}
          actions={renderActions}
          pagination={true}
          searchable={true}
        />
      </div>

      {/* Report Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Report Details"
        size="xl"
      >
        {selectedReport && (
          <div className="space-y-6">
            {/* Report Information */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Report ID</p>
                  <p className="font-medium">{selectedReport.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{selectedReport.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedReport.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <p className="font-medium capitalize">{selectedReport.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reporter</p>
                  <p className="font-medium">{selectedReport.reporter}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported</p>
                  <p className="font-medium">{selectedReport.reported}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{selectedReport.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{selectedReport.status}</p>
                </div>
              </div>
            </div>

            {/* Subject and Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Report Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-medium mt-1">{selectedReport.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm mt-1">{selectedReport.description}</p>
                </div>
              </div>
            </div>

            {/* Investigation Notes */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Investigation Notes</h3>
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Initial Review</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Report received and categorized as {selectedReport.priority} priority.
                      </p>
                      <p className="text-xs text-muted-foreground">2024-01-20 10:30 AM</p>
                    </div>
                  </div>
                </div>
                {selectedReport.status === "investigating" && (
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Investigation Started</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Gathering evidence and contacting involved parties.
                        </p>
                        <p className="text-xs text-muted-foreground">2024-01-21 09:15 AM</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resolution Actions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Resolution Actions</h3>
              <div className="space-y-3">
                {selectedReport.status === "pending" && (
                  <>
                    <div>
                      <label className="text-sm text-muted-foreground">Assign To</label>
                      <select className="w-full mt-1 p-2 border border-input rounded-lg bg-background">
                        <option>Admin Team</option>
                        <option>Tech Support</option>
                        <option>Legal Team</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Add Note</label>
                      <textarea 
                        className="w-full mt-1 p-2 border border-input rounded-lg bg-background" 
                        rows={3}
                        placeholder="Add investigation notes..."
                      ></textarea>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              {selectedReport.status === "pending" && (
                <>
                  <button
                    onClick={() => handleAssign(selectedReport)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start Investigation
                  </button>
                  <button
                    onClick={() => handleClose(selectedReport)}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    Close Report
                  </button>
                </>
              )}
              {selectedReport.status === "investigating" && (
                <>
                  <button
                    onClick={() => handleResolve(selectedReport)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Mark as Resolved
                  </button>
                  <button
                    onClick={() => handleClose(selectedReport)}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    Close Report
                  </button>
                </>
              )}
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Contact Reporter
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
