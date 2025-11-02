import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


function Sighin() {
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
                fetch('http://localhost:3000/sigh-in', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formdata),
                    credentials: "include",

                })
            }
            catch (err) {
                console.log(err)
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
        <div>
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
                className="flex flex-row p-4 m-4 border border-purple-200 shadow-2xl rounded-md"
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
                    value="Sigh-in"
                    onClick={handelsubmit}
                />
            </form>
        </div>

    )
}

export default Sighin