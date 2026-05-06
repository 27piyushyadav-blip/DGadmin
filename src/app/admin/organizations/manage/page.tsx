// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/client/api/api-client';
import { toast } from 'sonner';
import {
  Building2,
  Users,
  UserCog,
  BadgeCheck,
  Inbox,
  Bell,
  Mail,
  Send,
  MessageSquare,
  Wallet,
  CreditCard,
  LogOut,
  Search,
  ChevronDown,
  ChevronUp,
  Image,
  Video,
  Edit3,
  EyeOff,
  Trash2,
  MoreVertical,
  Star,
  Briefcase,
  MapPin,
  CheckCircle,
  XCircle,
  Plus,
  EllipsisVertical,
  Clock,
  Menu,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SideModal} from '@/components/common/sideModal';
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
import { set } from 'zod';

// Organisations state will be fetched from API

const menuItems = [
  { icon: Building2, label: 'Organisations', active: true, subItems: ['Management', 'Experts', 'Management'] },
  { icon: BadgeCheck, label: 'On-Board', subItems: ['Requests', 'Action Centre', 'Requests & Alerts', 'Send Emails', 'Email Management'] },
  { icon: Send, label: 'Send Messages', subItems: ['Message Management'] },
  { icon: CreditCard, label: 'Payment & Wallet', subItems: ['Transactions & Wallet'] },
  { icon: LogOut, label: 'Logout', subItems: [] }
];

export default function AdminPanel() {
  const router = useRouter();
  const [organisations, setOrganisations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [menuItemsList, setMenuItemsList] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeHours, setActiveHours] = useState<any>({});
  const [tags, setTags] = useState<any[]>([]);


  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [selectedOrgData, setSelectedOrgData] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [showChangeDPDialog, setShowChangeDPDialog] = useState(false);
  const [showChangeVideoDialog, setShowChangeVideoDialog] = useState(false);
  const [showChangeNameDialog, setShowChangeNameDialog] = useState(false);
  const [showChangeAddressDialog, setShowChangeAddressDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showChangeMenuDialog, setShowChangeMenuDialog] = useState(false);
  const [showChangeHoursDialog, setShowChangeHoursDialog] = useState(false);
  const [showChangeTagsDialog, setShowChangeTagsDialog] = useState(false);
  const [showDeleteReviewsDialog, setShowDeleteReviewsDialog] = useState(false);
  const [newTag, setNewTag] = useState('');

  // Fetch organisations
  const fetchOrganisations = async () => {
    try {
      setLoading(true);
      const response = await apiClient<any>('/admin/organizations');
      setOrganisations(response.organizations || []);
    } catch (error) {
      toast.error('Failed to fetch organisations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  // Fetch reviews for selected org
  useEffect(() => {
    if (selectedOrgData?.orgId && showDeleteReviewsDialog) {
      const fetchReviews = async () => {
        try {
          const response = await apiClient<any[]>(`/admin/organizations/${selectedOrgData.orgId}/reviews`);
          setReviews(response || []);
        } catch (error) {
          console.error('Failed to fetch reviews', error);
        }
      };
      fetchReviews();
    }
  }, [selectedOrgData, showDeleteReviewsDialog]);

  // Fetch services (menu) for selected org
  useEffect(() => {
    if (selectedOrgData?.orgId && showChangeMenuDialog) {
      const fetchServices = async () => {
        try {
          const response = await apiClient<any[]>(`/admin/organizations/${selectedOrgData.orgId}/services`);
          setMenuItemsList(response || []);
        } catch (error) {
          console.error('Failed to fetch services', error);
        }
      };
      fetchServices();
    }
  }, [selectedOrgData, showChangeMenuDialog]);

  useEffect(() => {
    if (selectedOrgData) {
      setActiveHours(selectedOrgData.operatingHours || {});
      setTags(selectedOrgData.tags?.map((t: string, i: number) => ({ id: i, name: t, color: 'bg-blue-100 text-blue-700' })) || []);
      setNewName(selectedOrgData.name || '');
      setNewAddress({
        street: selectedOrgData.addressLine1 || '',
        city: selectedOrgData.city || '',
        state: selectedOrgData.state || '',
        zip: selectedOrgData.zipCode || ''
      });
    }
  }, [selectedOrgData]);

  const filteredOrgs = organisations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

// Update action handlers
const handleChangeDP = () => {
  setShowActionPanel(false);
  setShowChangeDPDialog(true);
};

const handleChangeVideo = () => {
  setShowActionPanel(false);
  setShowChangeVideoDialog(true);
};

const handleChangeName = () => {
  setNewName(selectedOrgData?.name || '');
  setShowActionPanel(false);
  setShowChangeNameDialog(true);
};

const handleChangeAddress = () => {
  setNewAddress({
    street: selectedOrgData?.addressLine1 || '',
    city: selectedOrgData?.city || '',
    state: selectedOrgData?.state || '',
    zip: selectedOrgData?.zipCode || ''
  });
  setShowActionPanel(false);
  setShowChangeAddressDialog(true);
};

const handleDeleteOrganisation = () => {
  setShowActionPanel(false);
  setShowDeleteDialog(true);
};

// New handler functions for dialog actions
const handleConfirmChangeName = async () => {
  if (!selectedOrgData?.orgId) return;
  try {
    await apiClient(`/admin/organizations/${selectedOrgData.orgId}`, {
      method: 'PUT',
      body: JSON.stringify({ name: newName })
    });
    toast.success('Name updated successfully');
    fetchOrganisations();
    setShowChangeNameDialog(false);
  } catch (error) {
    toast.error('Failed to update name');
  }
};

const handleConfirmChangeAddress = async () => {
  if (!selectedOrgData?.orgId) return;
  try {
    const addressString = `${newAddress.street}, ${newAddress.city}, ${newAddress.state} ${newAddress.zip}`;
    await apiClient(`/admin/organizations/${selectedOrgData.orgId}`, {
      method: 'PUT',
      body: JSON.stringify({ 
        location: addressString,
        addressLine1: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        zipCode: newAddress.zip
      })
    });
    toast.success('Address updated successfully');
    fetchOrganisations();
    setShowChangeAddressDialog(false);
  } catch (error) {
    toast.error('Failed to update address');
  }
};

const handleConfirmDelete = async () => {
  if (!selectedOrgData?.orgId) return;
  try {
    await apiClient(`/admin/users/${selectedOrgData.orgId}`, {
      method: 'DELETE'
    });
    toast.success('Organisation deleted successfully');
    fetchOrganisations();
    setShowDeleteDialog(false);
    setSelectedOrgData(null);
  } catch (error) {
    toast.error('Failed to delete organisation');
  }
};

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setSelectedFile(e.target.files[0]);
  }
};

const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setVideoFile(e.target.files[0]);
  }
};

