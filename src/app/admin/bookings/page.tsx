"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
import { mockBookings } from "@/data/mock-data";
import type { TableColumn, Booking } from "@/types/admin";

const columns: TableColumn<Booking>[] = [
  {
    key: "type",
    label: "Type",
    render: (value: string) => {
      const typeColors = {
        online: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-800",
        offline: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800"
      };
      return (
        <Badge className={typeColors[value as keyof typeof typeColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  },
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

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const pendingBookings = mockBookings.filter(booking => booking.status === "pending");
  const completedBookings = mockBookings.filter(booking => booking.status === "completed");
  const cancelledBookings = mockBookings.filter(booking => booking.status === "cancelled");
  const totalRevenue = mockBookings
    .filter(booking => booking.status === "completed")
    .reduce((sum, booking) => sum + booking.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Bookings</h1>
        <p className="text-muted-foreground mt-2">
          Manage all booking transactions on the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockBookings.length}</p>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingBookings.length}</p>
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
              <p className="text-2xl font-bold text-foreground">{completedBookings.length}</p>
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
              <p className="text-2xl font-bold text-foreground">${totalRevenue}</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={mockBookings}
        columns={columns}
        actions={renderActions}
      />

      {/* Booking Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Booking Details"
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
                  <p className="font-medium">{selectedBooking.type}</p>
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

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Information</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">Credit Card</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transaction ID</p>
                    <p className="font-medium">TXN_123456789</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Status</p>
                    <p className="font-medium">Completed</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Fee</p>
                    <p className="font-medium">${(selectedBooking.amount * 0.1).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Meeting Details</h3>
              <div className="bg-muted rounded-lg p-4">
                {selectedBooking.type === "online" ? (
                  <div>
                    <p className="text-sm text-muted-foreground">Meeting Link</p>
                    <p className="font-medium text-blue-600">https://meet.digitaloffices.com/room/{selectedBooking.id}</p>
                    <button className="mt-2 text-sm text-primary hover:underline">
                      Join Meeting
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Expert's Office</p>
                    <p className="text-sm text-muted-foreground mt-1">123 Expert Street, Suite 456</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              {selectedBooking.status === "pending" && (
                <>
                  <button
                    onClick={() => handleComplete(selectedBooking)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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
                  Download Receipt
                </button>
              )}
              {selectedBooking.status === "cancelled" && (
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                  View Refund Status
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
