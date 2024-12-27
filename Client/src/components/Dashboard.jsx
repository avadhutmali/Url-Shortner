import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [data, setData] = useState([]);
    const [copiedId, setCopiedId] = useState(null);

    const userName = localStorage.getItem("userName");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/user/urls", { userName });
                console.log("Response data:", response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Add an empty dependency array to ensure this runs only once
    const navigate = useNavigate()
    const handleUrlGenerate=()=>{
        navigate("/")
    }
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login');
    }

    const handleCopy=(data)=>{
        navigator.clipboard.writeText("http://localhost:8000/api/url/"+data).then(()=>{
            setCopiedId(data)
            setTimeout(()=>{setCopiedId(null)},5000)
        })
    }



    return (
    <div className="h-screen w-full relative overflow-x-auto shadow-md bg-gray-800">
        <div className="absolute top-2 right-2 bg-red-600 h-10 w-20 text-center p-2 rounded-xl text-white cursor-pointer" onClick={handleLogout}>Logout</div>
        <div className="absolute top-2 right-32 bg-blue-600 h-10 w-28 text-center p-2 rounded-xl text-white cursor-pointer" onClick={handleUrlGenerate}>Generate URl</div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 absolute top-20">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Url
            </th>
            <th scope="col" className="px-6 py-3">
              Short ID
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only ">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.redireUrl}
              </th>
              <td className="px-6 py-4">{data.shortId}</td>
              <td className=" py-4 w-20 text-cente">
                <a
                  className="font-medium text-blue-600  dark:text-blue-500 hover:underline cursor-pointer"
                  onClick={()=>handleCopy(data.shortId)}
                >
                  {copiedId===data.shortId ?"Copied":"Copy"}
                </a>
              </td>
              <td className=" py-4 w-20 text-cente">
                <a
                  className="font-medium text-red-600  dark:text-red-500 hover:underline cursor-pointer"
                  onClick={()=>handleCopy(data.shortId)}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default Dashboard;
