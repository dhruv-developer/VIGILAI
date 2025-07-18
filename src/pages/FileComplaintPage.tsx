
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Download,
  Calendar,
  MapPin,
  User,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const FileComplaintPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    incidentDate: '',
    involvedPersons: '',
    category: '',
    urgency: 'medium',
    attachments: ''
  });
  
  const [previewData, setPreviewData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scamDetection, setScamDetection] = useState(null);
  const { showSuccess, showError, showInfo } = useNotification();

  const categories = [
    'Police Corruption',
    'Government Office Bribery',
    'Healthcare Corruption',
    'Education Sector',
    'Public Works',
    'Traffic Violations',
    'Document Fraud',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-red-500' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const analyzeForScams = async (description: string) => {
    // Simulate AI scam detection
    const scamKeywords = ['advance fee', 'wire transfer', 'urgent payment', 'lottery', 'inheritance'];
    const hasScamIndicators = scamKeywords.some(keyword => 
      description.toLowerCase().includes(keyword)
    );

    return {
      isScam: hasScamIndicators,
      confidence: hasScamIndicators ? 0.85 : 0.15,
      indicators: hasScamIndicators ? ['Unusual payment request', 'Urgency tactics'] : []
    };
  };

  const generatePreview = async () => {
    if (!formData.title || !formData.description) {
      showError('Please fill in title and description');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Scam detection
      const scamResult = await analyzeForScams(formData.description);
      setScamDetection(scamResult);

      // Generate formatted complaint
      const preview = {
        complaintId: 'CMP-' + Date.now(),
        formattedText: `
OFFICIAL COMPLAINT

Complaint ID: CMP-${Date.now()}
Date Filed: ${new Date().toLocaleDateString()}

INCIDENT DETAILS:
Title: ${formData.title}
Category: ${formData.category}
Location: ${formData.location || 'Not specified'}
Date of Incident: ${formData.incidentDate || 'Not specified'}
Urgency Level: ${formData.urgency.toUpperCase()}

DESCRIPTION:
${formData.description}

INVOLVED PERSONS:
${formData.involvedPersons || 'Not specified'}

LEGAL ANALYSIS:
Based on the provided information, this complaint may fall under the following legal provisions:
- Prevention of Corruption Act, 1988
- Indian Penal Code Sections 161-169 (Public servants taking gratification)
- Right to Information Act, 2005

RECOMMENDED ACTION:
1. Immediate investigation required
2. Collection of additional evidence
3. Interview with complainant
4. Review of relevant documentation

This complaint has been registered and will be processed according to established protocols.
        `,
        legalSections: [
          'Prevention of Corruption Act, 1988 - Section 7',
          'Indian Penal Code - Section 161',
          'Right to Information Act, 2005'
        ],
        similarCases: 3,
        estimatedProcessingTime: '7-14 days'
      };

      setPreviewData(preview);
      showSuccess('Complaint formatted and analyzed successfully!');
      
    } catch (error) {
      showError('Failed to generate preview. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const submitComplaint = async () => {
    if (!previewData) {
      showError('Please generate preview first');
      return;
    }

    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccess('Complaint submitted successfully! FIR generated and email sent.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        incidentDate: '',
        involvedPersons: '',
        category: '',
        urgency: 'medium',
        attachments: ''
      });
      setPreviewData(null);
      setScamDetection(null);
      
    } catch (error) {
      showError('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">File Complaint</h1>
        <p className="text-gray-600 mt-2">
          Submit a formal complaint with AI-powered formatting and legal analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Complaint Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Complaint Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brief title describing the incident"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed account of the incident..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Incident location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Incident Date</Label>
                  <Input
                    id="incidentDate"
                    name="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="involvedPersons">Involved Persons</Label>
                <Textarea
                  id="involvedPersons"
                  name="involvedPersons"
                  value={formData.involvedPersons}
                  onChange={handleInputChange}
                  placeholder="Names, positions, and details of involved persons..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <div className="flex space-x-3">
                  {urgencyLevels.map(level => (
                    <label key={level.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={formData.urgency === level.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full ${level.color} mr-2 ${
                        formData.urgency === level.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}></div>
                      <span className="text-sm">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button 
                onClick={generatePreview}
                disabled={isGenerating || !formData.title || !formData.description}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing & Formatting...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate AI Preview
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Analysis */}
        <div className="space-y-6">
          {/* Scam Detection */}
          {scamDetection && (
            <Card className={scamDetection.isScam ? 'border-red-200' : 'border-green-200'}>
              <CardHeader>
                <CardTitle className={`flex items-center text-lg ${scamDetection.isScam ? 'text-red-700' : 'text-green-700'}`}>
                  <Shield className="h-5 w-5 mr-2" />
                  Security Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg ${scamDetection.isScam ? 'bg-red-50' : 'bg-green-50'}`}>
                  <div className="flex items-center mb-2">
                    {scamDetection.isScam ? (
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    )}
                    <span className={`font-medium ${scamDetection.isScam ? 'text-red-700' : 'text-green-700'}`}>
                      {scamDetection.isScam ? 'Potential Scam Detected' : 'No Scam Indicators'}
                    </span>
                  </div>
                  <p className={`text-sm ${scamDetection.isScam ? 'text-red-600' : 'text-green-600'}`}>
                    Confidence: {Math.round(scamDetection.confidence * 100)}%
                  </p>
                  {scamDetection.indicators.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-red-700 mb-1">Indicators:</p>
                      <ul className="text-sm text-red-600 list-disc list-inside">
                        {scamDetection.indicators.map((indicator, index) => (
                          <li key={index}>{indicator}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview */}
          {previewData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Formatted Complaint Preview
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                    {previewData.formattedText}
                  </pre>
                </div>

                {/* Legal Analysis */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Applicable Legal Sections:</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewData.legalSections.map((section, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Similar Cases:</span>
                      <span className="ml-2 text-blue-600">{previewData.similarCases}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Est. Processing:</span>
                      <span className="ml-2 text-green-600">{previewData.estimatedProcessingTime}</span>
                    </div>
                  </div>
                </div>

                <Button onClick={submitComplaint} className="w-full mt-6">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Official Complaint
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filing Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Be Specific</p>
                  <p className="text-xs text-gray-600">Include exact dates, times, and locations</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Provide Evidence</p>
                  <p className="text-xs text-gray-600">Upload supporting documents or videos</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Stay Safe</p>
                  <p className="text-xs text-gray-600">Your identity is protected throughout the process</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FileComplaintPage;
