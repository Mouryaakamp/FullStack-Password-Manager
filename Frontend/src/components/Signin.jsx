import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'



function Signin() {
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({ email: "", password: "" })
    const [confirmpass, setconfirmpass] = useState("")


    const handlechange = (e) => {
        if (e.target.name == "confirmpassword")
            setconfirmpass(e.target.value)
        else {
            setformdata({
                ...formdata,
                [e.target.name]: e.target.value
            })
        }
    }
    async function handelsubmit(e) {
        e.preventDefault()
        if (formdata.password == confirmpass) {
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
            console.log("password Dosent match")
            toast.error('Password Didnt Match', {
                position: "top-right",
                theme: "colored",
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

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
            <form
                className="flex flex-col gap-3 p-6 
               items-center justify-center 
               border border-purple-200 
               shadow-2xl rounded-xl 
               w-full max-w-sm bg-white"
            >
                <input
                    className="border-2 text-black rounded-xl p-2 m-1 border-purple-200 shadow-2xl"
                    onChange={handlechange}
                    type="email"
                    value={formdata.email}
                    placeholder="Email"
                    name="email"
                    required
                />
                <input
                    className="border-2 text-black rounded-xl p-2 m-1 border-purple-200 shadow-2xl"
                    type="password"
                    onChange={handlechange}
                    value={formdata.password}
                    placeholder="Password"
                    name="password"
                    required
                />
                <input
                    className="border-2 text-black rounded-xl p-2 m-1 border-purple-200 shadow-2xl"
                    type="password"
                    onChange={handlechange}
                    value={confirmpass}
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    required
                />
                <input
                    className="border-2 text-white rounded-xl p-2 m-1 border-purple-200 shadow-2xl bg-blue-500 cursor-pointer hover:bg-blue-600 transition"
                    type="submit"
                    value="Sign-in"
                    onClick={handelsubmit}
                />
            </form>
        </div>

    )
}

export default Signin