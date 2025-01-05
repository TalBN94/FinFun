import React, { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/Transaction/names") // Replace with your backend URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <div>
            <h1>Fetched Data</h1>
            {error ? (
                <p style={{ color: "red" }}>Error: {error}</p>
            ) : (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
