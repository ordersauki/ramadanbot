'use client';

import React from 'react';
import AdminDashboard from '../../components/AdminDashboard';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-black">
      <AdminDashboard onBack={() => router.push('/')} />
    </div>
  );
}