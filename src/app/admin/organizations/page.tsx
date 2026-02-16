"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, FileText, Building2, Mail, Phone } from "lucide-react";
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
    key: "createdAt",
    label: "Joined"
  }
];

export default function OrganizationsPage() {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleView = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsDrawerOpen(true);
  };

  const handleVerify = (organization: Organization) => {
    console.log("Verifying organization:", organization.id);
  };

  const handleReject = (organization: Organization) => {
    console.log("Rejecting organization:", organization.id);
  };

  const handleContact = (organization: Organization, type: 'email' | 'phone') => {
    if (type === 'email') {
      console.log("Sending email to:", organization.email);
    } else {
      console.log("Calling:", organization.phone);
    }
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
        onClick={() => handleContact(organization, 'email')}
        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
        title="Send Email"
      >
        <Mail className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleContact(organization, 'phone')}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="Call"
      >
        <Phone className="h-4 w-4" />
      </button>
      {organization.status === "pending" && (
        <>
          <button
            onClick={() => handleVerify(organization)}
            className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
            title="Verify"
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
        </>
      )}
      {organization.status === "verified" && (
        <button
          onClick={() => handleReject(organization)}
          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
          title="Revoke Access"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Organizations</h1>
        <p className="text-muted-foreground mt-2">
          Manage all organization accounts on the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockOrganizations.length}</p>
              <p className="text-sm text-muted-foreground">Total Organizations</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockOrganizations.filter(org => org.status === "verified").length}
              </p>
              <p className="text-sm text-muted-foreground">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockOrganizations.filter(org => org.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Verification</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockOrganizations.filter(org => org.status === "rejected").length}
              </p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={mockOrganizations}
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
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{selectedOrganization.status}</p>
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
              {selectedOrganization.status === "pending" && (
                <>
                  <button
                    onClick={() => handleVerify(selectedOrganization)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Verify Organization
                  </button>
                  <button
                    onClick={() => handleReject(selectedOrganization)}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    Reject Organization
                  </button>
                </>
              )}
              {selectedOrganization.status === "verified" && (
                <>
                  <button
                    onClick={() => handleContact(selectedOrganization, 'email')}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Send Email
                  </button>
                  <button
                    onClick={() => handleReject(selectedOrganization)}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    Revoke Access
                  </button>
                </>
              )}
              {selectedOrganization.status === "rejected" && (
                <button
                  onClick={() => handleVerify(selectedOrganization)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Reconsider Organization
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
