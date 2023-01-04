import "./PropertiesComponent.css";
import Header from "../Homepage/Header/Header";
import PropertyDetails from "./PropertyDetails";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import LoadSpinner from "../PublicHelper/Spinner";

const PropertiesPage = () => {
  const [cityName, setCityName] = useState("");
  const [housesData, setHousesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "29982cf4c4msh198be8ef6ad2483p138a15jsn61ffccc2c259",
      "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchCity = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://zillow56.p.rapidapi.com/search?location=${"washington"}`,
          options
        );
        // if (!res.ok) throw new Error("houses couldn't be fetched");
        const data = await res.json();
        setIsLoading(false);
        setHousesData(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCity();
    ////The next line code is to avoid warning
    // eslint-disable-next-line
  }, []);

  const searchHousesHandler = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://zillow56.p.rapidapi.com/search?location=${cityName}`,
        options
      );
      if (!res.ok) throw new Error("houses couldn't be fetched");
      const data = await res.json();
      setIsLoading(false);
      setHousesData(data.results);
      setCityName("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="properties-page">
      <Header />
      <div className="title-box">
        <h1>Properties</h1>
        <div className="sub-title">
          <p>many options to choose from</p>
          <span>you deserve great services.</span>
        </div>
      </div>
      <main className="apartmets-box">
        <div className="search-box">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="enter preffered city (only in the USA)"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button onClick={searchHousesHandler}>Search</button>
        </div>

        <div className="apartments-con">
          <div className="home-display-box">
            {isLoading && <LoadSpinner />}
            {!housesData && !isLoading ? (
              <div className="exhausted">
                <p>
                  Unable to get properties data at this time (API exhausted)
                </p>
              </div>
            ) : (
              <PropertyDetails data={housesData} />
            )}
          </div>
        </div>
      </main>
    </section>
  );
};
export default PropertiesPage;
