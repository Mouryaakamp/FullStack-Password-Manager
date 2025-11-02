import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [logindata, setlogindata] = useState({ email: "", password: "" })


    const handlechange = (e) => {
        setlogindata({
            ...logindata,
            [e.target.name]: e.target.value
        })

    }
    async function handelsubmit(e) {
        e.preventDefault()
        console.log(logindata);
        try {
            fetch('http://localhost:3000/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logindata),
                credentials: "include",
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>

            <form
                className="flex flex-row p-4 m-4 border border-purple-200 shadow-2xl rounded-md"
            >
                <input
                    className="border-2 text-black rounded-xl p-2 m-1 border-purple-200 shadow-2xl"
                    onChange={handlechange}
                    type="email"
                    value={logindata.email}
                    placeholder="Email"
                    name="email"
                    required
                />
                <input
                    className="border-2 text-black rounded-xl p-2 m-1 border-purple-200 shadow-2xl"
                    type="password"
                    onChange={handlechange}
                    value={logindata.password}
                    placeholder="Password"
                    name="password"
                    required
                />
                <input
                    className="border-2 text-white rounded-xl p-2 m-1 border-purple-200 shadow-2xl bg-blue-500 cursor-pointer hover:bg-blue-600 transition"
                    type="submit"
                    value="Login"
                    onClick={handelsubmit}
                />
            </form>
        </div>
    )
}

export default Login