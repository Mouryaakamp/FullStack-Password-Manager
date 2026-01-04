import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Key, Zap, Database, HardDrive } from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm px-6">
        {/* Logo/Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-full">
              <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-7">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
                Vault<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Guard</span>
              </h1>
              <p className="text-indigo-200 text-sm font-medium">
                Your passwords, impenetrable.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <HardDrive className="w-6 h-6 text-indigo-400 mb-2" />
                <p className="text-white text-xs font-semibold">Local Storage</p>
                <p className="text-indigo-300 text-xs mt-1">Offline Access</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Database className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-white text-xs font-semibold">Cloud Sync</p>
                <p className="text-purple-300 text-xs mt-1">Multi-Device</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => navigate("/log-in")}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Key className="w-5 h-5" />
                Log In
              </button>
              <button
                onClick={() => navigate("/sign-in")}
                className="w-full px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-base hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Sign Up
              </button>
            </div>

            {/* Info Footer */}
            <div className="bg-indigo-500/10 backdrop-blur-sm rounded-xl p-4 border border-indigo-400/20">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-indigo-300 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-indigo-200 leading-relaxed">
                  <span className="font-semibold">Pro Tip:</span> Database storage requires a connection string in your <code className="bg-black/20 px-1.5 py-0.5 rounded text-indigo-300">.env</code> file for cloud sync.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Accent Bar */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-6">
          <p className="text-indigo-300 text-xs font-medium">
            🔒 Military-grade encryption • Zero-knowledge architecture
          </p>
        </div>
      </div>
    </div>
  );
}