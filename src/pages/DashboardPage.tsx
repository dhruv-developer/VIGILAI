
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Video, 
  Map, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Users,
  ArrowRight,
  Calendar,
  MapPin
} from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalReports: 12,
    activeComplaints: 3,
    resolvedCases: 8,
    videosUploaded: 5,
    impactScore: 85
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'complaint',
      title: 'Traffic Police Bribery',
      status: 'under_review',
      date: '2 days ago',
      location: 'Connaught Place, Delhi'
    },
    {
      id: 2,
      type: 'video',
      title: 'Illegal Construction Evidence',
      status: 'processed',
      date: '1 week ago',
      location: 'Sector 18, Noida'
    },
    {
      id: 3,
      type: 'complaint',
      title: 'Document Forgery Case',
      status: 'resolved',
      date: '2 weeks ago',
      location: 'Gurgaon City Center'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'under_review': return 'secondary';
      case 'processed': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return CheckCircle;
      case 'under_review': return Clock;
      case 'processed': return Eye;
      default: return AlertTriangle;
    }
  };

  const quickActions = [
    {
      title: 'Upload Video Evidence',
      description: 'Record and upload corruption evidence',
      icon: Upload,
      color: 'bg-blue-500',
      link: '/upload-video'
    },
    {
      title: 'File Complaint',
      description: 'Submit a formal complaint',
      icon: FileText,
      color: 'bg-green-500',
      link: '/file-complaint'
    },
    {
      title: 'View Hotspots',
      description: 'Check corruption hotspots map',
      icon: Map,
      color: 'bg-purple-500',
      link: '/hotspots-map'
    },
    {
      title: 'My Recordings',
      description: 'Manage your uploaded videos',
      icon: Video,
      color: 'bg-orange-500',
      link: '/my-recordings'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-blue-100 mb-4">
          Track your impact in the fight against corruption and stay updated on your reports.
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span className="text-sm">Impact Score: {stats.impactScore}%</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            <span className="text-sm">Community Member</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeComplaints}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolvedCases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.videosUploaded}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Impact Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.impactScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} to={action.link}>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg ${action.color} text-white mr-4`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const StatusIcon = getStatusIcon(activity.status);
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <StatusIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <Badge variant={getStatusColor(activity.status)} className="text-xs">
                          {activity.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{activity.date}</span>
                        <MapPin className="h-3 w-3 ml-2 mr-1" />
                        <span className="truncate">{activity.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <Link to="/my-recordings">
                <Button variant="outline" className="w-full">
                  View All Activity
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">124</div>
              <div className="text-sm text-gray-600">Community Views</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-sm text-gray-600">Cases Resolved</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
              <div className="text-sm text-gray-600">Community Support</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
