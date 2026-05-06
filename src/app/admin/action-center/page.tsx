// app/admin/experts/page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { apiClient } from '@/client/api/api-client';
import { toast } from 'sonner';
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
import { set } from 'zod';
import {
  Dialog,
  DialogTrigger,
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
  const [openExpertDropdownId, setOpenExpertDropdownId] = useState<string | null>(null);
  const [openOrgDropdownId, setOpenOrgDropdownId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ bottom: number; right: number } | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  
  const [organisationsData, setOrganisationsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showChangeOrgImageDialog, setShowChangeOrgImageDialog] = useState(false);
  const [showEditOrgDialog, setShowEditOrgDialog] = useState(false);
  const [showManageExpertsDialog, setShowManageExpertsDialog] = useState(false);
  const [showDeleteOrgDialog, setShowDeleteOrgDialog] = useState(false);

  const [orgFormData, setOrgFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    type: ''
  });
  const [selectedOrgImage, setSelectedOrgImage] = useState<File | null>(null);

  const fetchOrganisations = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient<{ organizations: any[] }>('/admin/organizations');
      setOrganisationsData(response.organizations || []);
    } catch (error) {
      toast.error('Failed to fetch organizations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const handleToggleMessaging = async (orgId: string, currentStatus: boolean) => {
    try {
      await apiClient(`/admin/organizations/${orgId}/messaging-toggle`, {
        method: 'POST',
        body: JSON.stringify({ isDisabled: !currentStatus }),
      });
      toast.success(`Messaging ${!currentStatus ? 'held' : 'enabled'} successfully`);
      fetchOrganisations();
    } catch (error) {
      toast.error('Failed to update messaging status');
    }
  };

  const handleToggleHold = async (orgId: string, currentStatus: boolean) => {
    try {
      await apiClient(`/admin/organizations/${orgId}/hold`, {
        method: 'POST',
        body: JSON.stringify({ isBlocked: !currentStatus }),
      });
      toast.success(`Account ${!currentStatus ? 'held' : 'unheld'} successfully`);
      fetchOrganisations();
    } catch (error) {
      toast.error('Failed to update account status');
    }
  };

  const handleTimedHold = async (orgId: string, minutes: number) => {
    try {
      await apiClient(`/admin/organizations/${orgId}/hold`, {
        method: 'POST',
        body: JSON.stringify({ isBlocked: true, durationMinutes: minutes }),
      });
      toast.success(`Account held for ${minutes < 60 ? minutes + ' minutes' : (minutes/60) + ' hours'}`);
      setOpenOrgDropdownId(null);
      fetchOrganisations();
    } catch (error) {
      toast.error('Failed to apply timed hold');
    }
  };

  const handleRefund = async (orgId: string) => {
    // In a real app, this might open a dialog first
    try {
      await apiClient(`/admin/organizations/${orgId}/refund`, {
        method: 'POST',
        body: JSON.stringify({ amount: 0, reason: 'Admin requested refund' }),
      });
      toast.success('Refund request submitted');
    } catch (error) {
      toast.error('Failed to submit refund request');
    }
  };

  const handleToggleVisibility = async (orgId: string, currentVisibility: boolean) => {
    try {
      await apiClient(`/admin/organizations/${orgId}`, {
        method: 'PUT',
        body: JSON.stringify({ isVisible: !currentVisibility }),
      });
      toast.success(`Account ${!currentVisibility ? 'shown' : 'hidden'} successfully`);
      setOpenOrgDropdownId(null);
      fetchOrganisations();
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  const filteredOrgs = organisationsData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (org.experts && org.experts.some(expert => expert.name.toLowerCase().includes(searchTerm.toLowerCase())));
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

// Add these handler functions after the existing handlers



// Organization handlers
const handleEditOrganization = () => {
  setOrgFormData({
    name: selectedExpert?.organisation || '',
    phone: '+1 234 567 8900',
    email: 'contact@organization.com',
    address: '123 Main Street, New York, NY 10001',
    type: 'Massage Parlour'
  });
  setShowExpertModal(false);
  setShowEditOrgDialog(true);
};

const handleManageExperts = () => {
  setShowExpertModal(false);
  setShowManageExpertsDialog(true);
};

const handleChangeOrgImage = () => {
  setShowExpertModal(false);
  setShowChangeOrgImageDialog(true);
};

const handleDeleteOrganization = () => {
  setShowExpertModal(false);
  setShowDeleteOrgDialog(true);
};



const handleSaveOrgChanges = () => {
  console.log('Saving organization changes:', orgFormData);
  // API call to update organization
  setShowEditOrgDialog(false);
};

const handleConfirmDeleteOrg = () => {
  console.log('Deleting organization:', selectedExpert?.organisation);
  // API call to delete organization
  setShowDeleteOrgDialog(false);
  setShowExpertModal(false);
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
                <div className="p-5 pb-3 border-b border-gray-100">
                <div className="flex items-start gap-3">
                    {org.logo ? (
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                        {org.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                        <h3 className="font-semibold text-gray-900">{org.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <Briefcase size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">{org.industry || 'Organization'}</span>
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
                                setOpenOrgDropdownId(openOrgDropdownId === org.orgId ? null : org.orgId);
                            }}
                            />
                            {openOrgDropdownId === org.orgId && (
                            <div className="absolute right-0 top-6 z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                                <div className="px-1 py-1 text-sm text-gray-700">
                                <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded" onClick={() => handleTimedHold(org.orgId, 30)}>
                                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                                    30 minutes pause
                                </div>
                                <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded" onClick={() => handleTimedHold(org.orgId, 720)}>
                                    <PauseCircle className="mr-2 h-4 w-4 text-yellow-500" />
                                    12 hours hold
                                </div>
                                <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded" onClick={() => handleTimedHold(org.orgId, 0)}>
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    Release Hold
                                </div>
                                <div className="border-t border-gray-100 my-1"></div>
                                <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded text-gray-700" onClick={() => handleToggleVisibility(org.orgId, !!org.isVisible)}>
                                    {org.isVisible ? (
                                      <><EyeOff className="mr-2 h-4 w-4" />Hide account</>
                                    ) : (
                                      <><Eye className="mr-2 h-4 w-4" />Show account</>
                                    )}
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
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium" onClick={()=>{setShowExpertModal(true),setSelectedExpert(null)}}>
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
                  // onClick={() => {
                  //                   setSelectedExpert({ ...expert, organisation: org.name, organisationImage: org.image });
                  //                   setShowExpertModal(true);
                  //                 }}
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
                        { 
                            icon: BadgeDollarSign, 
                            label: "Request Refund", 
                            color: 'text-red-500', 
                            bg: 'bg-red-50', 
                            hover: 'hover:bg-red-100',
                            onClick: () => handleRefund(org.orgId)
                        },
                        { 
                            icon: MessageCircleX, 
                            label: org.messagingDisabled ? "Enable Msg" : "Hold Message", 
                            color: org.messagingDisabled ? 'text-green-500' : 'text-yellow-600', 
                            bg: org.messagingDisabled ? 'bg-green-50' : 'bg-yellow-50', 
                            hover: org.messagingDisabled ? 'hover:bg-green-100' : 'hover:bg-yellow-100',
                            onClick: () => handleToggleMessaging(org.orgId, !!org.messagingDisabled)
                        },
                        { 
                            icon: BadgeAlert, 
                            label: org.isBlocked ? "Release Acc" : "Hold Account", 
                            color: org.isBlocked ? 'text-green-500' : 'text-orange-500', 
                            bg: org.isBlocked ? 'bg-green-50' : 'bg-orange-50', 
                            hover: org.isBlocked ? 'hover:bg-green-100' : 'hover:bg-orange-100',
                            onClick: () => handleToggleHold(org.orgId, !!org.isBlocked)
                        },
                        ].map(({ icon: Icon, label, color, bg, hover, onClick }) => (
                        <div key={label} className="relative flex-1 flex flex-col items-center group">
                            <div 
                            className={`flex items-center justify-center gap-2 ${bg} ${hover} p-2 rounded-lg cursor-pointer transition-all w-full`}
                            onClick={onClick}
                            >
                            <Icon className={`h-4 w-4 ${color}`} />
                            <p className={`text-[10px] font-medium ${color}`}>{label}</p>
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
        <button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleEditOrganization}
>
  <Building2 size={16} />
  Edit Organization Details
</button>
<button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleManageExperts}
>
  <Users size={16} />
  Manage Experts
</button>
<button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleChangeOrgImage}
>
  <Image size={16} />
  Change Organization Image
</button>
<button 
  className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleDeleteOrganization}
>
  <Trash2 size={16} />
  Delete Organization
</button>
      </div>
    </>
 
</SideModal>

{/* Change Organization Image Dialog */}
<Dialog open={showChangeOrgImageDialog} onOpenChange={setShowChangeOrgImageDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change Organization Image</DialogTitle>
      <DialogDescription>
        Upload a new image for {selectedExpert?.organisation}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="flex items-center justify-center mb-4">
        {selectedOrgImage ? (
          <img
            src={URL.createObjectURL(selectedOrgImage)}
            alt="Preview"
            className="w-32 h-32 rounded-lg object-cover"
          />
        ) : (
          <img
            src={selectedExpert?.organisationImage}
            alt={selectedExpert?.organisation}
            className="w-32 h-32 rounded-lg object-cover"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setSelectedOrgImage(e.target.files[0]);
          }
        }}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button 
        onClick={() => {
          console.log('Uploading Org Image:', selectedOrgImage?.name);
          setShowChangeOrgImageDialog(false);
          setSelectedOrgImage(null);
        }}
        disabled={!selectedOrgImage}
      >
        Upload Image
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Edit Organization Details Dialog */}
<Dialog open={showEditOrgDialog} onOpenChange={setShowEditOrgDialog}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Edit Organization Details</DialogTitle>
      <DialogDescription>
        Update information for {selectedExpert?.organisation}
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

{/* Manage Experts Dialog */}
<Dialog open={showManageExpertsDialog} onOpenChange={setShowManageExpertsDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Manage Experts</DialogTitle>
      <DialogDescription>
        Manage all experts working at {selectedExpert?.organisation}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {organisationsData
          .find(org => org.name === selectedExpert?.organisation)
          ?.experts.map((expert) => (
            <div key={expert.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{expert.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Rating: {expert.rating} ⭐</span>
                      <span>{expert.bookings} bookings</span>
                      <span>{expert.experience}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive">Remove</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button className="w-full" variant="outline">
          <Plus size={16} className="mr-2" />
          Add New Expert
        </Button>
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Close</DialogClose>
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
          <li>All customer data related to this organization</li>
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