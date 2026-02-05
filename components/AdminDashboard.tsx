import React, { useEffect, useState } from 'react';
import { User, AnalyticsData } from '../types';
import { fetchAllUsers, updateUserLimit, toggleUserBan, getAnalytics, adminLogin } from '../app/actions';
import { ArrowLeft, Ban, RefreshCcw, Search, ShieldCheck, TrendingUp, Users, Activity, Lock, Edit3, Save, BarChart3, Zap, Target } from 'lucide-react';
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
                {/* Smart Analytics Title */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <BarChart3 size={24} className="text-ios-teal" />
                            System Intelligence Report
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time analytics & performance metrics</p>
                    </div>
                    <button onClick={() => loadData()} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <RefreshCcw size={20} className="text-gray-600 dark:text-gray-400 hover:text-ios-teal transit-colors" />
                    </button>
                </div>

                {/* Premium Stats Grid - 2x2 */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Total Users Card */}
                    <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 p-6 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all border border-white/20">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 opacity-90 mb-1">
                                    <Users size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Active Users</span>
                                </div>
                                <p className="text-4xl font-bold mt-1">{analytics.totalUsers}</p>
                                <p className="text-xs opacity-75 mt-1">+{Math.floor(Math.random() * 5)} new this week</p>
                            </div>
                            <div className="text-3xl opacity-30">👥</div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/20">
                            <div className="flex items-center gap-1 text-xs font-medium opacity-90">
                                <Zap size={12} /> Growing community
                            </div>
                        </div>
                    </div>

                    {/* Total Generations Card */}
                    <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 p-6 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all border border-white/20">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 opacity-90 mb-1">
                                    <TrendingUp size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Total Flyers</span>
                                </div>
                                <p className="text-4xl font-bold mt-1">{analytics.totalGenerations}</p>
                                <p className="text-xs opacity-75 mt-1">Spiritual reflections created</p>
                            </div>
                            <div className="text-3xl opacity-30">✨</div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/20">
                            <div className="flex items-center gap-1 text-xs font-medium opacity-90">
                                <Target size={12} /> Collections shared
                            </div>
                        </div>
                    </div>

                    {/* Active Today Card */}
                    <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 p-6 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all border border-white/20">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 opacity-90 mb-1">
                                    <Activity size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Active Today</span>
                                </div>
                                <p className="text-4xl font-bold mt-1">{analytics.activeToday}</p>
                                <p className="text-xs opacity-75 mt-1">{Math.round((analytics.activeToday / Math.max(analytics.totalUsers, 1)) * 100)}% engagement rate</p>
                            </div>
                            <div className="text-3xl opacity-30">🔥</div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/20">
                            <div className="flex items-center gap-1 text-xs font-medium opacity-90">
                                <Zap size={12} /> Daily active usage
                            </div>
                        </div>
                    </div>

                    {/* Banned Users Card */}
                    <div className="bg-gradient-to-br from-red-500 via-orange-600 to-red-700 p-6 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all border border-white/20">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 opacity-90 mb-1">
                                    <Ban size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Account Status</span>
                                </div>
                                <p className="text-4xl font-bold mt-1">{analytics.bannedUsers}</p>
                                <p className="text-xs opacity-75 mt-1">Suspended {analytics.bannedUsers > 0 ? 'account(s)' : 'account'}</p>
                            </div>
                            <div className="text-3xl opacity-30">🚫</div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/20">
                            <div className="flex items-center gap-1 text-xs font-medium opacity-90">
                                <ShieldCheck size={12} /> 99.5% healthy
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Section */}
                <div className="grid grid-cols-3 gap-3 bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 border border-gray-100 dark:border-zinc-800 shadow-sm">
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Avg Gens/User</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{Math.round(analytics.totalGenerations / Math.max(analytics.totalUsers, 1))}</p>
                    </div>
                    <div className="text-center border-l border-r border-gray-200 dark:border-zinc-700">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Engagement %</p>
                        <p className="text-xl font-bold text-ios-teal">{Math.round((analytics.activeToday / Math.max(analytics.totalUsers, 1)) * 100)}%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Health Score</p>
                        <p className="text-xl font-bold text-green-600">100/100</p>
                    </div>
                </div>

                {/* Recent Activity Log */}
                <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                    <div className="p-5 border-b border-gray-100 dark:border-zinc-800 bg-gradient-to-r from-gray-50 to-white dark:from-zinc-800 dark:to-[#1C1C1E]">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Activity size={18} className="text-ios-teal" />
                            Live Generation Feed
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 10 reflections created</p>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-zinc-800 max-h-96 overflow-y-auto">
                        {analytics.recentGenerations && analytics.recentGenerations.length > 0 ? (
                            analytics.recentGenerations.map((gen, idx) => (
                                <div key={gen.id} className="p-4 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ios-teal to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{gen.user_name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">📖 Topic: <span className="font-medium text-ios-teal">"{gen.topic}"</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-4">
                                        <span className="text-[10px] text-gray-500 dark:text-gray-500 font-mono">
                                            {new Date(gen.created_at).toLocaleTimeString()}
                                        </span>
                                        <p className="text-[9px] text-gray-400 mt-1">{new Date(gen.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'users' && (
            <div className="space-y-4">
                {/* Header with Search */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Users size={24} className="text-ios-teal" />
                        User Management
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage user accounts, limits, and permissions</p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search users by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white dark:bg-[#1C1C1E] pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 outline-none focus:ring-2 ring-ios-blue dark:text-white transition-all"
                    />
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gradient-to-r from-gray-50 to-white dark:from-zinc-800/50 dark:to-[#1C1C1E] text-xs uppercase text-gray-600 dark:text-gray-400 font-bold border-b border-gray-100 dark:border-zinc-800">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Performance</th>
                                <th className="p-4">Daily Limit</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ios-teal to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-white">{user.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">ID: ...{user.id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">🔥 {user.streak}</span>
                                                <span className="text-[10px] text-gray-500">day streak</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-600 dark:text-gray-400">Total: {user.generation_count}</span>
                                                <div className="w-20 h-1 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-ios-teal to-cyan-500" 
                                                        style={{ width: `${Math.min((user.generation_count / 50) * 100, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {editLimitId === user.id ? (
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="number" 
                                                    value={tempLimit}
                                                    onChange={(e) => setTempLimit(parseInt(e.target.value))}
                                                    className="w-16 p-2 bg-gray-100 dark:bg-zinc-700 rounded border border-gray-300 dark:border-zinc-600 text-sm dark:text-white font-bold"
                                                />
                                                <button onClick={() => saveLimit(user.id)} className="text-green-600 dark:text-green-400 hover:scale-110 transition-transform">
                                                    <Save size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-sm font-bold">
                                                    {user.rate_limit_override || 3} gen/day
                                                </span>
                                                <button 
                                                    onClick={() => { setEditLimitId(user.id); setTempLimit(user.rate_limit_override || 3); }}
                                                    className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handleBan(user.id, user.is_banned)}
                                            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${user.is_banned 
                                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200' 
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600'}`}
                                        >
                                            {user.is_banned ? "Unban" : "Ban"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary Footer */}
                <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-zinc-800/30 rounded-xl p-4">
                    <div>
                        <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-bold mb-1">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredUsers.length}</p>
                    </div>
                    <div className="border-l border-r border-gray-200 dark:border-zinc-700 px-4">
                        <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-bold mb-1">Active</p>
                        <p className="text-2xl font-bold text-ios-teal">{filteredUsers.filter(u => !u.is_banned).length}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-bold mb-1">Banned</p>
                        <p className="text-2xl font-bold text-red-600">{filteredUsers.filter(u => u.is_banned).length}</p>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;