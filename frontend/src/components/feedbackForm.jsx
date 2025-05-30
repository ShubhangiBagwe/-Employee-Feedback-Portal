import React, { useState } from 'react';

const FeedbackForm= () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Work Environment');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, category })
    });

    if (res.ok) {
      setMessage('Feedback submitted!');
      setText('');
      setCategory('Work Environment');
    } else {
      setMessage('Failed to submit feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Submit Anonymous Feedback</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter feedback"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Work Environment</option>
        <option>Leadership</option>
        <option>Growth</option>
        <option>Others</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default FeedbackForm;
