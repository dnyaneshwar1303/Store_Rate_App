import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:4100/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStats(res.data.data[0]);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:4100/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data.users);
  };

  const fetchStores = async () => {
    const res = await axios.get("http://localhost:4100/api/admin/stores", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStores(res.data.stores);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:4100/api/admin/users",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h2>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">{stats.total_users}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500">Total Stores</p>
            <p className="text-2xl font-bold">{stats.total_stores}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500">Total Ratings</p>
            <p className="text-2xl font-bold">{stats.total_ratings}</p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Create User</h3>
        <form onSubmit={handleCreateUser} className="grid gap-4 md:grid-cols-2">
          <input
            name="name"
            placeholder="Name"
            onChange={(e)=>setForm({...form,name:e.target.value})}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            name="password"
            placeholder="Password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            name="role"
            placeholder="Role"
            onChange={(e)=>setForm({...form,role:e.target.value})}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Users</h3>
        <ul className="space-y-2">
          {users.map(u=>(
            <li key={u.id} className="p-3 bg-gray-50 rounded-lg border">
              {u.name} - {u.email} - {u.role}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Stores</h3>
        <ul className="space-y-2">
          {stores.map((s,i)=>(
            <li key={i} className="p-3 bg-gray-50 rounded-lg border">
              {s.store_name} - {s.owner_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;