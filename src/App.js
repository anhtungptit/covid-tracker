import React, {useState, useEffect} from 'react';
import './App.css';
import Card from "./Card";
import Table from "./Table";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('global');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getCountryInfo = async() => {
      await fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data)
      })
    }
    getCountryInfo()
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(data => {
        setCountries(data.map(country => country.country));
        setTableData(data);
        console.log(data)
      })
    }
    getCountriesData();
  }, [])


  const onCountryChange = async(e) => {
    const countryCode = e.target.value;    

    const url =
     countryCode === "global"
        ? "https://disease.sh/v3/covid-19/all" 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(res => res.json())
    .then(data => {
      setCountryInfo(data);
      setCountry(countryCode);
    })
  }

  return (
    <div className="App">
      <div className="app-above">
        <div className="container">
          <h1>Covid Tracker</h1>
          <select name="countries" onChange={onCountryChange} value={country} >
            <option value="global">Global</option>
            {countries.map(country => (
              <option value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="card-container">
            <Card title="Coronanvirus cases" countryInfo={countryInfo.todayCases} total={countryInfo.cases}/>
            <Card title="Recovered" countryInfo={countryInfo.todayRecovered} total={countryInfo.recovered}/>
            <Card title="Deaths" countryInfo={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
      </div>
      <div className="app-underneath">
        <div className="table-container">
          <h3>Live cases by Country</h3>
          <Table countries={tableData}/>
        </div>     
      </div>
    </div>
  );
}

export default App;
