import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer as BarContainer } from "recharts";
import { AreaChart, Area, XAxis as AreaXAxis, YAxis as AreaYAxis, CartesianGrid as AreaGrid, Tooltip as AreaTooltip, ResponsiveContainer as AreaContainer } from "recharts";
import FeedbackTable from "./FeedbackTable";







// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const feedback = payload[0].payload;
    const emojiMap = {
      "Positive": "😊",
      "Neutral": "😐",
      "Negative": "😠",
      "Suggestion": "📝"
    };

    const colorMap = {
      "Positive": "#4caf50",
      "Neutral": "#ffeb3b",
      "Negative": "#f44336",
      "Suggestion": "#2196f3"
    };

    const emoji = emojiMap[feedback.type] ;
    const color = colorMap[feedback.type] || "#8884d8";

    return (
      <div className="bg-white p-2 rounded shadow border border-gray-200 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <span>{emoji} <strong>{feedback.type}</strong></span>
        </div>
        <p>Value: {feedback.value}</p>
      </div>
    );
  }

  return null;
};





const DashboardPage = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [feedbackTypeData, setFeedbackTypeData] = useState([]);
  const [feedbackSummary, setFeedbackSummary] = useState({});

  useEffect(() => {
    // Fetch mock data from the public folder (JSON files)
    const fetchData = async () => {
      try {

      const monthlyResponse = await fetch("src/public/api/feedback-monthly.json");
      const typeResponse = await fetch("src/public/api/feedback-type.json");
      const summaryResponse = await fetch("src/public/api/feedback-summary.json");

      const monthlyData = await monthlyResponse.json();
      const feedbackTypeData = await typeResponse.json();
      const feedbackSummary = await summaryResponse.json();

      setMonthlyData(monthlyData);
      setFeedbackTypeData(feedbackTypeData);
      setFeedbackSummary(feedbackSummary);
        
      } catch (error) {
        console.log(error);
        
      }
      
      

      
    };

    fetchData(); // u have to call function
        
    
  },[]);



  
  


  // Render Dashboard UI
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Feedback Summary Cards */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <div className="text-xl font-semibold">😊 Positive </div>
          <div className="text-3xl font-bold">{feedbackSummary.positive}%</div>
          {/* <MdFax className="text-green-500 mx-auto text-4xl" /> */}
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <div className="text-xl font-semibold">😐 Nutral </div>
          <div className="text-3xl font-bold">{feedbackSummary.neutral}%</div>
          {/* <MdFeedback className="text-yellow-500 mx-auto text-4xl" /> */}
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
          <div className="text-xl font-semibold">😠 Negative </div>
          <div className="text-3xl font-bold">{feedbackSummary.negative}%</div>
          {/* <MdFeedback className="text-red-500 mx-auto text-4xl" /> */}
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
          <div className="text-xl font-semibold">Total Feedback</div>
          <div className="text-3xl font-bold">{feedbackSummary.positive + feedbackSummary.neutral + feedbackSummary.negative}%</div>
          {/* <HiTrendingUp className="text-blue-500 mx-auto text-4xl" /> */}
        </div>
      </div>

      {/* Monthly Feedback Area Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Monthly Feedback</h2>
        <AreaContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <Area type="monotone" dataKey="feedback" stroke="#8884d8" fill="#8884d8" />
            <AreaXAxis dataKey="month" />
            <AreaYAxis />
            <AreaGrid strokeDasharray="3 3" />
            <AreaTooltip />
          </AreaChart>
        </AreaContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-4">Feedback Type Distribution</h2>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={feedbackTypeData}
        dataKey="value"
        nameKey="type"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {feedbackTypeData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={["#4caf50", "#ffeb3b", "#f44336", "#2196f3"][index % 4]}
          />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
</div>



      
      {/* Feedback Count Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Feedback Count</h2>
        <BarContainer width="100%" height={300}>
          <BarChart data={feedbackTypeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </BarContainer>
      </div>

      
      <FeedbackTable />
    </div>




    
  );
};

export default DashboardPage;
