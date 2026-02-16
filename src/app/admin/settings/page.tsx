"use client";

import { useState } from "react";
import { Settings, Bell, Shield, Database, Palette, Globe, Users, CreditCard, Mail, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    securityAlerts: true,
    systemUpdates: false
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: false,
    auditLogging: true
  });

  const [platform, setPlatform] = useState({
    platformName: "DigitalOffices",
    platformEmail: "admin@digitaloffices.com",
    supportPhone: "+1-800-123-4567",
    timezone: "UTC",
    language: "English",
    currency: "USD"
  });

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "platform", label: "Platform", icon: Globe },
    { id: "users", label: "User Management", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data & Storage", icon: Database }
  ];

  const handleSave = () => {
    console.log("Saving settings...");
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const handleBackup = () => {
    console.log("Creating backup...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure platform settings and preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-card rounded-lg border border-border p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-card rounded-lg border border-border p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">General Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Platform Name</label>
                    <input
                      type="text"
                      value={platform.platformName}
                      onChange={(e) => setPlatform({...platform, platformName: e.target.value})}
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Admin Email</label>
                    <input
                      type="email"
                      value={platform.platformEmail}
                      onChange={(e) => setPlatform({...platform, platformEmail: e.target.value})}
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Support Phone</label>
                    <input
                      type="tel"
                      value={platform.supportPhone}
                      onChange={(e) => setPlatform({...platform, supportPhone: e.target.value})}
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Timezone</label>
                    <select
                      value={platform.timezone}
                      onChange={(e) => setPlatform({...platform, timezone: e.target.value})}
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                      <option value="GMT">GMT</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", label: "Email Notifications", icon: Mail },
                    { key: "smsNotifications", label: "SMS Notifications", icon: Smartphone },
                    { key: "pushNotifications", label: "Push Notifications", icon: Bell },
                    { key: "weeklyReports", label: "Weekly Reports", icon: Settings },
                    { key: "securityAlerts", label: "Security Alerts", icon: Shield },
                    { key: "systemUpdates", label: "System Updates", icon: Database }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-muted-foreground">
                            {key === "emailNotifications" && "Receive email notifications for important events"}
                            {key === "smsNotifications" && "Receive SMS alerts for critical issues"}
                            {key === "pushNotifications" && "Receive push notifications in browser"}
                            {key === "weeklyReports" && "Get weekly summary reports"}
                            {key === "securityAlerts" && "Get notified about security events"}
                            {key === "systemUpdates" && "Receive notifications about system updates"}
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[key as keyof typeof notifications]}
                          onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.twoFactorAuth}
                        onChange={(e) => setSecurity({...security, twoFactorAuth: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: parseInt(e.target.value)})}
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Password Expiry (days)</label>
                    <input
                      type="number"
                      value={security.passwordExpiry}
                      onChange={(e) => setSecurity({...security, passwordExpiry: parseInt(e.target.value)})}
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">IP Whitelist</p>
                      <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.ipWhitelist}
                        onChange={(e) => setSecurity({...security, ipWhitelist: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Audit Logging</p>
                      <p className="text-sm text-muted-foreground">Log all admin activities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.auditLogging}
                        onChange={(e) => setSecurity({...security, auditLogging: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "platform" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Platform Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Default Language</label>
                    <select
                      value={platform.language}
                      onChange={(e) => setPlatform({...platform, language: e.target.value})}
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Default Currency</label>
                    <select
                      value={platform.currency}
                      onChange={(e) => setPlatform({...platform, currency: e.target.value})}
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Platform Commission (%)</label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Minimum Booking Amount</label>
                    <input
                      type="number"
                      defaultValue="25"
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">User Management Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">User Registration</label>
                    <select className="w-full mt-1 p-2 border border-input rounded-lg bg-background">
                      <option>Open Registration</option>
                      <option>Invite Only</option>
                      <option>Admin Approval Required</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email Verification Required</label>
                    <select className="w-full mt-1 p-2 border border-input rounded-lg bg-background">
                      <option>Required</option>
                      <option>Optional</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Default User Role</label>
                    <select className="w-full mt-1 p-2 border border-input rounded-lg bg-background">
                      <option>User</option>
                      <option>Expert</option>
                      <option>Organization</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Payment Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Payment Gateway</label>
                    <select className="w-full mt-1 p-2 border border-input rounded-lg bg-background">
                      <option>Stripe</option>
                      <option>PayPal</option>
                      <option>Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Refund Policy (days)</label>
                    <input
                      type="number"
                      defaultValue="7"
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Expert Payout Schedule</label>
                    <select className="w-full mt-1 p-2 border border-input rounded-lg bg-background">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Appearance Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Theme</label>
                    <select className="w-full mt-1 p-2 border border-input rounded-lg bg-background">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Primary Color</label>
                    <input
                      type="color"
                      defaultValue="#3b82f6"
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full mt-1 p-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Data & Storage</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Database Size</p>
                      <p className="text-2xl font-bold text-foreground">2.4 GB</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Storage Used</p>
                      <p className="text-2xl font-bold text-foreground">1.8 GB</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold text-foreground">1,248</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold text-foreground">3,421</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleBackup}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Create Backup
                    </button>
                    <button
                      onClick={handleExport}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-6 border-t border-border">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
