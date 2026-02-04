import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Zap, TrendingUp, Gift, Map, Calendar, Download, RefreshCw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface AnalyticsData {
  totalUsers: number;
  activeToday: number;
  totalFlyers: number;
  avgFlyersPerUser: number;
  topTopics: Array<{ name: string; count: number }>;
  dailyActivity: Array<{ date: string; users: number; flyers: number }>;
  userGrowth: Array<{ date: string; total: number }>;
  topicDistribution: Array<{ name: string; value: number }>;
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
        totalUsers: 1250,
        activeToday: 342,
        totalFlyers: 4850,
        avgFlyersPerUser: 3.88,
        topTopics: [
          { name: 'Ihsan', count: 520 },
          { name: 'Patience', count: 480 },
          { name: 'Mercy', count: 420 },
          { name: 'Charity', count: 380 },
          { name: 'Repentance', count: 350 },
        ],
        dailyActivity: [
          { date: 'Mon', users: 240, flyers: 380 },
          { date: 'Tue', users: 280, flyers: 420 },
          { date: 'Wed', users: 320, flyers: 510 },
          { date: 'Thu', users: 310, flyers: 490 },
          { date: 'Fri', users: 360, flyers: 580 },
          { date: 'Sat', users: 290, flyers: 440 },
          { date: 'Sun', users: 342, flyers: 490 },
        ],
        userGrowth: [
          { date: 'Week 1', total: 150 },
          { date: 'Week 2', total: 320 },
          { date: 'Week 3', total: 580 },
          { date: 'Week 4', total: 920 },
          { date: 'Week 5', total: 1250 },
        ],
        topicDistribution: [
          { name: 'Ihsan', value: 520 },
          { name: 'Patience', value: 480 },
          { name: 'Mercy', value: 420 },
          { name: 'Charity', value: 380 },
          { name: 'Other', value: 2050 },
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
        <LoadingSpinner size="lg" label="Loading analytics..." />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-semibold text>{error}</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Admin Dashboard</h1>
            <p className="text-gray-600">Ramadan Bot Intelligence Center</p>
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
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-teal-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-3">This Ramadan season</p>
          </div>

          {/* Active Today Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Zap size={24} className="text-amber-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+8.3%</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Active Today</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.activeToday.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-3">Users generating flyers</p>
          </div>

          {/* Total Flyers Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Gift size={24} className="text-cyan-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+18.7%</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Total Flyers</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.totalFlyers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-3">Generated this season</p>
          </div>

          {/* Avg Per User Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+5.2%</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Avg per User</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.avgFlyersPerUser.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-3">Flyers per person</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Activity Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="users" fill="#0f766e" radius={[8, 8, 0, 0]} />
                <Bar dataKey="flyers" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#0f766e"
                  strokeWidth={3}
                  dot={{ fill: '#0f766e', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Topics Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Top Topics</h3>
            <div className="space-y-3">
              {analytics.topTopics.map((topic, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-gray-700 font-medium">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(topic.count / 520) * 100}%`,
                          backgroundColor: COLORS[idx % COLORS.length],
                        }}
                      />
                    </div>
                    <span className="text-gray-900 font-semibold w-12 text-right">{topic.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Distribution Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Topic Distribution</h3>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-6">💡 Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-semibold">Peak Activity</p>
                  <p className="text-white/80 text-sm mt-1">Fridays see the highest engagement with 580 flyers generated</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌟</span>
                <div>
                  <p className="font-semibold">Top Choice</p>
                  <p className="text-white/80 text-sm mt-1">"Ihsan" is the most popular topic with 520 flyers</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="font-semibold">Growth Rate</p>
                  <p className="text-white/80 text-sm mt-1">User base growing at an average of 250 per week</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💯</span>
                <div>
                  <p className="font-semibold">Engagement</p>
                  <p className="text-white/80 text-sm mt-1">27% of users generate flyers every day</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold">User Retention</p>
                  <p className="text-white/80 text-sm mt-1">Average user generates 3.88 flyers each</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <p className="font-semibold">Reach</p>
                  <p className="text-white/80 text-sm mt-1">Flyers shared across multiple platforms daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Report */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Download size={24} className="text-teal-600" />
            <h3 className="text-lg font-bold text-gray-900">Export Analytics Report</h3>
          </div>
          <p className="text-gray-600 mb-6">Download detailed analytics and insights as PDF or CSV</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              📄 Download PDF
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              📊 Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
