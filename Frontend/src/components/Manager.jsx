import React, { useEffect, useState } from 'react'
import { Copy, Edit2, Trash, LogOut, Link, User, Lock, Eye, EyeOff, Plus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';



function Manager() {
    const [passwordArray, setPasswordArray] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [Form, setForm] = useState({ site: "", username: "", password: "" })
    const navigate = useNavigate()


    useEffect(() => {
        // let passwords = localStorage.getItem("passwords")
        // if (passwords) {
        //     setPasswordArray(JSON.parse(passwords))
        // }

        fetch("http://localhost:3000/passwords", {
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setPasswordArray(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Error fetching passwords:", err);
                setPasswordArray([]); // prevent UI crash
            });



    }, [])


    const copytext = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to Clipboard', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (err) {
            console.error("Failed to copy:", err);
            toast.error('Failed to copy to clipboard', {
                position: "top-right",
                theme: "colored",
            });
        }
    }

    const savePassword = async () => {
        if (!Form || !Form.site || !Form.username || !Form.password) {
            toast.error("Please fill in all fields", {
                position: "top-right",
                theme: "colored",
            });
            return;
        }

        try {
            if (editingId) {
                // EDIT CASE
                const res = await fetch(`http://localhost:3000/edit/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Form),
                    credentials: "include"
                });
                const data = await res.json();
                if (res.ok) {
                    setPasswordArray(prev => prev.map(p => p.id === editingId ? data : p));
                    setEditingId(null);  // reset editing
                    setForm({ site: "", username: "", password: "" });
                    toast.success('Password Updated', {
                        position: "top-right",
                        theme: "colored",
                    });
                } else {
                    toast.error(data.message || 'Failed to update password', {
                        position: "top-right",
                        theme: "colored",
                    });
                }
            } else {
                // ADD CASE
                const res = await fetch('http://localhost:3000/save', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: uuidv4(), ...Form }),
                    credentials: "include"
                });
                const data = await res.json();
                if (res.ok) {
                    setPasswordArray(prev => [...prev, data]);
                    setForm({ site: "", username: "", password: "" });
                    toast.success('Password Saved', {
                        position: "top-right",
                        theme: "colored",
                    });
                } else {
                    toast.error(data.message || 'Failed to save password', {
                        position: "top-right",
                        theme: "colored",
                    });
                }
            }
        } catch (err) {
            console.error("Error saving password:", err);
            toast.error('An error occurred while saving', {
                position: "top-right",
                theme: "colored",
            });
        }
    }

    const deletePassword = async (id) => {
        let c = confirm('Do you want to delete this Password?')
        if (c) {
            // console.log("deleting the items wit id =", id)
            // setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            try {
                const res = await fetch(`http://localhost:3000/delete/${id}`, {
                    method: "DELETE",
                    credentials: "include"
                });
                const data = await res.json();
                if (res.ok) {
                    setPasswordArray(prev => prev.filter(item => item.id !== id));
                } else {
                    toast.error('Failed to delete password', {
                        position: "top-right",
                        theme: "colored",
                    });
                    return;
                }
            } catch (err) {
                console.error("Error deleting password:", err);
                toast.error('Error deleting password', {
                    position: "top-right",
                    theme: "colored",
                });
                return;
            }

            toast.warn('Password Deleated', {
                position: "top-right",
                theme: "colored",
            });


        }

    }

    const editPassword = async (id) => {
        // console.log("editing the items wit id =", id)
        // setForm(passwordArray.filter(item => item.id === id)[0])
        // setPasswordArray(passwordArray.filter(item => item.id !== id))

        const item = passwordArray.find(item => item.id === id);
        if (!item) return;

        setForm(item);
        setEditingId(id);
    }

    const handlechange = (e) => {

        setForm({ ...Form, [e.target.name]: e.target.value })

    }
    const logout = async () => {
        try {
            const res = await fetch("http://localhost:3000/log-out", {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Logout failed");
            }
            navigate("/");

        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    return (
        <>
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
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
                </div>

                <Navbar />

                <div className='relative z-10 max-w-5xl mx-auto px-6 py-8'>
                    {/* Header Section */}
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <h1 className='text-4xl font-black text-white mb-2 tracking-tight'>
                                Your Vault
                            </h1>
                            <p className='text-indigo-300 text-sm'>Manage your credentials securely</p>
                        </div>
                        <button
                            onClick={logout}
                            className='px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2'
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </button>
                    </div>

                    {/* Input Form Card */}
                    <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 mb-8'>
                        <h2 className='text-xl font-bold text-white mb-4'>{editingId ? 'Edit Credential' : 'Add New Credential'}</h2>

                        <div className='space-y-4'>
                            {/* Website Link Input */}
                            <div className='relative'>
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300">
                                    <Link className="w-5 h-5" />
                                </div>
                                <input
                                    className='w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
                                    value={Form.site}
                                    onChange={handlechange}
                                    placeholder='Website URL'
                                    type="text"
                                    name='site'
                                />
                            </div>

                            {/* Username and Password Inputs */}
                            <div className='flex gap-4'>
                                <div className='relative flex-1'>
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        className='w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
                                        value={Form.username}
                                        onChange={handlechange}
                                        placeholder='Username'
                                        type="text"
                                        name='username'
                                    />
                                </div>
                                <div className='relative flex-1'>
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        className='w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 pl-12 pr-12 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
                                        value={Form.password}
                                        onChange={handlechange}
                                        placeholder='Password'
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white transition-colors">
                                        {showPassword ? (<Eye className="w-5 h-5" />) : (<EyeOff className="w-5 h-5" />)}
                                    </button>
                                </div>
                            </div>

                            {/* Add/Update Button */}
                            <button
                                onClick={savePassword}
                                className='w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105 flex items-center justify-center gap-2 mt-4'
                            >
                                <Plus className="w-5 h-5" />
                                {editingId ? 'Update Credential' : 'Add Credential'}
                            </button>
                            {editingId && (
                                <button
                                    onClick={() => {
                                        setEditingId(null);
                                        setForm({ site: "", username: "", password: "" });
                                    }}
                                    className='w-full px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 mt-2'
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Passwords Table */}
                    <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
                        <div className='p-6 border-b border-white/10'>
                            <h2 className='text-2xl font-bold text-white'>Your Passwords</h2>
                        </div>

                        {passwordArray.length === 0 && (
                            <div className='p-8 text-center text-indigo-300'>
                                No passwords to show. Add your first credential above!
                            </div>
                        )}

                        {passwordArray.length !== 0 && (
                            <div className='overflow-x-auto'>
                                <table className="w-full">
                                    <thead className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white'>
                                        <tr>
                                            <th className='py-4 px-6 text-left font-semibold'>Site</th>
                                            <th className='py-4 px-6 text-left font-semibold'>Username</th>
                                            <th className='py-4 px-6 text-left font-semibold'>Password</th>
                                            <th className='py-4 px-6 text-center font-semibold'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {passwordArray.map((item, index) => (
                                            <tr key={index} className='border-b border-white/10 hover:bg-white/5 transition-colors'>
                                                <td className='py-4 px-6'>
                                                    <div className='flex items-center gap-3'>
                                                        <a target="_blank" rel="noopener noreferrer" href={item.site} className='text-indigo-300 hover:text-white transition-colors truncate max-w-xs'>
                                                            {item.site}
                                                        </a>
                                                        <button onClick={() => copytext(item.site)} className="text-indigo-400 hover:text-white transition-colors">
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className='py-4 px-6'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='text-white'>{item.username}</span>
                                                        <button onClick={() => copytext(item.username)} className="text-indigo-400 hover:text-white transition-colors">
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className='py-4 px-6'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='text-white font-mono'>{'•'.repeat(item.password.length)}</span>
                                                        <button onClick={() => copytext(item.password)} className="text-indigo-400 hover:text-white transition-colors">
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className='py-4 px-6'>
                                                    <div className='flex justify-center items-center gap-4'>
                                                        <button onClick={() => editPassword(item.id)} className="text-indigo-400 hover:text-white transition-colors">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => deletePassword(item.id)} className="text-red-400 hover:text-red-300 transition-colors">
                                                            <Trash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Manager