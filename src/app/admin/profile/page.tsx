"use client";

import { useState } from "react";
import { User, Mail, Phone, Calendar, Camera, Save, Eye, EyeOff } from "lucide-react";

export default function ProfileSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@digitaloffices.com",
    phone: "+1 (555) 123-4567",
    bio: "Super Administrator with full system access and management capabilities.",
    timezone: "UTC",
    language: "English",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Changing password");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h3>
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-24 w-24 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-primary-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Click camera to change photo</p>
              <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB</p>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-card rounded-lg border border-border p-6 mt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Account Type</span>
                <span className="text-sm font-medium">Super Admin</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium">Jan 15, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Login</span>
                <span className="text-sm font-medium">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={3}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange("timezone", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                    className="w-full mt-1 p-2 pr-10 border border-input rounded-lg bg-background"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">New Password</label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange("newPassword", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                />
              </div>
              <button onClick={handlePasswordChange} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Update Password
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button onClick={handleSave} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
