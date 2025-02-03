import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";



const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
    setIsLoading(false);
  }, []);

  
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews || 0).toFixed(1);
  const positiveReviews = ((reviews.filter(r => r.rating >= 4).length / totalReviews) * 100 || 0).toFixed(0);

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    name: `${star} Star${star !== 1 ? 's' : ''}`,
    value: reviews.filter(r => r.rating === star).length,
  }));

  if (isLoading) return <div className="text-center p-8">Loading reviews...</div>;

  const pieColors = isDarkMode ? ["#4F46E5", "#818CF8"] : ["#2563EB", "#3B82F6"];

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="container mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"} shadow-sm transition-colors`}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>

       
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-semibold mb-4">Ratings Distribution</h2>
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill={pieColors[0]}
                    label
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                      borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{ color: isDarkMode ? "#FFFFFF" : "#1F2937" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
              <p className="text-3xl font-bold text-blue-500">{totalReviews}</p>
            </div>
            <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
              <p className="text-3xl font-bold text-green-500">{averageRating}</p>
            </div>
            <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="text-lg font-semibold mb-2">Positive Reviews</h3>
              <p className="text-3xl font-bold text-purple-500">{positiveReviews}%</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">User  Reviews</h2>
          <ul>
            {reviews.map(review => (
              <li key={review.id} className="mb-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold">{review.movieTitle}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rating: {review.rating} ⭐</p>
                <p className="mt-2">{review.reviewText}</p>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  By {review.reviewerName} on {new Date(review.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;