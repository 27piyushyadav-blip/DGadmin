export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended';
  createdAt: string;
  lastLogin: string;
}

export interface Expert {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  bio: string;
  specialization: string[];
  documents: Document[];
  status: 'pending' | 'verified' | 'rejected';
  organization?: string;
  createdAt: string;
  requestDate: string;
}

export interface Organization {
  id: string;
  orgId?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location?: string;
  description: string;
  logo?: string;
  introVideo?: string;
  documents: Document[];
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  submittedAt?: string;
  joinedAt?: string;
  requestDate: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  expertId: string;
  expertName: string;
  userName: string;
  type: 'online' | 'offline';
  status: 'completed' | 'cancelled' | 'pending';
  date: string;
  time: string;
  duration: number;
  amount: number;
}

export interface LiveSession {
  id: string;
  expertId: string;
  expertName: string;
  userId: string;
  userName: string;
  startTime: string;
  duration: number;
  status: 'active' | 'ended';
}

export interface VerificationRequest {
  id: string;
  type: 'expert' | 'organization';
  entityId: string;
  entityName: string;
  changes: ProfileChange[];
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ProfileChange {
  field: string;
  oldValue: string;
  newValue: string;
}

export interface Revenue {
  today: number;
  thisMonth: number;
  thisYear: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalExperts: number;
  totalOrganizations: number;
  totalBookings: number;
  pendingVerifications: number;
  revenueToday: number;
  revenueThisMonth: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  children?: MenuItem[];
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: (row: T) => React.ReactNode;
  searchable?: boolean;
  pagination?: boolean;
}
