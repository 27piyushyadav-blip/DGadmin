"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Building, Mail, Phone, MapPin, Globe, Users, 
  Calendar, Save, X, Upload, CheckCircle, AlertCircle, 
  Clock, Video, Tag, Eye, EyeOff, Plus, Trash2, 
  Loader2, ArrowLeft, Briefcase, CreditCard, ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/client/api/api-client";
import { toast } from "sonner";

export default function OrganizationEditPage() {
  const { orgId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [originalServices, setOriginalServices] = useState<any[]>([]);
  const [deletedServiceIds, setDeletedServiceIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>({
    name: "",
    tagline: "",
    aboutUs: "",
    category: "",
    subdomain: "",
    officialEmail: "",
    phoneNumber: "",
    websiteUrl: "",
    socialLinks: { linkedin: "", twitter: "", instagram: "" },
    isPhysicalOffice: false,
    addressLine1: "",
    city: "",
    state: "",
    zipCode: "",
    taxIdNumber: "",
    bankDetails: { bankName: "", accountName: "", accountNumber: "", bsbCode: "" },
    tags: [],
    operatingHours: [],
    isVisible: true,
  });

  const [newTag, setNewTag] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchOrganizationData();
    fetchServices();
  }, [orgId]);

  const fetchOrganizationData = async () => {
    setLoading(true);
    try {
      const data = await apiClient<any>(`/admin/organizations/${orgId}`);
      setFormData({
        name: data.name || "",
        tagline: data.tagline || "",
        aboutUs: data.aboutUs || data.description || "",
        category: data.category || data.industry || "",
        subdomain: data.subdomain || "",
        officialEmail: data.officialEmail || data.email || "",
        phoneNumber: data.phoneNumber || data.phone || "",
        websiteUrl: data.websiteUrl || data.website || "",
        socialLinks: data.socialLinks || { linkedin: "", twitter: "", instagram: "" },
        isPhysicalOffice: data.isPhysicalOffice || false,
        addressLine1: data.addressLine1 || data.location || "",
        city: data.city || "",
        state: data.state || "",
        zipCode: data.zipCode || "",
        taxIdNumber: data.taxIdNumber || data.licenseNumber || "",
        bankDetails: data.bankDetails || { bankName: "", accountName: "", accountNumber: "", bsbCode: "" },
        tags: data.tags || [],
        operatingHours: data.operatingHours || [],
        isVisible: data.isVisible ?? true,
        logo: data.logo,
        coverImageUrl: data.coverImageUrl,
        introVideo: data.introVideo,
      });
    } catch (error) {
      toast.error("Failed to fetch organization data");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await apiClient<any[]>(`/admin/organizations/${orgId}/services`);
      setServices(data || []);
      setOriginalServices(data || []);
    } catch (error) {
      console.error('Failed to fetch services');
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Save profile data
      await apiClient(`/admin/organizations/${orgId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      // 2. Save services: delete removed, update existing, create new
      for (const id of deletedServiceIds) {
        try {
          await apiClient(`/admin/organizations/${orgId}/services/${id}`, { method: 'DELETE' });
        } catch {}
      }

      for (const svc of services) {
        if (svc.id?.startsWith('new_')) {
          // Create
          await apiClient(`/admin/organizations/${orgId}/services`, {
            method: 'POST',
            body: JSON.stringify({ name: svc.name, basePrice: svc.basePrice, isActive: svc.isActive, durationMinutes: svc.durationMinutes }),
          });
        } else {
          // Update if changed
          const original = originalServices.find((o: any) => o.id === svc.id);
          if (!original || original.name !== svc.name || String(original.basePrice) !== String(svc.basePrice) || original.isActive !== svc.isActive) {
            await apiClient(`/admin/organizations/${orgId}/services/${svc.id}`, {
              method: 'PUT',
              body: JSON.stringify({ name: svc.name, basePrice: svc.basePrice, isActive: svc.isActive, durationMinutes: svc.durationMinutes }),
            });
          }
        }
      }

      toast.success("Organization updated successfully");
      router.push("/admin/organizations/manage");
    } catch (error) {
      toast.error("Failed to update organization");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (type: 'logo' | 'cover' | 'video', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const endpoints = {
      logo: `/admin/organizations/${orgId}/dp`,
      cover: `/admin/organizations/${orgId}/cover`, // Need to check if this exists
      video: `/admin/organizations/${orgId}/video`,
    };

    try {
      toast.loading(`Uploading ${type}...`);
      await apiClient(endpoints[type], {
        method: "POST",
        body: formDataUpload,
      });
      toast.dismiss();
      toast.success(`${type} updated successfully`);
      fetchOrganizationData(); // Refresh data to see new URL
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to upload ${type}`);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev: any) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev: any) => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove)
    }));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading organization details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Edit Organization</h1>
              <p className="text-sm text-gray-500">Update profile and settings for {formData.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.back()} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
            <TabsTrigger value="general" className="rounded-lg px-6">General Info</TabsTrigger>
            <TabsTrigger value="contact" className="rounded-lg px-6">Contact & Location</TabsTrigger>
            <TabsTrigger value="media" className="rounded-lg px-6">Media & Visuals</TabsTrigger>
            <TabsTrigger value="business" className="rounded-lg px-6">Business & Finance</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg px-6">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Main identification and branding details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Organization Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category / Industry</Label>
                      <Input id="category" name="category" value={formData.category} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" name="tagline" value={formData.tagline} onChange={handleInputChange} placeholder="Brief catchy description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutUs">About Us / Description</Label>
                    <Textarea id="aboutUs" name="aboutUs" value={formData.aboutUs} onChange={handleInputChange} rows={6} placeholder="Detailed description of the organization..." />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Branding Tags</CardTitle>
                  <CardDescription>Keywords for search and filtering</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      value={newTag} 
                      onChange={(e) => setNewTag(e.target.value)} 
                      placeholder="Add a tag..."
                      onKeyDown={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button type="button" size="icon" onClick={addTag}>
                      <Plus size={18} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.tags.map((tag: string) => (
                      <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-blue-900">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {formData.tags.length === 0 && <p className="text-sm text-gray-400 italic">No tags added yet</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                  <CardDescription>Public contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="officialEmail">Official Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input id="officialEmail" name="officialEmail" value={formData.officialEmail} onChange={handleInputChange} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input id="websiteUrl" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} className="pl-10" placeholder="https://..." />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.linkedin">LinkedIn</Label>
                      <Input id="socialLinks.linkedin" name="socialLinks.linkedin" value={formData.socialLinks.linkedin} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.twitter">Twitter / X</Label>
                      <Input id="socialLinks.twitter" name="socialLinks.twitter" value={formData.socialLinks.twitter} onChange={handleInputChange} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Office Location</CardTitle>
                  <CardDescription>Physical presence details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2">
                    <Switch 
                      id="isPhysicalOffice" 
                      name="isPhysicalOffice" 
                      checked={formData.isPhysicalOffice} 
                      onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, isPhysicalOffice: checked }))} 
                    />
                    <Label htmlFor="isPhysicalOffice">This is a physical office</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Street Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <Input id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="pl-10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip / Postal Code</Label>
                      <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subdomain">Subdomain</Label>
                      <Input id="subdomain" name="subdomain" value={formData.subdomain} onChange={handleInputChange} placeholder="unique-name" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase size={18} />
                    Logo
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-xl mx-auto mb-4 overflow-hidden border border-gray-200 flex items-center justify-center">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Building size={40} className="text-gray-300" />
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => logoInputRef.current?.click()}>
                    <Upload size={14} className="mr-2" />
                    Change Logo
                  </Button>
                  <input ref={logoInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload('logo', e)} />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image size={18} />
                    Cover Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-32 bg-gray-100 rounded-xl mb-4 overflow-hidden border border-gray-200 flex items-center justify-center">
                    {formData.coverImageUrl ? (
                      <img src={formData.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <Globe size={40} className="text-gray-300" />
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => coverInputRef.current?.click()}>
                    <Upload size={14} className="mr-2" />
                    Change Cover Image
                  </Button>
                  <input ref={coverInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload('cover', e)} />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video size={18} />
                    Introduction Video
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
                    {formData.introVideo ? (
                      <video src={formData.introVideo} controls className="w-full h-full" />
                    ) : (
                      <Video size={48} className="text-gray-700" />
                    )}
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      The introduction video is shown to customers to give them a better understanding of your organization and services.
                    </p>
                    <Button variant="outline" onClick={() => videoInputRef.current?.click()}>
                      <Upload size={14} className="mr-2" />
                      Upload New Video
                    </Button>
                    <input ref={videoInputRef} type="file" className="hidden" accept="video/*" onChange={(e) => handleFileUpload('video', e)} />
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <h5 className="text-sm font-semibold text-blue-800 mb-1">Video Requirements</h5>
                      <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                        <li>Maximum duration: 2 minutes</li>
                        <li>Format: MP4, MOV, or WebM</li>
                        <li>Max file size: 50MB</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck size={18} />
                    Legal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxIdNumber">Tax ID / Business License Number</Label>
                    <Input id="taxIdNumber" name="taxIdNumber" value={formData.taxIdNumber} onChange={handleInputChange} placeholder="ABN / GSTIN / Tax ID" />
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <AlertCircle size={14} />
                      This information is used for verification and billing purposes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard size={18} />
                    Bank Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankDetails.bankName">Bank Name</Label>
                      <Input id="bankDetails.bankName" name="bankDetails.bankName" value={formData.bankDetails.bankName} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankDetails.bsbCode">BSB / IFSC Code</Label>
                      <Input id="bankDetails.bsbCode" name="bankDetails.bsbCode" value={formData.bankDetails.bsbCode} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankDetails.accountName">Account Name</Label>
                    <Input id="bankDetails.accountName" name="bankDetails.accountName" value={formData.bankDetails.accountName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankDetails.accountNumber">Account Number</Label>
                    <Input id="bankDetails.accountNumber" name="bankDetails.accountNumber" value={formData.bankDetails.accountNumber} onChange={handleInputChange} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Control how this organization appears and operates on the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="space-y-0.5">
                    <Label className="text-base">Profile Visibility</Label>
                    <p className="text-sm text-gray-500">Enable or disable this organization&apos;s public profile</p>
                  </div>
                  <Switch 
                    checked={formData.isVisible} 
                    onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, isVisible: checked }))} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" />
                  Operating Hours
                </CardTitle>
                <CardDescription>Set working hours for each day of the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                    const hours = Array.isArray(formData.operatingHours) ? formData.operatingHours : [];
                    const existing = hours.find((h: any) => h.day === day);
                    const isOpen = existing?.isOpen ?? (day !== 'Sunday');
                    const openTime = existing?.openTime || '09:00';
                    const closeTime = existing?.closeTime || '18:00';

                    const updateDay = (field: string, value: any) => {
                      setFormData((prev: any) => {
                        const hours = [...(prev.operatingHours || [])];
                        const idx = hours.findIndex((h: any) => h.day === day);
                        if (idx >= 0) {
                          hours[idx] = { ...hours[idx], [field]: value };
                        } else {
                          hours.push({ day, isOpen: true, openTime: '09:00', closeTime: '18:00', [field]: value });
                        }
                        return { ...prev, operatingHours: hours };
                      });
                    };

                    return (
                      <div key={day} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                        <div className="w-28">
                          <span className="text-sm font-medium text-gray-700">{day}</span>
                        </div>
                        <Switch
                          checked={isOpen}
                          onCheckedChange={(checked) => updateDay('isOpen', checked)}
                        />
                        <span className={`text-xs font-medium w-12 ${isOpen ? 'text-green-600' : 'text-gray-400'}`}>
                          {isOpen ? 'Open' : 'Closed'}
                        </span>
                        {isOpen && (
                          <div className="flex items-center gap-2 ml-auto">
                            <Input
                              type="time"
                              value={openTime}
                              onChange={(e) => updateDay('openTime', e.target.value)}
                              className="w-32 text-sm"
                            />
                            <span className="text-gray-400 text-sm">to</span>
                            <Input
                              type="time"
                              value={closeTime}
                              onChange={(e) => updateDay('closeTime', e.target.value)}
                              className="w-32 text-sm"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Service Catalog */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase size={18} className="text-purple-500" />
                    Service Catalog
                  </CardTitle>
                  <CardDescription>Manage the services and menu items offered</CardDescription>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setServices(prev => [...prev, { id: `new_${Date.now()}`, name: '', basePrice: 0, isActive: true, durationMinutes: 30 }]);
                  }}
                >
                  <Plus size={14} className="mr-1" /> Add Service
                </Button>
              </CardHeader>
              <CardContent>
                {services.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <Briefcase size={32} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No services added yet. Click &quot;Add Service&quot; to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {services.map((item: any, index: number) => (
                      <div key={item.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <Input
                          value={item.name}
                          onChange={(e) => {
                            setServices(prev => {
                              const updated = [...prev];
                              updated[index] = { ...updated[index], name: e.target.value };
                              return updated;
                            });
                          }}
                          placeholder="Service name"
                          className="flex-1"
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                          <Input
                            type="number"
                            value={item.basePrice || 0}
                            onChange={(e) => {
                              setServices(prev => {
                                const updated = [...prev];
                                updated[index] = { ...updated[index], basePrice: parseInt(e.target.value) || 0 };
                                return updated;
                              });
                            }}
                            className="w-28 pl-7"
                            placeholder="Price"
                          />
                        </div>
                        <Input
                          type="number"
                          value={item.durationMinutes || 30}
                          onChange={(e) => {
                            setServices(prev => {
                              const updated = [...prev];
                              updated[index] = { ...updated[index], durationMinutes: parseInt(e.target.value) || 0 };
                              return updated;
                            });
                          }}
                          className="w-20"
                          placeholder="Min"
                        />
                        <span className="text-xs text-gray-400 -ml-1">min</span>
                        <button
                          onClick={() => {
                            setServices(prev => {
                              const updated = [...prev];
                              updated[index] = { ...updated[index], isActive: !updated[index].isActive };
                              return updated;
                            });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {item.isActive ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => {
                            if (!item.id?.startsWith('new_')) {
                              setDeletedServiceIds(prev => [...prev, item.id]);
                            }
                            setServices(prev => prev.filter((_, i) => i !== index));
                          }}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Danger Zone */}

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2 text-base">
                  <Trash2 size={16} />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-red-800">Delete Organization</p>
                    <p className="text-xs text-red-600">Permanently remove this organization and all associated data</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      if (!confirm('Are you sure you want to delete this organization? This action cannot be undone.')) return;
                      try {
                        await apiClient(`/admin/users/${orgId}`, { method: 'DELETE' });
                        toast.success('Organization deleted successfully');
                        router.push('/admin/organizations/manage');
                      } catch {
                        toast.error('Failed to delete organization');
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Image({ size, className }: { size: number, className?: string }) {
  return <Building size={size} className={className} />;
}
