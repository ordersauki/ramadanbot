import React, { useEffect, useState } from 'react';
import { User, AnalyticsData } from '../types';
import { fetchAllUsers, updateUserLimit, toggleUserBan, getAnalytics, adminLogin } from '../app/actions';
import { ArrowLeft, Ban, RefreshCcw, Search, ShieldCheck, TrendingUp, Users, Activity, Lock, Edit3, Save } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [activeTab, setActiveTab] = useState<'overview' | 'users'>('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [search, setSearch] = useState('');
  const [editLimitId, setEditLimitId] = useState<string | null>(null);
  const [tempLimit, setTempLimit] = useState<number>(1);

  // --- LOGIN LOGIC ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await adminLogin(password);
    if (res.success) {
        setIsAuthenticated(true);
        loadData();
    } else {
        alert("Invalid Admin Password");
    }
    setLoading(false);
  };

  // --- DATA LOADING ---
  const loadData = async () => {
    setLoading(true);
    const [usersData, analyticsData] = await Promise.all([
        fetchAllUsers(),
        getAnalytics()
    ]);
    setUsers(usersData);
    setAnalytics(analyticsData);
    setLoading(false);
  };

  // --- MUTATIONS ---
  const handleBan = async (id: string, currentStatus: boolean) => {
    await toggleUserBan(id, !currentStatus);
    loadData(); // Refresh
  };

  const saveLimit = async (id: string) => {
    await updateUserLimit(id, tempLimit);
    setEditLimitId(null);
    loadData();
  };

  if (!isAuthenticated) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-ios-bg dark:bg-black p-6 animate-fade-in">
            <div className="bg-white dark:bg-[#1C1C1E] p-8 rounded-3xl shadow-xl w-full max-w-sm text-center">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Lock size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Admin Access</h2>
                <p className="text-gray-500 mb-6 text-sm">Enter secure credentials to proceed.</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 bg-gray-100 dark:bg-zinc-800 rounded-xl outline-none focus:ring-2 ring-gray-900 dark:text-white"
                        placeholder="Admin Password"
                    />
                    <button type="submit" disabled={loading} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl">
                        {loading ? <LoadingSpinner size="sm" color="text-current" /> : "Unlock Dashboard"}
                    </button>
                </form>
                <button onClick={onBack} className="mt-6 text-sm text-gray-500 hover:underline">Return to App</button>
            </div>
        </div>
    );
  }

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-black animate-fade-in">
      {/* Navbar */}
      <div className="bg-white dark:bg-[#1C1C1E] border-b border-gray-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors dark:text-white">
                <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold dark:text-white">Admin Console</h1>
        </div>
        <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-zinc-600 shadow-sm dark:text-white' : 'text-gray-500'}`}
            >
                Overview
            </button>
            <button 
                onClick={() => setActiveTab('users')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-white dark:bg-zinc-600 shadow-sm dark:text-white' : 'text-gray-500'}`}
            >
                Users
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        
        {activeTab === 'overview' && analytics && (
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl text-white shadow-lg">
                        <div className="flex items-center gap-2 opacity-80 mb-2">
                            <Users size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Total Users</span>
                        </div>
                        <p className="text-3xl font-bold">{analytics.totalUsers}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-2xl text-white shadow-lg">
                        <div className="flex items-center gap-2 opacity-80 mb-2">
                            <TrendingUp size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Total Gens</span>
                        </div>
                        <p className="text-3xl font-bold">{analytics.totalGenerations}</p>
                    </div>
                    <div className="bg-white dark:bg-[#1C1C1E] p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-2 text-green-500 mb-2">
                            <Activity size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Active Today</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.activeToday}</p>
                    </div>
                    <div className="bg-white dark:bg-[#1C1C1E] p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-2 text-red-500 mb-2">
                            <Ban size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Banned</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.bannedUsers}</p>
                    </div>
                </div>

                {/* Recent Activity Log */}
                <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
                        <h3 className="font-bold text-gray-700 dark:text-gray-300">Live Activity Feed</h3>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                        {analytics.recentGenerations.map((gen) => (
                            <div key={gen.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{gen.user_name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Generated: "{gen.topic}"</p>
                                </div>
                                <span className="text-[10px] text-gray-400 font-mono">
                                    {new Date(gen.created_at).toLocaleTimeString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'users' && (
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search users by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white dark:bg-[#1C1C1E] pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 outline-none focus:ring-2 ring-ios-blue dark:text-white"
                    />
                </div>

                <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-zinc-800/50 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Stats</th>
                                <th className="p-4">Daily Limit</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900 dark:text-white">{user.name}</div>
                                        <div className="text-xs text-gray-400">ID: ...{user.id.slice(-6)}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm dark:text-gray-300">🔥 {user.streak}</div>
                                        <div className="text-xs text-gray-400">Total: {user.generation_count}</div>
                                    </td>
                                    <td className="p-4">
                                        {editLimitId === user.id ? (
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="number" 
                                                    value={tempLimit}
                                                    onChange={(e) => setTempLimit(parseInt(e.target.value))}
                                                    className="w-16 p-1 bg-gray-100 dark:bg-zinc-700 rounded border border-gray-300 dark:border-zinc-600 text-sm"
                                                />
                                                <button onClick={() => saveLimit(user.id)} className="text-green-600">
                                                    <Save size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-sm font-bold">
                                                    {user.rate_limit_override || 1}
                                                </span>
                                                <button 
                                                    onClick={() => { setEditLimitId(user.id); setTempLimit(user.rate_limit_override || 1); }}
                                                    className="text-gray-400 hover:text-blue-500"
                                                >
                                                    <Edit3 size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handleBan(user.id, user.is_banned)}
                                            className={`p-2 rounded-lg transition-colors ${user.is_banned 
                                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                                                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
                                        >
                                            {user.is_banned ? "Unban" : <Ban size={18} />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;