import React from 'react'
import { Github, Linkedin, Shield } from 'lucide-react'

function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-2xl backdrop-blur-xl">
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => window.location.reload()}>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className='text-2xl font-black text-white tracking-tight'>
                    Vault<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Guard</span>
                </span>
            </div>
            <div className='flex gap-6'>
                <a href="https://github.com/" target='_blank' rel="noopener noreferrer" className="text-indigo-300 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target='_blank' rel="noopener noreferrer" className="text-indigo-300 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                </a>
            </div>
        </nav>
    );
}

export default Navbar