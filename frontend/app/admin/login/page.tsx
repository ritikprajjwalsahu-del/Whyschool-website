'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { getApiUrl, safeFetchJson } from '@/lib/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@whyschool.in');
  const [password, setPassword] = useState('Admin@WhySchool2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = getApiUrl('/api/admin/login');
      const result = await safeFetchJson(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!result.ok) {
        throw new Error(result.data?.error || 'Login failed. Invalid admin credentials.');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5722]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#131A2B]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF5722]/15 border border-[#FF5722]/30 mb-4 text-[#FF5722]">
            <ShieldCheck size={32} />
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <span className="text-2xl font-bold tracking-tight text-white">WhySchool</span>
            <div className="w-[7px] h-[7px] bg-[#FF5722] rounded-full self-baseline translate-y-[2px]" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Super Admin Portal</h1>
          <p className="text-sm text-slate-400">Sign in to manage submissions and institutional leads</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@whyschool.in"
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#FF5722] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-[#FF5722] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#FF5722] text-white font-bold text-sm hover:bg-[#FF7043] transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#FF5722]/20"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
          Default Testing Login: <span className="text-slate-300">admin@whyschool.in</span> / <span className="text-slate-300">Admin@WhySchool2026</span>
        </div>
      </div>
    </div>
  );
}
