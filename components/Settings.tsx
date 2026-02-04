import React, { useState, useEffect } from 'react';
import { Bell, Moon, Volume2, Globe, Heart, Shield, HelpCircle, Download, Trash2 } from 'lucide-react';

interface SettingsProps {
  onClose?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailReminders: false,
    darkMode: false,
    soundEnabled: true,
    language: 'en',
    shareAnalytics: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem('ramadanBot_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key: keyof typeof settings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    localStorage.setItem('ramadanBot_settings', JSON.stringify(updated));
  };

  const handleExport = () => {
    const data = localStorage.getItem('ramadanBot_rateLimit');
    if (data) {
      const link = document.createElement('a');
      link.href = `data:text/json;charset=utf-8,${encodeURIComponent(data)}`;
      link.download = `ramadan-bot-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure? This will delete all your stored data.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">⚙️ Settings</h2>
          <p className="text-gray-600 mt-1">Customize your Ramadan Bot experience</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
            ✕
          </button>
        )}
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Bell size={24} className="text-blue-600" />
          Notifications & Reminders
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Get notified when it's time to generate your daily flyer</p>
            </div>
            <button
              onClick={() => handleToggle('notifications')}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                settings.notifications
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {settings.notifications ? 'On' : 'Off'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Email Reminders</p>
              <p className="text-sm text-gray-600">Receive daily email with your generated flyer</p>
            </div>
            <button
              onClick={() => handleToggle('emailReminders')}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                settings.emailReminders
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {settings.emailReminders ? 'On' : 'Off'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Sound Effects</p>
              <p className="text-sm text-gray-600">Play sounds on actions and completions</p>
            </div>
            <button
              onClick={() => handleToggle('soundEnabled')}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                settings.soundEnabled
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {settings.soundEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>

      {/* Display Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Moon size={24} className="text-indigo-600" />
          Display Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">Easier on the eyes during evening read</p>
            </div>
            <button
              onClick={() => handleToggle('darkMode')}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                settings.darkMode
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {settings.darkMode ? 'On' : 'Off'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Language</p>
              <p className="text-sm text-gray-600">Choose your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => {
                const updated = { ...settings, language: e.target.value };
                setSettings(updated);
                localStorage.setItem('ramadanBot_settings', JSON.stringify(updated));
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-900"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="ur">اردو</option>
              <option value="ha">Hausa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Shield size={24} className="text-green-600" />
          Privacy & Data
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Share Analytics</p>
              <p className="text-sm text-gray-600">Help us improve by sharing usage data</p>
            </div>
            <button
              onClick={() => handleToggle('shareAnalytics')}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                settings.shareAnalytics
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {settings.shareAnalytics ? 'On' : 'Off'}
            </button>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-900">
              ℹ️ Your personal data is stored locally on your device and never uploaded unless you opt-in to analytics sharing.
            </p>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Download size={24} className="text-teal-600" />
          Data Management
        </h3>

        <div className="space-y-3">
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-3 bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold py-4 rounded-xl transition-colors border border-teal-200"
          >
            <Download size={20} />
            Export My Data
          </button>
          <button
            onClick={handleClearData}
            className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-4 rounded-xl transition-colors border border-red-200"
          >
            <Trash2 size={20} />
            Clear All Data
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-200">
        <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-3">
          <HelpCircle size={24} className="text-amber-600" />
          Need Help?
        </h3>
        <div className="space-y-3 text-sm text-amber-900">
          <p>📖 <strong>View Guide:</strong> Learn how to get the most out of Ramadan Bot</p>
          <p>💬 <strong>Contact Support:</strong> Email us at support@ramadanbot.app</p>
          <p>🐛 <strong>Report Issues:</strong> Found a bug? Let us know on GitHub</p>
        </div>
      </div>

      {/* Version Info */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
        <p>Ramadan Bot v1.0.0</p>
        <p className="mt-1">Made with ❤️ for the Ummah</p>
      </div>
    </div>
  );
};

export default Settings;
