import React from 'react'
import { useState } from 'react'

function Auth() {
    const [formdata, setformdata] = useState({ email: "", password: "" })


    async function handelsubmit(e) {
        e.preventDefault()
        try {
            fetch('http://localhost:3000/api/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form
                // onSubmit={handleSubmit}
                className="flex flex-row p-4 m-4 border border-purple-200 shadow-2xl rounded-md"
            >
                <input
                    className="border-2 text-black rounded-xl p-2 m-1 border-purple-200 shadow-2xl"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <input
                    className="border-2 text-black rounded-xl p-2 m-1 border-purple-200 shadow-2xl"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <input
                    className="border-2 text-white rounded-xl p-2 m-1 border-purple-200 shadow-2xl bg-blue-500 cursor-pointer hover:bg-blue-600 transition"
                    type="submit"
                    value="Login"
                />
            </form>
        </div>

    )
}

export default Auth