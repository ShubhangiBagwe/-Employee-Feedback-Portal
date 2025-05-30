import React, { useEffect, useState } from 'react';

const FeedbackAdmin = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchFeedback = async () => {
    const url = categoryFilter
      ? `http://localhost:5000/feedback?category=${encodeURIComponent(categoryFilter)}`
      : 'http://localhost:5000/feedback';

    const res = await fetch(url);
    const data = await res.json();
    setFeedbackList(data);
  };

  const markReviewed = async (id) => {
    await fetch(`http://localhost:5000/feedback/${id}/reviewed`, {
      method: 'PATCH',
    });
    fetchFeedback();
  };

  const deleteFeedback = async (id) => {
    await fetch(`http://localhost:5000/feedback/${id}`, {
      method: 'DELETE',
    });
    fetchFeedback();
  };

  useEffect(() => {
    fetchFeedback();
  }, [categoryFilter]);

  return (
    <div className="p-6 mt-10 max-w-[85rem] mx-auto bg-white shadow-md rounded-lg transition-all hover:shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Feedback Viewer</h2>

      <div className="flex justify-center mb-6">
        <select
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Work Environment</option>
          <option>Leadership</option>
          <option>Growth</option>
          <option>Others</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-2 text-left">Text</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Time</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.length > 0 ? (
              feedbackList.map((fb) => (
                <tr key={fb._id} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-3 text-gray-800 break-all w-[30rem] ">{fb.text}</td>
                  <td className="border border-gray-500 px-4 py-3 text-blue-700 font-medium">{fb.category}</td>
                  <td className="border px-4 py-3 text-gray-600">{new Date(fb.createdAt).toLocaleString()}</td>
                  <td className="border px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${fb.reviewed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {fb.reviewed ? 'Reviewed' : 'Pending'}
                    </span>
                  </td>
                  <td className="border px-4 py-3 space-x-2">
                    {!fb.reviewed && (
                      <button
                        onClick={() => markReviewed(fb._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                      >
                        Mark Reviewed
                      </button>
                    )}
                    <button
                      onClick={() => deleteFeedback(fb._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No feedback data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackAdmin;
