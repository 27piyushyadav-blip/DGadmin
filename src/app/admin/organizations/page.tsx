"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, FileText, Building2, Mail, Phone, Video, Loader2 } from "lucide-react";
import { apiClient } from "@/client/api/api-client";
import type { TableColumn, Organization } from "@/types/admin";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
    key: "location",
    label: "Address",
    render: (value: string) => (
      <span className="text-sm truncate max-w-xs">{value || "N/A"}</span>
    )
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusColors: any = {
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-800",
        verified: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        rejected: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800"
      };
      return (
        <Badge className={statusColors[value?.toLowerCase()] || "bg-gray-100"}>
          {value?.toUpperCase() || "UNKNOWN"}
        </Badge>
      );
    }
  },
  {
    key: "joinedAt",
    label: "Joined",
    render: (value: any) => new Date(value).toLocaleDateString()
  }
];

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    verifiedCount: 0,
    pendingCount: 0,
    rejectedCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('identity');

  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const data: any = await apiClient(`${API_BASE}/admin/organizations`);
      setOrganizations(data.organizations || []);
      setStats({
        total: data.total || 0,
        verifiedCount: data.verifiedCount || 0,
        pendingCount: data.pendingCount || 0,
        rejectedCount: data.rejectedCount || 0
      });
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
      toast.error("Failed to load organizations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleView = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsDrawerOpen(true);
  };

  const handleVerify = async (organization: any) => {
    if (!confirm(`Are you sure you want to approve ${organization.name}?`)) return;
    try {
      await apiClient(`${API_BASE}/admin/organizations/${organization.orgId}/approve`, {
        method: "POST"
      });
      toast.success("Organization verified successfully");
      setIsDrawerOpen(false);
      fetchOrganizations();
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  const handleReject = async (organization: any) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (reason === null) return;
    
    try {
      await apiClient(`${API_BASE}/admin/organizations/${organization.orgId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason })
      });
      toast.success("Organization rejected");
      setIsDrawerOpen(false);
      fetchOrganizations();
    } catch (error) {
      toast.error("Rejection failed");
    }
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
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
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
                {stats.verifiedCount}
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
                {stats.pendingCount}
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
                {stats.rejectedCount}
              </p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable
          data={organizations}
          columns={columns}
          actions={renderActions}
        />
      )}

      {/* Organization Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Organization Details"
        size="xl"
      >
        {selectedOrganization && (
          <div className="flex h-full flex-col">
            {/* Header & Tabs Area */}
            <div className="shrink-0 space-y-6 pb-4 border-b border-border">
              {/* Logo and Header Cover Box */}
              <div className="relative h-40 w-full bg-muted rounded-xl border border-border overflow-hidden">
                {selectedOrganization.coverImageUrl ? (
                   <img src={selectedOrganization.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                   <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
                )}
                <div className="absolute -bottom-6 left-6 p-1 bg-background rounded-lg border shadow-sm">
                  <div className="w-24 h-24 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                    {selectedOrganization.logo ? (
                      <img src={selectedOrganization.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-8 flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{selectedOrganization.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrganization.category || selectedOrganization.industry || "General Industry"} 
                    {selectedOrganization.tagline && ` • ${selectedOrganization.tagline}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className={`px-3 py-1 text-sm capitalize ${
                    selectedOrganization.status === 'verified' ? 'bg-green-100 text-green-800' :
                    selectedOrganization.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOrganization.status}
                  </Badge>
                  {selectedOrganization.status?.toLowerCase() === 'rejected' && selectedOrganization.rejectionReason && (
                    <p className="text-xs text-red-600 font-medium">
                      Reason: {selectedOrganization.rejectionReason}
                    </p>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border gap-6">
                {[
                  { id: 'identity', label: 'Identity & Brand' },
                  { id: 'contact', label: 'Contact & Location' },
                  { id: 'services', label: 'Services' },
                  { id: 'legal', label: 'Legal & Bank' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab.id 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Tab Content */}
            <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-2">
              
              {/* TAB 1: IDENTITY */}
              {activeTab === 'identity' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Organization Name</p>
                      <p className="font-medium text-lg">{selectedOrganization.name}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Subdomain</p>
                      <p className="font-medium text-lg">{selectedOrganization.subdomain || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">About the Organization</h3>
                    <div className="bg-muted/10 rounded-lg p-5 border text-sm leading-relaxed">
                      {selectedOrganization.aboutUs || selectedOrganization.description || "No description provided."}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Video className="w-5 h-5 text-primary" />
                      Intro/Campaign Video
                    </h3>
                    {selectedOrganization.introVideo ? (
                      <div className="relative max-w-2xl aspect-video rounded-xl border border-border overflow-hidden bg-black">
                        <video src={selectedOrganization.introVideo} className="w-full h-full object-contain" controls />
                      </div>
                    ) : (
                      <div className="aspect-video max-w-2xl rounded-xl bg-muted/20 flex flex-col items-center justify-center border-2 border-dashed border-border text-muted-foreground">
                        <Video className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm">No intro video uploaded</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: CONTACT & LOCATION */}
              {activeTab === 'contact' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg bg-muted/10">
                        <p className="text-xs text-muted-foreground uppercase">Official/Public Email</p>
                        <p className="font-medium">{selectedOrganization.officialEmail || selectedOrganization.email || "N/A"}</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/10">
                        <p className="text-xs text-muted-foreground uppercase">Phone Number</p>
                        <p className="font-medium">{selectedOrganization.phoneNumber || selectedOrganization.phone || "N/A"}</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/10 col-span-2">
                        <p className="text-xs text-muted-foreground uppercase">Website URL</p>
                        <p className="font-medium text-primary hover:underline cursor-pointer">
                          {selectedOrganization.websiteUrl || selectedOrganization.website || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Location Details</h3>
                    <div className="p-4 border rounded-lg bg-muted/10 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                         <span className="font-medium">Physical Office:</span>
                         <Badge variant={selectedOrganization.isPhysicalOffice ? "default" : "secondary"}>
                           {selectedOrganization.isPhysicalOffice ? "Yes" : "No / Virtual Only"}
                         </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground uppercase">Address Line 1</p>
                          <p className="font-medium">{selectedOrganization.addressLine1 || selectedOrganization.location || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">City</p>
                          <p className="font-medium">{selectedOrganization.city || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">State & Zip Code</p>
                          <p className="font-medium">
                            {selectedOrganization.state || "N/A"} {selectedOrganization.zipCode ? `- ${selectedOrganization.zipCode}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Social Links</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['linkedin', 'twitter', 'instagram'].map(platform => {
                        const link = selectedOrganization.socialLinks?.[platform];
                        return (
                          <div key={platform} className="p-3 border rounded-lg text-center bg-muted/10">
                            <p className="text-xs text-muted-foreground capitalize mb-1">{platform}</p>
                            {link ? (
                              <a href={link} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline truncate block">View Profile</a>
                            ) : (
                              <p className="text-sm text-muted-foreground">Not provided</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Service Offerings</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedOrganization.offeredServiceTypes?.length > 0 ? (
                        selectedOrganization.offeredServiceTypes.map((service: string, idx: number) => (
                           <Badge key={idx} variant="outline" className="bg-primary/5 text-sm py-1 px-3">
                             {service}
                           </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No specific services listed</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg bg-muted/10">
                      <p className="text-xs text-muted-foreground uppercase">Cancellation Window</p>
                      <p className="font-medium text-lg mt-1">{selectedOrganization.cancellationWindowHours || 0} Hours</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Booking & Cancellation Policy</h3>
                    <div className="bg-muted/10 rounded-lg p-5 border text-sm leading-relaxed">
                      {selectedOrganization.bookingPolicy || "Standard generic policy applied."}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Operating Hours</h3>
                    <div className="border rounded-lg overflow-hidden">
                       <table className="w-full text-sm">
                         <thead className="bg-muted border-b">
                           <tr>
                             <th className="text-left font-medium p-3">Day</th>
                             <th className="text-left font-medium p-3">Status</th>
                             <th className="text-left font-medium p-3">Hours</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y text-muted-foreground">
                           {selectedOrganization.operatingHours?.length > 0 ? (
                             selectedOrganization.operatingHours.map((hours: any, idx: number) => (
                               <tr key={idx} className="hover:bg-muted/5">
                                 <td className="p-3 font-medium capitalize text-foreground">{hours.day}</td>
                                 <td className="p-3">
                                   {hours.is_closed ? (
                                      <Badge variant="secondary">Closed</Badge>
                                   ) : (
                                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">Open</Badge>
                                   )}
                                 </td>
                                 <td className="p-3 font-mono text-xs">
                                   {hours.is_closed ? '-' : `${hours.open} to ${hours.close}`}
                                 </td>
                               </tr>
                             ))
                           ) : (
                             <tr><td colSpan={3} className="p-4 text-center">No hours provided</td></tr>
                           )}
                         </tbody>
                       </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: LEGAL & BANK */}
              {activeTab === 'legal' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-5 border rounded-lg bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/30">
                      <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-400 mb-2">ABN / License Number</h4>
                      <p className="text-xl font-mono text-orange-900 dark:text-orange-300">
                        {selectedOrganization.taxIdNumber || selectedOrganization.licenseNumber || "MISSING"}
                      </p>
                    </div>
                    {selectedOrganization.businessLicenseUrl && (
                      <div className="p-5 border rounded-lg flex flex-col justify-center items-start gap-2 bg-muted/10">
                        <p className="text-xs uppercase text-muted-foreground font-semibold">Business License Document</p>
                        <a href={selectedOrganization.businessLicenseUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                          <FileText className="w-5 h-5" /> View Uploaded License
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Bank Settlement Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg bg-muted/10">
                        <p className="text-xs text-muted-foreground uppercase">Bank Name</p>
                        <p className="font-medium">{selectedOrganization.bankDetails?.bankName || "N/A"}</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/10">
                        <p className="text-xs text-muted-foreground uppercase">Account Name</p>
                        <p className="font-medium">{selectedOrganization.bankDetails?.accountName || "N/A"}</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/10">
                        <p className="text-xs text-muted-foreground uppercase">Account Number</p>
                        <p className="font-medium font-mono tracking-wider">{selectedOrganization.bankDetails?.accountNumber || "N/A"}</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/10">
                        <p className="text-xs text-muted-foreground uppercase">BSB Code / Routing</p>
                        <p className="font-medium font-mono uppercase">{selectedOrganization.bankDetails?.bsbCode || selectedOrganization.bankDetails?.ifscCode || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Other Attached Documents</h3>
                    <div className="space-y-3">
                      {selectedOrganization.documents && selectedOrganization.documents.length > 0 ? (
                        selectedOrganization.documents.map((doc: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{doc.title || doc.name || `Document ${i+1}`}</p>
                                <p className="text-xs text-muted-foreground">{doc.category || "Verification"}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">View</a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center border rounded-lg border-dashed">
                           <p className="text-sm text-muted-foreground">No additional documents uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Action Buttons */}
            <div className="shrink-0 flex items-center justify-end gap-3 pt-4 border-t border-border mt-auto">
              {selectedOrganization.status === "pending" && (
                <>
                  <button
                    onClick={() => handleReject(selectedOrganization)}
                    className="px-6 py-2.5 border border-destructive/20 text-destructive bg-destructive/5 rounded-lg hover:bg-destructive/10 font-medium transition-colors"
                  >
                    Reject 
                  </button>
                  <button
                    onClick={() => handleVerify(selectedOrganization)}
                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Verification
                  </button>
                </>
              )}
              {selectedOrganization.status === "verified" && (
                <>
                  <button
                    onClick={() => handleContact(selectedOrganization, 'email')}
                    className="px-6 py-2.5 border border-primary/20 text-primary bg-primary/5 rounded-lg hover:bg-primary/10 font-medium transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> Send Email
                  </button>
                  <button
                    onClick={() => handleReject(selectedOrganization)}
                    className="px-6 py-2.5 border border-destructive/20 text-destructive bg-destructive/5 rounded-lg hover:bg-destructive/10 font-medium transition-colors"
                  >
                    Revoke Access
                  </button>
                </>
              )}
              {selectedOrganization.status === "rejected" && (
                <button
                  onClick={() => handleVerify(selectedOrganization)}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
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
