"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTableProps, TableColumn } from "@/types/admin";

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  searchable = true,
  pagination = true
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string; label: string }> = {
      active: { className: "border-transparent bg-green-500 text-white", label: "Active" },
      suspended: { className: "border-transparent bg-red-500 text-white", label: "Suspended" },
      pending: { className: "border-transparent bg-yellow-500 text-black", label: "Pending" },
      verified: { className: "border-transparent bg-green-500 text-white", label: "Verified" },
      rejected: { className: "border-transparent bg-red-500 text-white", label: "Rejected" },
      completed: { className: "border-transparent bg-green-500 text-white", label: "Completed" },
      cancelled: { className: "border-transparent bg-red-500 text-white", label: "Cancelled" },
      online: { className: "border-transparent bg-primary text-primary-foreground", label: "Online" },
      offline: { className: "border-transparent bg-secondary text-secondary-foreground", label: "Offline" },
      ended: { className: "border-transparent bg-secondary text-secondary-foreground", label: "Ended" }
    };

    const config = statusConfig[status.toLowerCase()] || { className: "text-foreground", label: status };
    return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.className}`}>{config.label}</span>;
  };

  const renderCellContent = (column: TableColumn<T>, row: T) => {
    const value = row[column.key];

    // Handle specific column rendering logic here
    switch (column.key as string) {
      case "type":
        return (
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
            value === "online"
              ? "border-transparent bg-primary text-primary-foreground"
              : "border-transparent bg-secondary text-secondary-foreground"
          }`}>
            {value}
          </span>
        );
      case "name":
        return `${(row as any).userName} with ${(row as any).expertName}`;
      case "action":
        return (
          <span className="text-sm text-muted-foreground">
            {(row as any).type === "online" ? "Video Consultation" : "In-Person Meeting"}
          </span>
        );
      case "time":
        return (
          <span className="text-sm">
            {(row as any).date} at {(row as any).time}
          </span>
        );
      case "status":
        return getStatusBadge(value as string);
      case "documents":
        // Handle documents array
        if (Array.isArray(value)) {
          return (
            <span className="text-sm text-muted-foreground">
              {value.length} document{value.length !== 1 ? 's' : ''}
            </span>
          );
        }
        return <span className="text-sm text-muted-foreground">No documents</span>;
      case "specialization":
        // Handle specialization array
        if (Array.isArray(value)) {
          return (
            <span className="text-sm">
              {value.join(', ')}
            </span>
          );
        }
        break;
      default:
        // Convert objects to strings or display appropriate fallback
        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            return <span className="text-sm text-muted-foreground">{value.length} items</span>;
          }
          return <span className="text-sm text-muted-foreground">Object data</span>;
        }
        return <span className="text-sm">{value}</span>;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {searchable && (
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className="text-left p-4 font-medium text-sm text-muted-foreground"
                >
                  {column.label}
                </th>
              ))}
              {actions && <th className="text-left p-4 font-medium text-sm text-muted-foreground">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="border-b border-border hover:bg-accent/50 transition-colors">
                {columns.map((column) => (
                  <td key={column.key as string} className="p-4">
                    <div className="text-sm">
                      {renderCellContent(column, row)}
                    </div>
                  </td>
                ))}
                {actions && (
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