const handleConfirmChangeDP = async () => {
  if (selectedFile && selectedOrgData?.orgId) {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      await apiClient(`/admin/organizations/${selectedOrgData.orgId}/dp`, {
        method: 'POST',
        body: formData
      });
      toast.success('DP updated successfully');
      fetchOrganisations();
      setShowChangeDPDialog(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error('Failed to update DP');
    }
  }
};

const handleConfirmChangeVideo = async () => {
  if (videoFile && selectedOrgData?.orgId) {
    try {
      const formData = new FormData();
      formData.append('file', videoFile);
      await apiClient(`/admin/organizations/${selectedOrgData.orgId}/video`, {
        method: 'POST',
        body: formData
      });
      toast.success('Video updated successfully');
      fetchOrganisations();
      setShowChangeVideoDialog(false);
      setVideoFile(null);
    } catch (error) {
      toast.error('Failed to update video');
    }
  }
};



// Add these handler functions
const handleChangeMenu = () => {
  setShowActionPanel(false);
  setShowChangeMenuDialog(true);
};

const handleChangeActiveHours = () => {
  setShowActionPanel(false);
  setShowChangeHoursDialog(true);
};

const handleChangeTags = () => {
  setShowActionPanel(false);
  setShowChangeTagsDialog(true);
};

const handleDeleteReviews = () => {
  setShowActionPanel(false);
  setShowDeleteReviewsDialog(true);
};

const handleConfirmDeleteReviews = async () => {
  if (!selectedOrgData?.orgId || selectedReviews.length === 0) return;
  try {
    await Promise.all(selectedReviews.map(id => 
      apiClient(`/admin/reviews/${id}`, { method: 'DELETE' })
    ));
    toast.success('Reviews deleted successfully');
    setReviews(reviews.filter(review => !selectedReviews.includes(review.id)));
    setSelectedReviews([]);
    setShowDeleteReviewsDialog(false);
  } catch (error) {
    toast.error('Failed to delete some reviews');
  }
};

