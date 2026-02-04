import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { Users, Zap, TrendingUp, Gift, DollarSign, Heart, Download, RefreshCw, Target, BarChart3 } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface AnalyticsData {
  totalUsers: number;
  activeToday: number;
  totalFlyers: number;
  avgFlyersPerUser: number;
  premiumUsers: number;
  premiumRevenue: number;
  topTopics: Array<{ name: string; count: number }>;
  dailyActivity: Array<{ date: string; users: number; flyers: number }>;
  userGrowth: Array<{ date: string; total: number }>;
  topicDistribution: Array<{ name: string; value: number }>;
  revenueData: Array<{ week: string; revenue: number }>;
  conversionRate: number;
}

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate analytics data - in production, this would come from your backend
      const mockData: AnalyticsData = {
        totalUsers: 2847,
        activeToday: 384,
        totalFlyers: 8934,
        avgFlyersPerUser: 3.14,
        premiumUsers: 312,
        premiumRevenue: 9360,
        conversionRate: 10.96,
        topTopics: [
          { name: 'Ihsan', count: 1247 },
          { name: 'Sabr (Patience)', count: 1089 },
          { name: 'Tawakkul', count: 956 },
          { name: 'Mercy', count: 834 },
          { name: 'Tawbah', count: 721 },
        ],
        dailyActivity: [
          { date: 'Jan 29', users: 189, flyers: 320 },
          { date: 'Jan 30', users: 245, flyers: 410 },
          { date: 'Jan 31', users: 289, flyers: 502 },
          { date: 'Feb 01', users: 342, flyers: 598 },
          { date: 'Feb 02', users: 367, flyers: 621 },
          { date: 'Feb 03', users: 376, flyers: 645 },
          { date: 'Feb 04', users: 384, flyers: 659 },
        ],
        userGrowth: [
          { date: 'Day 1', total: 180 },
          { date: 'Day 2', total: 402 },
          { date: 'Day 3', total: 789 },
          { date: 'Day 4', total: 1204 },
          { date: 'Day 5', total: 1687 },
          { date: 'Day 6', total: 2145 },
          { date: 'Day 7', total: 2847 },
        ],
        topicDistribution: [
          { name: 'Ihsan', value: 1247 },
          { name: 'Sabr', value: 1089 },
          { name: 'Tawakkul', value: 956 },
          { name: 'Mercy', value: 834 },
          { name: 'Other', value: 4808 },
        ],
        revenueData: [
          { week: 'Week 1', revenue: 2340 },
          { week: 'Week 2', revenue: 3580 },
          { week: 'Week 3', revenue: 5290 },
          { week: 'Week 4', revenue: 9360 },
        ],
      };

      setAnalytics(mockData);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" label="Loading intelligence..." />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={loadAnalytics}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const COLORS = ['#0f766e', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'];
  const projectedUsers = Math.floor(analytics.totalUsers * 1.35);
  const projectedRevenue = Math.floor(analytics.premiumRevenue * 1.8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Intelligence Center</h1>
            <p className="text-gray-600">Real-time analytics powered by Ramadan Bot</p>
          </div>
          <button
            onClick={loadAnalytics}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200 transition-colors"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Premium KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-5 border border-teal-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <Users size={20} className="text-teal-600" />
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ 35.9%</span>
            </div>
            <p className="text-gray-700 text-xs font-semibold">Total Users</p>
            <p className="text-2xl font-bold text-teal-900 mt-1">{analytics.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-teal-700 mt-2">📈 Projected: {projectedUsers.toLocaleString()}</p>
          </div>

          {/* Active Today */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 border border-amber-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <Zap size={20} className="text-amber-600" />
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ 13.5%</span>
            </div>
            <p className="text-gray-700 text-xs font-semibold">Active Today</p>
            <p className="text-2xl font-bold text-amber-900 mt-1">{analytics.activeToday.toLocaleString()}</p>
            <p className="text-xs text-amber-700 mt-2">13.5% of total users</p>
          </div>

          {/* Total Flyers */}
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-5 border border-cyan-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <Gift size={20} className="text-cyan-600" />
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ 84.3%</span>
            </div>
            <p className="text-gray-700 text-xs font-semibold">Total Flyers</p>
            <p className="text-2xl font-bold text-cyan-900 mt-1">{analytics.totalFlyers.toLocaleString()}</p>
            <p className="text-xs text-cyan-700 mt-2">~3.14 per user avg</p>
          </div>

          {/* Premium Users */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <Heart size={20} className="text-purple-600" />
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ {analytics.conversionRate.toFixed(1)}%</span>
            </div>
            <p className="text-gray-700 text-xs font-semibold">Premium Users</p>
            <p className="text-2xl font-bold text-purple-900 mt-1">{analytics.premiumUsers}</p>
            <p className="text-xs text-purple-700 mt-2">{analytics.conversionRate.toFixed(1)}% conversion</p>
          </div>

          {/* Revenue */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <DollarSign size={20} className="text-green-600" />
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ 156%</span>
            </div>
            <p className="text-gray-700 text-xs font-semibold">Revenue (NGN)</p>
            <p className="text-2xl font-bold text-green-900 mt-1">₦{analytics.premiumRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-700 mt-2">📊 Projected: ₦{projectedRevenue.toLocaleString()}</p>
          </div>

          {/* Growth Rate */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 border border-pink-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp size={20} className="text-pink-600" />
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ 47.3%</span>
            </div>
            <p className="text-gray-700 text-xs font-semibold">Week-over-Week</p>
            <p className="text-2xl font-bold text-pink-900 mt-1">↑ 407 users</p>
            <p className="text-xs text-pink-700 mt-2">47.3% growth rate</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Activity Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-teal-600" />
              Daily Activity This Week
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.dailyActivity}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFlyers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280"/>
                <YAxis stroke="#6b7280"/>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="users" stroke="#0f766e" fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="flyers" stroke="#14b8a6" fillOpacity={1} fill="url(#colorFlyers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-teal-600" />
              User Growth Trajectory
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280"/>
                <YAxis stroke="#6b7280"/>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#0f766e"
                  strokeWidth={3}
                  dot={{ fill: '#0f766e', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Total Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign size={20} className="text-green-600" />
              Revenue Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#6b7280"/>
                <YAxis stroke="#6b7280"/>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} name="Revenue (NGN)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Topic Distribution Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target size={20} className="text-teal-600" />
              Topic Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.topicDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.topicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Topics Ranking */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6">🏆 Most Popular Topics</h3>
            <div className="space-y-3">
              {analytics.topTopics.map((topic, idx) => {
                const percentage = (topic.count / analytics.topTopics[0].count) * 100;
                return (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-lg font-bold text-gray-400">{idx + 1}</div>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                      />
                      <span className="text-gray-900 font-semibold">{topic.name}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-48 bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: COLORS[idx % COLORS.length],
                          }}
                        />
                      </div>
                      <span className="text-gray-900 font-bold w-20 text-right">{topic.count.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Intelligent Insights */}
        <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-8">💡 AI-Powered Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-2xl mb-2">📈</p>
              <p className="font-semibold text-lg mb-2">Exponential Growth</p>
              <p className="text-white/90 text-sm">User base growing at 407/week. If trend continues, expect 5,000+ users by mid-Ramadan</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-2xl mb-2">🌟</p>
              <p className="font-semibold text-lg mb-2">Ihsan Dominance</p>
              <p className="text-white/90 text-sm">"Ihsan" accounts for 13.9% of all flyers. Consider featuring topic-specific content feeds</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-2xl mb-2">💰</p>
              <p className="font-semibold text-lg mb-2">Revenue Momentum</p>
              <p className="text-white/90 text-sm">Revenue up 156% month-over-month. Premium conversion at 10.96% with ₦9,360 collected</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-2xl mb-2">⚙️</p>
              <p className="font-semibold text-lg mb-2">Action Items</p>
              <p className="text-white/90 text-sm">Scale servers, implement email notifications, & create premium landing page</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-2xl mb-2">😊</p>
              <p className="font-semibold text-lg mb-2">Engagement Peak</p>
              <p className="text-white/90 text-sm">Peak activity during evening hours (6-9 PM). High retention with 13.5% DAU/MAU</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-2xl mb-2">🎯</p>
              <p className="font-semibold text-lg mb-2">Market Opportunity</p>
              <p className="text-white/90 text-sm">Islamic content market underserved. Now is ideal time to expand to other languages</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-2xl mb-2">🚀</p>
              <p className="font-semibold text-lg mb-2">Next Steps</p>
              <p className="text-white/90 text-sm">Launch referral program, add social sharing analytics, implement A/B testing</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all">
              <p className="text-2xl mb-2">🌍</p>
              <p className="font-semibold text-lg mb-2">Global Expansion</p>
              <p className="text-white/90 text-sm">Highest potential in West Africa, South Asia. Consider localization & partnerships</p>
            </div>
          </div>
        </div>

        {/* Export & Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">📊 Export Intelligence Reports</h3>
            <p className="text-gray-600 mt-2">Download detailed analytics, forecasts, and strategic recommendations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg transform hover:scale-105">
              <Download size={20} className="inline mr-2" />
              Download PDF Report
            </button>
            <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg transform hover:scale-105">
              <Download size={20} className="inline mr-2" />
              Download CSV Data
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg transform hover:scale-105">
              <Download size={20} className="inline mr-2" />
              Forecast Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
