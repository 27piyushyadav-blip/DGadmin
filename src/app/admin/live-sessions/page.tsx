"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Drawer } from "@/components/admin/drawer";
import { Badge } from "@/components/ui/badge";
import { Eye, MonitorSpeaker, Users, Clock, Play, Square, Phone } from "lucide-react";
import { mockLiveSessions } from "@/data/mock-data";
import type { TableColumn, LiveSession } from "@/types/admin";

const columns: TableColumn<LiveSession>[] = [
  {
    key: "expertName",
    label: "Expert"
  },
  {
    key: "userName",
    label: "User"
  },
  {
    key: "startTime",
    label: "Start Time"
  },
  {
    key: "duration",
    label: "Duration",
    render: (value: number) => `${value} min`
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusColors = {
        active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-800",
        ended: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-800"
      };
      return (
        <Badge className={statusColors[value as keyof typeof statusColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
  }
];

export default function LiveSessionsPage() {
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleView = (session: LiveSession) => {
    setSelectedSession(session);
    setIsDrawerOpen(true);
  };

  const handleJoin = (session: LiveSession) => {
    console.log("Joining session:", session.id);
  };

  const handleEnd = (session: LiveSession) => {
    console.log("Ending session:", session.id);
  };

  const handleCall = (session: LiveSession) => {
    console.log("Calling participant:", session.userName);
  };

  const renderActions = (session: LiveSession) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(session)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleCall(session)}
        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
        title="Call Participant"
      >
        <Phone className="h-4 w-4" />
      </button>
      {session.status === "active" && (
        <>
          <button
            onClick={() => handleJoin(session)}
            className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 transition-colors"
            title="Join Session"
          >
            <Play className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEnd(session)}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
            title="End Session"
          >
            <Square className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );

  const activeSessions = mockLiveSessions.filter(session => session.status === "active");
  const endedSessions = mockLiveSessions.filter(session => session.status === "ended");
  const totalDuration = mockLiveSessions.reduce((sum, session) => sum + session.duration, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Live Sessions</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and manage live consultation sessions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <MonitorSpeaker className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeSessions.length}</p>
              <p className="text-sm text-muted-foreground">Active Now</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockLiveSessions.length}</p>
              <p className="text-sm text-muted-foreground">Total Today</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalDuration}m</p>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{endedSessions.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={mockLiveSessions}
        columns={columns}
        actions={renderActions}
      />

      {/* Session Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Session Details"
        size="lg"
      >
        {selectedSession && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Session ID</p>
                  <p className="font-medium">{selectedSession.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{selectedSession.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expert</p>
                  <p className="font-medium">{selectedSession.expertName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User</p>
                  <p className="font-medium">{selectedSession.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Time</p>
                  <p className="font-medium">{selectedSession.startTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedSession.duration} minutes</p>
                </div>
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
                  <p className="text-sm text-muted-foreground">Latency</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">12ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Participants</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedSession.expertName}</p>
                      <p className="text-xs text-muted-foreground">Expert • Host</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedSession.userName}</p>
                      <p className="text-xs text-muted-foreground">User • Participant</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
              </div>
            </div>

            {/* Session Controls */}
            {selectedSession.status === "active" && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Session Controls</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleJoin(selectedSession)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Join Session
                  </button>
                  <button
                    onClick={() => handleEnd(selectedSession)}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Square className="h-4 w-4" />
                    End Session
                  </button>
                </div>
              </div>
            )}

            {/* Recording */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Recording</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Recording</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedSession.status === "active" ? "Recording in progress..." : "Recording available"}
                    </p>
                  </div>
                  {selectedSession.status === "ended" && (
                    <button className="text-sm text-primary hover:underline">
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={() => handleCall(selectedSession)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Call Participant
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                View Chat History
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Session Notes
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
