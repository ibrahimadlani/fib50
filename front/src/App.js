import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [dummyData, setDummyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/dummy/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDummyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {dummyData ? (
        <>
          <p>Response from API:</p>
          <pre>{JSON.stringify(dummyData, null, 2)}</pre>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
