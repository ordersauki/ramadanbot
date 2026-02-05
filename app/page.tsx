'use client';

import React, { useState, useEffect } from 'react';
import { User, GeneratedData, AppState } from '../types';
import RamadanForm from '../components/RamadanForm';
import FlyerPreview from '../components/FlyerPreview';
import LoginScreen from '../components/LoginScreen';
import AdminDashboard from '../components/AdminDashboard';
import Sidebar from '../components/Sidebar';
import SettingsScreen from '../components/SettingsScreen';
import Toast from '../components/Toast';
import { Menu, Sparkles, Download, Clock } from 'lucide-react';

export default function Home() {
  const [appState, setAppState] = useState<AppState>({ 
    view: 'login', 
    currentUser: null, 
    isDarkMode: false 
  });
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [downloadedFlyerUrl, setDownloadedFlyerUrl] = useState<string | null>(null);
  const [hasDownloadedToday, setHasDownloadedToday] = useState(false);
  const [countdownTime, setCountdownTime] = useState<string>('00:00:00');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
  
  // Persist login session and Theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
        // Check Theme
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setAppState(prev => ({...prev, isDarkMode: true}));
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
  }, []);

  // Countdown timer for daily limit
  useEffect(() => {
    if (!hasDownloadedToday || !appState.currentUser?.last_generation_date) return;

    const interval = setInterval(() => {
      const now = new Date();
      const lastGen = new Date(appState.currentUser!.last_generation_date!);
      const nextAllowed = new Date(lastGen.getTime() + 24 * 60 * 60 * 1000);
      const diff = nextAllowed.getTime() - now.getTime();

      if (diff <= 0) {
        setHasDownloadedToday(false);
        setCountdownTime('00:00:00');
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasDownloadedToday, appState.currentUser?.last_generation_date]);

  const handleLogin = (user: User) => {
    setAppState(prev => ({ ...prev, view: 'app', currentUser: user }));
  };

  const handleLogout = () => {
    setAppState(prev => ({ ...prev, view: 'login', currentUser: null }));
    setGeneratedData(null);
    setIsSidebarOpen(false);
  };

  const toggleTheme = () => {
    setAppState(prev => {
        const newMode = !prev.isDarkMode;
        if (newMode) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        } else {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }
        return { ...prev, isDarkMode: newMode };
    });
  };

  const handleSuccess = (data: GeneratedData) => {
    setGeneratedData(data);
    // Optimistic update of generation_count locally
    if (appState.currentUser) {
       const u = appState.currentUser;
       const updatedUser = { ...u, generation_count: u.generation_count + 1 };
       setAppState(prev => ({ ...prev, currentUser: updatedUser }));

       // Persist generation history to localStorage for sidebar (topic + day)
       try {
         const key = 'generationHistory';
         const raw = localStorage.getItem(key);
         const history = raw ? JSON.parse(raw) : [];
         history.unshift({ topic: data.formData.topic, day: data.formData.day, date: new Date().toISOString() });
         localStorage.setItem(key, JSON.stringify(history.slice(0, 50)));
       } catch (e) {
         // ignore storage errors
       }
    }
  };

  const handleFlyerDownloaded = async (flyerUrl: string) => {
    setDownloadedFlyerUrl(flyerUrl);
    
    // Show success notification
    setToast({ type: 'success', message: '✓ Flyer downloaded successfully!' });

    // Fetch latest user state from server to get accurate remaining limits
    try {
      const res = await fetch(`/api/user?id=${appState.currentUser!.id}`);
        if (res.ok) {
                const json = await res.json();
                if (json.user) {
                    setAppState(prev => ({ ...prev, currentUser: json.user }));

                    // Determine if user has reached limit for today (API returns today_generations, remaining, limit)
                    const usedToday = json.user.today_generations || 0;
                    const limit = json.user.limit || json.user.rate_limit_override || 3;
                    if (usedToday >= limit && json.user.role !== 'admin') {
                        setHasDownloadedToday(true);
                        setToast({ type: 'warning', message: `Daily limit reached. Next generation available in 24 hours.` });
                    } else {
                        setHasDownloadedToday(false);
                    }
                }
            }
    } catch (e) {
      console.error('Failed to refresh user after download', e);
      setToast({ type: 'error', message: 'Failed to check limit status' });
      setHasDownloadedToday(true);
    }
  };

  const handleRedownload = () => {
    if (downloadedFlyerUrl) {
      const fileName = `Ramadan_Daily_Flyer.png`;
      const link = document.createElement('a');
      link.href = downloadedFlyerUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

    const handleReset = () => {
        // Return to home and clear transient download/cooldown UI
        setGeneratedData(null);
        setHasDownloadedToday(false);
        setDownloadedFlyerUrl(null);
    };

  // --- RENDER CONTENT BASED ON STATE ---

  const renderContent = () => {
    if (appState.view === 'login') {
        return <LoginScreen onLogin={handleLogin} />;
    }

    if (appState.view === 'settings') {
        return <SettingsScreen 
            onBack={() => setAppState(prev => ({...prev, view: 'app'}))} 
            isDarkMode={appState.isDarkMode}
            toggleTheme={toggleTheme}
            user={appState.currentUser!}
            onLogout={handleLogout}
        />;
    }

    if (appState.view === 'admin') {
        return <AdminDashboard onBack={() => setAppState(prev => ({...prev, view: 'app'}))} />;
    }

    const user = appState.currentUser!;

    return (
        <div className="h-full flex flex-col bg-ios-bg dark:bg-black overflow-hidden relative transition-colors duration-300">
            
            {/* Sidebar Component */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                user={user}
                onLogout={handleLogout}
                onAdmin={() => setAppState(prev => ({...prev, view: 'admin'}))}
                onSettings={() => setAppState(prev => ({...prev, view: 'settings'}))}
            />

            {/* Header */}
            <header className="pt-3 pb-2 px-5 flex items-center justify-between bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 dark:border-zinc-800 transition-colors">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                    <Menu size={24} strokeWidth={2.5} />
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                        Daily Limit
                    </span>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">Ramadan Bot</h1>
                </div>
                <div className="flex items-center gap-2">
                    {downloadedFlyerUrl && !generatedData && (
                        <button
                            onClick={handleRedownload}
                            className="p-2 text-ios-teal hover:bg-ios-teal/10 dark:hover:bg-ios-teal/20 rounded-full transition-colors"
                            title="Re-download recent flyer"
                        >
                            <Download size={20} strokeWidth={2.5} />
                        </button>
                    )}
                    <div className="w-8 h-8 bg-gradient-to-br from-ios-teal to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {user.limit || user.rate_limit_override || 3}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth pb-4" style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}>
                {generatedData ? (
                    <FlyerPreview 
                        message={generatedData.text}
                        formData={generatedData.formData}
                        onReset={handleReset}
                        user={user}
                        onDownloaded={handleFlyerDownloaded}
                    />
                ) : hasDownloadedToday ? (
                    // Limit Reached Screen
                    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in p-6 text-center space-y-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ios-teal to-cyan-500 flex items-center justify-center text-white text-4xl shadow-lg">
                            ✨
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Daily Limit Reached!</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">You've already created your reflection for today. Come back after:</p>
                        </div>
                        <div className="bg-gradient-to-r from-ios-teal/10 to-cyan-500/10 border border-ios-teal/30 rounded-2xl p-6 w-full">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-xs font-bold text-ios-teal uppercase tracking-wider">⏱️ Time Until Next Generation</span>
                            </div>
                            <p className="text-4xl font-mono font-bold text-gray-900 dark:text-white">{countdownTime}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">24-hour daily limit resets automatically</p>
                        </div>
                        <div className="space-y-2 w-full">
                            <button
                                onClick={handleRedownload}
                                className="w-full bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
                            >
                                <span>⬇️ Re-download Flyer</span>
                            </button>
                            <button
                                onClick={() => setHasDownloadedToday(false)}
                                className="w-full text-ios-teal font-bold py-3 rounded-xl hover:bg-ios-teal/10 transition-all"
                            >
                                Continue to Home
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in-up space-y-4">
                         <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                Salam, {user.name.split(' ')[0]} 👋
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Ready for today's reflection?</p>
                         </div>
                        <RamadanForm 
                            onSuccess={handleSuccess} 
                            initialName={user.name} 
                            userId={user.id}
                            disabled={hasDownloadedToday}
                        />

                        {/* Streak & Daily Limit Cards (Moved immediately after form) */}
                        <div className="bg-white dark:bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-gray-100 dark:border-zinc-800 shadow-lg transition-colors mt-6">
                            <div className="grid grid-cols-2 gap-3">
                                {/* Streak Card */}
                                <div className="flex flex-col justify-between rounded-xl p-3 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/15 dark:to-orange-900/10 border border-orange-200 dark:border-orange-900/30 shadow-md">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <div className="w-9 h-9 rounded-lg bg-white/60 dark:bg-black/20 flex items-center justify-center text-orange-600 shadow-sm flex-shrink-0">
                                                <Sparkles size={16} className="text-orange-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider whitespace-nowrap">Streak</p>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-300 whitespace-nowrap">Days</p>
                                            </div>
                                        </div>
                                        <p className="text-xl font-extrabold text-orange-700 dark:text-orange-300 flex-shrink-0">{user.streak}</p>
                                    </div>
                                    <div className="mt-2 w-full">
                                        <div className="w-full bg-orange-100 dark:bg-orange-900/10 rounded-full h-1.5">
                                            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.round((user.streak/30)*100))}%` }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Daily Limit Card */}
                                <div className="flex flex-col justify-between rounded-xl p-3 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-blue-900/10 dark:to-cyan-900/10 border border-blue-200 dark:border-blue-900/30 shadow-md">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <div className="w-9 h-9 rounded-lg bg-white/60 dark:bg-black/20 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                                                <Download size={16} className="text-blue-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider whitespace-nowrap">Daily Limit</p>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-300 whitespace-nowrap">Left</p>
                                            </div>
                                        </div>
                                        <p className="text-xl font-extrabold text-blue-700 dark:text-blue-300 flex-shrink-0">{typeof user.remaining !== 'undefined' ? user.remaining : (user.rate_limit_override || 3)}</p>
                                    </div>
                                    <div className="mt-2 w-full">
                                        <div className="w-full bg-blue-100 dark:bg-blue-900/10 rounded-full h-1.5">
                                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.round(((user.limit || user.rate_limit_override || 3) - (user.today_generations||0))/ (user.limit || user.rate_limit_override || 3) * 100)}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>


        </div>
    );
  };

  return (
    // DESKTOP FRAME WRAPPER - Simulates iPhone
    <div className={`relative w-full h-full flex justify-center items-center p-0 md:p-8 ${appState.isDarkMode ? 'dark' : ''}`}>
      
      {/* Toast Notifications */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          duration={4000}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Phone Chassis */}
      <div className="relative w-full h-full md:max-w-[400px] md:max-h-[850px] bg-white dark:bg-black md:rounded-[45px] md:shadow-[0_0_0_12px_#1f2937,0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border-gray-900 transition-colors duration-300 isolate">
        
        {/* Dynamic Island (Desktop Only) */}
        <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 pointer-events-none"></div>
        
        {renderContent()}

        {/* Home Bar */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1.5 bg-black/20 dark:bg-white/20 rounded-full mb-2 pointer-events-none z-50"></div>
      </div>

    </div>
  );
}