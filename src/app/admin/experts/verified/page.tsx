"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, XCircle, FileText, Mail, Phone } from "lucide-react";
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
    key: "organization",
    label: "Organization",
    render: (value: string) => value || "Independent"
  },
  {
    key: "createdAt",
    label: "Verified On"
  }
];

export default function VerifiedExpertsPage() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const verifiedExperts = mockExperts.filter(expert => expert.status === "verified");

  const handleView = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsDrawerOpen(true);
  };

  const handleRevoke = (expert: Expert) => {
    console.log("Revoking expert access:", expert.id);
  };

  const handleContact = (expert: Expert, type: 'email' | 'phone') => {
    if (type === 'email') {
      console.log("Sending email to:", expert.email);
    } else {
      console.log("Calling:", expert.phone);
    }
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
        onClick={() => handleContact(expert, 'email')}
        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
        title="Send Email"
      >
        <Mail className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleContact(expert, 'phone')}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="Call"
      >
        <Phone className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleRevoke(expert)}
        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
        title="Revoke Access"
      >
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Verified Experts</h1>
        <p className="text-muted-foreground mt-2">
          Manage verified expert accounts and their activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{verifiedExperts.length}</p>
              <p className="text-sm text-muted-foreground">Total Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Active This Week</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={verifiedExperts}
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

            {/* Statistics */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold text-foreground">47</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-xs text-green-600">From 32 reviews</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold text-foreground">2h</p>
                  <p className="text-xs text-muted-foreground">Average response</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-foreground">$7,240</p>
                  <p className="text-xs text-green-600">+8% this month</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleContact(selectedExpert, 'email')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send Email
              </button>
              <button
                onClick={() => handleContact(selectedExpert, 'phone')}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Call Expert
              </button>
              <button
                onClick={() => handleRevoke(selectedExpert)}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Revoke Access
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
