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

  const filteredOrgs = organisations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action handlers for side modal
  const handleChangeDP = () => {
    console.log('Change DP for:', selectedOrgData?.name);
    // Implement functionality
  };

  const handleChangeVideo = () => {
    console.log('Change Video for:', selectedOrgData?.name);
    // Implement functionality
  };

  const handleChangeName = () => {
    console.log('Change Name for:', selectedOrgData?.name);
    // Implement functionality
  };

  const handleChangeAddress = () => {
    console.log('Change Address for:', selectedOrgData?.name);
    // Implement functionality
  };

  const handleDeleteOrganisation = () => {
    console.log('Delete Organisation:', selectedOrgData?.name);
    // Implement functionality
    setShowActionPanel(false);
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
                                    setShowActionPanel(true);
                                    setOpenDropdownId(null);
                                  }}
                                >
                                  <Menu className="mr-2 h-4 w-4" />
                                  Change Menu
                                </div>
                                <div 
                                  className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded"
                                >
                                  <Clock className="mr-2 h-4 w-4" />
                                  Change Active Hours
                                </div>
                                <div 
                                  className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded"
                                >
                                  <Tag className="mr-2 h-4 w-4" />
                                  Change Tags
                                </div>
                                <div 
                                  className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer rounded"
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
                          setSelectedOrgData(org);
                          setShowActionPanel(true);
                        }}
                      >
                        <Image size={14} /> Change DP
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={() => {
                          setSelectedOrgData(org);
                          setShowActionPanel(true);
                        }}
                      >
                        <Video size={14} /> Change Video
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={() => {
                          setSelectedOrgData(org);
                          setShowActionPanel(true);
                        }}
                      >
                        <Edit3 size={14} /> Change Name
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
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
                      setSelectedOrgData(org);
                      setShowActionPanel(true);
                    }}
                  >
                    <MapPin size={12} /> Change Address
                  </button>
                  <button 
                    className="text-xs text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                    onClick={() => {
                      setSelectedOrgData(org);
                      setShowActionPanel(true);
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
    </div>
  );
}