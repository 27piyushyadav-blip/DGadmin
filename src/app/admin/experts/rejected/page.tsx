"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, UserCheck, FileText, AlertTriangle } from "lucide-react";
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
    key: "requestDate",
    label: "Rejected On"
  }
];

export default function RejectedExpertsPage() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const rejectedExperts = mockExperts.filter(expert => expert.status === "rejected");

  const handleView = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsDrawerOpen(true);
  };

  const handleReconsider = (expert: Expert) => {
    console.log("Reconsidering expert:", expert.id);
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
        onClick={() => handleReconsider(expert)}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="Reconsider Application"
      >
        <UserCheck className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rejected Experts</h1>
        <p className="text-muted-foreground mt-2">
          Review and manage rejected expert applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{rejectedExperts.length}</p>
              <p className="text-sm text-muted-foreground">Total Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Pending Reconsideration</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={rejectedExperts}
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

            {/* Rejection Reason */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Rejection Details</h3>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Rejection Reason</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      The application was rejected due to insufficient documentation and lack of verifiable credentials. 
                      The provided certificates could not be authenticated through the issuing institutions.
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      Rejected on: {selectedExpert.requestDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Submitted Documents</h3>
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
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800">
                        Invalid
                      </Badge>
                      <button
                        className="text-sm text-primary hover:underline"
                        onClick={() => console.log("View document:", doc.url)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleReconsider(selectedExpert)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Reconsider Application
              </button>
              <button
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Request Additional Documents
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
