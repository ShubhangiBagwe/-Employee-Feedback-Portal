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
      method: 'PATCH'
    });
    fetchFeedback();
  };

  const deleteFeedback = async (id) => {
    await fetch(`http://localhost:5000/feedback/${id}`, {
      method: 'DELETE'
    });
    fetchFeedback();
  };

  useEffect(() => {
    fetchFeedback();
  }, [categoryFilter]);

  return (
    <div className="p-4 mt-8 max-w-[80rem] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Feedback Viewer</h2>
      <div className='flex  place-content-center '>
        <select
          className="mb-4 p-2 border rounded "
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
      <table className="w-full rounded ">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Text</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Time</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList && feedbackList.length > 0 ? (
            feedbackList.map((fb) => (
              <tr key={fb._id}>
                <td className="border px-2 py-1">{fb.text}</td>
                <td className="border px-2 py-1">{fb.category}</td>
                <td className="border px-2 py-1">{new Date(fb.createdAt).toLocaleString()}</td>
                <td className="border px-2 py-1">{fb.reviewed ? 'Reviewed' : 'Pending'}</td>
                <td className="border px-2 py-1 space-x-2">
                  {!fb.reviewed && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => markReviewed(fb._id)}
                    >
                      Mark Reviewed
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteFeedback(fb._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-2 py-4 text-center text-gray-500" colSpan={5}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackAdmin;
