import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Square, 
  Play,
  Pause,
  MapPin, 
  Calendar, 
  FileText,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Camera,
  Download
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const RecordVideoPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    incidentDate: '',
    tags: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const { showSuccess, showError, showInfo } = useNotification();

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      showSuccess('Camera initialized successfully');
    } catch (error) {
      showError('Unable to access camera. Please check permissions.');
      console.error('Error accessing camera:', error);
    }
  };

  const startRecording = async () => {
    if (!stream) {
      await startCamera();
      return;
    }

    try {
      chunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);
        showSuccess('Recording saved successfully');
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      showInfo('Recording started');
    } catch (error) {
      showError('Failed to start recording');
      console.error('Recording error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          });
          showSuccess('Location detected successfully');
          setLocationLoading(false);
        },
        (error) => {
          showError('Unable to get location. Please enter manually.');
          setLocationLoading(false);
        }
      );
    } else {
      showError('Geolocation is not supported by this browser');
      setLocationLoading(false);
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `corruption-evidence-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSuccess('Recording downloaded successfully');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recordedBlob) {
      showError('Please record a video first');
      return;
    }

    if (!formData.title || !formData.description) {
      showError('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      // In a real app, this would upload to your API
      const uploadData = new FormData();
      uploadData.append('video', recordedBlob, 'evidence.webm');
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('location', formData.location);
      uploadData.append('latitude', formData.latitude);
      uploadData.append('longitude', formData.longitude);
      uploadData.append('incidentDate', formData.incidentDate);
      uploadData.append('tags', formData.tags);

      // Simulate API call
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        showSuccess('Video uploaded successfully! SMS notification sent to authorities.');
        
        // Reset form
        setRecordedBlob(null);
        setFormData({
          title: '',
          description: '',
          location: '',
          latitude: '',
          longitude: '',
          incidentDate: '',
          tags: ''
        });
        setRecordingTime(0);
        
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 2000);
      }, 3000);

    } catch (error) {
      showError('Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Record Video Evidence</h1>
        <p className="text-gray-600 mt-2">
          Record video evidence directly in your browser with location data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Recording Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Video Recording
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Video Preview */}
                <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        videoRef.current.play();
                      }
                    }}
                  />
                  
                  {!stream && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Click "Start Camera" to begin</p>
                      </div>
                    </div>
                  )}
                  
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        <span className="text-sm font-medium">REC</span>
                      </div>
                      <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                        <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center space-x-4">
                  {!stream ? (
                    <Button onClick={startCamera} className="flex items-center space-x-2">
                      <Camera className="h-4 w-4" />
                      <span>Start Camera</span>
                    </Button>
                  ) : (
                    <>
                      {!isRecording ? (
                        <Button onClick={startRecording} className="flex items-center space-x-2">
                          <Video className="h-4 w-4" />
                          <span>Start Recording</span>
                        </Button>
                      ) : (
                        <>
                          <Button onClick={pauseRecording} variant="outline">
                            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                          </Button>
                          <Button onClick={stopRecording} variant="destructive">
                            <Square className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Recorded Video Preview */}
                {recordedBlob && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-green-900">
                            Recording Complete
                          </p>
                          <p className="text-xs text-green-700">
                            {formatFileSize(recordedBlob.size)} • {formatTime(recordingTime)}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={downloadRecording}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Evidence Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Incident Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Brief title describing the incident"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed information about what happened..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter location or use GPS"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getCurrentLocation}
                      disabled={locationLoading}
                    >
                      {locationLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Coordinates (if GPS used) */}
                {formData.latitude && formData.longitude && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        placeholder="Latitude"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        placeholder="Longitude"
                        readOnly
                      />
                    </div>
                  </div>
                )}

                {/* Incident Date */}
                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Incident Date</Label>
                  <Input
                    id="incidentDate"
                    name="incidentDate"
                    type="datetime-local"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g., police, bribery, traffic, corruption"
                  />
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isUploading || !recordedBlob}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading Evidence...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Submit Evidence
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Recording Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recording Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Stable Recording</p>
                  <p className="text-xs text-gray-600">Keep your device steady for clear footage</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Good Lighting</p>
                  <p className="text-xs text-gray-600">Ensure adequate lighting for clear visibility</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Audio Quality</p>
                  <p className="text-xs text-gray-600">Record clear audio to capture conversations</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Safety First</p>
                  <p className="text-xs text-gray-600">Only record when it's safe to do so</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Your recorded videos are processed locally and encrypted before upload. Your identity remains protected.
              </p>
              <p className="text-sm text-gray-600">
                Authorities will be notified automatically while maintaining your anonymity.
              </p>
            </CardContent>
          </Card>

          {/* Contact Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                If you need assistance or have concerns about your safety:
              </p>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecordVideoPage;