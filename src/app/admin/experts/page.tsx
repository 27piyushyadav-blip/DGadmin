"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, FileText, UserCheck } from "lucide-react";
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
    key: "specialization",
    label: "Specialization",
    render: (value: string[]) => (
      <div className="flex flex-wrap gap-1">
        {value.slice(0, 2).map((spec, index) => (
          <Badge key={index} className="bg-secondary text-secondary-foreground text-xs">
            {spec}
          </Badge>
        ))}
        {value.length > 2 && (
          <span className="text-xs text-muted-foreground">+{value.length - 2}</span>
        )}
      </div>
    )
  },
  {
    key: "experience",
    label: "Experience"
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-800",
        verified: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        rejected: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800"
      };
      return (
        <Badge className={statusColors[value as keyof typeof statusColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  },
  {
    key: "organization",
    label: "Organization",
    render: (value: string) => value || "Independent"
  },
  {
    key: "createdAt",
    label: "Joined"
  }
];

export default function ExpertsPage() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleView = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsDrawerOpen(true);
  };

  const handleVerify = (expert: Expert) => {
    console.log("Verifying expert:", expert.id);
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
      {expert.status === "pending" && (
        <>
          <button
            onClick={() => handleVerify(expert)}
            className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
            title="Verify"
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
        </>
      )}
      {expert.status === "verified" && (
        <button
          onClick={() => handleReject(expert)}
          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
          title="Revoke Access"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
      {expert.status === "rejected" && (
        <button
          onClick={() => handleVerify(expert)}
          className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
          title="Reconsider"
        >
          <UserCheck className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Experts</h1>
        <p className="text-muted-foreground mt-2">
          Manage all expert accounts on the platform
        </p>
      </div>

      <DataTable
        data={mockExperts}
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
              {selectedExpert.status === "pending" && (
                <>
                  <button
                    onClick={() => handleVerify(selectedExpert)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Verify Expert
                  </button>
                  <button
                    onClick={() => handleReject(selectedExpert)}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    Reject Expert
                  </button>
                </>
              )}
              {selectedExpert.status === "verified" && (
                <button
                  onClick={() => handleReject(selectedExpert)}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                >
                  Revoke Access
                </button>
              )}
              {selectedExpert.status === "rejected" && (
                <button
                  onClick={() => handleVerify(selectedExpert)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Reconsider Expert
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
