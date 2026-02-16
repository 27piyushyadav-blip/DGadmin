import { StatCard } from "@/components/admin/stat-card";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";
import { mockDashboardStats, mockBookings } from "@/data/mock-data";
import type { TableColumn } from "@/types/admin";

const recentActivity = mockBookings.slice(0, 5);

const columns: TableColumn<any>[] = [
  { key: "type", label: "Type" },
  { key: "name", label: "Name" },
  { key: "action", label: "Action" },
  { key: "time", label: "Time" },
  { key: "status", label: "Status" }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the DigitalOffices Admin Panel
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={mockDashboardStats.totalUsers.toLocaleString()}
          change={{ value: "+12% from last month", trend: "up" }}
          icon={Users}
        />
        <StatCard
          title="Total Experts"
          value={mockDashboardStats.totalExperts.toLocaleString()}
          change={{ value: "+8% from last month", trend: "up" }}
          icon={UserCheck}
        />
        <StatCard
          title="Total Organizations"
          value={mockDashboardStats.totalOrganizations.toLocaleString()}
          change={{ value: "+15% from last month", trend: "up" }}
          icon={Building2}
        />
        <StatCard
          title="Total Bookings"
          value={mockDashboardStats.totalBookings.toLocaleString()}
          change={{ value: "+23% from last month", trend: "up" }}
          icon={Calendar}
        />
        <StatCard
          title="Pending Verifications"
          value={mockDashboardStats.pendingVerifications}
          change={{ value: "Requires attention", trend: "neutral" }}
          icon={Clock}
        />
        <StatCard
          title="Revenue Today"
          value={`$${mockDashboardStats.revenueToday.toLocaleString()}`}
          change={{ value: "+5% from yesterday", trend: "up" }}
          icon={DollarSign}
        />
        <StatCard
          title="Revenue This Month"
          value={`$${mockDashboardStats.revenueThisMonth.toLocaleString()}`}
          change={{ value: "+18% from last month", trend: "up" }}
          icon={TrendingUp}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Booking Trends</h3>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart Placeholder - Booking Trends Line Chart</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Chart</h3>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart Placeholder - Revenue Bar Chart</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Online vs Offline Bookings</h3>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart Placeholder - Pie Chart</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Expert Categories</h3>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart Placeholder - Category Distribution</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Latest bookings and activities on the platform
          </p>
        </div>

        <DataTable
          data={recentActivity}
          columns={columns}
          pagination={false}
          searchable={false}
        />
      </div>
    </div>
  );
}