// Menu handlers (Organization Services)
const handleAddMenuItem = () => {
  const newItem = {
    id: `temp_${Date.now()}`,
    name: 'New Service',
    basePrice: 0,
    isActive: true,
  };
  setMenuItemsList([...menuItemsList, newItem]);
};

const handleUpdateMenuItem = (id: string, field: string, value: any) => {
  setMenuItemsList(menuItemsList.map(item => 
    item.id === id ? { ...item, [field]: value } : item
  ));
};

const handleDeleteMenuItem = async (id: string) => {
  if (id.startsWith('temp_')) {
    setMenuItemsList(menuItemsList.filter(item => item.id !== id));
    return;
  }
  
  if (!selectedOrgData?.orgId) return;
  try {
    await apiClient(`/admin/organizations/${selectedOrgData.orgId}/services/${id}`, {
      method: 'DELETE'
    });
    setMenuItemsList(menuItemsList.filter(item => item.id !== id));
    toast.success('Service deleted');
  } catch (error) {
    toast.error('Failed to delete service');
  }
};

const handleSaveMenu = async () => {
  if (!selectedOrgData?.orgId) return;
  try {
    // For simplicity, we'll handle new items and updates
    await Promise.all(menuItemsList.map(item => {
      if (item.id.startsWith('temp_')) {
        const { id, ...data } = item;
        return apiClient(`/admin/organizations/${selectedOrgData.orgId}/services`, {
          method: 'POST',
          body: JSON.stringify(data)
        });
      } else {
        return apiClient(`/admin/organizations/${selectedOrgData.orgId}/services/${item.id}`, {
          method: 'PUT',
          body: JSON.stringify(item)
        });
      }
    }));
    toast.success('Menu updated successfully');
    setShowChangeMenuDialog(false);
  } catch (error) {
    toast.error('Failed to save menu changes');
  }
};

// Tags handlers
const handleAddTag = () => {
  if (newTag.trim()) {
    setTags([...tags, { id: Date.now(), name: newTag, color: 'bg-blue-100 text-blue-700' }]);
    setNewTag('');
  }
};

const handleDeleteTag = (id: number) => {
  setTags(tags.filter(tag => tag.id !== id));
};

const handleSaveTags = async () => {
  if (!selectedOrgData?.orgId) return;
  try {
    const tagNames = tags.map(t => t.name);
    await apiClient(`/admin/organizations/${selectedOrgData.orgId}`, {
      method: 'PUT',
      body: JSON.stringify({ tags: tagNames })
    });
    toast.success('Tags updated successfully');
    fetchOrganisations();
    setShowChangeTagsDialog(false);
  } catch (error) {
    toast.error('Failed to update tags');
  }
};

const handleSaveHours = async () => {
  if (!selectedOrgData?.orgId) return;
  try {
    await apiClient(`/admin/organizations/${selectedOrgData.orgId}`, {
      method: 'PUT',
      body: JSON.stringify({ operatingHours: activeHours })
    });
    toast.success('Active hours updated successfully');
    fetchOrganisations();
    setShowChangeHoursDialog(false);
  } catch (error) {
    toast.error('Failed to update active hours');
  }
};

const handleToggleVisibility = async (visible: boolean) => {
  if (!selectedOrgData?.orgId) return;
  try {
    await apiClient(`/admin/organizations/${selectedOrgData.orgId}`, {
      method: 'PUT',
      body: JSON.stringify({ isVisible: visible })
    });
    toast.success(`Profile ${visible ? 'visible' : 'hidden'} on customer panel`);
    fetchOrganisations();
    setSelectedOrgData({ ...selectedOrgData, isVisible: visible });
  } catch (error) {
    toast.error('Failed to update visibility');
  }
};

// Reviews handlers
const handleSelectAllReviews = () => {
  if (selectedReviews.length === reviews.length) {
    setSelectedReviews([]);
  } else {
    setSelectedReviews(reviews.map(item => item.review.id));
  }
};

