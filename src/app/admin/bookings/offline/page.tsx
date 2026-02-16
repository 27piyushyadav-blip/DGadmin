"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, DollarSign, Clock, CheckCircle, XCircle, MapPin, Building } from "lucide-react";
import { mockBookings } from "@/data/mock-data";
import type { TableColumn, Booking } from "@/types/admin";

const columns: TableColumn<Booking>[] = [
  {
    key: "userName",
    label: "User"
  },
  {
    key: "expertName",
    label: "Expert"
  },
  {
    key: "date",
    label: "Date"
  },
  {
    key: "time",
    label: "Time"
  },
  {
    key: "duration",
    label: "Duration",
    render: (value: number) => `${value} min`
  },
  {
    key: "amount",
    label: "Amount",
    render: (value: number) => `$${value}`
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-800",
        completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        cancelled: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800"
      };
      return (
        <Badge className={statusColors[value as keyof typeof statusColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  }
];

export default function OfflineBookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const offlineBookings = mockBookings.filter(booking => booking.type === "offline");

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleComplete = (booking: Booking) => {
    console.log("Completing booking:", booking.id);
  };

  const handleCancel = (booking: Booking) => {
    console.log("Cancelling booking:", booking.id);
  };

  const renderActions = (booking: Booking) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(booking)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      {booking.status === "pending" && (
        <>
          <button
            onClick={() => handleComplete(booking)}
            className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
            title="Complete"
          >
            <CheckCircle className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCancel(booking)}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
            title="Cancel"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );

  const pendingOfflineBookings = offlineBookings.filter(booking => booking.status === "pending");
  const completedOfflineBookings = offlineBookings.filter(booking => booking.status === "completed");
  const totalOfflineRevenue = offlineBookings
    .filter(booking => booking.status === "completed")
    .reduce((sum, booking) => sum + booking.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Offline Bookings</h1>
        <p className="text-muted-foreground mt-2">
          Manage in-person consultation appointments and office visits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{offlineBookings.length}</p>
              <p className="text-sm text-muted-foreground">Total Offline</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingOfflineBookings.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedOfflineBookings.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalOfflineRevenue}</p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={offlineBookings}
        columns={columns}
        actions={renderActions}
      />

      {/* Booking Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Offline Booking Details"
        size="lg"
      >
        {selectedBooking && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Booking Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="font-medium">{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">In-Person Consultation</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User</p>
                  <p className="font-medium">{selectedBooking.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expert</p>
                  <p className="font-medium">{selectedBooking.expertName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedBooking.duration} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">${selectedBooking.amount}</p>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Location Details</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Expert's Office</p>
                    <p className="text-sm text-muted-foreground">Physical consultation location</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">123 Expert Street, Suite 456</p>
                    <p className="text-sm text-muted-foreground">Medical City, MC 12345</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parking</p>
                    <p className="font-medium">Available on-site</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Directions</p>
                    <button className="text-sm text-primary hover:underline">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Instructions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Appointment Instructions</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Arrival Time</p>
                      <p className="text-sm text-muted-foreground">Please arrive 10 minutes early for check-in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Documents Required</p>
                      <p className="text-sm text-muted-foreground">Bring valid ID and insurance card</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">COVID-19 Safety</p>
                      <p className="text-sm text-muted-foreground">Masks optional, hand sanitizer available</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Cancellation Policy</p>
                      <p className="text-sm text-muted-foreground">24-hour notice required for full refund</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Expert Contact</p>
                  <p className="font-medium">{selectedBooking.expertName}</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 987-6543</p>
                  <p className="text-sm text-muted-foreground">expert@example.com</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Office Contact</p>
                  <p className="font-medium">Front Desk</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">office@example.com</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              {selectedBooking.status === "pending" && (
                <>
                  <button
                    onClick={() => handleComplete(selectedBooking)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => handleCancel(selectedBooking)}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    Cancel Booking
                  </button>
                </>
              )}
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Send Reminder
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
