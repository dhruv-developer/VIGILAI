
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  MapPin, 
  User, 
  Eye, 
  Download,
  Share2,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Scale,
  Shield,
  Printer
} from 'lucide-react';

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setComplaint({
        id: 'CMP-1704067200',
        title: 'Traffic Police Bribery Incident',
        category: 'Police Corruption',
        description: 'A traffic police officer at the intersection near Connaught Place demanded Rs. 500 to avoid issuing a challan for a minor traffic violation. The officer threatened to impound the vehicle if payment was not made immediately. This incident occurred on January 15th around 3:30 PM when traffic was heavy.',
        status: 'under_review',
        urgency: 'high',
        location: 'Connaught Place, New Delhi',
        incidentDate: '2024-01-15',
        filedDate: '2024-01-15T15:30:00Z',
        involvedPersons: 'Traffic Police Constable - Badge No. 4521 (Name: Not disclosed), Senior officer present but did not intervene',
        attachments: ['video_evidence.mp4', 'photo_badge.jpg'],
        legalAnalysis: {
          applicableSections: [
            'Prevention of Corruption Act, 1988 - Section 7 (Public servant taking undue advantage)',
            'Indian Penal Code - Section 161 (Public servant taking illegal gratification)',
            'Motor Vehicle Act, 1988 - Section 132 (Improper collection of fee)'
          ],
          similarCases: 15,
          precedents: [
            'State vs. Constable Rajesh Kumar (2023) - Similar bribery case resulted in suspension',
            'Delhi HC judgment on traffic police corruption (2022)'
          ]
        },
        timeline: [
          {
            date: '2024-01-15T15:30:00Z',
            status: 'filed',
            description: 'Complaint filed and registered',
            officer: 'System'
          },
          {
            date: '2024-01-15T16:00:00Z',
            status: 'acknowledged',
            description: 'Complaint acknowledged by Anti-Corruption Department',
            officer: 'Inspector S. Sharma'
          },
          {
            date: '2024-01-16T09:00:00Z',
            status: 'under_review',
            description: 'Investigation assigned to field officer',
            officer: 'Sub-Inspector A. Kumar'
          },
          {
            date: '2024-01-17T14:30:00Z',
            status: 'evidence_review',
            description: 'Video evidence reviewed and verified',
            officer: 'Forensic Team'
          }
        ],
        currentOfficer: 'Sub-Inspector A. Kumar',
        estimatedCompletion: '2024-01-25',
        firNumber: 'FIR-2024-CP-0115',
        views: 23,
        updates: 4
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filed': return 'secondary';
      case 'acknowledged': return 'outline';
      case 'under_review': return 'default';
      case 'evidence_review': return 'secondary';
      case 'resolved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Not Found</h2>
          <p className="text-gray-600">The requested complaint could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{complaint.title}</h1>
          <p className="text-gray-600 mt-1">Complaint ID: {complaint.id}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant={getStatusColor(complaint.status)} className="text-sm">
                {complaint.status.replace('_', ' ').toUpperCase()}
              </Badge>
              <Badge variant={getUrgencyColor(complaint.urgency)} className="text-sm">
                {complaint.urgency.toUpperCase()} PRIORITY
              </Badge>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Est. completion: {new Date(complaint.estimatedCompletion).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Assigned to</p>
              <p className="font-medium">{complaint.currentOfficer}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complaint Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Complaint Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Incident Date
                  </h4>
                  <p className="text-gray-700">{new Date(complaint.incidentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location
                  </h4>
                  <p className="text-gray-700">{complaint.location}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Involved Persons
                </h4>
                <p className="text-gray-700">{complaint.involvedPersons}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Category</h4>
                <Badge variant="outline">{complaint.category}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Legal Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2" />
                Legal Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Applicable Legal Sections</h4>
                <div className="space-y-2">
                  {complaint.legalAnalysis.applicableSections.map((section, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900">{section}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Legal Precedents</h4>
                <div className="space-y-2">
                  {complaint.legalAnalysis.precedents.map((precedent, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{precedent}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{complaint.legalAnalysis.similarCases}</div>
                  <div className="text-sm text-gray-600">Similar Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{complaint.views}</div>
                  <div className="text-sm text-gray-600">Case Views</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Case Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaint.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(event.date).toLocaleString()} • {event.officer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Case Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">FIR Number</span>
                <span className="text-sm font-medium">{complaint.firNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Filed Date</span>
                <span className="text-sm font-medium">
                  {new Date(complaint.filedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Updates</span>
                <span className="text-sm font-medium">{complaint.updates}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Views</span>
                <span className="text-sm font-medium">{complaint.views}</span>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evidence & Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {complaint.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{attachment}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Officer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Request Update
              </Button>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                If you have questions about your complaint or need assistance:
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsPage;
