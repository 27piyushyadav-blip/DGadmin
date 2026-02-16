"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, FileText, Building2, Calendar } from "lucide-react";
import { mockOrganizations } from "@/data/mock-data";
import type { TableColumn, Organization } from "@/types/admin";

const columns: TableColumn<Organization>[] = [
  {
    key: "name",
    label: "Organization"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "phone",
    label: "Phone"
  },
  {
    key: "address",
    label: "Address",
    render: (value: string) => (
      <span className="text-sm truncate max-w-xs">{value}</span>
    )
  },
  {
    key: "requestDate",
    label: "Request Date"
  }
];

export default function PendingOrganizationsPage() {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pendingOrganizations = mockOrganizations.filter(org => org.status === "pending");

  const handleView = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsDrawerOpen(true);
  };

  const handleApprove = (organization: Organization) => {
    console.log("Approving organization:", organization.id);
  };

  const handleReject = (organization: Organization) => {
    console.log("Rejecting organization:", organization.id);
  };

  const renderActions = (organization: Organization) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(organization)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleApprove(organization)}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="Approve"
      >
        <CheckCircle className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleReject(organization)}
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
        <h1 className="text-3xl font-bold text-foreground">Pending Organization Verification</h1>
        <p className="text-muted-foreground mt-2">
          Review and verify organization applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingOrganizations.length}</p>
              <p className="text-sm text-muted-foreground">Pending Verification</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2-3</p>
              <p className="text-sm text-muted-foreground">Days Average Review</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-sm text-muted-foreground">Approval Rate</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={pendingOrganizations}
        columns={columns}
        actions={renderActions}
      />

      {/* Organization Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Organization Details"
        size="lg"
      >
        {selectedOrganization && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Organization Name</p>
                  <p className="font-medium">{selectedOrganization.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedOrganization.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedOrganization.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Request Date</p>
                  <p className="font-medium">{selectedOrganization.requestDate}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Address</h3>
              <div className="bg-muted rounded-lg p-4">
                <p className="font-medium">{selectedOrganization.address}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Description</h3>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm">{selectedOrganization.description}</p>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Uploaded Documents</h3>
              <div className="space-y-3">
                {selectedOrganization.documents.map((doc) => (
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
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-800">
                        Pending Review
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

            {/* Verification Checklist */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Verification Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm">Business license verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm">Address confirmed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full border-2 border-yellow-500 bg-yellow-500 flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm">Insurance certificate pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm">Tax documents not provided</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleApprove(selectedOrganization)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Approve Organization
              </button>
              <button
                onClick={() => handleReject(selectedOrganization)}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Reject Organization
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
