// app/admin/page.tsx
'use client';

import { useState } from 'react';
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

// Mock data for organisations
const organisations = [
  {
    id: 1,
    name: 'Losi Hair Cutting',
    type: 'Massage Parlour',
    status: 'Active',
    earnings: '45K',
    experts: 8,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Relax Massage',
    type: 'Massage Parlour',
    status: 'Active',
    earnings: '10',
    experts: 8,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&h=100&fit=crop',
    rating: 4.2
  },
  {
    id: 3,
    name: 'Bliss Spa',
    type: 'Massage Parlour',
    status: 'Active',
    earnings: '28K',
    experts: 8,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a0b9?w=100&h=100&fit=crop',
    rating: 4.8
  },
  {
    id: 4,
    name: 'Heaven Touch',
    type: 'Massage Parlour',
    status: 'Active',
    earnings: '15',
    experts: 8,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=100&h=100&fit=crop',
    rating: 4.0
  },
  {
    id: 5,
    name: 'Golden Hands',
    type: 'Massage Parlour',
    status: 'Active',
    earnings: '30K',
    experts: 8,
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5547?w=100&h=100&fit=crop',
    rating: 4.6
  },
  {
    id: 6,
    name: 'Zen Body Care',
    type: 'Massage Parlour',
    status: 'Active',
    earnings: '11',
    experts: 8,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=100&h=100&fit=crop',
    rating: 4.3
  }
];

const menuItems = [
  { icon: Building2, label: 'Organisations', active: true, subItems: ['Management', 'Experts', 'Management'] },
  { icon: BadgeCheck, label: 'On-Board', subItems: ['Requests', 'Action Centre', 'Requests & Alerts', 'Send Emails', 'Email Management'] },
  { icon: Send, label: 'Send Messages', subItems: ['Message Management'] },
  { icon: CreditCard, label: 'Payment & Wallet', subItems: ['Transactions & Wallet'] },
  { icon: LogOut, label: 'Logout', subItems: [] }
];

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [selectedOrgData, setSelectedOrgData] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  // Add these state variables inside the AdminPanel component after other state declarations
const [showChangeDPDialog, setShowChangeDPDialog] = useState(false);
const [showChangeVideoDialog, setShowChangeVideoDialog] = useState(false);
const [showChangeNameDialog, setShowChangeNameDialog] = useState(false);
const [showChangeAddressDialog, setShowChangeAddressDialog] = useState(false);
const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [newName, setNewName] = useState('');
const [newAddress, setNewAddress] = useState('');
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [videoFile, setVideoFile] = useState<File | null>(null);
const [showChangeMenuDialog, setShowChangeMenuDialog] = useState(false);
const [showChangeHoursDialog, setShowChangeHoursDialog] = useState(false);
const [showChangeTagsDialog, setShowChangeTagsDialog] = useState(false);
const [showDeleteReviewsDialog, setShowDeleteReviewsDialog] = useState(false);

// Menu state
const [menuItemsList, setMenuItemsList] = useState([
  { id: 1, name: 'Hair Cut', price: 499, active: true },
  { id: 2, name: 'Hair Color', price: 999, active: true },
  { id: 3, name: 'Shampoo', price: 199, active: false },
  { id: 4, name: 'Styling', price: 799, active: true },
]);

// Active hours state
const [activeHours, setActiveHours] = useState({
  monday: { start: '09:00', end: '21:00', active: true },
  tuesday: { start: '09:00', end: '21:00', active: true },
  wednesday: { start: '09:00', end: '21:00', active: true },
  thursday: { start: '09:00', end: '21:00', active: true },
  friday: { start: '09:00', end: '21:00', active: true },
  saturday: { start: '10:00', end: '20:00', active: true },
  sunday: { start: '10:00', end: '18:00', active: false },
});

// Tags state
const [tags, setTags] = useState([
  { id: 1, name: 'Premium', color: 'bg-purple-100 text-purple-700' },
  { id: 2, name: 'Affordable', color: 'bg-green-100 text-green-700' },
  { id: 3, name: 'Luxury', color: 'bg-yellow-100 text-yellow-700' },
  { id: 4, name: 'Family Friendly', color: 'bg-blue-100 text-blue-700' },
]);
const [newTag, setNewTag] = useState('');

// Reviews state
const [reviews, setReviews] = useState([
  { id: 1, userName: 'John D.', rating: 5, comment: 'Great service!', date: '2024-03-15' },
  { id: 2, userName: 'Sarah M.', rating: 4, comment: 'Good experience', date: '2024-03-14' },
  { id: 3, userName: 'Mike R.', rating: 2, comment: 'Not satisfied with service', date: '2024-03-13' },
  { id: 4, userName: 'Emma W.', rating: 5, comment: 'Excellent! Will come again', date: '2024-03-12' },
]);
const [selectedReviews, setSelectedReviews] = useState<number[]>([]);

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
  setNewAddress(''); // You can fetch current address if available
  setShowActionPanel(false);
  setShowChangeAddressDialog(true);
};

const handleDeleteOrganisation = () => {
  setShowActionPanel(false);
  setShowDeleteDialog(true);
};

// New handler functions for dialog actions
const handleConfirmChangeName = () => {
  console.log('Change name to:', newName, 'for:', selectedOrgData?.name);
  // API call to update name
  setShowChangeNameDialog(false);
  setNewName('');
};