const handleSelectReview = (id: string) => {
  if (selectedReviews.includes(id)) {
    setSelectedReviews(selectedReviews.filter(rid => rid !== id));
  } else {
    setSelectedReviews([...selectedReviews, id]);
  }
};

  return (
    <div className="flex h-full bg-gray-50 font-sans">
      {/* Main Content */}
      <main className="flex-1 ">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Organisation Management</h2>
            <p className="text-gray-500 text-sm mt-1">Manage all registered organisations</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search organisations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <span>Sort by: {sortBy === 'newest' ? 'Newest' : 'Oldest'}</span>
                {sortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {sortOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <button
                    onClick={() => { setSortBy('newest'); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg"
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => { setSortBy('oldest'); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg"
                  >
                    Oldest
                  </button>
                </div>
              )}
            </div>
            <Button variant="outline">
              <Plus size={16} />
              Add Organisation
            </Button>
          </div>
        </div>

        {/* Organisations Grid */}
        <div className="p-8 max-h-[30rem] overflow-y-scroll ">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrgs.map((org) => (
              <div
                key={org.orgId}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        org.logo ? (org.logo.startsWith('http') ? org.logo : `http://localhost:3000/uploads/organization-logos/${org.logo}`) :
                        org.logoUrl ? (org.logoUrl.startsWith('http') ? org.logoUrl : `http://localhost:3000/uploads/organization-logos/${org.logoUrl}`) :
                        org.image ? (org.image.startsWith('http') ? org.image : `http://localhost:3000/uploads/organization-logos/${org.image}`) :
                        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop'
                      }
                      alt={org.name || 'Organization'}
                      className="w-16 h-16 rounded-xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop';
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 hover:text-blue-500 cursor-pointer" onClick={() => {
                            setShowActionPanel(true);
                            setSelectedOrgData(org);
                          }}>
                            {org.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Briefcase size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-500">{org.industry || org.type || 'Organization'}</span>
                          </div>
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          org.status === 'verified' ? 'text-green-700 bg-green-50' : 'text-yellow-700 bg-yellow-50'
                        }`}>
                          {org.status === 'verified' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {org.status}
                        </span>
                        <span className="relative">
                          <EllipsisVertical 
                            size={16} 
                            className="text-gray-400 cursor-pointer hover:text-gray-600" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === org.orgId ? null : org.orgId);
                            }}
                          />
                          {openDropdownId === org.orgId && (
                            <div className="absolute right-0 top-6 z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
  <div className="px-1 py-1 text-sm text-gray-700">
    <div 
      className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded"
      onClick={() => {
        setSelectedOrgData(org);
        handleChangeMenu();
        setOpenDropdownId(null);
      }}
    >
      <Menu className="mr-2 h-4 w-4" />
      Change Menu
    </div>
    <div 
      className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded"
      onClick={() => {
        setSelectedOrgData(org);
        handleChangeActiveHours();
        setOpenDropdownId(null);
      }}
    >
      <Clock className="mr-2 h-4 w-4" />
      Change Active Hours
    </div>
    <div 
      className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded"
      onClick={() => {
        setSelectedOrgData(org);
        handleChangeTags();
        setOpenDropdownId(null);
      }}
    >
      <Tag className="mr-2 h-4 w-4" />
      Change Tags
    </div>
    <div 
      className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded"
      onClick={() => {
        setSelectedOrgData(org);
        handleDeleteReviews();
        setOpenDropdownId(null);
      }}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete Reviews
    </div>
    <div 
      className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded border-t border-gray-100 mt-1"
      onClick={() => {
        router.push(`/admin/organizations/manage/${org.orgId}/experts`);
      }}
    >
      <Users className="mr-2 h-4 w-4 text-blue-600" />
      View Experts
    </div>
  </div>
</div>
                          )}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{org.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wallet size={14} className="text-gray-400" />
                          <span className="text-sm font-medium">₹{org.earnings || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} className="text-gray-400" />
                          <span className="text-sm font-medium">{org.memberCount || 0} Experts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={() => {
                          setShowChangeDPDialog(true);
                          setSelectedOrgData(org);
                        }}
                        
                      >
                        <Image size={14} /> Change DP
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={() => {
                          setShowChangeVideoDialog(true);
                          setSelectedOrgData(org);
                        }}
                      >
                        <Video size={14} /> Change Video
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={() => {
                          setShowChangeNameDialog(true);
                          setSelectedOrgData(org);
                        }}
                      >
                        <Edit3 size={14} /> Change Name
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      onClick={() => {  
                        setShowDeleteDialog(true)
                        setSelectedOrgData(org);
                      }
                      }
                      >
                        <EyeOff size={14} /> Remove Book Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                  <button 
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                    onClick={() => {
                      setShowChangeAddressDialog(true);
                      setSelectedOrgData(org);
                    }}
                  >
                    <MapPin size={12} /> Change Address
                  </button>
                  <button 
                    className="text-xs text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                    onClick={() => {
                      setSelectedOrgData(org);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Reusable Side Modal Component */}
      <SideModal 
        isOpen={showActionPanel} 
        onClose={() => setShowActionPanel(false)}
        width="w-[400px]"
      >
        {selectedOrgData && (
          <>
            {/* Organisation Info */}
            <div className="text-center mb-6">
              <img
                src={selectedOrgData.image}
                alt={selectedOrgData.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-900">{selectedOrgData.name}</h3>
              <p className="text-sm text-gray-500">Massage Parlour</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <CheckCircle size={12} className="text-green-500" />
                <span className="text-xs text-green-600">Active</span>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">1 min intro video</span>
                <span className="text-sm text-gray-500">1 min</span>
              </div>
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                <Video size={28} className="text-gray-400" />
              </div>
            </div>

            {/* Change DP */}
            <div className="mb-4">
              <button 
                onClick={handleChangeDP}
                className="w-full text-left py-2 text-gray-700 hover:bg-gray-50 px-3 rounded-lg transition-colors"
              >
                Change DP
              </button>
              <p className="text-xs text-gray-400 px-3">Upload new display picture</p>
            </div>

            {/* Change Video */}
            <div className="mb-4">
              <button 
                onClick={handleChangeVideo}
                className="w-full text-left py-2 text-gray-700 hover:bg-gray-50 px-3 rounded-lg transition-colors"
              >
                Change Video
              </button>
              <p className="text-xs text-gray-400 px-3">Upload new intro video</p>
            </div>

            {/* Change Name */}
            <div className="mb-4">
              <button 
                onClick={handleChangeName}
                className="w-full text-left py-2 text-gray-700 hover:bg-gray-50 px-3 rounded-lg transition-colors"
              >
                Change Name
              </button>
              <p className="text-xs text-gray-400 px-3">Update organisation name</p>
            </div>

            {/* Change Address */}
            <div className="mb-4">
              <button 
                onClick={handleChangeAddress}
                className="w-full text-left py-2 text-gray-700 hover:bg-gray-50 px-3 rounded-lg transition-colors"
              >
                Change Address
              </button>
              <p className="text-xs text-gray-400 px-3">Update organisation address</p>
            </div>

            {/* Visibility Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between py-2 px-3">
                <span className="text-gray-700">Profile Visibility</span>
                <button 
                  onClick={() => handleToggleVisibility(!selectedOrgData.isVisible)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    selectedOrgData.isVisible ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                    selectedOrgData.isVisible ? 'right-0.5' : 'left-0.5'
                  }`}></span>
                </button>
              </div>
              <p className="text-xs text-gray-400 px-3">
                {selectedOrgData.isVisible ? 'Visible' : 'Hidden'} on customer panel
              </p>
            </div>

            {/* Delete Organisation */}
            <div className="pt-2">
              <button 
                onClick={handleDeleteOrganisation}
                className="w-full text-left py-2 text-red-600 hover:bg-red-50 px-3 rounded-lg transition-colors"
              >
                Delete Organisation
              </button>
            </div>
          </>
        )}
      </SideModal>


      <Dialog open={showChangeDPDialog} onOpenChange={setShowChangeDPDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change Display Picture</DialogTitle>
      <DialogDescription>
        Upload a new display picture for {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="flex items-center justify-center mb-4">
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
            <Image size={40} className="text-gray-400" />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleConfirmChangeDP} disabled={!selectedFile}>
        Upload
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Change Video Dialog */}
<Dialog open={showChangeVideoDialog} onOpenChange={setShowChangeVideoDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change Intro Video</DialogTitle>
      <DialogDescription>
        Upload a new intro video for {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {videoFile && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <video className="w-full rounded-lg" controls>
            <source src={URL.createObjectURL(videoFile)} />
          </video>
          <p className="text-xs text-gray-500 mt-2">{videoFile.name}</p>
        </div>
      )}
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleConfirmChangeVideo} disabled={!videoFile}>
        Upload Video
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Change Name Dialog */}
<Dialog open={showChangeNameDialog} onOpenChange={setShowChangeNameDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change Organisation Name</DialogTitle>
      <DialogDescription>
        Update the name of {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        New Organisation Name
      </label>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter new name"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleConfirmChangeName} disabled={!newName.trim()}>
        Save Changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Change Address Dialog */}
<Dialog open={showChangeAddressDialog} onOpenChange={setShowChangeAddressDialog}>
  <DialogContent className="max-w-lg p-6">
    <DialogHeader>
      <DialogTitle>Change Organisation Address</DialogTitle>
      <DialogDescription>
        Update the address for {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-2 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address
        </label>
        <input
          type="text"
          value={newAddress.street}
          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
          placeholder="Enter street address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            placeholder="City"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            placeholder="State"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            value={newAddress.zip}
            onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
            placeholder="Postal code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            value="India"
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
          />
        </div>
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleConfirmChangeAddress}>Save Address</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Delete Confirmation Dialog */}
<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Organisation</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete "{selectedOrgData?.name}"? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">
          This will permanently delete:
        </p>
        <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
          <li>All organisation data and information</li>
          <li>All experts associated with this organisation</li>
          <li>All services, bookings, and transactions</li>
          <li>All reviews and ratings</li>
        </ul>
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button variant="destructive" onClick={handleConfirmDelete}>
        Yes, Delete Organisation
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
<Dialog open={showChangeMenuDialog} onOpenChange={setShowChangeMenuDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Manage Menu Items</DialogTitle>
      <DialogDescription>
        Add, edit, or remove menu items for {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="mb-4 flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Menu Items</h4>
        <Button size="sm" onClick={handleAddMenuItem}>
          <Plus size={14} className="mr-1" /> Add Item
        </Button>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {menuItemsList.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleUpdateMenuItem(item.id, 'name', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Item name"
            />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={item.basePrice || item.price}
                  onChange={(e) => handleUpdateMenuItem(item.id, 'basePrice', parseInt(e.target.value))}
                  className="w-28 pl-7 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                />
              </div>
              <button
                onClick={() => handleUpdateMenuItem(item.id, 'isActive', !item.isActive)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {item.isActive ? 'Active' : 'Inactive'}
              </button>
            <button
              onClick={() => handleDeleteMenuItem(item.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleSaveMenu}>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Change Active Hours Dialog */}
<Dialog open={showChangeHoursDialog} onOpenChange={setShowChangeHoursDialog}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Change Active Hours</DialogTitle>
      <DialogDescription>
        Set business hours for {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {Object.entries(activeHours).map(([day, hours]: [string, any]) => (
          <div key={day} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-24">
              <span className="text-sm font-medium capitalize">{day}</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="time"
                value={hours.start}
                onChange={(e) => setActiveHours({
                  ...activeHours,
                  [day]: { ...hours, start: e.target.value }
                })}
                className="px-2 py-1 border border-gray-200 rounded text-sm"
                disabled={!hours.active}
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={hours.end}
                onChange={(e) => setActiveHours({
                  ...activeHours,
                  [day]: { ...hours, end: e.target.value }
                })}
                className="px-2 py-1 border border-gray-200 rounded text-sm"
                disabled={!hours.active}
              />
            </div>
            <button
              onClick={() => setActiveHours({
                ...activeHours,
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
      <Button onClick={handleSaveHours}>Save Hours</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Change Tags Dialog */}
<Dialog open={showChangeTagsDialog} onOpenChange={setShowChangeTagsDialog}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Manage Tags</DialogTitle>
      <DialogDescription>
        Add or remove tags for {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter new tag..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
          />
          <Button onClick={handleAddTag}>Add Tag</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${tag.color}`}
          >
            <span>{tag.name}</span>
            <button
              onClick={() => handleDeleteTag(tag.id)}
              className="hover:opacity-70"
            >
              <XCircle size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button onClick={handleSaveTags}>Save Tags</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Delete Reviews Dialog */}
<Dialog open={showDeleteReviewsDialog} onOpenChange={setShowDeleteReviewsDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Delete Reviews</DialogTitle>
      <DialogDescription>
        Select and delete reviews for {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {reviews.length > 0 ? (
        <>
          <div className="mb-3 flex justify-between items-center">
            <button
              onClick={handleSelectAllReviews}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {selectedReviews.length === reviews.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedReviews.length > 0 && (
              <span className="text-sm text-gray-500">
                Selected: {selectedReviews.length} review(s)
              </span>
            )}
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {reviews.map((item) => (
              <div key={item.review.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={selectedReviews.includes(item.review.id)}
                  onChange={() => handleSelectReview(item.review.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.client.name}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < item.review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(item.review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No reviews available
        </div>
      )}
    </div>
    <DialogFooter>
      <DialogClose variant="outline">Cancel</DialogClose>
      <Button 
        variant="destructive" 
        onClick={handleConfirmDeleteReviews}
        disabled={selectedReviews.length === 0}
      >
        Delete Selected ({selectedReviews.length})
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  );
}