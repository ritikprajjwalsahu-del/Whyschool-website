'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Search,
  Download,
  LogOut,
  RefreshCw,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Mail,
  Phone,
} from 'lucide-react';
import { getApiUrl, safeFetchJson } from '@/lib/api';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  institutionName?: string;
  institutionType?: string;
  inquiryType: string;
  programFocus?: string;
  studentCapacity?: string;
  selectedPods?: string;
  message?: string;
  status: 'NEW' | 'IN_REVIEW' | 'CONTACTED' | 'ARCHIVED';
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (statusFilter !== 'ALL') query.append('status', statusFilter);
      if (search) query.append('search', search);

      const apiUrl = getApiUrl(`/api/admin/inquiries?${query.toString()}`);
      const result = await safeFetchJson(apiUrl);
      if (result.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (result.ok && result.data.success) {
        setInquiries(result.data.data);
      }
    } catch (err: any) {
      setError('Failed to load inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const apiUrl = getApiUrl(`/api/admin/inquiries/${id}`);
      const result = await safeFetchJson(apiUrl, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      if (result.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const apiUrl = getApiUrl(`/api/admin/inquiries/${id}`);
      const result = await safeFetchJson(apiUrl, { method: 'DELETE' });
      if (result.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  };

  const handleLogout = async () => {
    const apiUrl = getApiUrl('/api/admin/logout');
    await safeFetchJson(apiUrl, { method: 'POST' });
    router.push('/admin/login');
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Institution', 'Type', 'Inquiry Type', 'Status', 'Submitted At'];
    const rows = inquiries.map((item) => [
      item.id,
      `"${item.name}"`,
      `"${item.email}"`,
      `"${item.phone || ''}"`,
      `"${item.institutionName || ''}"`,
      `"${item.institutionType || ''}"`,
      `"${item.inquiryType}"`,
      `"${item.status}"`,
      `"${new Date(item.createdAt).toLocaleString()}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `WhySchool_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter((i) => i.status === 'NEW').length;
  const inReviewLeads = inquiries.filter((i) => i.status === 'IN_REVIEW').length;
  const contactedLeads = inquiries.filter((i) => i.status === 'CONTACTED').length;

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white font-sans flex flex-col">
      <header className="border-b border-white/10 bg-[#131A2B]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight text-white">WhySchool</span>
            <div className="w-[6px] h-[6px] bg-[#FF5722] rounded-full self-baseline translate-y-[2px]" />
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#FF5722]/20 text-[#FF5722] border border-[#FF5722]/40 font-semibold uppercase tracking-wider">
            Super Admin
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition"
            title="Refresh Leads"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={exportCSV}
            className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-2 border border-white/10 transition"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleLogout}
            className="py-2 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2 border border-red-500/30 transition"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#131A2B] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Leads</p>
              <h3 className="text-3xl font-bold text-white mt-1">{totalLeads}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users size={24} />
            </div>
          </div>

          <div className="bg-[#131A2B] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Submissions</p>
              <h3 className="text-3xl font-bold text-[#FF5722] mt-1">{newLeads}</h3>
            </div>
            <div className="p-3 rounded-xl bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20">
              <Clock size={24} />
            </div>
          </div>

          <div className="bg-[#131A2B] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In Review</p>
              <h3 className="text-3xl font-bold text-amber-400 mt-1">{inReviewLeads}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Filter size={24} />
            </div>
          </div>

          <div className="bg-[#131A2B] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contacted</p>
              <h3 className="text-3xl font-bold text-emerald-400 mt-1">{contactedLeads}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="bg-[#131A2B] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by institution, contact name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#FF5722]"
            />
          </form>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase">Status:</span>
            {['ALL', 'NEW', 'IN_REVIEW', 'CONTACTED', 'ARCHIVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition ${
                  statusFilter === st
                    ? 'bg-[#FF5722] text-white'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#131A2B] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0A0E1A] border-b border-white/10 text-xs uppercase font-semibold text-slate-400 tracking-wider">
                <tr>
                  <th className="py-4 px-6">Lead Details</th>
                  <th className="py-4 px-6">Institution</th>
                  <th className="py-4 px-6">Type & Focus</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Submitted</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Loading submissions...
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No lead submissions found.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Mail size={12} /> {item.email}
                        </div>
                        {item.phone && (
                          <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <Phone size={12} /> {item.phone}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-200">
                          {item.institutionName || 'N/A'}
                        </div>
                        <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300 mt-1">
                          {item.institutionType || 'Other'}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="text-xs font-semibold text-[#FF5722]">
                          {item.inquiryType}
                        </div>
                        {item.programFocus && (
                          <div className="text-xs text-slate-400 truncate max-w-[200px] mt-0.5">
                            {item.programFocus}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                            item.status === 'NEW'
                              ? 'bg-[#FF5722]/20 border-[#FF5722]/40 text-[#FF5722]'
                              : item.status === 'IN_REVIEW'
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                              : item.status === 'CONTACTED'
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                              : 'bg-slate-500/20 border-slate-500/40 text-slate-400'
                          }`}
                        >
                          <option value="NEW" className="bg-[#131A2B] text-white">NEW</option>
                          <option value="IN_REVIEW" className="bg-[#131A2B] text-white">IN REVIEW</option>
                          <option value="CONTACTED" className="bg-[#131A2B] text-white">CONTACTED</option>
                          <option value="ARCHIVED" className="bg-[#131A2B] text-white">ARCHIVED</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-400 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setSelectedInquiry(item)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                          title="View Full Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                          title="Delete Submission"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131A2B] border border-white/10 rounded-3xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#FF5722]">
                  {selectedInquiry.inquiryType}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedInquiry.name}</h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[#0A0E1A] p-4 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-semibold block">Email Address</span>
                <span className="text-white font-medium">{selectedInquiry.email}</span>
              </div>
              <div className="bg-[#0A0E1A] p-4 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-semibold block">Phone Number</span>
                <span className="text-white font-medium">{selectedInquiry.phone || 'N/A'}</span>
              </div>
              <div className="bg-[#0A0E1A] p-4 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-semibold block">Institution Name</span>
                <span className="text-white font-medium">{selectedInquiry.institutionName || 'N/A'}</span>
              </div>
              <div className="bg-[#0A0E1A] p-4 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-semibold block">Institution Type</span>
                <span className="text-white font-medium">{selectedInquiry.institutionType || 'Other'}</span>
              </div>
            </div>

            {selectedInquiry.studentCapacity && (
              <div className="bg-[#0A0E1A] p-4 rounded-xl border border-white/5 text-sm">
                <span className="text-xs text-slate-400 font-semibold block">Student Capacity</span>
                <span className="text-white font-medium">{selectedInquiry.studentCapacity}</span>
              </div>
            )}

            {selectedInquiry.selectedPods && (
              <div className="bg-[#0A0E1A] p-4 rounded-xl border border-white/5 text-sm">
                <span className="text-xs text-slate-400 font-semibold block">Selected Pods / Programs</span>
                <span className="text-white font-medium">{selectedInquiry.selectedPods}</span>
              </div>
            )}

            {selectedInquiry.message && (
              <div className="bg-[#0A0E1A] p-4 rounded-xl border border-white/5 text-sm">
                <span className="text-xs text-slate-400 font-semibold block mb-1">Inquiry Message</span>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Submitted on {new Date(selectedInquiry.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="py-2 px-5 rounded-xl bg-[#FF5722] text-white font-bold text-xs hover:bg-[#FF7043]"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
