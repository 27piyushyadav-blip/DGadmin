"use client";

import { useState } from "react";
import { Bell, Mail, Smartphone, CheckCircle, AlertTriangle, Info, Settings, Save } from "lucide-react";

export default function NotificationPreferencesPage() {
  const [preferences, setPreferences] = useState({
    emailNotifications: {
      bookingUpdates: true,
      paymentAlerts: true,
      systemUpdates: false,
      marketingEmails: false,
      weeklyReports: true,
      securityAlerts: true
    },
    pushNotifications: {
      bookingReminders: true,
      newMessages: true,
      urgentAlerts: true,
      generalUpdates: false
    },
    smsNotifications: {
      urgentAlerts: true,
      bookingConfirmations: false,
      paymentFailures: true,
      systemDowntime: true
    }
  });

  const handleToggle = (category: string, setting: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev[keyof typeof prev]]
      }
    }));
  };

  const handleSave = () => {
    console.log("Saving notification preferences:", preferences);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notification Preferences</h1>
        <p className="text-muted-foreground mt-2">
          Manage how and when you receive notifications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Notifications */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(preferences.emailNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {key === 'bookingUpdates' && 'Get notified about booking changes'}
                    {key === 'paymentAlerts' && 'Payment processing notifications'}
                    {key === 'systemUpdates' && 'Platform updates and maintenance'}
                    {key === 'marketingEmails' && 'Promotional content and newsletters'}
                    {key === 'weeklyReports' && 'Weekly activity summaries'}
                    {key === 'securityAlerts' && 'Security and login alerts'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleToggle('emailNotifications', key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Push Notifications</h3>
              <p className="text-sm text-muted-foreground">Browser push notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(preferences.pushNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {key === 'bookingReminders' && 'Upcoming booking reminders'}
                    {key === 'newMessages' && 'New message notifications'}
                    {key === 'urgentAlerts' && 'Critical system alerts'}
                    {key === 'generalUpdates' && 'General platform updates'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleToggle('pushNotifications', key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">SMS Notifications</h3>
              <p className="text-sm text-muted-foreground">Text message alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(preferences.smsNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {key === 'urgentAlerts' && 'Critical alerts only'}
                    {key === 'bookingConfirmations' && 'Booking confirmations'}
                    {key === 'paymentFailures' && 'Payment failure alerts'}
                    {key === 'systemDowntime' && 'System downtime notifications'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleToggle('smsNotifications', key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Preferences
        </button>
      </div>
    </div>
  );
}
