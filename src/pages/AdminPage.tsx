import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Video, 
  FileText, 
  Map, 
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Shield,
  Activity
} from 'lucide-react';

const AdminPage = () => {
  const [selectedView, setSelectedView] = useState('overview');

  // Mock data for admin dashboard
  const stats = [
    { title: 'Total Users', value: '2,534', change: '+12%', icon: Users },
    { title: 'Video Reports', value: '1,847', change: '+8%', icon: Video },
    { title: 'Complaints Filed', value: '956', change: '+15%', icon: FileText },
    { title: 'Active Hotspots', value: '34', change: '-5%', icon: Map },
  ];

  const recentReports = [
    {
      id: 1,
      type: 'Video',
      title: 'Police Bribery at Traffic Signal',
      location: 'CP, New Delhi',
      status: 'Under Review',
      priority: 'High',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Complaint',
      title: 'Municipal Office Corruption',
      location: 'Sector 15, Gurgaon',
      status: 'Investigating',
      priority: 'Medium',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'Video',
      title: 'License Office Bribery',
      location: 'Dwarka, Delhi',
      status: 'Resolved',
      priority: 'High',
      time: '1 day ago'
    }
  ];

  const hotspots = [
    { name: 'Connaught Place', incidents: 45, severity: 'High', trend: 'up' },
    { name: 'Sector 14 Market', incidents: 32, severity: 'Medium', trend: 'down' },
    { name: 'Government Complex', incidents: 28, severity: 'High', trend: 'up' },
    { name: 'Transport Nagar', incidents: 19, severity: 'Low', trend: 'stable' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Investigating': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage corruption reports across the platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">Administrator</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.slice(0, 3).map((report) => (
                    <div key={report.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                          <p className="text-xs text-gray-500">{report.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {report.type}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                              {report.status}
                            </Badge>
                            <Badge className={`text-xs ${getPriorityColor(report.priority)}`}>
                              {report.priority}
                            </Badge>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{report.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Reports
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Review Pending Reports
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Map className="mr-2 h-4 w-4" />
                  View Hotspots Map
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Analytics Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Reports Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{report.title}</h3>
                          <Badge variant="outline">{report.type}</Badge>
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                          <Badge className={getPriorityColor(report.priority)}>{report.priority}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{report.location} • {report.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hotspots" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="h-5 w-5 mr-2" />
                Corruption Hotspots Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotspots.map((hotspot, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{hotspot.name}</h3>
                      <p className="text-sm text-gray-600">{hotspot.incidents} incidents reported</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={hotspot.severity === 'High' ? 'bg-red-100 text-red-800' : 
                                  hotspot.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-green-100 text-green-800'}
                      >
                        {hotspot.severity}
                      </Badge>
                      <div className="flex items-center">
                        {hotspot.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
                        {hotspot.trend === 'down' && <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />}
                        {hotspot.trend === 'stable' && <div className="h-4 w-4 bg-gray-400 rounded-full" />}
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Analytics Chart Placeholder</p>
                    <p className="text-sm text-gray-400">Reports over time visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Geographic Chart Placeholder</p>
                    <p className="text-sm text-gray-400">Incident distribution by location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;