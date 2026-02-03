import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PasswordGenerator from './pages/tools/PasswordGenerator';
import QRCodeGenerator from './pages/tools/QRCodeGenerator';
import UUIDGenerator from './pages/tools/UUIDGenerator';
import HashGenerator from './pages/tools/HashGenerator';
import LoremGenerator from './pages/tools/LoremGenerator';
import ColorGenerator from './pages/tools/ColorGenerator';
import IdentityGenerator from './pages/tools/IdentityGenerator';
import AddressGenerator from './pages/tools/AddressGenerator';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import LanguageRedirector from './components/LanguageRedirector';

import ScrollToTop from './components/ScrollToTop';

// Placeholder components for tools not yet implemented to avoid build errors
// We will replace these with real components in the next steps
const Placeholder = ({ name }) => <div className="p-10 text-center text-2xl font-bold text-slate-500">TODO: {name}</div>;

// In a real flow, I'd create the files first or import them as I go. 
// However, to keep App.jsx clean, I will assume the files exist or create empty ones now.
// Actually, I will point them to the files I am ABOUT to create to avoid import errors if run immediately.
// For now, let's create the App structure.

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools/password" element={<PasswordGenerator />} />
          <Route path="tools/password/:variant" element={<PasswordGenerator />} />

          <Route path="tools/qr-code" element={<QRCodeGenerator />} />
          <Route path="tools/qr-code/:variant" element={<QRCodeGenerator />} />

          <Route path="tools/uuid" element={<UUIDGenerator />} />
          <Route path="tools/uuid/:variant" element={<UUIDGenerator />} />

          <Route path="tools/hash" element={<HashGenerator />} />
          <Route path="tools/hash/:variant" element={<HashGenerator />} />

          <Route path="tools/lorem" element={<LoremGenerator />} />
          <Route path="tools/color" element={<ColorGenerator />} />
          <Route path="tools/identity" element={<IdentityGenerator />} />
          <Route path="tools/address" element={<AddressGenerator />} />

          {/* Legal Pages */}
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms-of-use" element={<Terms />} />
        </Route>

        {/* Root redirect */}
        <Route path="/" element={<LanguageRedirector />} />

        {/* Catch-all for non-localized routes - Redirect to LanguageRedirector to handle default lang */}
        <Route path="*" element={<LanguageRedirector />} />
      </Routes>
    </Router>
  );
}

export default App;
