import React from 'react'
import { Shield } from 'lucide-react'

function Footer() {
    return (
        <div className='py-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-white/10 text-center backdrop-blur-xl'>
            <div className='flex items-center justify-center gap-2 mb-2'>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg">
                    <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className='text-xl font-black text-white tracking-tight'>
                    Vault<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Guard</span>
                </span>
            </div>
            <h6 className="text-indigo-300 text-sm">Created with MERN Stack By MP</h6>
        </div>
    );
}

export default Footer