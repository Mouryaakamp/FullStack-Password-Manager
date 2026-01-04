import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, CheckCircle, UserPlus } from 'lucide-react';

function Signin() {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({ email: "", password: "" });
    const [confirmpass, setconfirmpass] = useState("");

    const handlechange = (e) => {
        if (e.target.name == "confirmpassword")
            setconfirmpass(e.target.value);
        else {
            setformdata({
                ...formdata,
                [e.target.name]: e.target.value
            });
        }
    };

    async function handelsubmit(e) {
        e.preventDefault();
        if (formdata.password === confirmpass) {
            try {
                const res = await fetch('http://localhost:3000/sign-in', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formdata),
                    credentials: "include",
                });
                const data = await res.json();
                if (res.ok) {
                    toast.success('Account created successfully', {
                        position: "top-right",
                        theme: "colored",
                    });
                    navigate('/pass-manager');
                } else {
                    toast.error(data.message || 'Sign-in failed', {
                        position: "top-right",
                        theme: "colored",
                    });
                }
            }
            catch (err) {
                console.log(err);
                toast.error('An error occurred during sign-in', {
                    position: "top-right",
                    theme: "colored",
                });
            }
        }
        else {
            console.log("password Dosent match");
            toast.error('Password Didnt Match', {
                position: "top-right",
                theme: "colored",
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden px-4">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 w-full max-w-sm">
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
                    <form onSubmit={handelsubmit} className="p-7">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
                                Create Account
                            </h1>
                            <p className="text-indigo-200 text-sm font-medium">
                                Join VaultGuard and secure your passwords
                            </p>
                        </div>

                        {/* Email Input */}
                        <div className="relative mb-4">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                onChange={handlechange}
                                type="email"
                                value={formdata.email}
                                placeholder="Email address"
                                name="email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative mb-4">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                type="password"
                                onChange={handlechange}
                                value={formdata.password}
                                placeholder="Password"
                                name="password"
                                required
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative mb-6">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <input
                                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                type="password"
                                onChange={handlechange}
                                value={confirmpass}
                                placeholder="Confirm password"
                                name="confirmpassword"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <UserPlus className="w-5 h-5" />
                            Create Account
                        </button>

                        {/* Footer Link */}
                        <div className="mt-6 text-center">
                            <p className="text-indigo-200 text-sm">
                                Already have an account?{' '}
                                <button 
                                    onClick={() => navigate('/log-in')}
                                    className="text-white font-semibold hover:text-indigo-300 transition-colors"
                                >
                                    Log in
                                </button>
                            </p>
                        </div>
                    </form>

                    {/* Bottom Accent Bar */}
                    <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                </div>

                {/* Security Badge */}
                <div className="text-center mt-6">
                    <p className="text-indigo-300 text-xs font-medium">
                        🔒 Your data is end-to-end encrypted 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;