const handleConfirmChangeAddress = () => {
  console.log('Change address to:', newAddress, 'for:', selectedOrgData?.name);
  // API call to update address
  setShowChangeAddressDialog(false);
  setNewAddress('');
};

const handleConfirmDelete = () => {
  console.log('Delete Organisation:', selectedOrgData?.name);
  // API call to delete organisation
  setShowDeleteDialog(false);
  setSelectedOrgData(null);
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

const handleConfirmChangeDP = () => {
  if (selectedFile) {
    console.log('Uploading DP:', selectedFile.name, 'for:', selectedOrgData?.name);
    // API call to upload DP
    setShowChangeDPDialog(false);
    setSelectedFile(null);
  }
};

const handleConfirmChangeVideo = () => {
  if (videoFile) {
    console.log('Uploading Video:', videoFile.name, 'for:', selectedOrgData?.name);
    // API call to upload video
    setShowChangeVideoDialog(false);
    setVideoFile(null);
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

// Menu handlers
const handleAddMenuItem = () => {
  const newItem = {
    id: menuItemsList.length + 1,
    name: 'New Item',
    price: 0,
    active: true,
  };
  setMenuItemsList([...menuItemsList, newItem]);
};

const handleUpdateMenuItem = (id: number, field: string, value: any) => {
  setMenuItemsList(menuItemsList.map(item => 
    item.id === id ? { ...item, [field]: value } : item
  ));
};

const handleDeleteMenuItem = (id: number) => {
  setMenuItemsList(menuItemsList.filter(item => item.id !== id));
};

// Tags handlers
const handleAddTag = () => {
  if (newTag.trim()) {
    const newTagObj = {
      id: tags.length + 1,
      name: newTag,
      color: 'bg-gray-100 text-gray-700',
    };
    setTags([...tags, newTagObj]);
    setNewTag('');
  }
};

const handleDeleteTag = (id: number) => {
  setTags(tags.filter(tag => tag.id !== id));
};

// Reviews handlers
const handleSelectAllReviews = () => {
  if (selectedReviews.length === reviews.length) {
    setSelectedReviews([]);
  } else {
    setSelectedReviews(reviews.map(r => r.id));
  }
};

const handleSelectReview = (id: number) => {
  if (selectedReviews.includes(id)) {
    setSelectedReviews(selectedReviews.filter(rid => rid !== id));
  } else {
    setSelectedReviews([...selectedReviews, id]);
  }
};

const handleConfirmDeleteReviews = () => {
  console.log('Deleting reviews:', selectedReviews);
  setReviews(reviews.filter(review => !selectedReviews.includes(review.id)));
  setSelectedReviews([]);
  setShowDeleteReviewsDialog(false);
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
                key={org.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <img
                      src={org.image}
                      alt={org.name}
                      className="w-16 h-16 rounded-xl object-cover"
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
                            <span className="text-sm text-gray-500">{org.type}</span>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          <CheckCircle size={12} />
                          {org.status}
                        </span>
                        <span className="relative">
                          <EllipsisVertical 
                            size={16} 
                            className="text-gray-400 cursor-pointer hover:text-gray-600" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === org.id ? null : org.id);
                            }}
                          />
                          {openDropdownId === org.id && (
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
                          <span className="text-sm font-medium">₹{org.earnings}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} className="text-gray-400" />
                          <span className="text-sm font-medium">{org.experts} Experts</span>
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

            {/* Hide Profile with Toggle */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2 px-3">
                <span className="text-gray-700">Hide Profile</span>
                <button className="relative w-10 h-5 bg-gray-300 rounded-full transition-colors">
                  <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></span>
                </button>
              </div>
              <p className="text-xs text-gray-400 px-3">Hide profile from website</p>
            </div>

            {/* Show Profile with Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between py-2 px-3">
                <span className="text-gray-700">Show Profile</span>
                <button className="relative w-10 h-5 bg-green-500 rounded-full transition-colors">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></span>
                </button>
              </div>
              <p className="text-xs text-gray-400 px-3">Show profile on website</p>
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
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Change Organisation Address</DialogTitle>
      <DialogDescription>
        Update the address for {selectedOrgData?.name}
      </DialogDescription>
    </DialogHeader>
    <div className="py-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address
        </label>
        <input
          type="text"
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
                value={item.price}
                onChange={(e) => handleUpdateMenuItem(item.id, 'price', parseInt(e.target.value))}
                className="w-28 pl-7 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price"
              />
            </div>
            <button
              onClick={() => handleUpdateMenuItem(item.id, 'active', !item.active)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {item.active ? 'Active' : 'Inactive'}
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
      <Button onClick={() => setShowChangeMenuDialog(false)}>Save Changes</Button>
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
        {Object.entries(activeHours).map(([day, hours]) => (
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
      <Button onClick={() => setShowChangeHoursDialog(false)}>Save Hours</Button>
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
      <Button onClick={() => setShowChangeTagsDialog(false)}>Save Tags</Button>
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
            {reviews.map((review) => (
              <div key={review.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={selectedReviews.includes(review.id)}
                  onChange={() => handleSelectReview(review.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{review.userName}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
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