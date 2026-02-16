"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { ProfileComparisonCard } from "@/components/admin/profile-comparison-card";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { mockVerificationRequests } from "@/data/mock-data";
import type { TableColumn, VerificationRequest } from "@/types/admin";

const columns: TableColumn<VerificationRequest>[] = [
  {
    key: "type",
    label: "Type",
    render: (value: string) => (
      <span className="capitalize font-medium">{value}</span>
    )
  },
  {
    key: "entityName",
    label: "Name"
  },
  {
    key: "changes",
    label: "Changes",
    render: (value: any[]) => (
      <span className="text-sm">{value.length} field{value.length > 1 ? 's' : ''} changed</span>
    )
  },
  {
    key: "requestedAt",
    label: "Requested"
  },
  {
    key: "status",
    label: "Status"
  }
];

export default function ExpertChangesPage() {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const expertChanges = mockVerificationRequests.filter(req => req.type === "expert");

  const handleView = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setIsDrawerOpen(true);
  };

  const handleApprove = (request: VerificationRequest) => {
    console.log("Approving changes for:", request.id);
  };

  const handleReject = (request: VerificationRequest) => {
    console.log("Rejecting changes for:", request.id);
  };

  const handleApproveChange = (field: string) => {
    console.log("Approving change for field:", field);
  };

  const handleRejectChange = (field: string) => {
    console.log("Rejecting change for field:", field);
  };

  const renderActions = (request: VerificationRequest) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(request)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Changes"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleApprove(request)}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="Approve All"
      >
        <CheckCircle className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleReject(request)}
        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
        title="Reject All"
      >
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Expert Profile Change Requests</h1>
        <p className="text-muted-foreground mt-2">
          Review and approve profile changes requested by experts
        </p>
      </div>

      <DataTable
        data={expertChanges}
        columns={columns}
        actions={renderActions}
      />

      {/* Changes Review Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Profile Changes Review"
        size="xl"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expert</p>
                  <p className="font-semibold text-lg">{selectedRequest.entityName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Requested</p>
                  <p className="font-medium">{selectedRequest.requestedAt}</p>
                </div>
              </div>
            </div>

            <ProfileComparisonCard
              changes={selectedRequest.changes}
              onApproveChange={handleApproveChange}
              onRejectChange={handleRejectChange}
              onApprove={() => handleApprove(selectedRequest)}
              onReject={() => handleReject(selectedRequest)}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
}
