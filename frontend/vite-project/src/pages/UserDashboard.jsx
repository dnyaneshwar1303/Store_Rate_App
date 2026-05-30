import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const token = localStorage.getItem("token");

  const [password, setPassword] = useState("");
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:4100/api/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStores(res.data.stores || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch stores");
    }
  };

  const searchStores = async (e) => {
    e.preventDefault();

    if (!search) {
      return fetchStores();
    }

    try {
      const res = await axios.get(
        `http://localhost:4100/api/store/search?search=${search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStores(res.data.stores || []);
    } catch (err) {
      alert(err.response?.data?.message || "No store found");
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        "http://localhost:4100/api/user/password",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Password updated successfully");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  const submitRating = async (storeId) => {
    const rating = ratings[storeId];

    if (!rating || rating < 1 || rating > 5) {
      return alert("Rating must be between 1 and 5");
    }

    try {
      await axios.post(
        `http://localhost:4100/api/ratings/${storeId}`,
        { rating: Number(rating) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Rating submitted/updated successfully");
      fetchStores();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit rating");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        User Dashboard
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Update Password</h3>

        <form onSubmit={updatePassword} className="flex gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Stores</h3>

          <form onSubmit={searchStores} className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name/address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg outline-none"
            />

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                fetchStores();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Reset
            </button>
          </form>
        </div>

        {stores.length === 0 ? (
          <p className="text-gray-500">No stores found</p>
        ) : (
          <ul className="space-y-4">
            {stores.map((store) => (
              <li
                key={store.store_id}
                className="p-4 bg-gray-50 border rounded-lg"
              >
                <h4 className="font-bold text-lg">
                  {store.store_name || store.name}
                </h4>

                <p>{store.address}</p>

                <p className="mt-1">
                  Overall Rating: ⭐ {store.avg_rating || 0}
                </p>

                <div className="flex gap-2 mt-3">
                  <select
                    value={ratings[store.store_id] || ""}
                    onChange={(e) =>
                      setRatings({
                        ...ratings,
                        [store.store_id]: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="5">5 ⭐</option>
                  </select>

                  <button
                    onClick={() => submitRating(store.store_id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Submit / Update Rating
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;