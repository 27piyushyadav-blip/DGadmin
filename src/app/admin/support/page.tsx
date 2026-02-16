"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Send, Search, Book, Video, Download, ExternalLink, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("knowledge");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "knowledge", label: "Knowledge Base", icon: Book },
    { id: "tickets", label: "Support Tickets", icon: MessageSquare },
    { id: "contact", label: "Contact Support", icon: Phone },
    { id: "resources", label: "Resources", icon: Download }
  ];

  const knowledgeBaseArticles = [
    {
      id: "1",
      title: "Getting Started with Admin Panel",
      category: "Getting Started",
      description: "Learn the basics of navigating and using the admin panel effectively.",
      readTime: "5 min read",
      difficulty: "Beginner"
    },
    {
      id: "2",
      title: "Managing Expert Applications",
      category: "Expert Management",
      description: "Complete guide on reviewing, approving, and managing expert applications.",
      readTime: "8 min read",
      difficulty: "Intermediate"
    },
    {
      id: "3",
      title: "Payment Processing & Refunds",
      category: "Billing",
      description: "Understanding payment workflows, refunds, and billing management.",
      readTime: "10 min read",
      difficulty: "Advanced"
    }
  ];

  const supportTickets = [
    {
      id: "TKT-001",
      subject: "Expert verification issue",
      category: "Expert Management",
      status: "open",
      priority: "high",
      createdAt: "2024-01-20 14:30:22",
      lastUpdate: "2024-01-20 15:45:10",
      assignedTo: "Support Team"
    },
    {
      id: "TKT-002",
      subject: "Payment gateway integration",
      category: "Billing",
      status: "in_progress",
      priority: "medium",
      createdAt: "2024-01-19 10:15:33",
      lastUpdate: "2024-01-20 09:30:45",
      assignedTo: "John Doe"
    },
    {
      id: "TKT-003",
      subject: "User reporting login issues",
      category: "Technical",
      status: "resolved",
      priority: "low",
      createdAt: "2024-01-18 16:20:15",
      lastUpdate: "2024-01-19 11:45:30",
      assignedTo: "Sarah Johnson"
    }
  ];

  const resources = [
    {
      title: "Admin Handbook",
      description: "Comprehensive guide for admin users",
      type: "PDF",
      size: "2.4 MB",
      downloadUrl: "#"
    },
    {
      title: "API Documentation",
      description: "Complete API reference and examples",
      type: "Web",
      size: "Online",
      downloadUrl: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      type: "Video",
      size: "45 min total",
      downloadUrl: "#"
    }
  ];

  const filteredArticles = knowledgeBaseArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground mt-2">
          Get help, find answers, and contact our support team
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{knowledgeBaseArticles.length}</p>
              <p className="text-sm text-muted-foreground">Knowledge Articles</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{supportTickets.filter(t => t.status === "resolved").length}</p>
              <p className="text-sm text-muted-foreground">Resolved Tickets</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{supportTickets.filter(t => t.status === "open").length}</p>
              <p className="text-sm text-muted-foreground">Open Tickets</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card rounded-lg border border-border">
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Knowledge Base Tab */}
          {activeTab === "knowledge" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Knowledge Base</h3>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">{article.title}</h4>
                          <Badge className={getDifficultyColor(article.difficulty)}>
                            {article.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Support Tickets Tab */}
          {activeTab === "tickets" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Support Tickets</h3>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Create Ticket
                </button>
              </div>

              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{ticket.category}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created: {ticket.createdAt}</span>
                          <span>•</span>
                          <span>Updated: {ticket.lastUpdate}</span>
                          <span>•</span>
                          <span>Assigned to: {ticket.assignedTo}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Support Tab */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Contact Support</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border rounded-lg p-6 text-center">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Phone Support</h4>
                  <p className="text-sm text-muted-foreground mb-4">Get immediate help from our support team</p>
                  <p className="font-medium">+1 (800) 123-4567</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                </div>

                <div className="border border-border rounded-lg p-6 text-center">
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Email Support</h4>
                  <p className="text-sm text-muted-foreground mb-4">Send us an email and we'll respond within 24 hours</p>
                  <p className="font-medium">support@digitaloffices.com</p>
                  <p className="text-xs text-muted-foreground">Response time: 24 hours</p>
                </div>

                <div className="border border-border rounded-lg p-6 text-center">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Video className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Live Chat</h4>
                  <p className="text-sm text-muted-foreground mb-4">Chat with our support team in real-time</p>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Start Chat
                  </button>
                  <p className="text-xs text-muted-foreground mt-2">Available 24/7</p>
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Resources & Downloads</h3>
              
              <div className="grid gap-4">
                {resources.map((resource, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                        {resource.type === "PDF" && <Download className="h-5 w-5 text-primary-foreground" />}
                        {resource.type === "Web" && <ExternalLink className="h-5 w-5 text-primary-foreground" />}
                        {resource.type === "Video" && <Video className="h-5 w-5 text-primary-foreground" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <p className="text-xs text-muted-foreground">{resource.size}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                      {resource.type === "Web" ? (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          Open
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
