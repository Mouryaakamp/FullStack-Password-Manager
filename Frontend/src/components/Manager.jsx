import React, { useState } from 'react'
import eyeIcon from '/eye-svgrepo-com.svg';
import eyeSlashIcon from '/eye-slash-svgrepo-com.svg';

function Manager() {
    const [passwordArray, setPasswordArray] = useState([])
    useState(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])
    const [Eye, setEye] = useState(false)
    const [Form, setForm] = useState({ site: "", username: "", password: "" })


    const savePassword = () => {

        setPasswordArray([...passwordArray, Form])
        localStorage.setItem("passwordArray", JSON.stringify([...passwordArray, Form]))
        console.log(passwordArray)

    }


    const handlechange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })

    }


    return (
        <>

            <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            </div>


            <div className='mt-8'>


                <div className='text-3xl text-purple-300 text-center font-bold mx-auto max-w-3xl '>
                    <span className='text-green-600'> &lt;</span>
                    <span className='text-black' >Pass</span><span className='text-green-300'>OP</span>
                    <span className='text-green-600'>/ &gt;</span>
                    <p className='text-xl'>Your Password Manager</p>
                </div>

                <div className='text-black flex flex-col p-4 gap-8 max-w-4xl mx-auto'>
                    <div className='relative'>
                        <input className='bg-purple-100 border-2 border-purple-300 rounded-2xl py-1 px-2 w-full ' value={Form.site} onChange={handlechange} placeholder='Add Website Link' type="text" name='site' />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                            <img

                                src="/link-round-1110-svgrepo-com.svg"
                                alt="Toggle visibility"
                                className="w-5 h-5 opacity-80 hover:opacity-100 transition"
                            />
                        </span>
                    </div>
                    <div className='flex gap-3 '>
                        <div className='relative w-1/2'>
                            <input className='bg-purple-100 border-2 border-purple-300 rounded-2xl py-1 px-2 w-full' value={Form.username} onChange={handlechange} placeholder='Add Username ' type="text" name='username' />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ">
                                <img
                                    src="/user-svgrepo-com.svg"
                                    alt="Toggle visibility"
                                    className="w-5 h-5 opacity-80 hover:opacity-100 transition"
                                />
                            </span>
                        </div>
                        <div className='relative w-1/2'>
                            <input className='bg-purple-100 border-2 border-purple-300 rounded-2xl py-1 px-2 w-full' value={Form.password} onChange={handlechange} placeholder='Add Password ' type={Eye ? 'Test' : 'password'} name='password' />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                <img onClick={() => setEye(!Eye)}
                                    src={Eye ? eyeIcon : eyeSlashIcon}
                                    alt="Toggle visibility"
                                    className="w-5 h-5 opacity-80 hover:opacity-100 transition"
                                />
                            </span>

                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className='bg-purple-300 w-60 m-auto border-2 rounded-xl flex justify-center items-center cursor-pointer hover:bg-purple-200'> <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                            colors="primary:#000000"
                        >
                        </lord-icon> Add Credentials </button>
                </div>

            </div>


            <div className=' m-7 '>
                <h2 className='text-bold text-2xl font-bold py-4'>Your Passwords: </h2>
                {passwordArray.length === 0 && <div> NO Passwords To Show</div>}
                {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-xl">
                    <thead className='bg-purple-600 text-white '>
                        <tr>
                            <th className='py-3'>Site Link</th>
                            <th className='py-3'>Username</th>
                            <th className='py-3'>Password</th>
                        </tr>
                    </thead>
                    <tbody className='bg-purple-100'>
                        {passwordArray.map((item, index) => (

                            <tr key={index}>
                                <td className=' py-2 border border-white text-center w-32 ' ><a target="_blank" href={item.site} >{item.site} </a></td>
                                <td className=' py-2 border border-white text-center w-32 '>{item.username}</td>
                                <td className=' py-2 border border-white text-center w-32 '>{item.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>

        </>
    )
}

export default Manager