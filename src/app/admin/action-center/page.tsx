// app/admin/experts/page.tsx
'use client';

import { useRef, useState } from 'react';
import {
  Building2,
  Users,
  BadgeCheck,
  Send,
  CreditCard,
  LogOut,
  Search,
  ChevronDown,
  ChevronUp,
  Star,
  Briefcase,
  CheckCircle,
  Plus,
  EllipsisVertical,
  Image,
  Video,
  Edit3,
  EyeOff,
  Trash2,
  Filter,
  Phone,
  Mail,
  Calendar,
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  User,
  VideoIcon,
  EyeIcon,
  Timer,
  EyeOffIcon,
  Verified,
  Hourglass,
  MessageCircle,
  MessageCircleX,
  BadgeAlert,
  GitPullRequestDraftIcon,
  BadgeDollarSign,
  Clock,
  PauseCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SideModal } from '@/components/common/sideModal';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

// Mock data for organisations with experts
const organisationsData = [
  {
    id: 1,
    name: 'Losi Hair Cutting',
    type: 'Massage Parlour',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
    experts: [
      {
        id: 101,
        name: 'Georgina Kate',
        rating: 4.8,
        bookings: 90,
        experience: '2.8 yrs',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8900',
        email: 'georgina@losihair.com',
        specialities: ['Hair Styling', 'Color Treatment']
      },
      {
        id: 102,
        name: 'Michael Brooks',
        rating: 4.6,
        bookings: 93,
        experience: '7 yrs',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8901',
        email: 'michael@losihair.com',
        specialities: ['Men\'s Grooming', 'Beard Styling']
      },
      {
        id: 103,
        name: 'Georgina Kate',
        rating: 4.8,
        bookings: 90,
        experience: '2.8 yrs',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8900',
        email: 'georgina@losihair.com',
        specialities: ['Hair Styling', 'Color Treatment']
      },
      {
        id: 104,
        name: 'Georgina Kate',
        rating: 4.8,
        bookings: 90,
        experience: '2.8 yrs',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8900',
        email: 'georgina@losihair.com',
        specialities: ['Hair Styling', 'Color Treatment']
      },
    ]
  },
  {
    id: 2,
    name: 'Relax Massage',
    type: 'Massage Parlour',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&h=100&fit=crop',
    experts: [
      {
        id: 201,
        name: 'Amelia Levantine',
        rating: 4.9,
        bookings: 87,
        experience: '5 yrs',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8902',
        email: 'amelia@relaxmassage.com',
        specialities: ['Swedish Massage', 'Deep Tissue']
      },
      {
        id: 202,
        name: 'Sarah Johnson',
        rating: 4.7,
        bookings: 76,
        experience: '4 yrs',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop',
        verified: false,
        phone: '+1 234 567 8903',
        email: 'sarah@relaxmassage.com',
        specialities: ['Hot Stone', 'Aromatherapy']
      },
       {
        id: 203,
        name: 'Georgina Kate',
        rating: 4.8,
        bookings: 90,
        experience: '2.8 yrs',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8900',
        email: 'georgina@losihair.com',
        specialities: ['Hair Styling', 'Color Treatment']
      }

    ]
  },
  {
    id: 3,
    name: 'Bliss Spa',
    type: 'Massage Parlour',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a0b9?w=100&h=100&fit=crop',
    experts: [
      {
        id: 301,
        name: 'Michael Brooks',
        rating: 4.6,
        bookings: 93,
        experience: '7 yrs',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8904',
        email: 'michael@blisspa.com',
        specialities: ['Sports Massage', 'Cupping']
      },
      {
        id: 302,
        name: 'Emma Watson',
        rating: 4.8,
        bookings: 104,
        experience: '6 yrs',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8905',
        email: 'emma@blisspa.com',
        specialities: ['Thai Massage', 'Reflexology']
      }
    ]
  },
  {
    id: 4,
    name: 'Heaven Touch',
    type: 'Massage Parlour',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=100&h=100&fit=crop',
    experts: [
      {
        id: 401,
        name: 'Amelia Levantine',
        rating: 4.8,
        bookings: 87,
        experience: '5 yrs',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8906',
        email: 'amelia@heaventouch.com',
        specialities: ['Shiatsu', 'Chair Massage']
      }
    ]
  },
  {
    id: 5,
    name: 'Golden Hands',
    type: 'Massage Parlour',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5547?w=100&h=100&fit=crop',
    experts: [
      {
        id: 501,
        name: 'Michael Brooks',
        rating: 4.6,
        bookings: 93,
        experience: '7 yrs',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8907',
        email: 'michael@goldenhands.com',
        specialities: ['Lymphatic Drainage', 'Manual Therapy']
      }
    ]
  },
  {
    id: 6,
    name: 'Zen Body Care',
    type: 'Massage Parlour',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=100&h=100&fit=crop',
    experts: [
      {
        id: 601,
        name: 'Amelia Levantine',
        rating: 4.8,
        bookings: 87,
        experience: '5 yrs',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
        verified: true,
        phone: '+1 234 567 8908',
        email: 'amelia@zenbodycare.com',
        specialities: ['Prenatal Massage', 'Couples Massage']
      }
    ]
  }
];

