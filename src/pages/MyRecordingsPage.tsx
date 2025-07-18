
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Share2,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

const MyRecordingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [recordings, setRecordings] = useState([
    {
      id: 1,
      title: 'Traffic Police Bribery Incident',
      description: 'Police officer asking for bribe at traffic signal near Connaught Place',
      uploadDate: '2024-01-15',
      location: 'Connaught Place, Delhi',
      duration: '02:34',
      status: 'under_review',
      fileSize: '45.2 MB',
      views: 12,
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 2,
      title: 'Illegal Construction Evidence',
      description: 'Construction work happening without proper permits in residential area',
      uploadDate: '2024-01-10',
      location: 'Sector 18, Noida',
      duration: '05:12',
      status: 'processed',
      fileSize: '89.7 MB',
      views: 8,
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 3,
      title: 'Document Forgery at Government Office',
      description: 'Official asking for additional payment for document processing',
      uploadDate: '2024-01-05',
      location: 'Gurgaon City Center',
      duration: '03:45',
      status: 'resolved',
      fileSize: '67.3 MB',
      views: 25,
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 4,
      title: 'Electricity Board Corruption',
      description: 'Meter reader demanding money for favorable reading',
      uploadDate: '2024-01-02',
      location: 'Rohini, Delhi',
      duration: '01:58',
      status: 'processing',
      fileSize: '34.8 MB',
      views: 5,
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 5,
      title: 'Hospital Staff Demanding Extra Fee',
      description: 'Hospital staff asking for unofficial payment for treatment',
      uploadDate: '2023-12-28',
      location: 'Lajpat Nagar, Delhi',
      duration: '04:22',
      status: 'flagged',
      fileSize: '78.9 MB',
      views: 18,
      thumbnail: '/api/placeholder/320/180'
    }
  ]);

  const [filteredRecordings, setFilteredRecordings] = useState(recordings);

  useEffect(() => {
    let filtered = recordings;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(recording =>
        recording.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recording.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recording.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(recording => recording.status === filterStatus);
    }

    setFilteredRecordings(filtered);
  }, [searchQuery, filterStatus, recordings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'under_review': return 'secondary';
      case 'processed': return 'outline';
      case 'processing': return 'secondary';
      case 'flagged': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return CheckCircle;
      case 'under_review': return Clock;
      case 'processed': return Eye;
      case 'processing': return Loader2;
      case 'flagged': return AlertCircle;
      default: return Clock;
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'processing', label: 'Processing' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'processed', label: 'Processed' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'flagged', label: 'Flagged' }
  ];

  const handleShare = (recording: any) => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`${window.location.origin}/recording/${recording.id}`);
    // You would show a toast notification here
  };

  const handleDownload = (recording: any) => {
    // In a real app, this would trigger the download
    console.log('Downloading:', recording.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Recordings</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your uploaded video evidence
          </p>
        </div>
        <Button>
          <Video className="h-4 w-4 mr-2" />
          Upload New Video
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search recordings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{recordings.length}</div>
            <div className="text-sm text-gray-600">Total Videos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {recordings.filter(r => r.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {recordings.filter(r => ['under_review', 'processing'].includes(r.status)).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {recordings.reduce((sum, r) => sum + r.views, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </CardContent>
        </Card>
      </div>

      {/* Recordings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecordings.map((recording) => {
          const StatusIcon = getStatusIcon(recording.status);
          
          return (
            <Card key={recording.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-gray-200 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    
                    {/* Duration overlay */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {recording.duration}
                    </div>
                    
                    {/* Status badge */}
                    <div className="absolute top-2 left-2">
                      <Badge variant={getStatusColor(recording.status)} className="text-xs">
                        <StatusIcon className={`h-3 w-3 mr-1 ${recording.status === 'processing' ? 'animate-spin' : ''}`} />
                        {recording.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {recording.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {recording.description}
                    </p>

                    {/* Meta information */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(recording.uploadDate).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{recording.views} views</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{recording.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>{recording.fileSize}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShare(recording)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownload(recording)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRecordings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recordings found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by uploading your first video evidence'
              }
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Button>
                <Video className="h-4 w-4 mr-2" />
                Upload Your First Video
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyRecordingsPage;
