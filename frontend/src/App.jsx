import React from 'react';
import FeedbackForm from './components/feedbackForm';
import FeedbackAdmin from './components/FeedbackAdmin';

const App = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-4">Employee Feedback Portal</h1>
      <FeedbackForm />
      <hr className="my-8" />
      <FeedbackAdmin />
    </div>
  );
};

export default App;
