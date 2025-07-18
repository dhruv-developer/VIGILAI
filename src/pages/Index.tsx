
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import OTPVerificationPage from './OTPVerificationPage';
import DashboardPage from './DashboardPage';
import UploadVideoPage from './UploadVideoPage';
import MyRecordingsPage from './MyRecordingsPage';
import FileComplaintPage from './FileComplaintPage';
import ComplaintDetailsPage from './ComplaintDetailsPage';
import HotspotsMapPage from './HotspotsMapPage';
import ProfilePage from './ProfilePage';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';
import { Toaster } from 'sonner';

const Index = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<OTPVerificationPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/upload-video" element={
              <PrivateRoute>
                <Layout>
                  <UploadVideoPage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/my-recordings" element={
              <PrivateRoute>
                <Layout>
                  <MyRecordingsPage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/file-complaint" element={
              <PrivateRoute>
                <Layout>
                  <FileComplaintPage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/complaint/:id" element={
              <PrivateRoute>
                <Layout>
                  <ComplaintDetailsPage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/hotspots-map" element={
              <PrivateRoute>
                <Layout>
                  <HotspotsMapPage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </PrivateRoute>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default Index;