export default function ExpertManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrgFilter, setSelectedOrgFilter] = useState('All Organisations');
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [openExpertDropdownId, setOpenExpertDropdownId] = useState<number | null>(null);
  const [openOrgDropdownId, setOpenOrgDropdownId] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ bottom: number; right: number } | null>(null);
    const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
   // Add this state at the top with your other useState declarations:
const [openIconDropdown, setOpenIconDropdown] = useState<string | null>(null);
const [iconDropdownPosition, setIconDropdownPosition] = useState<{ bottom: number; left: number } | null>(null);
// Add this state with your other useState declarations:
const [activeTab, setActiveTab] = useState<'requested' | 'verified'>('requested');
const [anchorEl, setAnchorEl] = useState(null);
const [activeDropdown, setActiveDropdown] = useState(null);

const handleDropdownClick = (label, event) => {
  setAnchorEl(event.currentTarget);
  setActiveDropdown(label);
};

const handleDropdownClose = () => {
  setAnchorEl(null);
  setActiveDropdown(null);
};

const handleOptionSelect = (label, option) => {
  console.log(`Selected ${option} for ${label}`);
  // Add your logic here
  handleDropdownClose();
};


// Add this helper function:
const toggleIconDropdown = (label: string, event: React.MouseEvent) => {
  const rect = event.currentTarget.getBoundingClientRect();
  
  if (openIconDropdown === label) {
    setOpenIconDropdown(null);
    setIconDropdownPosition(null);
  } else {
    // Position above the icon (centered)
    setIconDropdownPosition({
      bottom: window.innerHeight - rect.bottom - 90, // 10px above the icon
      left: rect.left + (rect.width / 2) - 60, // 96px is half of w-48 (192px/2)
    });
    setOpenIconDropdown(label);
  }
};

  // Add this filtered orgs logic (replace your existing filteredOrgs):
