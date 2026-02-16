# DigitalOffices Admin Panel

A modern, responsive admin dashboard for managing the DigitalOffices consultancy platform.

## Features

- **Dashboard Overview**: Real-time statistics and activity monitoring
- **Expert Management**: Verification, approval, and profile management
- **Organization Management**: Organization verification and oversight
- **User Management**: User account management and suspension
- **Booking Management**: Monitor and manage all platform bookings
- **Live Session Monitoring**: Real-time session tracking
- **Revenue Analytics**: Financial insights and reporting
- **Profile Change Requests**: Review and approve profile modifications

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks (client-side only)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the admin directory:
```bash
cd apps/admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3004](http://localhost:3004) in your browser.

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout wrapper
│   │   ├── page.tsx            # Dashboard page
│   │   └── experts/
│   │       ├── pending/        # Pending expert verifications
│   │       └── changes/        # Profile change requests
│   ├── globals.css            # Global styles and theme
│   └── layout.tsx            # Root layout
├── components/
│   ├── admin/
│   │   ├── sidebar.tsx        # Navigation sidebar
│   │   ├── topbar.tsx         # Header with search
│   │   ├── stat-card.tsx      # Statistics cards
│   │   ├── data-table.tsx     # Reusable data table
│   │   ├── drawer.tsx         # Slide-out drawer component
│   │   └── profile-comparison-card.tsx  # Change comparison
│   └── ui/
│       └── badge.tsx          # Badge component
├── data/
│   └── mock-data.ts           # Sample data for development
├── lib/
│   └── utils.ts               # Utility functions
└── types/
    └── admin.ts               # TypeScript type definitions
```

## Key Components

### Sidebar Navigation
- Collapsible sidebar with nested menu structure
- Active route highlighting
- Responsive design (auto-collapses on mobile)

### Data Table
- Generic, reusable table component
- Built-in search functionality
- Pagination support
- Status badge rendering
- Custom action buttons

### Profile Comparison
- Visual diff display for profile changes
- Field-by-field approval/rejection
- Clear old vs new value presentation

### Drawer Component
- Slide-out panel for detailed views
- Multiple size options
- Keyboard navigation support
- Backdrop click to close

## Theme & Styling

The admin panel uses a consistent design system:

- **Primary Color**: Indigo (Professional, trustworthy)
- **Success Color**: Green (Approved status)
- **Warning Color**: Yellow (Pending status)
- **Danger Color**: Red (Rejected/Suspended status)
- **Background**: Light gray with dark mode support

## Pages

### Dashboard (`/admin`)
- Statistics grid with key metrics
- Chart placeholders for analytics
- Recent activity table

### Expert Management
- **All Experts**: Complete expert listing
- **Pending Verification**: Experts awaiting approval
- **Verified Experts**: Approved experts
- **Rejected Experts**: Declined applications
- **Profile Change Requests**: Expert profile modifications

### Organization Management
- **All Organizations**: Complete organization listing
- **Pending Verification**: Organizations awaiting approval
- **Profile Change Requests**: Organization modifications

### User Management
- **All Users**: Complete user listing
- **Active Users**: Currently active accounts
- **Suspended Users**: Suspended accounts

### Bookings
- **All Bookings**: Complete booking history
- **Online**: Virtual consultations
- **Offline**: In-person meetings
- **Completed**: Finished sessions
- **Cancelled**: Cancelled appointments

### Live Sessions
- Real-time active session monitoring
- Session duration tracking
- Participant information

### Payments & Revenue
- Financial overview
- Transaction history
- Revenue analytics

### Reports & Disputes
- Platform reports
- Dispute resolution
- Compliance monitoring

## Mock Data

The application includes comprehensive mock data for:
- Dashboard statistics
- Expert profiles and documents
- Organization details
- User accounts
- Booking records
- Live sessions
- Profile change requests

## Development Notes

- No backend integration (UI only)
- All data is mocked/static
- No authentication logic
- Responsive design for all screen sizes
- TypeScript strict mode enabled
- Component-based architecture
- Reusable UI components

## Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Port Configuration

The admin panel runs on port **3004** to avoid conflicts with other applications:
- Client app: 3002
- Expert app: 3003
- Admin app: 3004

## Future Enhancements

- Real API integration
- Authentication system
- Real-time updates with WebSockets
- Advanced filtering and sorting
- Export functionality
- Role-based access control
- Audit logging
- Email notifications
