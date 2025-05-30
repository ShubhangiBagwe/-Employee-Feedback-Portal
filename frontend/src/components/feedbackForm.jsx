import React, { useState } from 'react';

const FeedbackForm = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Work Environment');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, category })
    });

    if (res.ok) {
      setMessage('✅ Feedback submitted!');
      setIsSuccess(true);
      setText('');
      setCategory('Work Environment');
    } else {
      setMessage('❌ Failed to submit feedback.');
      setIsSuccess(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg shadow-md max-w-md mx-auto mt-10 bg-white transition-all duration-300 hover:shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Submit Anonymous Feedback</h2>

      <textarea
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        placeholder="Enter your feedback here..."
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />

      <select
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Work Environment</option>
        <option>Leadership</option>
        <option>Growth</option>
        <option>Others</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 active:bg-blue-800 transition duration-200 font-medium"
      >
        Submit
      </button>

      {message && (
        <p
          className={`mt-4 text-center text-sm font-medium ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default FeedbackForm;
