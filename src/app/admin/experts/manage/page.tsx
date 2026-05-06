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
  VideoIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SideModal } from '@/components/common/sideModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

// Mock data for organisations with experts
const organisationsData = [
  {
    id: 1,
    name: 'Losi Hair Cutting',
    type: 'Massage Parlour',
    status: 'Active',
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
    status: 'Active',
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
const [showEditExpertDialog, setShowEditExpertDialog] = useState(false);
const [showViewExpertDialog, setShowViewExpertDialog] = useState(false);
const [showChangeExpertDPDialog, setShowChangeExpertDPDialog] = useState(false);
const [showChangeExpertVideoDialog, setShowChangeExpertVideoDialog] = useState(false);
const [showChangeTimingsDialog, setShowChangeTimingsDialog] = useState(false);
const [showBookingDetailsDialog, setShowBookingDetailsDialog] = useState(false);
const [showDeleteExpertDialog, setShowDeleteExpertDialog] = useState(false);

// Organization dialogs
const [showEditOrgDialog, setShowEditOrgDialog] = useState(false);
const [showDeleteOrgDialog, setShowDeleteOrgDialog] = useState(false);

// Form states
const [expertFormData, setExpertFormData] = useState({
  name: '',
  phone: '',
  email: '',
  experience: '',
  specialities: [] as string[],
  rating: '',
  bookings: '',
  about: ''
});
const [tempSpeciality, setTempSpeciality] = useState('');
const [selectedExpertFile, setSelectedExpertFile] = useState<File | null>(null);
const [selectedExpertVideo, setSelectedExpertVideo] = useState<File | null>(null);
const [orgFormData, setOrgFormData] = useState({
  name: '',
  type: '',
  phone: '',
  email: '',
  address: ''
});

// Working hours state
const [workingHours, setWorkingHours] = useState({
  monday: { start: '09:00', end: '18:00', active: true },
  tuesday: { start: '09:00', end: '18:00', active: true },
  wednesday: { start: '09:00', end: '18:00', active: true },
  thursday: { start: '09:00', end: '18:00', active: true },
  friday: { start: '09:00', end: '18:00', active: true },
  saturday: { start: '10:00', end: '16:00', active: true },
  sunday: { start: '10:00', end: '14:00', active: false },
});

// Booking details mock data
const [bookingDetails] = useState([
  { id: 1, date: '2024-03-20', time: '10:00 AM', customer: 'John Doe', service: 'Hair Cut', amount: '$49', status: 'Completed' },
  { id: 2, date: '2024-03-19', time: '02:30 PM', customer: 'Jane Smith', service: 'Color Treatment', amount: '$99', status: 'Completed' },
  { id: 3, date: '2024-03-18', time: '11:00 AM', customer: 'Mike Johnson', service: 'Styling', amount: '$79', status: 'Cancelled' },
  { id: 4, date: '2024-03-21', time: '03:00 PM', customer: 'Sarah Williams', service: 'Hair Cut', amount: '$49', status: 'Upcoming' },
]);

  // Filter organisations
  const filteredOrgs = organisationsData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.experts.some(expert => expert.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesOrg = selectedOrgFilter === 'All Organisations' || org.name === selectedOrgFilter;
    return matchesSearch && matchesOrg;
  });

  const handleEditProfile = () => {
  if (selectedExpert) {
    setExpertFormData({
      name: selectedExpert.name || '',
      phone: selectedExpert.phone || '',
      email: selectedExpert.email || '',
      experience: selectedExpert.experience || '',
      specialities: selectedExpert.specialities || [],
      rating: selectedExpert.rating?.toString() || '',
      bookings: selectedExpert.bookings?.toString() || '',
      about: selectedExpert.about || 'Professional expert with years of experience in the beauty industry.'
    });
  }
  setOpenExpertDropdownId(null);
  setShowEditExpertDialog(true);
};

const handleViewProfile = () => {
  setOpenExpertDropdownId(null);
  setShowViewExpertDialog(true);
};

const handleChangeDP = () => {
  setOpenExpertDropdownId(null);
  setShowChangeExpertDPDialog(true);
};

const handleChangeVideo = () => {
  setOpenExpertDropdownId(null);
  setShowChangeExpertVideoDialog(true);
};

const handleChangeTimings = () => {
  setOpenExpertDropdownId(null);
  setShowChangeTimingsDialog(true);
};

const handleBookingDetails = () => {
  setOpenExpertDropdownId(null);
  setShowBookingDetailsDialog(true);
};

const handleDeleteExpert = () => {
  setOpenExpertDropdownId(null);
  setShowDeleteExpertDialog(true);
};

const handleEditOrganisation = () => {
  const org = organisationsData.find(o => o.name === selectedExpert?.organisation);
  if (org) {
    setOrgFormData({
      name: org.name,
      type: org.type,
      phone: '+1 234 567 8900',
      email: `contact@${org.name.toLowerCase().replace(/\s/g, '')}.com`,
      address: '123 Main Street, New York, NY 10001'
    });
  }
  setOpenOrgDropdownId(null);
  setShowEditOrgDialog(true);
};

const handleDeleteOrganisation = () => {
  setOpenOrgDropdownId(null);
  setShowDeleteOrgDialog(true);
};

const handleAddSpeciality = () => {
  if (tempSpeciality.trim() && !expertFormData.specialities.includes(tempSpeciality.trim())) {
    setExpertFormData({
      ...expertFormData,
      specialities: [...expertFormData.specialities, tempSpeciality.trim()]
    });
    setTempSpeciality('');
  }
};

const handleRemoveSpeciality = (speciality: string) => {
  setExpertFormData({
    ...expertFormData,
    specialities: expertFormData.specialities.filter(s => s !== speciality)
  });
};

const handleSaveExpertChanges = () => {
  console.log('Saving expert changes:', expertFormData);
  setShowEditExpertDialog(false);
};

const handleConfirmDeleteExpert = () => {
  console.log('Deleting expert:', selectedExpert?.name);
  setShowDeleteExpertDialog(false);
  setSelectedExpert(null);
  setShowExpertModal(false);
};

const handleSaveOrgChanges = () => {
  console.log('Saving organization changes:', orgFormData);
  setShowEditOrgDialog(false);
};

const handleConfirmDeleteOrg = () => {
  console.log('Deleting organization:', selectedExpert?.organisation);
  setShowDeleteOrgDialog(false);
};

  return (
    <div className="flex h-full bg-gray-50 font-sans">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto ">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Expert Management</h2>
              <p className="text-gray-500 text-sm mt-1">Manage all registered experts</p>
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
<div className="p-8  max-h-[27rem] overflow-y-scroll">
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
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle size={10} />
                    {org.status}
                  </span>
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
                          <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded" onClick={handleEditOrganisation}>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit Organisation
                          </div>
                          <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded text-red-600" onClick={handleDeleteOrganisation}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Organisation
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 justify-between">
                <div className='flex items-center gap-1'>
                <Users size={12} className="text-gray-400" />
                <span className="text-xs text-gray-600">{org.experts.length} Experts</span>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    CHANGE
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
      onClick={(e) => {
        e.stopPropagation();
        
        if (openExpertDropdownId !== expert.id) {
          // Calculate position based on button location
          const buttonRect = buttonRefs.current[expert.id]?.getBoundingClientRect();
          if (buttonRect) {
            setDropdownPosition({
              bottom: window.innerHeight - buttonRect.top + 10, // 10px above the button
              right: window.innerWidth - buttonRect.right,
            });
          }
          setOpenExpertDropdownId(expert.id);
        } else {
          setOpenExpertDropdownId(null);
          setDropdownPosition(null);
        }
      }}
    >
      <EllipsisVertical size={14} />
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
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleEditProfile}>
            <Edit3 className="mr-3 h-4 w-4" />
            Edit Profile
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleViewProfile}>
            <Eye className="mr-3 h-4 w-4" />
            View Profile
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleChangeDP}>
            <User className="mr-3 h-4 w-4" />
            Change DP
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleChangeVideo}>
            <VideoIcon className="mr-3 h-4 w-4" />
            Change Video
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleChangeTimings}>
            <VideoIcon className="mr-3 h-4 w-4" />
            Change Timings
          </div>
          <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleBookingDetails}>
            <VideoIcon className="mr-3 h-4 w-4" />
            Booking Details
          </div>
          <div className="border-t border-gray-100 mt-1 pt-1">
            <div className="flex items-center px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600" onClick={handleDeleteExpert}>
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
        {selectedExpert && (
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
              <button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleChangeDP}
>
  <Image size={16} />
  Change Profile Picture
</button>
<button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleChangeVideo}
>
  <Video size={16} />
  Change Intro Video
