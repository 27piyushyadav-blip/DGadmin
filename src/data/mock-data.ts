import { DashboardStats, Expert, Organization, User, Booking, LiveSession, VerificationRequest } from "@/types/admin";

export const mockDashboardStats: DashboardStats = {
  totalUsers: 1248,
  totalExperts: 89,
  totalOrganizations: 23,
  totalBookings: 3421,
  pendingVerifications: 12,
  revenueToday: 8450,
  revenueThisMonth: 156780
};

export const mockExperts: Expert[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 234-567-8901",
    experience: "10+ years in clinical psychology",
    bio: "Specialized in anxiety and depression treatment",
    specialization: ["Clinical Psychology", "Anxiety", "Depression"],
    documents: [
      { id: "doc1", name: "Medical License", type: "PDF", url: "#", uploadedAt: "2024-01-15" },
      { id: "doc2", name: "Certification", type: "PDF", url: "#", uploadedAt: "2024-01-15" }
    ],
    status: "pending",
    organization: "Mind Health Clinic",
    createdAt: "2024-01-10",
    requestDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 234-567-8902",
    experience: "8+ years in business consulting",
    bio: "Expert in organizational development and leadership",
    specialization: ["Business Consulting", "Leadership", "Organizational Development"],
    documents: [
      { id: "doc3", name: "MBA Certificate", type: "PDF", url: "#", uploadedAt: "2024-01-12" }
    ],
    status: "verified",
    createdAt: "2023-12-01",
    requestDate: "2023-12-01"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "+1 234-567-8903",
    experience: "5+ years in financial planning",
    bio: "Helping individuals and businesses with financial strategies",
    specialization: ["Financial Planning", "Investment", "Tax Planning"],
    documents: [
      { id: "doc4", name: "CFA Certificate", type: "PDF", url: "#", uploadedAt: "2024-01-08" }
    ],
    status: "rejected",
    createdAt: "2024-01-05",
    requestDate: "2024-01-08"
  }
];

export const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Mind Health Clinic",
    email: "contact@mindhealth.com",
    phone: "+1 234-567-8900",
    address: "123 Health St, Medical City, MC 12345",
    description: "Comprehensive mental health services for individuals and families",
    documents: [
      { id: "org1", name: "Business License", type: "PDF", url: "#", uploadedAt: "2024-01-10" },
      { id: "org2", name: "Insurance Certificate", type: "PDF", url: "#", uploadedAt: "2024-01-10" }
    ],
    status: "pending",
    createdAt: "2024-01-05",
    requestDate: "2024-01-10"
  },
  {
    id: "2",
    name: "Business Solutions Inc",
    email: "info@businesssolutions.com",
    phone: "+1 234-567-8901",
    address: "456 Business Ave, Corporate City, CC 67890",
    description: "Strategic business consulting and advisory services",
    documents: [
      { id: "org3", name: "Registration Certificate", type: "PDF", url: "#", uploadedAt: "2023-12-15" }
    ],
    status: "verified",
    createdAt: "2023-11-01",
    requestDate: "2023-12-15"
  }
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-20"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "suspended",
    createdAt: "2023-12-15",
    lastLogin: "2024-01-10"
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    status: "active",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-19"
  }
];

export const mockBookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    expertId: "2",
    expertName: "Dr. Michael Chen",
    userName: "John Doe",
    type: "online",
    status: "completed",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: 60,
    amount: 150
  },
  {
    id: "2",
    userId: "2",
    expertId: "1",
    expertName: "Dr. Sarah Johnson",
    userName: "Jane Smith",
    type: "offline",
    status: "cancelled",
    date: "2024-01-19",
    time: "2:00 PM",
    duration: 45,
    amount: 120
  },
  {
    id: "3",
    userId: "3",
    expertId: "2",
    expertName: "Dr. Michael Chen",
    userName: "Bob Wilson",
    type: "online",
    status: "pending",
    date: "2024-01-22",
    time: "11:00 AM",
    duration: 60,
    amount: 150
  }
];

export const mockLiveSessions: LiveSession[] = [
  {
    id: "1",
    expertId: "2",
    expertName: "Dr. Michael Chen",
    userId: "1",
    userName: "John Doe",
    startTime: "2024-01-20T10:00:00Z",
    duration: 45,
    status: "active"
  },
  {
    id: "2",
    expertId: "1",
    expertName: "Dr. Sarah Johnson",
    userId: "3",
    userName: "Bob Wilson",
    startTime: "2024-01-19T14:00:00Z",
    duration: 60,
    status: "ended"
  }
];

export const mockVerificationRequests: VerificationRequest[] = [
  {
    id: "1",
    type: "expert",
    entityId: "1",
    entityName: "Dr. Sarah Johnson",
    changes: [
      {
        field: "bio",
        oldValue: "Specialized in anxiety treatment",
        newValue: "Specialized in anxiety and depression treatment with cognitive behavioral therapy"
      },
      {
        field: "experience",
        oldValue: "8+ years in clinical psychology",
        newValue: "10+ years in clinical psychology"
      }
    ],
    requestedAt: "2024-01-18",
    status: "pending"
  },
  {
    id: "2",
    type: "organization",
    entityId: "1",
    entityName: "Mind Health Clinic",
    changes: [
      {
        field: "description",
        oldValue: "Mental health services",
        newValue: "Comprehensive mental health services for individuals and families including therapy, counseling, and psychiatric care"
      }
    ],
    requestedAt: "2024-01-17",
    status: "pending"
  }
];
