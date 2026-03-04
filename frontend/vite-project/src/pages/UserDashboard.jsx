import { useState, useEffect } from "react";
import axios from "axios";

function UserDashboard() {
  const token = localStorage.getItem("token");

  const [password,setPassword]=useState("");
  const [stores,setStores]=useState([]);
  const [rating,setRating]=useState("");
  const [storeId,setStoreId]=useState("");

  useEffect(()=>{
    fetchStores();
  },[]);

  const fetchStores=async()=>{
    const res=await axios.get("http://localhost:4100/api/stores",{
      headers:{Authorization:`Bearer ${token}`}
    });
    setStores(res.data.stores);
  };

  const updatePassword=async(e)=>{
    e.preventDefault();
    await axios.patch("http://localhost:4100/api/user/password",
      {password},
      {headers:{Authorization:`Bearer ${token}`}}
    );
  };

  const submitRating=async(e)=>{
    e.preventDefault();
    await axios.post(
      `http://localhost:4100/api/ratings/${storeId}`,
      {rating:Number(rating)},
      {headers:{Authorization:`Bearer ${token}`}}
    );
  };

  return(
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        User Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Update Password Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Update Password</h3>
          <form onSubmit={updatePassword} className="space-y-4">
            <input 
              placeholder="New Password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update
            </button>
          </form>
        </div>

        {/* Submit Rating Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Submit Rating</h3>
          <form onSubmit={submitRating} className="space-y-4">
            <input 
              placeholder="Store ID"
              onChange={(e)=>setStoreId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <input 
              placeholder="Rating"
              onChange={(e)=>setRating(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <button 
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

      </div>

      {/* Stores List */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4">Stores</h3>
        <ul className="space-y-2">
          {stores.map(s=>(
            <li 
              key={s.store_id} 
              className="p-3 bg-gray-50 border rounded-lg"
            >
              {s.name} - {s.address}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;