"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, CreditCard, Calendar, Download, Filter } from "lucide-react";
import { mockBookings } from "@/data/mock-data";
import type { TableColumn } from "@/types/admin";

interface Payment {
  id: string;
  bookingId: string;
  userName: string;
  expertName: string;
  amount: number;
  platformFee: number;
  expertPayout: number;
  paymentMethod: string;
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  transactionId: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    bookingId: "1",
    userName: "John Doe",
    expertName: "Dr. Michael Chen",
    amount: 150,
    platformFee: 15,
    expertPayout: 135,
    paymentMethod: "Credit Card",
    status: "completed",
    date: "2024-01-20",
    transactionId: "TXN_123456789"
  },
  {
    id: "2",
    bookingId: "2",
    userName: "Jane Smith",
    expertName: "Dr. Sarah Johnson",
    amount: 120,
    platformFee: 12,
    expertPayout: 108,
    paymentMethod: "PayPal",
    status: "refunded",
    date: "2024-01-19",
    transactionId: "TXN_123456790"
  },
  {
    id: "3",
    bookingId: "3",
    userName: "Bob Wilson",
    expertName: "Dr. Michael Chen",
    amount: 150,
    platformFee: 15,
    expertPayout: 135,
    paymentMethod: "Credit Card",
    status: "pending",
    date: "2024-01-22",
    transactionId: "TXN_123456791"
  }
];

const columns: TableColumn<Payment>[] = [
  {
    key: "transactionId",
    label: "Transaction ID"
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
    key: "amount",
    label: "Amount",
    render: (value: number) => `$${value}`
  },
  {
    key: "platformFee",
    label: "Platform Fee",
    render: (value: number) => `$${value}`
  },
  {
    key: "expertPayout",
    label: "Expert Payout",
    render: (value: number) => `$${value}`
  },
  {
    key: "paymentMethod",
    label: "Payment Method"
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusColors = {
        completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-800",
        failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-800",
        refunded: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-800"
      };
      return (
        <Badge className={statusColors[value as keyof typeof statusColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  },
  {
    key: "date",
    label: "Date"
  }
];

export default function PaymentsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const completedPayments = mockPayments.filter(p => p.status === "completed");
  const pendingPayments = mockPayments.filter(p => p.status === "pending");
  const refundedPayments = mockPayments.filter(p => p.status === "refunded");
  
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPlatformFees = completedPayments.reduce((sum, p) => sum + p.platformFee, 0);
  const totalExpertPayouts = completedPayments.reduce((sum, p) => sum + p.expertPayout, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payments & Revenue</h1>
        <p className="text-muted-foreground mt-2">
          Monitor payment transactions and revenue analytics
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <div className="flex gap-2">
          {["day", "week", "month", "year"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedPeriod === period
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalRevenue}</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalPlatformFees}</p>
              <p className="text-sm text-muted-foreground">Platform Fees</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalExpertPayouts}</p>
              <p className="text-sm text-muted-foreground">Expert Payouts</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockPayments.length}</p>
              <p className="text-sm text-muted-foreground">Transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart Placeholder - Revenue Line Chart</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment Methods</h3>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart Placeholder - Payment Methods Pie Chart</p>
          </div>
        </div>
      </div>

      {/* Payment Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-foreground">{completedPayments.length}</p>
            </div>
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">${totalRevenue}</span>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground">{pendingPayments.length}</p>
            </div>
            <div className="h-10 w-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">
                ${pendingPayments.reduce((sum, p) => sum + p.amount, 0)}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Refunded</p>
              <p className="text-2xl font-bold text-foreground">{refundedPayments.length}</p>
            </div>
            <div className="h-10 w-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">
                ${refundedPayments.reduce((sum, p) => sum + p.amount, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Latest payment transactions and their status
            </p>
          </div>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
        
        <DataTable
          data={mockPayments}
          columns={columns}
          pagination={true}
          searchable={true}
        />
      </div>

      {/* Expert Payouts Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Expert Payouts Summary</h3>
        <div className="space-y-4">
          {["Dr. Michael Chen", "Dr. Sarah Johnson"].map((expert, index) => {
            const expertPayments = mockPayments.filter(p => p.expertName === expert && p.status === "completed");
            const totalEarnings = expertPayments.reduce((sum, p) => sum + p.expertPayout, 0);
            
            return (
              <div key={expert} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{expert}</p>
                  <p className="text-sm text-muted-foreground">{expertPayments.length} completed sessions</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${totalEarnings}</p>
                  <p className="text-sm text-muted-foreground">Total earnings</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
