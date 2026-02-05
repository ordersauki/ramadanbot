import React, { useState } from 'react';
import { X, Settings, LogOut, Shield, Heart, UserCircle, Mail, MessageCircle } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
  onAdmin: () => void;
  onSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, user, onLogout, onAdmin, onSettings }) => {
  const [infoTab, setInfoTab] = useState<'about' | 'contact'>('about');
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-ios-bg dark:bg-[#1C1C1E] z-50 transform transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 pt-12 bg-white dark:bg-[#1C1C1E] border-b border-gray-200 dark:border-zinc-800 transition-colors">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-12 h-12 rounded-full bg-ios-teal flex items-center justify-center text-white text-xl font-bold shadow-md">
                {user.name.charAt(0).toUpperCase()}
             </div>
             <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{user.name}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">{user.role}</p>
             </div>
          </div>
          <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-ios-lightGray dark:bg-zinc-800 rounded-lg w-fit transition-colors">
             <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">🔥 Streak:</span>
             <span className="text-sm font-bold text-ios-teal">{user.streak} Days</span>
          </div>
        </div>

        {/* Menu Items (scrollable) */}
        <div className="p-4 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 380px)', touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}>
          
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">App</h3>
            
            {user.role === 'admin' && (
              <button onClick={() => { onAdmin(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-3 bg-white dark:bg-black/20 rounded-xl text-ios-blue hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm mb-2">
                <Shield size={20} />
                <span className="font-medium">Admin Dashboard</span>
              </button>
            )}

            <button onClick={() => { onSettings(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-3 bg-white dark:bg-black/20 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm">
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Information</h3>
            
            <div className="bg-white dark:bg-black/20 rounded-xl overflow-hidden shadow-sm transition-colors">
              <div className="flex border-b border-gray-100 dark:border-zinc-800">
                <button 
                  onClick={() => setInfoTab('about')}
                  className={`flex-1 px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${infoTab === 'about' ? 'bg-ios-teal text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  About
                </button>
                <button 
                  onClick={() => setInfoTab('contact')}
                  className={`flex-1 px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${infoTab === 'contact' ? 'bg-ios-teal text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  Contact
                </button>
              </div>

              <div className="p-4">
                {infoTab === 'about' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🌙</div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">Ramadan Bot</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">v2.1.0</p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                      A sophisticated platform for crafting personalized Ramadan reflections and spiritual flyers using AI-powered Islamic messaging. Designed to deepen your spiritual journey during the holy month.
                    </p>
                    <div className="pt-2 border-t border-gray-100 dark:border-zinc-700">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                        <span className="block font-bold mb-1 text-gray-700 dark:text-gray-300">Developer</span>
                        Abdallah Nangere 🇳🇬
                      </p>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center italic">
                      Built with ❤️ for the Ummah
                    </p>
                  </div>
                )}

                {infoTab === 'contact' && (
                  <div className="space-y-3 animate-fade-in">
                    <p className="text-xs text-gray-600 dark:text-gray-300 text-center mb-4">
                      Have questions or feedback? Reach out today.
                    </p>
                    
                    <a 
                      href="mailto:abdallahnangere@gmail.com"
                      className="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg hover:shadow-md transition-all group border border-red-200 dark:border-red-900/30"
                    >
                      <Mail size={18} className="text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Email</p>
                        <p className="text-[10px] text-red-600 dark:text-red-400 font-medium">abdallahnangere@gmail.com</p>
                      </div>
                    </a>

                    <a 
                      href="https://wa.me/2348164135836"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg hover:shadow-md transition-all group border border-green-200 dark:border-green-900/30"
                    >
                      <MessageCircle size={18} className="text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">WhatsApp</p>
                        <p className="text-[10px] text-green-600 dark:text-green-400 font-medium">+234 816 413 5836</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Generation History (from localStorage) */}
            <div className="mt-4 p-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your History</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {(() => {
                  try {
                    const raw = typeof window !== 'undefined' ? localStorage.getItem('generationHistory') : null;
                    const items = raw ? JSON.parse(raw) : [];
                    if (!items || items.length === 0) return <p className="text-[11px] text-gray-400">No recent generations yet.</p>;
                    return items.slice(0,10).map((it:any,idx:number) => (
                      <div key={idx} className="flex items-center justify-between text-[12px]">
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{it.topic}</div>
                          <div className="text-xs text-gray-400">Day {it.day} • {new Date(it.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ));
                  } catch {
                    return <p className="text-[11px] text-gray-400">No recent generations yet.</p>;
                  }
                })()}
              </div>
            </div>
          </div>

        </div>

        {/* Footer (moved up slightly for better spacing) */}
        <div className="absolute bottom-4 left-0 right-0 p-4 bg-white dark:bg-[#1C1C1E] border-t border-gray-200 dark:border-zinc-800 transition-colors">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 text-ios-red font-semibold py-2 bg-ios-red/10 rounded-lg hover:bg-ios-red/20 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;