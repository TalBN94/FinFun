import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:5000/Transaction/names");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fetched Data</h1>
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      ) : (
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li 
              key={index}
              className="p-3 bg-white shadow rounded hover:bg-gray-50 transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;