const filteredOrgs = organisationsData.filter(org => {
  const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        org.experts.some(expert => expert.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const matchesOrg = selectedOrgFilter === 'All Organisations' || org.name === selectedOrgFilter;
  return matchesSearch && matchesOrg;
});

const getOptionIcon = (option) => {
  switch(option) {
    case 'Show': return <EyeIcon className="h-4 w-4" />;
    case 'Hide': return <EyeOffIcon className="h-4 w-4" />;
    case 'Pending': return <Hourglass className="h-4 w-4" />;
    case 'Verified': return <CheckCircle className="h-4 w-4" />;
    default: return null;
  }
};

  return (
    <div className="flex h-full bg-gray-50 font-sans">
      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">ACTION CENTER</h2>
              <p className="text-gray-500 text-sm mt-1">Manage action items and requests</p>
            </div>
          </div>

          {/* Search and Filters Bar */}
         
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search organisations or experts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Organisation Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                <span>Filter: {selectedOrgFilter === 'All Organisations' ? 'All Orgs' : selectedOrgFilter}</span>
                {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {filterOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <div className="p-2">
                    <button
                      onClick={() => { setSelectedOrgFilter('All Organisations'); setFilterOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm"
                    >
                      All Organisations
                    </button>
                    {organisationsData.map(org => (
                      <button
                        key={org.id}
                        onClick={() => { setSelectedOrgFilter(org.name); setFilterOpen(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm"
                      >
                        {org.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <span>Sort by: Newest</span>
                {sortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {sortOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg">Newest</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50">Oldest</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg">Most Experts</button>
                </div>
              )}
            </div>
       
          </div>
        </div>

              
        {/* Organisations Grid */}
        <div className="p-8  max-h-[27rem] overflow-y-scroll ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
            {filteredOrgs.map((org) => (
            <div
                key={org.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
                {/* Organisation Header */}
                <div className="p-5 pb-3 border-b border-gray-100">
                <div className="flex items-start gap-3">
                    <img
                    src={org.image}
                    alt={org.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                        <h3 className="font-semibold text-gray-900">{org.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <Briefcase size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">{org.type}</span>
                        </div>
                        </div>
                        {/* Dropdown */}
                        <div className="flex items-center gap-2">
                        <div className="relative">
                            <EllipsisVertical 
                            size={16} 
                            className="text-gray-400 cursor-pointer hover:text-gray-600" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenOrgDropdownId(openOrgDropdownId === org.id ? null : org.id);
                            }}
                            />
                            {openOrgDropdownId === org.id && (
                            <div className="absolute right-0 top-6 z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                                <div className="px-1 py-1 text-sm text-gray-700">
                                <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                    <Clock className="mr-2 h-4 w-4" />
                                    30 minuetes pause
                                </div>
                                <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                    <PauseCircle className="mr-2 h-4 w-4" />
                                    12 hours hold
                                </div>
                                <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded text-red-600">
                                    <EyeOff className="mr-2 h-4 w-4" />
                                    Hide account
                                </div>
                                </div>
                            </div>
                            )}
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 justify-between">
                        <div className='flex items-center gap-1'>
                        <span className="flex items-center gap-1 text-xs font-medium text-green-700   py-0.5 rounded-full">
                            <CheckCircle size={10} />
                            {org.status}
                        </span>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium" onClick={()=>setShowExpertModal(true)}>
                            VIEW ORGANIZATION
                            <ChevronRight size={14} className="inline-block ml-1" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>

                {/* Horizontal Scrolling Experts List */}
                <div className="relative">
          <div className="overflow-x-auto scrollbar-hide scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="flex gap-4 p-4 min-w-min">
              {org.experts.map((expert) => (
                // <div 
                //   key={expert.id} 
                //   className="flex-shrink-0 w-40 bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                // >
                //   <div className="relative">
                //     <img
                //       src={expert.image}
                //       alt={expert.name}
                //       className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                //     />
                //   </div>
                //     <button 
                //           className="relative top-[-5rem] ml-[8rem] text-center text-xs text-gray-500 hover:text-gray-700"
                //           onClick={(e) => {

                //           //   e.stopPropagation();
                //             setOpenExpertDropdownId(openExpertDropdownId === expert.id ? null : expert.id);
                //           }}
                //         >
                //           <EllipsisVertical size={14} className="mx-auto" />
                //         </button>
                //         {openExpertDropdownId === expert.id && (
                //         <div className="absolute right-0 top-10 z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                //           <div className="px-1 py-1 text-sm text-gray-700">
                //             <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                //               <Edit3 className="mr-2 h-4 w-4" />
                //               Edit Profile
                //             </div>
                //             <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                //               <Eye className="mr-2 h-4 w-4" />
                //               View Profile
                //             </div>
                //             <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                //               <User className="mr-2 h-4 w-4" />
                //               Change DP
                //             </div>
                //             <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                //               <VideoIcon className="mr-2 h-4 w-4" />
                //               Change Video
                //             </div>
                //             <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                //               <VideoIcon className="mr-2 h-4 w-4" />
                //               Change Timings
                //             </div>
                //             <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded">
                //               <VideoIcon className="mr-2 h-4 w-4" />
                //               Booking Details
                //             </div>
                //             <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded text-red-600">
                //               <Trash2 className="mr-2 h-4 w-4" />
                //               Delete Organisation
                //             </div>
                //           </div>
                //         </div>
                //       )}
                //   <h4 className="font-medium text-gray-900 text-sm text-center truncate" 
                //    onClick={() => {
                //     setSelectedExpert({ ...expert, organisation: org.name, organisationImage: org.image });
                //     setShowExpertModal(true);
                //   }}
                //   >
                //     {expert.name}
                //   </h4>
                //   <div className="flex items-center justify-center gap-2 mt-1">
                //     <div className="flex items-center gap-0.5">
                //       <Star size={10} className="text-yellow-500 fill-yellow-500" />
                //       <span className="text-xs font-medium">{expert.rating}</span>
                //     </div>
                //     <span className="text-xs text-gray-500">{expert.bookings}</span>
                //     <span className="text-xs text-gray-500">{expert.experience}</span>
                //   </div>

                // </div>
                <div 
  key={expert.id} 
  className="flex-shrink-0 w-40 bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer relative"
>
  <div className="relative mb-2">
    <img
      src={expert.image}
      alt={expert.name}
      className="w-16 h-16 rounded-full object-cover mx-auto"
    />
    <button 
      ref={(el) => {
        buttonRefs.current[expert.id] = el;
      }}
      className="absolute -top-2 -right-2 text-center text-xs text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10"
    >
      <Trash2 size={14}/>
    </button>

    <button 
      ref={(el) => {
        buttonRefs.current[expert.id] = el;
      }}
      className="absolute -top-2 -right-[-1rem] text-center text-xs text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10"
    >
      <Eye size={14} />
    </button>
  </div>
  
  {openExpertDropdownId === expert.id && dropdownPosition && (
    <>
      {/* Backdrop to close dropdown when clicking outside */}
      <div 
        className="fixed inset-0 z-40"
        onClick={(e) => {
          e.stopPropagation();
          setOpenExpertDropdownId(null);
          setDropdownPosition(null);
        }}
      />
      <div 
        className="fixed z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1"
        style={{
          bottom: `${dropdownPosition.bottom}px`,
          right: `${dropdownPosition.right}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-1 text-sm text-gray-700">
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Edit3 className="mr-3 h-4 w-4" />
            Edit Profile
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Eye className="mr-3 h-4 w-4" />
            View Profile
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <User className="mr-3 h-4 w-4" />
            Change DP
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <VideoIcon className="mr-3 h-4 w-4" />
            Change Video
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <VideoIcon className="mr-3 h-4 w-4" />
            Change Timings
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <VideoIcon className="mr-3 h-4 w-4" />
            Booking Details
          </div>
          <div className="border-t border-gray-100 mt-1 pt-1">
            <div className="flex items-center px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600">
              <Trash2 className="mr-3 h-4 w-4" />
              Delete Expert
            </div>
          </div>
        </div>
      </div>
    </>
  )}
  
  <h4 className="font-medium text-gray-900 text-sm text-center truncate mt-2 hover:text-blue-600"
  onClick={() => {
                    setSelectedExpert({ ...expert, organisation: org.name, organisationImage: org.image });
                    setShowExpertModal(true);
                  }}
  >
    {expert.name}
  </h4>
  <div className="flex items-center justify-center gap-2 mt-1">
    <div className="flex items-center gap-0.5">
      <Star size={10} className="text-yellow-500 fill-yellow-500" />
      <span className="text-xs font-medium">{expert.rating}</span>
    </div>
    <span className="text-xs text-gray-500">{expert.bookings}</span>
    <span className="text-xs text-gray-500">{expert.experience}</span>
  </div>
</div>
              ))}
            </div>
          </div>
          
          {/* Left/Right Scroll Buttons - only show if more than 2 experts */}
          {org.experts.length > 2 && (
            <>
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-1 border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const container = e.currentTarget.parentElement?.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollBy({ left: -200, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-1 border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const container = e.currentTarget.parentElement?.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollBy({ left: 200, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </>
          )}
        </div>

                {/* dropdown menu for expert actions (mail, visibility, status) */}
                <div className="p-5 pb-3 border-t    border-gray-100">
                    <div className="flex items-center justify-between gap-3 mt-1 relative">
                        {[
                        { icon: BadgeDollarSign, label: "Request Refund",color: 'text-red-500' },
                        { icon: MessageCircleX, label: "Hold Message", color: 'text-yellow-500' },
                        { icon: BadgeAlert, label: "Hold Account", color: 'text-orange-500' },
                        ].map(({ icon: Icon, label, color }) => (
                        <div key={label} className="relative flex flex-col items-center group">
                            <div 
                            className='flex items-center gap-2 bg-gray-200 p-1 rounded cursor-pointer hover:bg-gray-300 transition-colors'
                            
                            >
                            <Icon className={`h-4 w-4 ${color}`} />
                            <p className={`text-[10px] text-${color.split('-')[1]}-500`}>{label}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>


            </div>
            ))}
        </div>
        </div>

{/* Add ChevronLeft import at the top with other icons */}
      </main>

      {/* Expert Profile Side Modal */}
<SideModal 
  isOpen={showExpertModal} 
  onClose={() => setShowExpertModal(false)}
  width="w-[450px]"
>
  {selectedExpert ? (
    <>
      {/* Expert Profile Header */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <img
            src={selectedExpert.image}
            alt={selectedExpert.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow-md"
          />
          {selectedExpert.verified && (
            <div className="absolute bottom-2 right-0 bg-blue-500 rounded-full p-1">
              <CheckCircle size={12} className="text-white" />
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{selectedExpert.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{selectedExpert.organisation}</p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{selectedExpert.rating}</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-600">{selectedExpert.bookings} bookings</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-600">{selectedExpert.experience}</span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} />
            <span>{selectedExpert.phone || '+1 234 567 8900'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} />
            <span>{selectedExpert.email || 'expert@example.com'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={14} />
            <span>Experience: {selectedExpert.experience}</span>
          </div>
        </div>
      </div>

      {/* Specialities */}
      {selectedExpert.specialities && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialities</h4>
          <div className="flex flex-wrap gap-2">
            {selectedExpert.specialities.map((spec: string, idx: number) => (
              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{selectedExpert.bookings}</p>
          <p className="text-xs text-gray-500">Total Bookings</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">4.8</p>
          <p className="text-xs text-gray-500">Avg Rating</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
          <Image size={16} />
          Change Profile Picture
        </button>
        <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
          <Video size={16} />
          Change Intro Video
        </button>
        <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
          <Edit3 size={16} />
          Edit Profile Details
        </button>
        <button className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
          <Trash2 size={16} />
          Delete Expert
        </button>
      </div>
    </>
  ) : (
    // Organization UI when no expert is selected
    <>
      {/* Organization Header */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <img
            src={selectedExpert?.organisationImage || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop'}
            alt="Organization"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow-md"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{selectedExpert?.organisation || 'Organization Name'}</h3>
        <p className="text-sm text-gray-500 mt-1">Massage Parlour</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
            <CheckCircle size={10} />
            Active
          </span>
        </div>
      </div>

      {/* Organization Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-gray-800">12</p>
          <p className="text-xs text-gray-500">Total Experts</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-gray-800">4.7</p>
          <p className="text-xs text-gray-500">Avg Rating</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-gray-800">1.2k</p>
          <p className="text-xs text-gray-500">Total Bookings</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} />
            <span>+1 234 567 8900</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} />
            <span>contact@organization.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 size={14} />
            <span>123 Main Street, New York, NY 10001</span>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Business Hours</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Monday - Friday:</span>
            <span>9:00 AM - 9:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday:</span>
            <span>10:00 AM - 8:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday:</span>
            <span>11:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Action Buttons for Organization */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
          <Building2 size={16} />
          Edit Organization Details
        </button>
        <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
          <Users size={16} />
          Manage Experts
        </button>
        <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
          <Image size={16} />
          Change Organization Image
        </button>
        <button className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
          <Trash2 size={16} />
          Delete Organization
        </button>
      </div>
    </>
  )}
</SideModal>


    </div>
  );
}