import { useEffect, useState } from "react";
import axios from "axios";

function StoreOwnerDashboard() {
  const token = localStorage.getItem("token");

  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const ratingsRes = await axios.get(
        "http://localhost:4100/api/store-owner/ratings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const averageRes = await axios.get(
        "http://localhost:4100/api/store-owner/average-rating",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRatings(ratingsRes.data.ratings || []);
      setAverageRating(averageRes.data.averageRating || 0);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Store Owner Dashboard
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <p className="text-gray-500">Average Rating</p>
        <p className="text-3xl font-bold mt-2">
          ⭐ {averageRating}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Users Who Rated Your Store
          </h3>

          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {ratings.length === 0 ? (
          <p className="text-gray-500">No ratings yet</p>
        ) : (
          <ul className="space-y-2">
            {ratings.map((rating) => (
              <li
                key={rating.id}
                className="p-3 bg-gray-50 border rounded-lg"
              >
                <strong>{rating.name}</strong>
                <br />
                {rating.email}
                <br />
                Rating: ⭐ {rating.rating}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StoreOwnerDashboard;