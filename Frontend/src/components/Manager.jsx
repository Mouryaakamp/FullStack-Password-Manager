import React, { useState } from 'react'
import eyeIcon from '/eye-svgrepo-com.svg';
import eyeSlashIcon from '/eye-slash-svgrepo-com.svg';
import { Copy, Edit2, Trash } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



function Manager() {
    const [passwordArray, setPasswordArray] = useState([])
    const [Eye, setEye] = useState(false)
    const [editingId, setEditingId] = useState(null);
    const [Form, setForm] = useState({ site: "", username: "", password: "" })


    useState(() => {
        // let passwords = localStorage.getItem("passwords")
        // if (passwords) {
        //     setPasswordArray(JSON.parse(passwords))
        // }


        fetch('http://localhost:3000/')
            .then(res => res.json())
            .then(data => setPasswordArray(data))
            .catch(err => console.error("Error fetching passwords:", err));


    }, [])


    const copytext = (text) => {
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

        navigator.clipboard.writeText(text)
    }

    const savePassword = async () => {
        if (!Form || !Form.site || !Form.username || !Form.password) {
            alert("No items to save ")
        }
        else {
            // setPasswordArray([...passwordArray, { ...Form, id: uuidv4() }])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...Form, id: uuidv4() }]))
            // console.log([...passwordArray, Form])

            if (editingId) {
                // EDIT CASE
                const res = await fetch(`http://localhost:3000/edit/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Form),
                });
                const data = await res.json();
                console.log(data.message);

                setPasswordArray(prev => prev.map(p => p.id === editingId ? data.updatedPassword : p));
                setEditingId(null);  // reset editing
            } else {
                // ADD CASE
                const res = await fetch('http://localhost:3000/save', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: uuidv4(), ...Form }),
                });
                const data = await res.json();
                setPasswordArray(prev => [...prev, data.data]);
            }

            setForm({ site: "", username: "", password: "" })


            toast.success('Password Saved', {
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
                    method: "DELETE"
                });
                const data = await res.json();
                console.log(data.message);

            } catch (err) {
                console.error("Error deleting password:", err);
            }
            setPasswordArray(passwordArray.filter(item => item.id !== id))

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
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            </div>


            <div className='mt-8'>


                <div className='text-3xl text-purple-300 text-center font-bold mx-auto max-w-3xl '>
                    <span className='text-green-600'> &lt;</span>
                    <span className='text-black' >Pass</span><span className='text-green-300'>OP</span>
                    <span className='text-green-600'>/ &gt;</span>
                    <p className='text-xl'>Your Password Manager</p>
                </div>

                <div className='text-black flex flex-col  p-4 gap-8 max-w-4xl mx-auto'>
                    <div className='relative'>
                        <input className='bg-purple-100 border-2 border-purple-300 rounded-2xl py-1 px-2 w-full '
                            value={Form.site} onChange={handlechange}
                            placeholder='Add Website Link' type="text"
                            name='site' />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                            <img

                                src="/link-round-1110-svgrepo-com.svg"
                                alt="Toggle visibility"
                                className="w-5 h-5 opacity-80 hover:opacity-100 transition"
                            />
                        </span>
                    </div>
                    <div className='flex gap-3 '>
                        <div className='relative w-2/3'>
                            <input className='bg-purple-100 border-2 border-purple-300 rounded-2xl py-1 px-2 w-full'
                                value={Form.username} onChange={handlechange}
                                placeholder='Add Username ' type="text"
                                name='username' />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ">
                                <img
                                    src="/user-svgrepo-com.svg"
                                    alt="Toggle visibility"
                                    className="w-5 h-5 opacity-80 hover:opacity-100 transition"
                                />
                            </span>
                        </div>
                        <div className='relative w-1/3'>
                            <input className='bg-purple-100 border-2 border-purple-300 rounded-2xl py-1 px-2 w-full'
                                value={Form.password} onChange={handlechange}
                                placeholder='Add Password ' type={Eye ? 'Test' : 'password'}
                                name='password' />
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
                            <th className='py-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-purple-100'>
                        {passwordArray.map((item, index) => (

                            <tr key={index}>
                                <td className=' py-2 border border-white text-center w-32 ' >
                                    <div className='flex justify-center items-center space-x-2'>
                                        <a target="_blank" href={item.site} >{item.site} </a>
                                        <Copy onClick={() => { copytext(item.site) }} className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer" />
                                    </div>
                                </td>
                                <td className=' py-2 border border-white text-center w-32 '>
                                    <div className='flex justify-center items-center space-x-3'>
                                        {item.username}
                                        <Copy onClick={() => { copytext(item.username) }} className="w-4 m-2 h-4 opacity-70 hover:opacity-100 cursor-pointer" />
                                    </div>
                                </td>
                                <td className=' py-2 border border-white text-center w-32 '>
                                    <div className='flex justify-center items-center space-x-3'>
                                        {item.password}
                                        <Copy onClick={() => { copytext(item.password) }} className="w-4 h-4 m-2 opacity-70 hover:opacity-100 cursor-pointer" />
                                    </div>
                                </td>
                                <td className=' py-2 border border-white text-center w-32 '>
                                    <div className='flex justify-center items-center gap-5'>
                                        <Edit2 onClick={() => { editPassword(item.id) }} className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer" />
                                        <Trash onClick={() => { deletePassword(item.id) }} className="w-4 h-4  opacity-70 hover:opacity-100 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>

        </>
    )
}

export default Manager