"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, DollarSign, CheckCircle, Download, Star, MessageSquare, FileText } from "lucide-react";
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
  }
];

export default function CompletedBookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const completedBookings = mockBookings.filter(booking => booking.status === "completed");

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleDownloadReceipt = (booking: Booking) => {
    console.log("Downloading receipt for:", booking.id);
  };

  const handleViewFeedback = (booking: Booking) => {
    console.log("Viewing feedback for:", booking.id);
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
        onClick={() => handleDownloadReceipt(booking)}
        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
        title="Download Receipt"
      >
        <Download className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleViewFeedback(booking)}
        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
        title="View Feedback"
      >
        <MessageSquare className="h-4 w-4" />
      </button>
    </div>
  );

  const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.amount, 0);
  const averageRating = 4.5; // Mock average rating
  const totalDuration = completedBookings.reduce((sum, booking) => sum + booking.duration, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Completed Bookings</h1>
        <p className="text-muted-foreground mt-2">
          Review completed consultations and user feedback
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{averageRating}</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalDuration}m</p>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={completedBookings}
        columns={columns}
        actions={renderActions}
      />

      {/* Booking Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Completed Booking Details"
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

            {/* Session Summary */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Summary</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Session Type</p>
                    <p className="font-medium capitalize">{selectedBooking.type} Consultation</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Actual Duration</p>
                    <p className="font-medium">{selectedBooking.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completion Status</p>
                    <p className="font-medium">Successfully Completed</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Status</p>
                    <p className="font-medium">Paid</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Feedback */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">User Feedback</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">4.5 out of 5</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">User Review:</p>
                  <p className="text-sm text-muted-foreground">
                    "Excellent consultation! The expert was very knowledgeable and provided great insights.
                    The session was very helpful and I would definitely recommend."
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium">Specific Feedback:</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Expert was very professional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Session was very helpful</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Would book again</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Details</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Session Fee</span>
                    <span className="font-medium">${selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Platform Fee (10%)</span>
                    <span className="font-medium">${(selectedBooking.amount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expert Payout</span>
                    <span className="font-medium">${(selectedBooking.amount * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-medium">Total Paid</span>
                    <span className="font-bold">${selectedBooking.amount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Documents</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Session Receipt</p>
                      <p className="text-xs text-muted-foreground">PDF • Generated on {selectedBooking.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadReceipt(selectedBooking)}
                    className="text-sm text-primary hover:underline"
                  >
                    Download
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Session Summary</p>
                      <p className="text-xs text-muted-foreground">PDF • Generated on {selectedBooking.date}</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    Download
                  </button>
                </div>
                {selectedBooking.type === "online" && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Session Recording</p>
                        <p className="text-xs text-muted-foreground">MP4 • Available for 30 days</p>
                      </div>
                    </div>
                    <button className="text-sm text-primary hover:underline">
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleDownloadReceipt(selectedBooking)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Download Receipt
              </button>
              <button
                onClick={() => handleViewFeedback(selectedBooking)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                View Full Feedback
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
