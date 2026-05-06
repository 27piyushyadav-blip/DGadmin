'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/client/api/api-client';
import { toast } from 'sonner';
import {
  Users,
  Star,
  Calendar,
  Award,
  Video,
  Image,
  Edit3,
  Trash2,
  Search,
  ChevronLeft,
  MoreVertical,
  Clock,
  CheckCircle,
  Briefcase,
  EllipsisVertical,
  ArrowLeft,
  Plus,
  ChevronUp,
  ChevronDown,
  Mail,
  Phone,
  Eye,
  User as UserIcon,
  Video as VideoIcon,
  MessageSquare,
  FileText,
  Building2,
  XCircle
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

export default function OrganizationExpertsPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.orgId as string;

  const [experts, setExperts] = useState<any[]>([]);
  const [organization, setOrganization] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  // Dialog/Modal states
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [showExpertDetails, setShowExpertDetails] = useState(false);
  const [showEditExpert, setShowEditExpert] = useState(false);
  const [showDeleteExpert, setShowDeleteExpert] = useState(false);
  const [showChangeDP, setShowChangeDP] = useState(false);
  const [showChangeVideo, setShowChangeVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [editActiveTab, setEditActiveTab] = useState('General');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchOrganization = async () => {
    try {
      const response = await apiClient<any>(`/admin/organizations/${orgId}`);
      setOrganization(response);
    } catch (error) {
      console.error('Failed to fetch organization', error);
    }
  };

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const response = await apiClient<any[]>(`/admin/organizations/${orgId}/experts`);
      // The API returns { expert: ..., expert_profile: ... }
      const flattenedExperts = (response || []).map(item => ({
        ...(item.expert || {}),
        ...(item.expert_profile || {}),
        id: item.expert?.id || item.expert_profile?.userId // Ensure we have an ID
      }));
      setExperts(flattenedExperts);
    } catch (error) {
      toast.error('Failed to fetch experts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orgId) {
      fetchOrganization();
      fetchExperts();
    }
  }, [orgId]);

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (expert.category || expert.specialization || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveExpert = async () => {
    if (!selectedExpert?.id) return;
    try {
      await apiClient(`/admin/organizations/${orgId}/experts/${selectedExpert.id}`, {
        method: 'PUT',
        body: JSON.stringify(selectedExpert)
      });
      toast.success('Expert updated successfully');
      fetchExperts();
      setShowEditExpert(false);
    } catch (error) {
      toast.error('Failed to update expert');
      console.error(error);
    }
  };

  const handleDeleteExpert = async () => {
    if (!selectedExpert?.id) return;
    try {
      await apiClient(`/admin/organizations/${orgId}/experts/${selectedExpert.id}`, {
        method: 'DELETE'
      });
      toast.success('Expert removed from organization');
      fetchExperts();
      setShowDeleteExpert(false);
    } catch (error) {
      toast.error('Failed to remove expert');
      console.error(error);
    }
  };

  const handleUploadDP = async () => {
    if (!selectedFile || !selectedExpert?.id) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      await apiClient(`/admin/organizations/${orgId}/experts/${selectedExpert.id}/dp`, {
        method: 'POST',
        body: formData,
        // Let the browser set the boundary for multipart/form-data
        headers: {} 
      });
      
      toast.success('Profile picture updated');
      fetchExperts();
      setShowChangeDP(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error('Failed to upload profile picture');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadVideo = async () => {
    if (!selectedFile || !selectedExpert?.id) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      await apiClient(`/admin/organizations/${orgId}/experts/${selectedExpert.id}/video`, {
        method: 'POST',
        body: formData,
        headers: {}
      });
      
      toast.success('Intro video updated');
      fetchExperts();
      setShowChangeVideo(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error('Failed to upload intro video');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleAction = (action: string, expert: any) => {
    setSelectedExpert(expert);
    setOpenDropdownId(null);
    switch (action) {
      case 'view': setShowExpertDetails(true); break;
      case 'edit': setShowEditExpert(true); break;
      case 'delete': setShowDeleteExpert(true); break;
      case 'dp': setShowChangeDP(true); break;
      case 'video': setShowChangeVideo(true); break;
    }
  };

  return (
    <div className="flex h-full bg-gray-50 font-sans overflow-hidden">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {organization ? `${organization.name}'s Experts` : 'Experts Management'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                View and manage experts for this organization
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search experts..."
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
                <span>Sort: {sortBy === 'newest' ? 'Newest' : 'Top Rated'}</span>
                {sortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {sortOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                  <button
                    onClick={() => { setSortBy('newest'); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-50"
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => { setSortBy('rating'); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Top Rated
                  </button>
                </div>
              )}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Expert
            </Button>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="flex-1 p-8 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredExperts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Users size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">No experts found</p>
              <p className="text-sm">Try adjusting your search or add a new expert.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={expert.image || expert.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                          alt={expert.name}
                          className="w-16 h-16 rounded-xl object-cover ring-2 ring-gray-50"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop';
                          }}
                        />
                        {expert.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="truncate">
                            <h3 className="font-semibold text-gray-900 truncate hover:text-blue-600 cursor-pointer"
                              onClick={() => handleAction('view', expert)}
                            >
                              {expert.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                              <Briefcase size={12} className="flex-shrink-0" />
                              <span className="truncate">{expert.specialization || expert.category || 'Professional Expert'}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                              expert.verificationStatus === 'LIVE' || expert.verificationStatus === 'VERIFIED' ? 'text-green-700 bg-green-50' : 'text-yellow-700 bg-yellow-50'
                            }`}>
                              {expert.verificationStatus === 'LIVE' || expert.verificationStatus === 'VERIFIED' ? <CheckCircle size={10} /> : <Clock size={10} />}
                              {expert.verificationStatus || 'PENDING'}
                            </span>
                            
                            <div className="relative">
                              <button
                                onClick={() => setOpenDropdownId(openDropdownId === expert.id ? null : expert.id)}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                              >
                                <EllipsisVertical size={18} />
                              </button>
                              
                              {openDropdownId === expert.id && (
                                <div className="absolute right-0 top-full mt-1 z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 overflow-hidden animate-in fade-in zoom-in duration-100">
                                  <button onClick={() => handleAction('view', expert)} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    <Eye className="mr-3 h-4 w-4 text-gray-400" /> View Profile
                                  </button>
                                  <button onClick={() => handleAction('edit', expert)} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    <Edit3 className="mr-3 h-4 w-4 text-gray-400" /> Edit Expert
                                  </button>
                                  <button onClick={() => handleAction('dp', expert)} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    <Image className="mr-3 h-4 w-4 text-gray-400" /> Change Photo
                                  </button>
                                  <button onClick={() => handleAction('video', expert)} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-50">
                                    <VideoIcon className="mr-3 h-4 w-4 text-gray-400" /> Change Video
                                  </button>
                                  <button onClick={() => handleAction('delete', expert)} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                    <Trash2 className="mr-3 h-4 w-4" /> Delete Expert
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-50 rounded-lg">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-yellow-700">{expert.rating || '0.0'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <Calendar size={14} />
                            <span className="text-xs font-medium">{expert.totalBookings || '0'} Bookings</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <Award size={14} />
                            <span className="text-xs font-medium">{expert.experience || '0'} Yrs Exp</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => handleAction('edit', expert)}
                      >
                        <Edit3 size={14} /> Edit Profile
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        onClick={() => handleAction('view', expert)}
                      >
                        <Eye size={14} /> Full Details
                      </button>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1">
                      <Clock size={10} /> Last Active: 2h ago
                    </span>
                    <button className="text-[10px] text-red-500 font-bold hover:text-red-600 transition-colors flex items-center gap-1"
                      onClick={() => handleAction('delete', expert)}
                    >
                      <Trash2 size={10} /> REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Detail Side Modal */}
      <SideModal
        isOpen={showExpertDetails}
        onClose={() => setShowExpertDetails(false)}
        width="w-[550px]"
      >
        {selectedExpert && (
          <div className="flex flex-col h-full bg-white">
            {/* Modal Header/Profile Summary */}
            <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700 flex-shrink-0">
              <button 
                onClick={() => setShowExpertDetails(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-10"
              >
                <XCircle size={20} />
              </button>
              <div className="absolute -bottom-14 left-8 flex items-end gap-6">
                <div className="relative">
                  <img
                    src={selectedExpert.image || selectedExpert.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
                    alt={selectedExpert.name}
                    className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-2xl"
                  />
                  {selectedExpert.isVerified && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white shadow-lg">
                      <CheckCircle size={14} />
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 leading-none">{selectedExpert.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mt-2">{selectedExpert.specialization || selectedExpert.category || 'Professional Expert'}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-20 px-8 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
              <div className="flex gap-8">
                {['Overview', 'Services', 'Availability'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold transition-all relative ${
                      activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full shadow-[0_-2px_8px_rgba(37,99,235,0.3)]"></div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2 pb-4">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  selectedExpert.verificationStatus === 'LIVE' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {selectedExpert.verificationStatus || 'PENDING'}
                </span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {activeTab === 'Overview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Stats Card */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-center">
                      <p className="text-xl font-black text-gray-900">{selectedExpert.rating || '0.0'}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Rating</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <p className="text-xl font-black text-gray-900">{selectedExpert.totalBookings || '0'}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Bookings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-black text-gray-900">{selectedExpert.experience || '0'}y</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Experience</p>
                    </div>
                  </div>

                  {/* Intro Video */}
                  {selectedExpert.introVideo && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Video size={14} className="text-blue-500" /> Introduction Video
                      </h4>
                      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-lg group">
                        <video 
                          src={selectedExpert.introVideo} 
                          controls 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><Mail size={16} /></div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                          <p className="text-xs font-semibold text-gray-800 truncate">{selectedExpert.email}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg text-green-600 shadow-sm"><Phone size={16} /></div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p>
                          <p className="text-xs font-semibold text-gray-800">{selectedExpert.phone || 'Not Provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">About Expert</h4>
                    <div className="p-5 bg-blue-50/30 rounded-2xl border border-blue-100/50">
                      <p className="text-sm text-gray-600 leading-relaxed italic">
                        "{selectedExpert.bio || 'No biography provided yet.'}"
                      </p>
                    </div>
                  </div>

                  {/* Documents */}
                  {selectedExpert.documents && selectedExpert.documents.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <FileText size={14} /> Verification Documents
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedExpert.documents.map((doc: any, idx: number) => (
                          <a 
                            key={idx} 
                            href={doc.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3 hover:bg-blue-50 hover:border-blue-200 transition-all group"
                          >
                            <div className="p-2 bg-white rounded-lg text-red-500 shadow-sm group-hover:bg-blue-100 transition-colors">
                              <FileText size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] text-gray-400 font-bold uppercase">Document</p>
                              <p className="text-xs font-semibold text-gray-800 truncate">{doc.name || `Document ${idx + 1}`}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education & Work */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Award size={14} /> Education
                      </h4>
                      <div className="space-y-3">
                        {(selectedExpert.education || []).map((edu: any, idx: number) => (
                          <div key={idx} className="relative pl-4 border-l-2 border-blue-100 py-1">
                            <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-white border-2 border-blue-400" />
                            <p className="text-xs font-bold text-gray-800">{edu.degree}</p>
                            <p className="text-[10px] text-gray-500 font-semibold">{edu.institution || edu.school}</p>
                            <p className="text-[10px] text-blue-500 font-bold mt-0.5">{edu.year}</p>
                          </div>
                        )) || <p className="text-xs text-gray-400 italic">No education history</p>}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Briefcase size={14} /> Work History
                      </h4>
                      <div className="space-y-3">
                        {selectedExpert.workHistory?.map((work: any, idx: number) => (
                          <div key={idx} className="border-l-2 border-green-200 pl-3 py-1">
                            <p className="text-xs font-bold text-gray-800">{work.role}</p>
                            <p className="text-[10px] text-gray-500">{work.company} • {work.duration || work.startDate}</p>
                          </div>
                        )) || <p className="text-xs text-gray-400 italic">No work history</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Services' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Offered Services</h4>
                  <div className="space-y-3">
                    {selectedExpert.services?.map((service: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between group hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <CheckCircle size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{service.name}</p>
                            <p className="text-xs text-gray-500 font-medium">{service.description}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                <Clock size={10} /> {service.duration} mins
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-gray-800">₹{service.videoPrice || service.price?.video} <span className="text-[10px] text-gray-400 font-normal uppercase ml-1">Video</span></div>
                            <div className="text-xs font-bold text-gray-800">₹{service.clinicPrice || service.price?.clinic} <span className="text-[10px] text-gray-400 font-normal uppercase ml-1">Clinic</span></div>
                          </div>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <Briefcase size={32} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-sm text-gray-400">No services listed yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'Availability' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weekly Schedule</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                      const dayAvail = (selectedExpert.availability || []).filter((a: any) => (a.dayOfWeek || a.day) === day);
                      return (
                        <div key={day} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 group hover:bg-white hover:border-blue-100 transition-all duration-300">
                          <div className="flex items-center gap-4 w-32">
                            <div className={`w-3 h-3 rounded-full ${dayAvail.length > 0 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-gray-300'}`} />
                            <span className="text-sm font-bold text-gray-700">{day}</span>
                          </div>
                          
                          <div className="flex-1 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                            {dayAvail.length > 0 ? (
                              dayAvail.map((avail: any, sIdx: number) => (
                                <div key={sIdx} className="bg-white px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-blue-600 shadow-sm whitespace-nowrap flex items-center gap-2">
                                  <Clock size={12} className="text-blue-400" />
                                  {avail.startTime && avail.endTime ? `${avail.startTime} - ${avail.endTime}` : avail.slots?.join(', ')}
                                </div>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400 font-medium italic">Not available</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-8 border-t border-gray-100 flex gap-4 flex-shrink-0 bg-white">
              <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold text-gray-700" onClick={() => handleAction('edit', selectedExpert)}>
                <Edit3 size={18} className="mr-2" /> Edit Profile
              </Button>
              <Button className="flex-1 h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                <MessageSquare size={18} className="mr-2" /> Message Expert
              </Button>
            </div>
          </div>
        )}
      </SideModal>
      
      {/* Edit Expert Dialog */}
      <Dialog open={showEditExpert} onOpenChange={setShowEditExpert}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-8 pt-8">
            <DialogTitle>Edit Expert: {selectedExpert?.name}</DialogTitle>
            <DialogDescription>
              Modify professional profile, services, and availability.
            </DialogDescription>
          </DialogHeader>

          {/* Edit Tabs */}
          <div className="flex border-b border-gray-100 mb-4 px-8">
            {['General', 'Professional', 'Services', 'Availability'].map((tab) => (
              <button
                key={tab}
                onClick={() => setEditActiveTab(tab)}
                className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
                  editActiveTab === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex-1 overflow-y-auto px-8">
            {selectedExpert && (
              <div className="space-y-6 pb-6">
                {editActiveTab === 'General' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                      <input
                        type="text"
                        value={selectedExpert.name || ''}
                        onChange={(e) => setSelectedExpert({...selectedExpert, name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                      <input
                        type="email"
                        value={selectedExpert.email || ''}
                        onChange={(e) => setSelectedExpert({...selectedExpert, email: e.target.value})}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
                      <input
                        type="text"
                        value={selectedExpert.username || ''}
                        onChange={(e) => setSelectedExpert({...selectedExpert, username: e.target.value})}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Languages (Comma separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(selectedExpert.languages) ? selectedExpert.languages.join(', ') : selectedExpert.languages || ''}
                        onChange={(e) => setSelectedExpert({...selectedExpert, languages: e.target.value.split(',').map((s: string) => s.trim())})}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="col-span-2 space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Social Links</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {['linkedin', 'twitter', 'website'].map(social => (
                          <div key={social} className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">{social}</label>
                            <input
                              type="text"
                              value={selectedExpert.socialLinks?.[social] || ''}
                              onChange={(e) => setSelectedExpert({
                                ...selectedExpert, 
                                socialLinks: { ...selectedExpert.socialLinks, [social]: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {editActiveTab === 'Professional' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Specialization</label>
                        <input
                          type="text"
                          value={selectedExpert.specialization || selectedExpert.category || ''}
                          onChange={(e) => setSelectedExpert({...selectedExpert, specialization: e.target.value})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Experience (Years)</label>
                        <input
                          type="number"
                          value={selectedExpert.experience || 0}
                          onChange={(e) => setSelectedExpert({...selectedExpert, experience: parseInt(e.target.value)})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Professional Bio</label>
                        <textarea
                          rows={4}
                          value={selectedExpert.bio || ''}
                          onChange={(e) => setSelectedExpert({...selectedExpert, bio: e.target.value})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Education History</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 text-xs h-7 gap-1"
                          onClick={() => setSelectedExpert({
                            ...selectedExpert,
                            education: [...(selectedExpert.education || []), { degree: '', school: '', year: '' }]
                          })}
                        >
                          <Plus size={12} /> Add
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {(selectedExpert.education || []).map((edu: any, idx: number) => (
                          <div key={idx} className="grid grid-cols-7 gap-3 items-end bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="col-span-3 space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => {
                                  const newEdu = [...selectedExpert.education];
                                  newEdu[idx].degree = e.target.value;
                                  setSelectedExpert({...selectedExpert, education: newEdu});
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <div className="col-span-2 space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">School/University</label>
                              <input
                                type="text"
                                value={edu.institution || edu.school || ''}
                                onChange={(e) => {
                                  const newEdu = [...selectedExpert.education];
                                  newEdu[idx].institution = e.target.value;
                                  setSelectedExpert({...selectedExpert, education: newEdu});
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <div className="col-span-1 space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Year</label>
                              <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => {
                                  const newEdu = [...selectedExpert.education];
                                  newEdu[idx].year = e.target.value;
                                  setSelectedExpert({...selectedExpert, education: newEdu});
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <button 
                              onClick={() => setSelectedExpert({
                                ...selectedExpert,
                                education: selectedExpert.education.filter((_: any, i: number) => i !== idx)
                              })}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-gray-100 pt-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Work History</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 text-xs h-7 gap-1"
                          onClick={() => setSelectedExpert({
                            ...selectedExpert,
                            workHistory: [...(selectedExpert.workHistory || []), { role: '', company: '', duration: '' }]
                          })}
                        >
                          <Plus size={12} /> Add
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {(selectedExpert.workHistory || []).map((work: any, idx: number) => (
                          <div key={idx} className="grid grid-cols-7 gap-3 items-end bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="col-span-3 space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Role / Position</label>
                              <input
                                type="text"
                                value={work.role}
                                onChange={(e) => {
                                  const newWork = [...selectedExpert.workHistory];
                                  newWork[idx].role = e.target.value;
                                  setSelectedExpert({...selectedExpert, workHistory: newWork});
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <div className="col-span-2 space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Company</label>
                              <input
                                type="text"
                                value={work.company}
                                onChange={(e) => {
                                  const newWork = [...selectedExpert.workHistory];
                                  newWork[idx].company = e.target.value;
                                  setSelectedExpert({...selectedExpert, workHistory: newWork});
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <div className="col-span-1 space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Duration</label>
                              <input
                                type="text"
                                value={work.duration}
                                onChange={(e) => {
                                  const newWork = [...selectedExpert.workHistory];
                                  newWork[idx].duration = e.target.value;
                                  setSelectedExpert({...selectedExpert, workHistory: newWork});
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <button 
                              onClick={() => setSelectedExpert({
                                ...selectedExpert,
                                workHistory: selectedExpert.workHistory.filter((_: any, i: number) => i !== idx)
                              })}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {editActiveTab === 'Services' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Offered Services</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 text-xs h-7 gap-1"
                        onClick={() => setSelectedExpert({
                          ...selectedExpert,
                          services: [...(selectedExpert.services || []), { name: '', price: { video: 0, clinic: 0 }, duration: 30, description: '' }]
                        })}
                      >
                        <Plus size={12} /> Add Service
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {(selectedExpert.services || []).map((service: any, idx: number) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-4 relative group">
                          <button 
                            onClick={() => setSelectedExpert({
                              ...selectedExpert,
                              services: selectedExpert.services.filter((_: any, i: number) => i !== idx)
                            })}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Service Name</label>
                              <input
                                type="text"
                                value={service.name}
                                onChange={(e) => {
                                  const newServices = [...selectedExpert.services];
                                  newServices[idx].name = e.target.value;
                                  setSelectedExpert({...selectedExpert, services: newServices});
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Duration (Minutes)</label>
                              <input
                                type="number"
                                value={service.duration}
                                onChange={(e) => {
                                  const newServices = [...selectedExpert.services];
                                  newServices[idx].duration = parseInt(e.target.value);
                                  setSelectedExpert({...selectedExpert, services: newServices});
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Video Fee (INR)</label>
                              <input
                                type="number"
                                value={service.videoPrice || service.price?.video || 0}
                                onChange={(e) => {
                                  const newServices = [...selectedExpert.services];
                                  newServices[idx].videoPrice = e.target.value;
                                  setSelectedExpert({...selectedExpert, services: newServices});
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Clinic Fee (INR)</label>
                              <input
                                type="number"
                                value={service.clinicPrice || service.price?.clinic || 0}
                                onChange={(e) => {
                                  const newServices = [...selectedExpert.services];
                                  newServices[idx].clinicPrice = e.target.value;
                                  setSelectedExpert({...selectedExpert, services: newServices});
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Short Description</label>
                            <input
                              type="text"
                              value={service.description}
                              onChange={(e) => {
                                const newServices = [...selectedExpert.services];
                                newServices[idx].description = e.target.value;
                                setSelectedExpert({...selectedExpert, services: newServices});
                              }}
                              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {editActiveTab === 'Availability' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weekly Schedule</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                        const dayAvail = (selectedExpert.availability || []).filter((a: any) => (a.dayOfWeek || a.day) === day);
                        return (
                          <div key={day} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 group hover:bg-white hover:border-blue-100 transition-all duration-300">
                            <div className="flex items-center gap-4 w-32">
                              <div className={`w-3 h-3 rounded-full ${dayAvail.length > 0 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-gray-300'}`} />
                              <span className="text-sm font-bold text-gray-700">{day}</span>
                            </div>
                            
                            <div className="flex-1 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                              {dayAvail.length > 0 ? (
                                dayAvail.map((avail: any, sIdx: number) => (
                                  <div key={sIdx} className="bg-white px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-blue-600 shadow-sm whitespace-nowrap flex items-center gap-2">
                                    <Clock size={12} className="text-blue-400" />
                                    {avail.startTime && avail.endTime ? `${avail.startTime} - ${avail.endTime}` : avail.slots?.join(', ')}
                                    <button 
                                      onClick={() => {
                                        const newAvail = [...selectedExpert.availability];
                                        const dIdx = newAvail.findIndex(a => (a.dayOfWeek || a.day) === day);
                                        newAvail[dIdx].slots = newAvail[dIdx].slots.filter((_: any, i: number) => i !== sIdx);
                                        setSelectedExpert({...selectedExpert, availability: newAvail});
                                      }}
                                      className="ml-1 text-gray-400 hover:text-red-500"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <span className="text-xs text-gray-400 italic">Not available</span>
                              )}
                            </div>

                            <button 
                              onClick={() => {
                                const newAvail = [...(selectedExpert.availability || [])];
                                const dIdx = newAvail.findIndex(a => a.day === day);
                                const newSlot = prompt("Enter slot (e.g. 10:00 AM - 11:00 AM)");
                                if (newSlot) {
                                  if (dIdx >= 0) {
                                    newAvail[dIdx].slots = [...newAvail[dIdx].slots, newSlot];
                                  } else {
                                    newAvail.push({ day, slots: [newSlot] });
                                  }
                                  setSelectedExpert({...selectedExpert, availability: newAvail});
                                }
                              }}
                              className="ml-4 p-2 bg-white rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="mt-6 border-t border-gray-100 pt-6 px-8 pb-8">
            <DialogClose variant="outline">Cancel</DialogClose>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 shadow-lg shadow-blue-200" onClick={handleSaveExpert}>
              Save All Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteExpert} onOpenChange={setShowDeleteExpert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Remove Expert</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {selectedExpert?.name} from this organization? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose variant="outline">Cancel</DialogClose>
            <Button variant="destructive" onClick={handleDeleteExpert}>
              Remove Expert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Change DP Dialog */}
      <Dialog open={showChangeDP} onOpenChange={setShowChangeDP}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Upload a new profile image for {selectedExpert?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="p-4 bg-blue-50 rounded-full text-blue-600 mb-4">
              <Image size={32} />
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {selectedFile && (
              <p className="mt-4 text-xs font-bold text-gray-700">Selected: {selectedFile.name}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose variant="outline">Cancel</DialogClose>
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              onClick={handleUploadDP}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Video Dialog */}
      <Dialog open={showChangeVideo} onOpenChange={setShowChangeVideo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Intro Video</DialogTitle>
            <DialogDescription>
              Upload a new introductory video for {selectedExpert?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="p-4 bg-purple-50 rounded-full text-purple-600 mb-4">
              <Video size={32} />
            </div>
            <input 
              type="file" 
              accept="video/*" 
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
            />
            {selectedFile && (
              <p className="mt-4 text-xs font-bold text-gray-700">Selected: {selectedFile.name}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose variant="outline">Cancel</DialogClose>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white" 
              onClick={handleUploadVideo}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Video'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
