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
    address: "",
    role: "",
  });

  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4100/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4100/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4100/api/admin/stores",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStores(res.data.stores);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4100/api/admin/users",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "",
      });

      fetchUsers();
      fetchStats();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to create user"
      );
    }
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4100/api/store/create",
        {
          ...storeForm,
          owner_id: Number(storeForm.owner_id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Store created successfully");

      setStoreForm({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });

      fetchStores();
      fetchStats();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create store"
      );
    }
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
            <p className="text-2xl font-bold">
              {stats.total_users}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500">Total Stores</p>
            <p className="text-2xl font-bold">
              {stats.total_stores}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500">Total Ratings</p>
            <p className="text-2xl font-bold">
              {stats.total_ratings}
            </p>
          </div>
        </div>
      )}

      {/* Create User */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Create User
        </h3>

        <form
          onSubmit={handleCreateUser}
          className="grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="STORE_OWNER">
              STORE_OWNER
            </option>
          </select>

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create User
          </button>
        </form>
      </div>

      {/* Create Store */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Create Store
        </h3>

        <form
          onSubmit={handleCreateStore}
          className="grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Store Name"
            value={storeForm.name}
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                name: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          />

          <input
            type="email"
            placeholder="Store Email"
            value={storeForm.email}
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                email: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="Store Address"
            value={storeForm.address}
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                address: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          />

          <input
            type="number"
            placeholder="Owner ID"
            value={storeForm.owner_id}
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                owner_id: e.target.value,
              })
            }
            className="px-4 py-2 border rounded-lg outline-none"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Create Store
          </button>
        </form>
      </div>

      {/* Users */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Users
        </h3>

        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-3 bg-gray-50 border rounded-lg"
            >
              <strong>{user.name}</strong>
              <br />
              {user.email}
              <br />
              {user.role}
            </li>
          ))}
        </ul>
      </div>

      {/* Stores */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Stores
        </h3>

        <ul className="space-y-2">
          {stores.map((store) => (
            <li
              key={store.store_id}
              className="p-3 bg-gray-50 border rounded-lg"
            >
              <strong>{store.store_name}</strong>
              <br />
              {store.address}
              <br />
              Rating: ⭐ {store.avg_rating || 0}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;