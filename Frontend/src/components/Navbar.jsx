import React from 'react'
import { Github } from 'lucide-react'
import { Linkedin } from 'lucide-react'
import react from '../assets/react.svg'

function Navbar() {
    return (
        <nav className="bg-purple-200 h-15 px-4 py-2 flex justify-between items-center shadow-xl">
            <ul className='flex justify-between w-full items-center'>
                <li className='pl-10 cursor-pointer text-xl' onClick={()=>window.location.reload()}>
                    <span className='text-green-600'> &lt;</span>
                    <span className='text-black' >Pass</span><span className='text-green-300'>OP</span>
                    <span className='text-green-600'>/ &gt;</span>
                </li>
                <div className='flex gap-10'>
                    <li>
                        <a href="https://github.com/" target='new'><Github /></a>
                    </li>
                    <li>
                        <a href="https://linkedin.com" target='new'><Linkedin /></a>
                    </li>
                </div>
            </ul>
        </nav>

    )
}

export default Navbar