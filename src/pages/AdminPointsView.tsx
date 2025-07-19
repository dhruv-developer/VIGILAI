import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, User, AlertCircle, CheckCircle, Clock, Search, Filter } from 'lucide-react';

// Mock data for all incidents/points
const mockIncidents = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues',
    location: 'Main Street, Downtown',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    status: 'pending',
    priority: 'high',
    reportedBy: 'John Doe',
    reportedAt: '2024-01-15T10:30:00Z',
    category: 'Infrastructure',
    images: ['image1.jpg'],
    assignedTo: 'Road Maintenance Team'
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light not working since last week',
    location: 'Park Avenue, Sector 12',
    coordinates: { lat: 28.6129, lng: 77.2095 },
    status: 'in-progress',
    priority: 'medium',
    reportedBy: 'Jane Smith',
    reportedAt: '2024-01-14T18:45:00Z',
    category: 'Utilities',
    images: ['image2.jpg'],
    assignedTo: 'Electrical Team'
  },
  {
    id: '3',
    title: 'Garbage Collection Issue',
    description: 'Garbage not collected for 3 days',
    location: 'Green Valley, Block A',
    coordinates: { lat: 28.6149, lng: 77.2085 },
    status: 'resolved',
    priority: 'low',
    reportedBy: 'Mike Johnson',
    reportedAt: '2024-01-13T09:15:00Z',
    category: 'Sanitation',
    images: ['image3.jpg'],
    assignedTo: 'Sanitation Team'
  },
  {
    id: '4',
    title: 'Water Leakage',
    description: 'Major water pipe burst',
    location: 'Oak Street, Near Hospital',
    coordinates: { lat: 28.6159, lng: 77.2080 },
    status: 'pending',
    priority: 'high',
    reportedBy: 'Sarah Wilson',
    reportedAt: '2024-01-16T07:20:00Z',
    category: 'Utilities',
    images: ['image4.jpg'],
    assignedTo: 'Water Department'
  }
];

const AdminPointsView = () => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || incident.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || incident.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === id ? { ...incident, status: newStatus } : incident
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Incident Points</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all reported incidents</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            Total: {incidents.length}
          </Badge>
          <Badge variant="outline" className="text-sm">
            Pending: {incidents.filter(i => i.status === 'pending').length}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Sanitation">Sanitation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIncidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{incident.title}</CardTitle>
                <div className="flex space-x-2">
                  <Badge className={getPriorityColor(incident.priority)}>
                    {incident.priority.toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(incident.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(incident.status)}
                      <span className="ml-1">{incident.status.replace('-', ' ').toUpperCase()}</span>
                    </div>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{incident.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {incident.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  {incident.reportedBy}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(incident.reportedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <Badge variant="outline">{incident.category}</Badge>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-gray-600 mb-2">Assigned to: <span className="font-medium">{incident.assignedTo}</span></p>
              </div>

              <div className="flex space-x-2">
                {incident.status === 'pending' && (
                  <Button 
                    size="sm" 
                    onClick={() => updateStatus(incident.id, 'in-progress')}
                    className="flex-1"
                  >
                    Start Progress
                  </Button>
                )}
                {incident.status === 'in-progress' && (
                  <Button 
                    size="sm" 
                    onClick={() => updateStatus(incident.id, 'resolved')}
                    className="flex-1"
                  >
                    Mark Resolved
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No incidents found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPointsView;