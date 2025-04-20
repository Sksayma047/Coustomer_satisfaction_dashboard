import React, { useEffect, useState } from "react";

const FeedbackTable = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetch("public/api/feedback-customer.json")
      .then((res) => res.json())
      .then((data) => setFeedbackData(data))
      .catch((error) => console.error("Error fetching feedback data:", error));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Customer Feedback Table</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Customer Name</th>
            <th className="border px-4 py-2 text-left">Feedback</th>
            <th className="border px-4 py-2 text-left">Rating</th>
            <th className="border px-4 py-2 text-left">Category</th>
            <th className="border px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{item.customer}</td>
              <td className="border px-4 py-2">{item.feedback}</td>
              <td className="border px-4 py-2">{item.rating}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;