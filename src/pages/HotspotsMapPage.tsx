import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  Layers, 
  MapPin, 
  TrendingUp, 
  Calendar,
  AlertTriangle,
  Activity
} from 'lucide-react';

// Mock data for the map visualization
const mockHotspots = [
  { id: 1, lat: 28.6139, lng: 77.2090, count: 25, area: 'Connaught Place', lastIncident: '2 days ago', severity: 'high' },
  { id: 2, lat: 28.5355, lng: 77.3910, count: 18, area: 'Noida Sector 18', lastIncident: '1 day ago', severity: 'medium' },
  { id: 3, lat: 28.4595, lng: 77.0266, count: 32, area: 'Gurgaon City Center', lastIncident: '3 hours ago', severity: 'high' },
  { id: 4, lat: 28.6692, lng: 77.4538, count: 12, area: 'Ghaziabad', lastIncident: '1 week ago', severity: 'low' },
  { id: 5, lat: 28.7041, lng: 77.1025, count: 22, area: 'Rohini', lastIncident: '4 days ago', severity: 'medium' },
  { id: 6, lat: 28.5706, lng: 77.3272, count: 15, area: 'Lajpat Nagar', lastIncident: '2 days ago', severity: 'medium' },
];

const HotspotsMapPage = () => {
  const [viewMode, setViewMode] = useState<'cluster' | 'heatmap'>('cluster');
  const [hotspots, setHotspots] = useState(mockHotspots);
  const [loading, setLoading] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);
  const [stats, setStats] = useState({
    totalIncidents: 124,
    activeHotspots: 6,
    resolvedCases: 89,
    trendingUp: 15
  });

  useEffect(() => {
    fetchHotspots();
  }, []);

  const fetchHotspots = async () => {
    setLoading(true);
    try {
      // Using dummy data for now instead of API call
      // const response = await axios.get('/hotspots');
      // setHotspots(response.data);
      
      // Simulate API call
      setTimeout(() => {
        setHotspots(mockHotspots);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching hotspots:', error);
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive' as const;
      case 'medium': return 'secondary' as const;
      case 'low': return 'default' as const;
      default: return 'default' as const;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corruption Hotspots</h1>
          <p className="text-gray-600 mt-1">
            Interactive map showing corruption incident patterns and clusters
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'cluster' ? 'default' : 'outline'}
            onClick={() => setViewMode('cluster')}
            className="flex items-center space-x-2"
          >
            <MapPin className="h-4 w-4" />
            <span>Cluster View</span>
          </Button>
          <Button
            variant={viewMode === 'heatmap' ? 'default' : 'outline'}
            onClick={() => setViewMode('heatmap')}
            className="flex items-center space-x-2"
          >
            <Layers className="h-4 w-4" />
            <span>Heatmap View</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalIncidents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Map className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Hotspots</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeHotspots}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved Cases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolvedCases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trending Up</p>
                <p className="text-2xl font-bold text-gray-900">{stats.trendingUp}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Map className="h-5 w-5" />
                  <span>
                    {viewMode === 'cluster' ? 'Cluster Map' : 'Heatmap View'}
                  </span>
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {viewMode.toUpperCase()} MODE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="w-full h-full bg-gray-100 rounded-lg relative overflow-hidden">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <>
                    {/* Mock Map Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                      <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%" className="text-gray-400">
                          <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                      </div>
                    </div>

                    {/* Mock Map Markers/Heatmap */}
                    {viewMode === 'cluster' ? (
                      <div className="absolute inset-0">
                        {hotspots.map((hotspot, index) => (
                          <div
                            key={hotspot.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            style={{
                              left: `${20 + (index % 3) * 25}%`,
                              top: `${20 + Math.floor(index / 3) * 20}%`
                            }}
                            onClick={() => setSelectedHotspot(hotspot)}
                          >
                            <div className={`w-8 h-8 rounded-full ${getSeverityColor(hotspot.severity)} flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-110 transition-transform`}>
                              {hotspot.count}
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-gray-700 whitespace-nowrap bg-white px-2 py-1 rounded shadow">
                              {hotspot.area}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        {/* Mock Heatmap Overlay */}
                        <div className="absolute inset-0 opacity-60">
                          {hotspots.map((hotspot, index) => (
                            <div
                              key={hotspot.id}
                              className="absolute rounded-full bg-gradient-radial from-red-500 to-transparent opacity-30"
                              style={{
                                left: `${15 + (index % 3) * 25}%`,
                                top: `${15 + Math.floor(index / 3) * 20}%`,
                                width: `${Math.max(60, hotspot.count * 2)}px`,
                                height: `${Math.max(60, hotspot.count * 2)}px`,
                                transform: 'translate(-50%, -50%)'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">+</Button>
                        <Button variant="outline" size="sm">-</Button>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                      <h4 className="text-sm font-medium mb-2">Severity Level</h4>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-xs">High (20+)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="text-xs">Medium (10-19)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs">Low (1-9)</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hotspots List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Hotspots</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    selectedHotspot?.id === hotspot.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedHotspot(hotspot)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{hotspot.area}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {hotspot.count} incidents reported
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={getSeverityBadge(hotspot.severity)} className="text-xs">
                          {hotspot.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {hotspot.lastIncident}
                        </span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full ${getSeverityColor(hotspot.severity)} flex items-center justify-center text-white text-xs font-bold`}>
                      {hotspot.count}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report New Incident
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Map className="h-4 w-4 mr-2" />
                Export Map Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotspotsMapPage;
