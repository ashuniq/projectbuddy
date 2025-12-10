import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Onboarding } from './screens/Onboarding';
import { Auth } from './screens/Auth';
import { Home } from './screens/Home';
import { HelperDirectory } from './screens/HelperDirectory';
import { HelperProfile } from './screens/HelperProfile';
import { BookingFlow } from './screens/Booking';
import { Messages } from './screens/Messages';
import { HelperDashboard } from './screens/HelperDashboard';
import { Settings } from './screens/Settings';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          
          {/* Protected Routes (Logic handled in components for simplicity in this mock) */}
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<HelperDirectory />} />
          <Route path="/helper/:id" element={<HelperProfile />} />
          <Route path="/book/:helperId" element={<BookingFlow />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/dashboard" element={<HelperDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<div className="p-8 text-center">Notifications Screen Placeholder</div>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;