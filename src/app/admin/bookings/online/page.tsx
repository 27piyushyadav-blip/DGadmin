"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, DollarSign, Clock, CheckCircle, XCircle, Video, Monitor } from "lucide-react";
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

export default function OnlineBookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onlineBookings = mockBookings.filter(booking => booking.type === "online");

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

  const handleJoinSession = (booking: Booking) => {
    console.log("Joining session:", booking.id);
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
            onClick={() => handleJoinSession(booking)}
            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
            title="Join Session"
          >
            <Video className="h-4 w-4" />
          </button>
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

  const pendingOnlineBookings = onlineBookings.filter(booking => booking.status === "pending");
  const completedOnlineBookings = onlineBookings.filter(booking => booking.status === "completed");
  const totalOnlineRevenue = onlineBookings
    .filter(booking => booking.status === "completed")
    .reduce((sum, booking) => sum + booking.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Online Bookings</h1>
        <p className="text-muted-foreground mt-2">
          Manage online consultation sessions and video meetings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{onlineBookings.length}</p>
              <p className="text-sm text-muted-foreground">Total Online</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingOnlineBookings.length}</p>
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
              <p className="text-2xl font-bold text-foreground">{completedOnlineBookings.length}</p>
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
              <p className="text-2xl font-bold text-foreground">${totalOnlineRevenue}</p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={onlineBookings}
        columns={columns}
        actions={renderActions}
      />

      {/* Booking Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Online Booking Details"
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
                  <p className="font-medium">Online Consultation</p>
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

            {/* Video Conference Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Video Conference</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Meeting Room</p>
                    <p className="text-sm text-muted-foreground">Secure video conference room</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Meeting Link</p>
                    <p className="font-medium text-blue-600">https://meet.digitaloffices.com/room/{selectedBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Meeting ID</p>
                    <p className="font-medium">{selectedBooking.id}-2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Password</p>
                    <p className="font-medium">DO2024{selectedBooking.id.slice(-4)}</p>
                  </div>
                </div>
                {selectedBooking.status === "pending" && (
                  <button
                    onClick={() => handleJoinSession(selectedBooking)}
                    className="mt-4 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="h-4 w-4" />
                    Join Meeting
                  </button>
                )}
              </div>
            </div>

            {/* Session Quality */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Quality</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Video Quality</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">HD (1080p)</span>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Audio Quality</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Clear</span>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Connection</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Stable</span>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Recording</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              {selectedBooking.status === "pending" && (
                <>
                  <button
                    onClick={() => handleJoinSession(selectedBooking)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Join Session
                  </button>
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
              {selectedBooking.status === "completed" && (
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                  Download Recording
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
