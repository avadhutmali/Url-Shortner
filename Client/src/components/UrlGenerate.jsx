import React, { useState } from 'react'
import axios from "axios"
import ClipboardInput from './ClipboardInput'
import { useNavigate } from 'react-router-dom'

function UrlGenerate() {
    const [isLoading,setIsLoading] = useState(false)
    const [redireUrl,setRedireUrl] = useState('')
    const [isGenerated,setIsGenerated] = useState(false)
    const [shortId,setShortId] = useState("")
      const navigate = useNavigate();
    //   localStorage.removeItem('token')
    const token = localStorage.getItem('token');
    const userName  = localStorage.getItem('userName')

    if(!token){
        navigate("/login")
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!redireUrl.trim()){
            alert("Enter the valid URL")
            return;
        }
        setIsLoading(true)
        try{
            const response =await axios.post("https://url-shortner-dr0j.onrender.com/api/url/generateShortUrl",{redireUrl,userName})
            if(response)setIsGenerated(true)
            console.log(response.data.id)
            setShortId(response.data.id)
            setRedireUrl("");
        }catch(err){
            console.error("Error generating short url : ",err)
        }finally{
            setIsLoading(false)
        }
    }
    const handleDashBoard=()=>{
        navigate("/dashboard")
    }

    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login');
    }

    return (
        <div className='h-screen w-full flex items-center justify-center bg-gray-900'>
            <div className="absolute top-2 right-2 bg-red-600 h-10 w-20 text-center p-2 rounded-xl text-white cursor-pointer" onClick={handleLogout}>Logout</div>
            <div className="absolute top-2 right-32 bg-blue-600 h-10 w-28 text-center p-2 rounded-xl text-white cursor-pointer" onClick={handleDashBoard}>Dashboard</div>
            <div className="h-[60vh] w-[70vw] bg-gray-800 rounded-xl flex flex-col gap-4">
                <div className="text-center text-3xl font-bold mt-10 text-white">Generate ShortURl</div>
                <div className="flex gap-2 mt-20">
                    <input className='pl-8 text-xl h-20 ml-4 w-full bg-white rounded-xl' type="text" value={redireUrl} onChange={(e)=>{setRedireUrl(e.target.value)}} />
                    <button className='h-20 w-36 p-2 mr-4 font-semibold text-white text-xl bg-blue-600 rounded-xl' onClick={handleSubmit}>{isLoading?"Generatin":"Generate"}</button>
                </div>
                {isGenerated && <ClipboardInput shortId={shortId}/>}
            </div>
        </div>
    )
}

export default UrlGenerate