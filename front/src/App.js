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
    <div className="text-center">
      {dummyData ? (
        <>
          <p className="text-gray-500">Response from API:</p>
          <h1 className="text-3xl font-bold">
            {dummyData.fib}
          </h1>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
