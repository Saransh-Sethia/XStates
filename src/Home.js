import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [states, setStates] = useState([]);
  const [stateName, setStateName] = useState("");
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [isStateSelected, setIsStateSelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);

  const handleCountry = (e) => {
    const getCountryName = e.target.value;
    console.log("country-name", getCountryName);
    setCountryName(getCountryName);
    setIsCountrySelected(true);
  };

  const handleState = (e) => {
    const getStateName = e.target.value;
    console.log("state-name", getStateName);
    setStateName(getStateName);
    setIsStateSelected(true);
  };

  const handleCity = (e) => {
    const getCityName = e.target.value;
    setCityName(getCityName);
    setIsCitySelected(true);
  };

  // if (isCitySelected === true) {
  //   setIsCountrySelected(false);
  //   setIsStateSelected(false);
  // }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );

        const data = await response.data;
        setCountries(await data);
        setLoading(false);
      } catch (error) {
        console.log("error-1", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async (countryName) => {
      try {
        if (isCountrySelected === true) {
          setLoading(true);
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${countryName}/states`
          );
          const data = await response.data;
          setStates(await data);
          setLoading(false);
        } else {
          return;
        }
      } catch (error) {
        console.log("error-2", error);
      }
    };
    fetchStates(countryName);
  }, [countryName]);

  useEffect(() => {
    const fetchCities = async (countryName, stateName) => {
      try {
        if (isStateSelected === true) {
          setLoading(true);
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
          );
          const data = await response.data;
          setCities(await data);
          setLoading(false);
        } else {
          return;
        }
      } catch (error) {
        console.log("error-3", error);
      }
    };
    fetchCities(countryName, stateName);
  }, [countryName, stateName]);

  return (
    <div>
      <h1>Select Location</h1>
      <select 
      disabled = {isCitySelected && isStateSelected ? true : false}
      onChange={(e) => handleCountry(e)} value={countryName}>
        <option>Select Country</option>
        {countries.map((country, id) => (
          <option key={id}>{country}</option>
        ))}
      </select>

      <select
        disabled={isCountrySelected && !isStateSelected ? false : true}
        onChange={(e) => handleState(e)}
        value={stateName}
      >
        <option>Select State</option>
        {states.map((state, id) => (
          <option key={id}>{state}</option>
        ))}
      </select>

      <select
        disabled={isStateSelected && !isCitySelected ? false : true}
        onChange={(e) => handleCity(e)}
        value={cityName}
      >
        <option>Select City</option>
        {cities.map((city, id) => (
          <option key={id}>{city}</option>
        ))}
      </select>
      {isCitySelected && (
        <h5>{`You selected ${cityName}, ${stateName}, ${countryName}`}</h5>
      )}
    </div>
  );
};

export default Home;
