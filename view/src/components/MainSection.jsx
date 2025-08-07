import React, { useState } from 'react'
import axios from "axios"
import { LinkIcon } from '@heroicons/react/24/outline'
import ThreeScene from './ThreeScene'

function MainSection() {
    return (
    <div className="relative isolate min-h-screen px-6 pt-14 lg:px-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
<div className='flex justify-center items-center '>
     <button className="btn btn-neutral"><LinkIcon className="w-5 h-5" />create link</button>
</div>
<ThreeScene/>

      

    </div>
        
    
    )
}

export default MainSection


