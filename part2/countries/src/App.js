import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ElementsChild from './components/ElementsChild';
const api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [searchCountrie, setSearchCountrie] = useState('');
  const [capital, setCapital] = useState('');
  const [weather, setWeather] = useState({})

  const hookRequestData = () => {
    const eventHandler = response => setCountries(response.data);
    const promise = axios.get('https://restcountries.eu/rest/v2/all');
    promise
      .then(eventHandler)
      .catch(err => console.log(err));
  }
  useEffect(hookRequestData, [searchCountrie]);

  const hookRequestWeather = () => {
    const eventHandler = response => {
      console.log(response);
      setWeather(response.data.current)
    }
    if(capital) {
      const endpoint = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;
      const promise = axios.get(endpoint);
      promise.then(eventHandler).catch(err => console.log(err));
    }
  }
  useEffect(hookRequestWeather, [capital]);
  // There another border case when the name has non-alphabetic chars like '(' i.g. Bolivia
  const handleInputCountrie = e => setSearchCountrie(e.target.value.replace(/[^a-zA-Z ]/g, ''));
  
  const hookSearch = () => {
    if (searchCountrie) {
      const countriesFinded = countries.filter(countrie => {
        return new RegExp(searchCountrie, 'gi').test(countrie.name);
      });
      setSearchedCountries(countriesFinded);
      if (countriesFinded.length === 1 && countriesFinded[0].capital !== capital) setCapital(countriesFinded[0].capital);
    }
  }
  useEffect(hookSearch, [searchCountrie, capital, countries]);

  return(
    <>
      <form>
        <label>find countries: </label>
        <input type='text' onChange={handleInputCountrie}/>
      </form>
      <ul>
        <ElementsChild 
          renderCountries={searchedCountries} 
          handleSearch={setSearchCountrie}
          weatherData={weather}
          />
      </ul>
    </>
  )
}

export default App;
