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
  XCircle,
  Circle,
  CircleDotIcon,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SideModal } from '@/components/common/sideModal';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
// Add these imports at the top with other imports
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

import { apiClient } from '@/client/api/api-client';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

// Types for our API data
interface Expert {
  expertId: string;
  name: string;
  email: string;
  category: string;
  experience: string;
  rating: number;
  totalBookings: number;
  revenue: number;
  status: string;
  isVisible: boolean;
  image?: string;
  phone?: string;
  specialities?: string[];
}

interface Organization {
  orgId: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  description: string;
  logo: string;
  status: string;
  isVisible: boolean;
  memberCount: number;
  rating: string;
  experts?: Expert[];
}

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
  const [openIconDropdown, setOpenIconDropdown] = useState<string | null>(null);
  const [iconDropdownPosition, setIconDropdownPosition] = useState<{ bottom: number; left: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'requested' | 'verified'>('requested');
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showChangeExpertDPDialog, setShowChangeExpertDPDialog] = useState(false);
  const [showChangeExpertVideoDialog, setShowChangeExpertVideoDialog] = useState(false);
  const [showEditExpertDialog, setShowEditExpertDialog] = useState(false);
  const [showDeleteExpertDialog, setShowDeleteExpertDialog] = useState(false);
  const [showChangeOrgImageDialog, setShowChangeOrgImageDialog] = useState(false);
  const [showEditOrgDialog, setShowEditOrgDialog] = useState(false);
  const [showManageExpertsDialog, setShowManageExpertsDialog] = useState(false);
  const [showDeleteOrgDialog, setShowDeleteOrgDialog] = useState(false);

  const [expertFormData, setExpertFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    specialities: [] as string[],
    rating: '',
    bookings: ''
  });
  const [orgFormData, setOrgFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    type: ''
  });
  const [selectedExpertFile, setSelectedExpertFile] = useState<File | null>(null);
  const [selectedExpertVideo, setSelectedExpertVideo] = useState<File | null>(null);
  const [selectedOrgImage, setSelectedOrgImage] = useState<File | null>(null);
  const [tempSpeciality, setTempSpeciality] = useState('');

  const [organisationsData, setOrganisationsData] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrgForDetails, setSelectedOrgForDetails] = useState<any>(null);
  const [showCheckDetailsDialog, setShowCheckDetailsDialog] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [activeDropdownOrgId, setActiveDropdownOrgId] = useState<string | null>(null);
  const [activeDropdownExpertId, setActiveDropdownExpertId] = useState<string | null>(null);

  const fetchOrganisations = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient<{ organizations: Organization[] }>('/admin/organizations');
      setOrganisationsData(response.organizations || []);
    } catch (error) {
      toast.error('Failed to fetch organizations');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const handleDropdownClick = (label: string, event: React.MouseEvent, orgId: string, expertId?: string) => {
    setAnchorEl(event.currentTarget as any);
    setActiveDropdown(label);
    setActiveDropdownOrgId(orgId);
    setActiveDropdownExpertId(expertId || null);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setActiveDropdown(null);
    setActiveDropdownOrgId(null);
    setActiveDropdownExpertId(null);
  };

  const handleOptionSelect = async (label: string, option: string) => {
    const orgId = activeDropdownOrgId;
    const expertId = activeDropdownExpertId;
    handleDropdownClose();
    
    if (!orgId) return;

    try {
      if (label === "Visibility") {
        const isVisible = option === "Show";
        if (expertId) {
          await apiClient(`/admin/organizations/${orgId}/experts/${expertId}`, {
            method: 'PUT',
            body: JSON.stringify({ isVisible })
          });
          toast.success(`Expert ${isVisible ? 'shown' : 'hidden'}`);
        } else {
          await apiClient(`/admin/organizations/${orgId}`, {
            method: 'PUT',
            body: JSON.stringify({ isVisible })
          });
          toast.success(`Organization ${isVisible ? 'shown' : 'hidden'}`);
        }
      } else if (label === "Status") {
        const status = option === "Verified" ? "VERIFIED" : "PENDING";
        const verified = option === "Verified";
        
        if (expertId) {
          await apiClient(`/admin/organizations/${orgId}/experts/${expertId}`, {
            method: 'PUT',
            body: JSON.stringify({ verificationStatus: status, verified })
          });
          toast.success(`Expert status updated to ${option}`);
        } else {
          await apiClient(`/admin/organizations/${orgId}`, {
            method: 'PUT',
            body: JSON.stringify({ verificationStatus: status, verified })
          });
          toast.success(`Organization status updated to ${option}`);
        }
      }
      fetchOrganisations();
    } catch (error) {
      toast.error(`Failed to update ${label.toLowerCase()}`);
      console.error(error);
    }
  };

  const handleCheckDetails = async (orgId: string) => {
    setDetailsLoading(true);
    setShowCheckDetailsDialog(true);
    setSelectedOrgForDetails(null);
    try {
      const details = await apiClient<any>(`/admin/organizations/${orgId}/check-details`);
      setSelectedOrgForDetails(details);
    } catch (error) {
      toast.error('Failed to fetch organization details');
      setShowCheckDetailsDialog(false);
    } finally {
      setDetailsLoading(false);
    }
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

  const filteredOrgs = (organisationsData || []).filter(org => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = org.name.toLowerCase().includes(searchTermLower) ||
                          (org.experts && org.experts.some(expert => expert.name.toLowerCase().includes(searchTermLower)));
    const matchesOrg = selectedOrgFilter === 'All Organisations' || org.name === selectedOrgFilter;
    const matchesStatus = activeTab === 'requested' ? org.status === 'pending' : org.status === 'verified';
    return matchesSearch && matchesOrg && matchesStatus;
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

const handleChangeExpertDP = () => {
  setShowExpertModal(false);
  setShowChangeExpertDPDialog(true);
};

const handleChangeExpertVideo = () => {
  setShowExpertModal(false);
  setShowChangeExpertVideoDialog(true);
};

const handleEditExpert = () => {
  if (selectedExpert) {
    setExpertFormData({
      name: selectedExpert.name || '',
      phone: selectedExpert.phone || '',
      email: selectedExpert.email || '',
      experience: selectedExpert.experience || '',
      specialities: selectedExpert.specialities || [],
      rating: selectedExpert.rating?.toString() || '',
      bookings: selectedExpert.bookings?.toString() || ''
    });
    setShowExpertModal(false);
    setShowEditExpertDialog(true);
  }
};

const handleDeleteExpert = () => {
  setShowExpertModal(false);
  setShowDeleteExpertDialog(true);
};

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

// Form submission handlers
const handleSaveExpertChanges = () => {
  console.log('Saving expert changes:', expertFormData);
  // API call to update expert
  setShowEditExpertDialog(false);
};

const handleSaveOrgChanges = () => {
  console.log('Saving organization changes:', orgFormData);
  // API call to update organization
  setShowEditOrgDialog(false);
};

const handleConfirmDeleteExpert = () => {
  console.log('Deleting expert:', selectedExpert?.name);
  // API call to delete expert
  setShowDeleteExpertDialog(false);
  setSelectedExpert(null);
};

const handleConfirmDeleteOrg = () => {
  console.log('Deleting organization:', selectedExpert?.organisation);
  // API call to delete organization
  setShowDeleteOrgDialog(false);
  setShowExpertModal(false);
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

  return (
    <div className="flex h-full bg-gray-50 font-sans">
      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">ON BOARD ORGANIZATION</h2>
              <p className="text-gray-500 text-sm mt-1">Manage on-board organisations</p>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className='flex justify-between'>
            <div className='flex items-center mb-[-2rem] gap-x-5 gap-y-[0.5rem] bg-gray-50 px-5 rounded-t-lg w-max border-t mt-4 border-gray-200'>
                <div 
                className={`ml-2 cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'requested' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('requested')}
                >
                Requested
                </div>
                <div 
                className={`ml-2 cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'verified' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('verified')}
                >
                Verified
                </div>
            </div>
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
                        key={org.orgId}
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
        </div>

              
        {/* Organisations Grid */}
        <div className="p-8  max-h-[27rem] min-h-[27rem] overflow-y-scroll ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
            {filteredOrgs.map((org) => (
            <div
                key={org.orgId}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
                {/* Organisation Header */}
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
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">{org.name}</h3>
                                {org.isVisible === false && (
                                    <span className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                                        <EyeOff size={10} />
                                        Hidden
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <Briefcase size={12} className="text-gray-400" />
                                <span className="text-xs text-gray-500">{org.industry}</span>
                            </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    className={`p-1.5 rounded-lg transition-colors ${org.isVisible === false ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                    onClick={(e) => handleDropdownClick("Visibility", e, org.orgId)}
                                    title={org.isVisible === false ? "Show Organization" : "Hide Organization"}
                                >
                                    {org.isVisible === false ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    <div className="flex items-center gap-1 mt-2 justify-between">
                        <div className='flex items-center gap-1'>
                        <span className={`flex items-center gap-1 text-xs font-medium ${org.status === "verified" ? "text-green-700" : "text-yellow-600 "} py-0.5 rounded-full capitalize`}>
                            {org.status === "verified" ? (
                                <CheckCircle size={10} />
                            ) : (
                                <CircleDotIcon size={10} />
                            )}
                            {org.status}
                        </span>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium" onClick={() => handleCheckDetails(org.orgId)}>
                            CHECK DETAILS
                            <ChevronRight size={14} className="inline-block ml-1" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>

                {/* Horizontal Scrolling Experts List */}
                <div className="relative">
                <div className="overflow-x-auto scrollbar-hide ">
                    <div className="flex gap-4 p-4 min-w-min">
                    {org.experts && org.experts.map((expert) => (
                        <div 
                            key={expert.expertId} 
                            className="flex-shrink-0 w-44 bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow relative"
                            >
                            <div className="relative mb-2">
                                {expert.image ? (
                                  <img
                                    src={expert.image}
                                    alt={expert.name}
                                    className="w-16 h-16 rounded-full object-cover mx-auto"
                                  />
                                ) : (
                                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mx-auto">
                                    <User size={32} />
                                  </div>
                                )}
                                {expert.isVisible === false && (
                                  <div className="absolute top-0 right-0 bg-red-100 p-1 rounded-full text-red-600" title="Hidden">
                                    <EyeOff size={10} />
                                  </div>
                                )}
                            </div>

                        <h4 className="font-medium text-gray-900 text-sm text-center truncate mt-2 hover:text-blue-600 cursor-pointer"
                        onClick={() => {
                                             setSelectedExpert({ ...expert, organisation: org.name, organisationImage: org.logo });
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
                            <span className="text-xs text-gray-500">{expert.totalBookings} bks</span>
                            <span className="text-xs text-gray-500">{expert.experience}</span>
                        </div>
                        
                        <div className="flex justify-center gap-2 mt-3">
                          <button 
                            className={`p-1.5 rounded-lg transition-colors ${expert.isVisible === false ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                            onClick={(e) => handleDropdownClick("Visibility", e, org.orgId, expert.expertId)}
                            title={expert.isVisible === false ? "Show Expert" : "Hide Expert"}
                          >
                            {expert.isVisible === false ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button 
                            className="p-1 hover:bg-gray-200 rounded text-gray-600"
                            onClick={(e) => handleDropdownClick("Status", e, org.orgId, expert.expertId)}
                          >
                            <BadgeCheck size={14} />
                          </button>
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
                        { icon: Mail, label: "Send Mail", options: [] },
                        { icon: EyeIcon, label: "Visibility", options: ["Show", "Hide"],color:["bg-green-500","bg-red-500"] },
                        { icon: Timer, label: "Status", options: ["Pending", "Verified"],color:["bg-yellow-500","bg-green-500"] },
                        ].map(({ icon: Icon, label, options }) => (
                        <div key={label} className="relative flex flex-col items-center group">
                            <div 
                            className='flex items-center gap-2 bg-gray-200 p-1 rounded cursor-pointer hover:bg-gray-300 transition-colors'
                            onClick={(e) => options.length > 0 && handleDropdownClick(label, e, org.orgId)}
                            >
                            <Icon className="h-4 w-4 text-blue-500" />
                            <p className="text-sm font-medium">{label}</p>
                            {options.length > 0 && (
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                            </div>
                        </div>
                        ))}
                    </div>

                    
                    <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleDropdownClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                      slotProps={{
        paper: {
            elevation: 3,
            sx: {
                mt: 1,
                minWidth: 160,
                borderRadius: '12px',
                overflow: 'hidden',
                '& .MuiMenuItem-root': {
                    py: 1.5,
                    px: 2,
                    gap: 1.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                        backgroundColor: '#f3f4f6',
                    },
                },
            },
        }
    }}
                    >
                    {activeDropdown && 
                        [
                        { icon: Mail, label: "Send Mail", options: [] },
                        { icon: EyeIcon, label: "Visibility", options: ["Show", "Hide"],color:["bg-green-500","bg-red-500"] },
                        { icon: Timer, label: "Status", options: ["Pending", "Verified"],color:["bg-yellow-500","bg-green-500"] },
                        ]
                        .find(item => item.label === activeDropdown)
                        ?.options.map((option, index) => (
                            <MenuItem 
                            key={option} 
                            onClick={() => handleOptionSelect(activeDropdown, option)}
                            divider={index === 0 && activeDropdown === "Status"}
                            sx={{color: activeDropdown === "Visibility" ? (option === "Show" ? 'green' : 'red') : (option === "Pending" ? 'orange' : 'green')}}
                            >
                            <ListItemIcon sx={{ minWidth: '32px', color: activeDropdown === "Visibility" ? (option === "Show" ? 'green' : 'red') : (option === "Pending" ? 'orange' : 'green') }}>
                                {getOptionIcon(option)}
                            </ListItemIcon>
                            <ListItemText 
                                primary={option}
                                slotProps={{
        primary: {
            sx: {
                fontSize: '0.875rem',
                fontWeight: 500,
            }
        }
    }}
                            />
                            </MenuItem>
                        ))
                    }
                    </Menu>
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
        <button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleChangeExpertDP}
>
  <Image size={16} />
  Change Profile Picture
</button>
<button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleChangeExpertVideo}
>
  <Video size={16} />
  Change Intro Video
</button>
<button 
  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
  onClick={handleEditExpert}
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
  )}
</SideModal>

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

{/* Edit Expert Details Dialog */}
<Dialog open={showEditExpertDialog} onOpenChange={setShowEditExpertDialog}>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Edit Expert Details</DialogTitle>
      <DialogDescription>
        Update profile information for {selectedExpert?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4 space-y-4 max-h-96 overflow-y-auto">
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
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleSaveExpertChanges}>Save Changes</Button>
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
            <div key={expert.expertId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
                      <span>{expert.totalBookings} bookings</span>
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
{/* Check Details Dialog */}
<Dialog open={showCheckDetailsDialog} onOpenChange={setShowCheckDetailsDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Verification Details - {selectedOrgForDetails?.name}</DialogTitle>
      <DialogDescription>
        Review all filled information for this organization and its owner.
      </DialogDescription>
    </DialogHeader>
    
    {detailsLoading ? (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    ) : selectedOrgForDetails && (
      <div className="py-4 max-h-[60vh] overflow-y-auto space-y-6">
        {/* Completion Score */}
        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Profile Completion</p>
            <p className="text-2xl font-bold text-gray-900">{selectedOrgForDetails.completionPercentage}%</p>
          </div>
          <div className="flex gap-2">
            {selectedOrgForDetails.isProperlyFilled ? (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Properly Filled</Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Incomplete</Badge>
            )}
            <Badge className="capitalize">{selectedOrgForDetails.status}</Badge>
          </div>
        </div>

        {/* Profile Details */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Building2 size={16} />
            Organization Profile
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {selectedOrgForDetails.details.profile.map((field: any) => (
              <div key={field.field} className="border-b border-gray-100 pb-2">
                <p className="text-xs text-gray-500">{field.label}</p>
                <p className={`text-sm ${field.value ? 'text-gray-900' : 'text-red-500 italic'}`}>
                  {field.value || 'Not provided'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Owner Details */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <User size={16} />
            Owner Details
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {selectedOrgForDetails.details.owner.map((field: any) => (
              <div key={field.field} className="border-b border-gray-100 pb-2">
                <p className="text-xs text-gray-500">{field.label}</p>
                <p className={`text-sm ${field.value ? 'text-gray-900' : 'text-red-500 italic'}`}>
                  {field.value || 'Not provided'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Details */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <CreditCard size={16} />
            Bank Details
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {selectedOrgForDetails.details.bank.map((field: any) => (
              <div key={field.field} className="border-b border-gray-100 pb-2">
                <p className="text-xs text-gray-500">{field.label}</p>
                <p className={`text-sm ${field.value ? 'text-gray-900' : 'text-red-500 italic'}`}>
                  {field.value || 'Not provided'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Fields Summary */}
        {selectedOrgForDetails.missingFields.length > 0 && (
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <h4 className="text-sm font-semibold text-red-700 mb-2">Missing Required Fields</h4>
            <ul className="list-disc list-inside text-xs text-red-600 space-y-1">
              {selectedOrgForDetails.missingFields.map((label: string) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}

    <DialogFooter>
      <Button variant="outline" onClick={() => setShowCheckDetailsDialog(false)}>Close</Button>
      {!selectedOrgForDetails?.isProperlyFilled && (
        <Button onClick={() => toast.info('Reminder sent to organization')}>Send Reminder</Button>
      )}
      {selectedOrgForDetails?.isProperlyFilled && selectedOrgForDetails?.status !== 'VERIFIED' && (
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOptionSelect('Status', 'Verified')}>
          Approve Now
        </Button>
      )}
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  );
}