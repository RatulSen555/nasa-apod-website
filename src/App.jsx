import { useEffect, useState } from "react";
import SideBar from "./assets/Components/Sidebar";
import Footer from "./assets/Components/Footer";
import Main from "./assets/Components/Main";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    console.log("NASA_KEY:", NASA_KEY); // Debugging

    if (!NASA_KEY) {
      console.error("NASA API Key is missing! Check your .env file.");
      return;
    }

    async function fetchAPIData() {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      console.log("Fetching from URL:", url); // Debugging

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        console.log("API Response:", apiData);

        // Store fetched data in state
        setData(apiData);
        setLoading(false);
      } catch (err) {
        console.log("Fetch error:", err.message);
        setLoading(false);
      }
    }

    fetchAPIData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear fa-spin"></i> Loading...
        </div>
      ) : (
        <>
          <Main data={data} />
          {showModal && <SideBar data={data} handleToggleModal={handleToggleModal} />}
          <Footer data={data} handleToggleModal={handleToggleModal} />
        </>
      )}
    </>
  );
}

export default App;



