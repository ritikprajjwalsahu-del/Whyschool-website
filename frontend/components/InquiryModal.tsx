'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { getApiUrl, safeFetchJson } from '@/lib/api';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryType?: string;
  initialDetails?: {
    selectedPods?: string[];
    studentCapacity?: string;
    programFocus?: string;
    institutionType?: string;
  };
}

export default function InquiryModal({
  isOpen,
  onClose,
  inquiryType = 'General Institutional Inquiry',
  initialDetails = {},
}: InquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [institutionType, setInstitutionType] = useState('College');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialDetails.institutionType) {
      setInstitutionType(initialDetails.institutionType);
    }
  }, [initialDetails]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        name,
        email,
        phone,
        institutionName,
        institutionType,
        inquiryType,
        programFocus: initialDetails.programFocus || null,
        studentCapacity: initialDetails.studentCapacity || null,
        selectedPods: initialDetails.selectedPods ? initialDetails.selectedPods.join(', ') : null,
        message,
      };

      // Try primary backend URL first, fallback to relative URL
      let apiUrl = getApiUrl('/api/inquiries');
      let result = await safeFetchJson(apiUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!result.ok && result.data?.error?.includes('Network error')) {
        // Fallback attempt to relative Next.js endpoint
        result = await safeFetchJson('/api/inquiries', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      if (!result.ok) {
        throw new Error(result.data?.error || 'Failed to submit inquiry request.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setInstitutionName('');
        setMessage('');
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#131A2B] border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6500]/15 text-[#FF7A1A] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>{inquiryType}</span>
          </div>
          <h3 className="text-2xl font-black text-white">Partner With WhySchool.</h3>
          <p className="text-xs text-slate-400 mt-1">
            Submit your institution details and our leadership team will reach out within 24 hours.
          </p>
        </div>

        {/* Pre-selected pods indicator */}
        {initialDetails.selectedPods && initialDetails.selectedPods.length > 0 && (
          <div className="p-3 rounded-xl bg-[#0A0E1A] border border-white/10 text-xs">
            <span className="text-slate-400 font-semibold block mb-1">Selected Pods:</span>
            <div className="flex flex-wrap gap-1.5">
              {initialDetails.selectedPods.map((pod, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-[#FF6500]/20 text-[#FF7A1A] font-bold">
                  {pod}
                </span>
              ))}
            </div>
          </div>
        )}

        {success ? (
          <div className="p-8 text-center space-y-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 size={48} className="text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-white">Inquiry Received!</h4>
            <p className="text-xs text-slate-300">
              Thank you for reaching out. A WhySchool institutional strategist will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                ⚠️ {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Rajesh Sharma"
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF6500]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="r.sharma@institution.edu"
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF6500]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF6500]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Institution Type
                </label>
                <select
                  value={institutionType}
                  onChange={(e) => setInstitutionType(e.target.value)}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF6500]"
                >
                  <option value="College">College / University</option>
                  <option value="K12">K-12 School</option>
                  <option value="Brand">Corporate / Brand Partner</option>
                  <option value="Other">Other Organization</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Institution Name
              </label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="e.g. IIT Bhubaneswar / SAI International"
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF6500]"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Message or Specific Requirements
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your campus goals or preferred schedule..."
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF6500]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF6500]/25 disabled:opacity-50"
            >
              {submitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Submit Inquiry Request</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
