import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Filter = ({ search, handleSearchChange }) => {
  return (
    <>
      <label>Search for country: </label>
      <input type="search" value={search} onChange={handleSearchChange} />
    </>
  );
};

const CountryListItem = ({ country, handleClick }) => {
  return (
    <div className="flex">
      <p className="country">{country.name.common}</p>
      <button value={country.name.common} onClick={handleClick}>
        show
      </button>
    </div>
  );
};

const CountryData = ({ countriesToShow }) => {
  return (
    <>
      {countriesToShow.map((country) => (
        <div key={country.cca2}>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <Languages languages={country.languages} />
          <img src={country.flags[0]} alt="flag" width="150" height="120"></img>
          <Weather capital={country.capital} />
        </div>
      ))}
    </>
  );
};

const Languages = ({ languages }) => {
  return (
    <>
      <h3>languages</h3>
      {Object.values(languages).map((lang, i) => (
        <p key={i}>{lang}</p>
      ))}
    </>
  );
};

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const icon = response.data.weather[0].icon;
        const weatherObject = {
          temp: (response.data.main.temp - 273.15).toFixed(0),
          icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
          iconAlt: response.data.weather[0].description,
          wind: response.data.wind.speed,
        };
        setWeatherData(weatherObject);
      });
  }, [capital]);
  return (
    <>
      <h3>current weather</h3>
      <p>temperature: {weatherData.temp} Celsius</p>
      <img src={weatherData.icon} alt={weatherData.iconAlt} />
      <p>wind: {weatherData.wind} m/s</p>
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com//v3/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (event) => {
    setSearch(event.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const foundCountries = countriesToShow.length;

  return (
    <main id="app">
      <Filter search={search} handleSearchChange={handleSearchChange} />

      {foundCountries <= 10 && foundCountries > 1 ? (
        countriesToShow.map((country) => (
          <CountryListItem
            country={country}
            handleClick={handleClick}
            key={country.cca2}
          />
        ))
      ) : foundCountries <= 1 ? (
        <CountryData countriesToShow={countriesToShow} />
      ) : (
        <p>Too many matches, please specify</p>
      )}
    </main>
  );
};

export default App;