</button>
<button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleEditProfile}
>
  <Edit3 size={16} />
  Edit Profile Details
</button>
<button 
  className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleDeleteExpert}
>
  <Trash2 size={16} />
  Delete Expert
</button>
            </div>
          </>
        )}
      </SideModal>


      <Dialog open={showViewExpertDialog} onOpenChange={setShowViewExpertDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Expert Profile</DialogTitle>
      <DialogDescription>
        Complete profile information for {selectedExpert?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={selectedExpert?.image}
          alt={selectedExpert?.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{selectedExpert?.name}</h3>
          <p className="text-sm text-gray-500">{selectedExpert?.organisation}</p>
          <div className="flex items-center gap-2 mt-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{selectedExpert?.rating}</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm">{selectedExpert?.bookings} bookings</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm">{selectedExpert?.experience}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Phone</p>
          <p className="text-sm font-medium">{selectedExpert?.phone || '+1 234 567 8900'}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Email</p>
          <p className="text-sm font-medium">{selectedExpert?.email || 'expert@example.com'}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Specialities</p>
        <div className="flex flex-wrap gap-2">
          {selectedExpert?.specialities?.map((spec: string, idx: number) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {spec}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-xs text-gray-500 mb-1">About</p>
        <p className="text-sm text-gray-600">
          Professional expert with extensive experience in the beauty industry.
          Specialized in providing high-quality services to clients.
        </p>
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Close</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Edit Expert Profile Dialog */}
<Dialog open={showEditExpertDialog} onOpenChange={setShowEditExpertDialog}>
  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Edit Expert Profile</DialogTitle>
      <DialogDescription>
        Update profile information for {selectedExpert?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={expertFormData.name}
          onChange={(e) => setExpertFormData({...expertFormData, name: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={expertFormData.phone}
          onChange={(e) => setExpertFormData({...expertFormData, phone: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={expertFormData.email}
          onChange={(e) => setExpertFormData({...expertFormData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
        <input
          type="text"
          value={expertFormData.experience}
          onChange={(e) => setExpertFormData({...expertFormData, experience: e.target.value})}
          placeholder="e.g., 5 yrs"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specialities</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tempSpeciality}
            onChange={(e) => setTempSpeciality(e.target.value)}
            placeholder="Add speciality"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddSpeciality()}
          />
          <Button type="button" onClick={handleAddSpeciality}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {expertFormData.specialities.map((spec, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center gap-1">
              {spec}
              <button onClick={() => handleRemoveSpeciality(spec)} className="hover:text-red-600">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <input
            type="number"
            step="0.1"
            value={expertFormData.rating}
            onChange={(e) => setExpertFormData({...expertFormData, rating: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Bookings</label>
          <input
            type="number"
            value={expertFormData.bookings}
            onChange={(e) => setExpertFormData({...expertFormData, bookings: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
        <textarea
          value={expertFormData.about}
          onChange={(e) => setExpertFormData({...expertFormData, about: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleSaveExpertChanges}>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Change Expert DP Dialog */}
<Dialog open={showChangeExpertDPDialog} onOpenChange={setShowChangeExpertDPDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change Profile Picture</DialogTitle>
      <DialogDescription>
        Upload a new profile picture for {selectedExpert?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="flex items-center justify-center mb-4">
        {selectedExpertFile ? (
          <img
            src={URL.createObjectURL(selectedExpertFile)}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <img
            src={selectedExpert?.image}
            alt={selectedExpert?.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setSelectedExpertFile(e.target.files[0]);
          }
        }}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button 
        onClick={() => {
          console.log('Uploading DP:', selectedExpertFile?.name);
          setShowChangeExpertDPDialog(false);
          setSelectedExpertFile(null);
        }}
        disabled={!selectedExpertFile}
      >
        Upload
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Change Expert Video Dialog */}
<Dialog open={showChangeExpertVideoDialog} onOpenChange={setShowChangeExpertVideoDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change Intro Video</DialogTitle>
      <DialogDescription>
        Upload a new intro video for {selectedExpert?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {selectedExpertVideo && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <video className="w-full rounded-lg" controls>
            <source src={URL.createObjectURL(selectedExpertVideo)} />
          </video>
          <p className="text-xs text-gray-500 mt-2">{selectedExpertVideo.name}</p>
        </div>
      )}
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setSelectedExpertVideo(e.target.files[0]);
          }
        }}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button 
        onClick={() => {
          console.log('Uploading Video:', selectedExpertVideo?.name);
          setShowChangeExpertVideoDialog(false);
          setSelectedExpertVideo(null);
        }}
        disabled={!selectedExpertVideo}
      >
        Upload Video
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Change Working Hours Dialog */}
<Dialog open={showChangeTimingsDialog} onOpenChange={setShowChangeTimingsDialog}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Change Working Hours</DialogTitle>
      <DialogDescription>
        Set working hours for {selectedExpert?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {Object.entries(workingHours).map(([day, hours]) => (
          <div key={day} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-24">
              <span className="text-sm font-medium capitalize">{day}</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="time"
                value={hours.start}
                onChange={(e) => setWorkingHours({
                  ...workingHours,
                  [day]: { ...hours, start: e.target.value }
                })}
                className="px-2 py-1 border border-gray-200 rounded text-sm"
                disabled={!hours.active}
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={hours.end}
                onChange={(e) => setWorkingHours({
                  ...workingHours,
                  [day]: { ...hours, end: e.target.value }
                })}
                className="px-2 py-1 border border-gray-200 rounded text-sm"
                disabled={!hours.active}
              />
            </div>
            <button
              onClick={() => setWorkingHours({
                ...workingHours,
                [day]: { ...hours, active: !hours.active }
              })}
              className={`px-2 py-1 rounded text-xs font-medium ${
                hours.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {hours.active ? 'Open' : 'Closed'}
            </button>
          </div>
        ))}
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={() => setShowChangeTimingsDialog(false)}>Save Hours</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Booking Details Dialog */}
<Dialog open={showBookingDetailsDialog} onOpenChange={setShowBookingDetailsDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Booking Details</DialogTitle>
      <DialogDescription>
        Complete booking history for {selectedExpert?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-100">
                <td className="px-4 py-2">{booking.date}</td>
                <td className="px-4 py-2">{booking.time}</td>
                <td className="px-4 py-2">{booking.customer}</td>
                <td className="px-4 py-2">{booking.service}</td>
                <td className="px-4 py-2">{booking.amount}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Close</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Delete Expert Confirmation Dialog */}
<Dialog open={showDeleteExpertDialog} onOpenChange={setShowDeleteExpertDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Expert</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete "{selectedExpert?.name}"? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">
          This will permanently delete:
        </p>
        <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
          <li>All expert profile information</li>
          <li>All bookings and appointments</li>
          <li>All reviews and ratings</li>
          <li>Associated service history</li>
        </ul>
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button variant="destructive" onClick={handleConfirmDeleteExpert}>
        Yes, Delete Expert
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Edit Organization Dialog */}
<Dialog open={showEditOrgDialog} onOpenChange={setShowEditOrgDialog}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Edit Organization</DialogTitle>
      <DialogDescription>
        Update organization information for {selectedExpert?.organisation}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
        <input
          type="text"
          value={orgFormData.name}
          onChange={(e) => setOrgFormData({...orgFormData, name: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type</label>
        <input
          type="text"
          value={orgFormData.type}
          onChange={(e) => setOrgFormData({...orgFormData, type: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={orgFormData.phone}
          onChange={(e) => setOrgFormData({...orgFormData, phone: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={orgFormData.email}
          onChange={(e) => setOrgFormData({...orgFormData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          value={orgFormData.address}
          onChange={(e) => setOrgFormData({...orgFormData, address: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleSaveOrgChanges}>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Delete Organization Confirmation Dialog */}
<Dialog open={showDeleteOrgDialog} onOpenChange={setShowDeleteOrgDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Organization</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete "{selectedExpert?.organisation}"? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">
          This will permanently delete:
        </p>
        <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
          <li>All organization information</li>
          <li>All experts associated with this organization</li>
          <li>All services, bookings, and transactions</li>
          <li>All reviews and ratings</li>
        </ul>
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button variant="destructive" onClick={handleConfirmDeleteOrg}>
        Yes, Delete Organization
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  );
}