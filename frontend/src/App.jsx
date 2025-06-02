import React from 'react';
import FeedbackForm from './components/feedbackForm';
import FeedbackAdmin from './components/FeedbackAdmin';

const App = () => {
  return (
    <div>
      <h1 className="heading-text">Employee Feedback Portal</h1>
      <FeedbackForm />
      <hr className="my-8" />
      <FeedbackAdmin />
    </div>
  );
};

export default App;
