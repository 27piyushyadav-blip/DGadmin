"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, FileText } from "lucide-react";
import { mockExperts } from "@/data/mock-data";
import type { TableColumn, Expert } from "@/types/admin";

const columns: TableColumn<Expert>[] = [
  {
    key: "name",
    label: "Expert"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "documents",
    label: "Documents",
    render: (value: any[], row: Expert) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{value.length} files</span>
      </div>
    )
  },
  {
    key: "experience",
    label: "Experience"
  },
  {
    key: "requestDate",
    label: "Request Date"
  },
  {
    key: "status",
    label: "Status"
  }
];

export default function PendingExpertsPage() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pendingExperts = mockExperts.filter(expert => expert.status === "pending");

  const handleView = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsDrawerOpen(true);
  };

  const handleApprove = (expert: Expert) => {
    console.log("Approving expert:", expert.id);
  };

  const handleReject = (expert: Expert) => {
    console.log("Rejecting expert:", expert.id);
  };

  const renderActions = (expert: Expert) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(expert)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleApprove(expert)}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="Approve"
      >
        <CheckCircle className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleReject(expert)}
        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
        title="Reject"
      >
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pending Expert Verification</h1>
        <p className="text-muted-foreground mt-2">
          Review and verify expert applications
        </p>
      </div>

      <DataTable
        data={pendingExperts}
        columns={columns}
        actions={renderActions}
      />

      {/* Expert Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Expert Details"
        size="lg"
      >
        {selectedExpert && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedExpert.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedExpert.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedExpert.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-medium">{selectedExpert.organization || "Independent"}</p>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Professional Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{selectedExpert.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Specialization</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedExpert.specialization.map((spec, index) => (
                      <Badge key={index} className="bg-secondary text-secondary-foreground">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bio</p>
                  <p className="font-medium mt-1">{selectedExpert.bio}</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Uploaded Documents</h3>
              <div className="space-y-3">
                {selectedExpert.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • Uploaded on {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-sm text-primary hover:underline"
                      onClick={() => console.log("View document:", doc.url)}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleApprove(selectedExpert)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Approve Expert
              </button>
              <button
                onClick={() => handleReject(selectedExpert)}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Reject Expert
              </button>
              <button
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Request More Info
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
