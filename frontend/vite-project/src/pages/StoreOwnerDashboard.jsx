import { useState } from "react";
import axios from "axios";

function StoreOwnerDashboard() {

  const token=localStorage.getItem("token");
  const [name,setName]=useState("");
  const [address,setAddress]=useState("");
  const [storeId,setStoreId]=useState("");
  const [ratings,setRatings]=useState([]);

  const createStore=async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:4100/api/store/create",
      {name,address},
      {headers:{Authorization:`Bearer ${token}`}}
    );
  };

  const fetchRatings=async(e)=>{
    e.preventDefault();
    const res=await axios.get(
      `http://localhost:4100/api/ratings/store/${storeId}`,
      {headers:{Authorization:`Bearer ${token}`}}
    );
    setRatings(res.data.data);
  };

  return(
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Store Owner Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Create Store Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create Store</h3>
          <form onSubmit={createStore} className="space-y-4">
            <input 
              placeholder="Store Name"
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input 
              placeholder="Address"
              onChange={(e)=>setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Create
            </button>
          </form>
        </div>

        {/* View Ratings Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">View Ratings</h3>
          <form onSubmit={fetchRatings} className="space-y-4">
            <input 
              placeholder="Store ID"
              onChange={(e)=>setStoreId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <button 
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Get
            </button>
          </form>

          <ul className="mt-6 space-y-2">
            {ratings.map((r,i)=>(
              <li key={i} className="p-3 bg-gray-50 border rounded-lg">
                {r.name} - {r.ratings}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default StoreOwnerDashboard;