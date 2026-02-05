import React, { useState } from 'react';
import { loginUser } from '../app/actions'; // Use Server Action
import { User } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { ChevronRight, ShieldCheck } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        const result = await loginUser(name, pin);
        
        if (result.success && result.user) {
            onLogin(result.user);
        } else {
            setError(result.error || "Authentication failed");
        }
    } catch (e) {
        setError("Network error. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div 
      className="h-full flex flex-col items-center justify-between p-8 bg-black relative overflow-hidden"
      style={{ backgroundColor: '#000000', color: '#ffffff' }}
    >
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[60%] bg-gradient-to-b from-blue-900/40 via-purple-900/20 to-transparent blur-3xl pointer-events-none"></div>

      <div className="w-full flex-1 flex flex-col justify-center max-w-sm z-10">
        
        {/* Header / Logo Area */}
        <div className="text-center mb-10 space-y-4">
            <div className="relative inline-block">
                <img 
                    src="/logo.png" 
                    alt="Ramadan Bot Logo" 
                    className="w-28 h-28 object-contain drop-shadow-lg" 
                />
            </div>
            
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">Ramadan Bot</h1>
                <p className="text-gray-400 text-xs font-medium tracking-wide uppercase">Spiritual Companion</p>
            </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
                <div className="group relative">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block ml-1">Account Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#1C1C1E] border border-gray-800 text-white px-4 py-3.5 rounded-2xl text-sm outline-none focus:border-ios-blue focus:ring-1 focus:ring-ios-blue transition-all placeholder:text-gray-600"
                        placeholder="e.g. Abdallah"
                        required
                        style={{ backgroundColor: '#1C1C1E', color: 'white' }}
                    />
                </div>
                
                <div className="group relative">
                     <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block ml-1">Secure PIN</label>
                    <div className="relative">
                        <input 
                            type="password"
                            inputMode="numeric"
                            pattern="\d*"
                            value={pin}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                                setPin(value);
                            }}
                            className="w-full bg-[#1C1C1E] border border-gray-800 text-white px-4 py-3.5 rounded-2xl text-sm outline-none focus:border-ios-blue focus:ring-1 focus:ring-ios-blue transition-all tracking-[0.5em] placeholder:tracking-normal placeholder:text-gray-600 font-mono"
                            placeholder="••••"
                            maxLength={4}
                            required
                            style={{ backgroundColor: '#1C1C1E', color: 'white' }}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <ShieldCheck size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-center text-red-400 text-xs font-semibold bg-red-500/10 py-2.5 rounded-xl border border-red-500/20 animate-fade-in">
                    {error}
                </div>
            )}

            <button 
                type="submit"
                disabled={isLoading || name.length < 2 || pin.length < 4}
                className="w-full bg-white text-black font-bold text-base py-3.5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none hover:bg-gray-100"
                style={{ backgroundColor: 'white', color: 'black' }}
            >
                {isLoading ? <LoadingSpinner size="sm" color="text-black" /> : (
                    <>
                        <span>Continue</span>
                        <ChevronRight size={18} strokeWidth={3} />
                    </>
                )}
            </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-300 leading-relaxed">
            Welcome to RamadanBot. Enter your name and four digits PIN to create account.
            <br/>If you already have an account, you will be logged in.
        </p>
      </div>
      
      <div className="text-[10px] text-gray-600 font-medium tracking-widest uppercase opacity-80">
         With ❤️ for the Ummah, Abdallah Nangere 🇳🇬
      </div>
    </div>
  );
};

export default LoginScreen;