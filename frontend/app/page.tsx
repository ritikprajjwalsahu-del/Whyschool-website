'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VennSection from '@/components/VennSection';
import PartnerInstitutions from '@/components/PartnerInstitutions';
import K12ProgramsSection from '@/components/K12ProgramsSection';
import CollegeProgramsSection from '@/components/CollegeProgramsSection';
import ImpactCalculator from '@/components/ImpactCalculator';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import InquiryModal from '@/components/InquiryModal';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Institutional Inquiry');
  const [modalDetails, setModalDetails] = useState<any>({});

  const handleOpenModal = (type = 'Institutional Inquiry', details = {}) => {
    setModalType(type);
    setModalDetails(details);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0D11] text-white flex flex-col font-sans selection:bg-[#FF6500] selection:text-white">
      {/* Navbar */}
      <Navbar onOpenInquiryModal={handleOpenModal} />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection onOpenInquiryModal={handleOpenModal} />
        <VennSection onOpenInquiryModal={handleOpenModal} />
        <PartnerInstitutions onOpenInquiryModal={handleOpenModal} />
        <K12ProgramsSection onOpenInquiryModal={handleOpenModal} />
        <CollegeProgramsSection onOpenInquiryModal={handleOpenModal} />
        <ImpactCalculator onOpenInquiryModal={handleOpenModal} />
        <CtaSection onOpenInquiryModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Public Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        inquiryType={modalType}
        initialDetails={modalDetails}
      />
    </div>
  );
}
