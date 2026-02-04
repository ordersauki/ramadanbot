import React from 'react';
import { User } from '../types';
import { Moon, Bell, Shield, LogOut, ChevronRight, Trash2, Smartphone, ArrowLeft, Sun } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  user: User;
  onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, isDarkMode, toggleTheme, user, onLogout }) => {
  return (
    <div className="h-full flex flex-col bg-ios-bg dark:bg-black animate-fade-in">
      {/* Header */}
      <div className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 dark:border-zinc-800 pt-12 pb-4 px-4 shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-ios-blue hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex-1">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ios-teal to-ios-blue flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Personal Plan</p>
            </div>
        </div>

        {/* Appearance Group */}
        <div className="space-y-2">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Appearance</h3>
            <div className="bg-white dark:bg-[#1C1C1E] rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors">
                <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleTheme}>
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md ${isDarkMode ? 'bg-indigo-500' : 'bg-orange-400'} text-white`}>
                            {isDarkMode ? <Moon size={18} fill="currentColor" /> : <Sun size={18} fill="currentColor" />}
                        </div>
                        <span className="text-base font-medium text-gray-900 dark:text-white">Dark Mode</span>
                    </div>
                    {/* iOS Switch */}
                    <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-green-500' : 'bg-gray-200 dark:bg-zinc-600'}`}>
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Notifications Group */}
        <div className="space-y-2">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Preferences</h3>
            <div className="bg-white dark:bg-[#1C1C1E] rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-red-500 text-white">
                            <Bell size={18} fill="currentColor" />
                        </div>
                        <span className="text-base font-medium text-gray-900 dark:text-white">Daily Reminders</span>
                    </div>
                    <div className="w-12 h-7 rounded-full p-1 bg-green-500 cursor-pointer">
                        <div className="bg-white w-5 h-5 rounded-full shadow-md transform translate-x-5"></div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-blue-500 text-white">
                            <Shield size={18} />
                        </div>
                        <span className="text-base font-medium text-gray-900 dark:text-white">Privacy & Security</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </div>
            </div>
        </div>

        {/* Data Management */}
        <div className="space-y-2">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</h3>
            <div className="bg-white dark:bg-[#1C1C1E] rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors">
                 <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-left">
                    <div className="p-1.5 rounded-md bg-gray-400 text-white">
                        <Trash2 size={18} />
                    </div>
                    <span className="text-base font-medium text-gray-900 dark:text-white">Clear Cache</span>
                </button>
            </div>
        </div>

        {/* Logout */}
        <button 
            onClick={onLogout}
            className="w-full bg-white dark:bg-[#1C1C1E] text-red-500 font-medium py-3.5 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
            <LogOut size={18} />
            Log Out
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">
            Ramadan Bot v2.1.0 (Build 2025)
        </p>

      </div>
    </div>
  );
};

export default SettingsScreen;