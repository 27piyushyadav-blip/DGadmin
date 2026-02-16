"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, DollarSign, XCircle, RefreshCw, AlertTriangle, Clock, FileText } from "lucide-react";
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
    key: "amount",
    label: "Amount",
    render: (value: number) => `$${value}`
  }
];

export default function CancelledBookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const cancelledBookings = mockBookings.filter(booking => booking.status === "cancelled");

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleProcessRefund = (booking: Booking) => {
    console.log("Processing refund for:", booking.id);
  };

  const handleReschedule = (booking: Booking) => {
    console.log("Rescheduling booking:", booking.id);
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
      <button
        onClick={() => handleProcessRefund(booking)}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="Process Refund"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleReschedule(booking)}
        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
        title="Reschedule"
      >
        <Calendar className="h-4 w-4" />
      </button>
    </div>
  );

  const totalRefundAmount = cancelledBookings.reduce((sum, booking) => sum + booking.amount, 0);
  const pendingRefunds = Math.floor(cancelledBookings.length * 0.3); // Mock pending refunds

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cancelled Bookings</h1>
        <p className="text-muted-foreground mt-2">
          Manage cancelled appointments and refund processing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{cancelledBookings.length}</p>
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingRefunds}</p>
              <p className="text-sm text-muted-foreground">Pending Refunds</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalRefundAmount}</p>
              <p className="text-sm text-muted-foreground">Refund Amount</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2.5h</p>
              <p className="text-sm text-muted-foreground">Avg. Processing</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={cancelledBookings}
        columns={columns}
        actions={renderActions}
      />

      {/* Booking Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Cancelled Booking Details"
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
                  <p className="font-medium capitalize">{selectedBooking.type}</p>
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
                  <p className="text-sm text-muted-foreground">Original Date</p>
                  <p className="font-medium">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Original Time</p>
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

            {/* Cancellation Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Cancellation Details</h3>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Cancellation Information</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      This booking was cancelled due to schedule conflict. The cancellation was initiated by the expert
                      24 hours before the scheduled session time.
                    </p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Cancelled on: {selectedBooking.date}
                      </p>
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Cancelled by: Expert
                      </p>
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Reason: Schedule Conflict
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Refund Information</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Original Amount</span>
                    <span className="font-medium">${selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Refund Amount</span>
                    <span className="font-medium text-green-600">${selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processing Fee</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Refund Method</span>
                    <span className="font-medium">Original Payment Method</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expected Processing</span>
                    <span className="font-medium">3-5 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation History */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Cancellation History</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Booking Cancelled</p>
                    <p className="text-xs text-muted-foreground">
                      Expert cancelled due to schedule conflict - {selectedBooking.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Refund Initiated</p>
                    <p className="text-xs text-muted-foreground">
                      Full refund processing started - {selectedBooking.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">User Notified</p>
                    <p className="text-xs text-muted-foreground">
                      Email notification sent to user - {selectedBooking.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reschedule Options */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Reschedule Options</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alternative Slots Available</p>
                      <p className="text-sm text-muted-foreground">3 slots available next week</p>
                    </div>
                    <button
                      onClick={() => handleReschedule(selectedBooking)}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      View Slots
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Expert Availability</p>
                      <p className="text-sm text-muted-foreground">Mon, Wed, Fri - 9AM to 5PM</p>
                    </div>
                    <button className="px-3 py-1 border border-border rounded-lg hover:bg-accent transition-colors text-sm">
                      Contact Expert
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleProcessRefund(selectedBooking)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Process Refund
              </button>
              <button
                onClick={() => handleReschedule(selectedBooking)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Reschedule Booking
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Contact User
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
