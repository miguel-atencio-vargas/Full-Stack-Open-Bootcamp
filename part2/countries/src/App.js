import React, {useState, useEffect} from 'react';
import axios from 'axios';
const ElementsChild = ({ renderCountries }) => {
  const length = renderCountries.length;
  if (length > 10) {
    return <li>Too many countries, specify another filter</li>
  }
  if(length > 1) {
    return renderCountries.map(e => <li key={e.name}>{e.name}</li>);
  }
  if(length === 1 ){
    const countrie = renderCountries.pop();
    console.log(countrie);
    return (<li>
      <h2>{countrie.name}</h2>
      <p>capital: {countrie.capital}</p>
      <p>population: {countrie.population}</p>
      <h3>Languages</h3>
      <ul>
        {countrie.languages.map(e => <li key={e.name}>{e.name}</li>)}
      </ul>
      <img 
        src={countrie.flag} 
        alt={'Flag of: ' + countrie.name}
        style={{width:'30%', marginTop: '20px'}}
      />
    </li>)
  }
  return <li>not found</li>
}
function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [searchCountrie, setSearchCountrie] = useState('');

  const hookRequestData = () => {
    const eventHandler = response => setCountries(response.data);
    // const promise = axios.get('https://restcountries.eu/rest/v2/region/europe');
    const promise = axios.get('https://restcountries.eu/rest/v2/all');
    promise
      .then(eventHandler)
      .catch(err => console.log(err));
  }
  useEffect(hookRequestData, []);
  

  const handleInputCountrie = (e) => setSearchCountrie(e.target.value);
  
  const hookSearch = () => {
    const countriesFinded = countries.filter(countrie => {
      return new RegExp(searchCountrie, 'gi').test(countrie.name)
    });
    setSearchedCountries(countriesFinded);
  }
  useEffect(hookSearch, [searchCountrie, countries]);

  
  return(
    <>
      <form>
        <label>find countries: </label>
        <input type='text' onChange={handleInputCountrie}/>
      </form>
      <ul>
        <ElementsChild renderCountries={searchedCountries}/>
      </ul>
    </>
  )
}

export default App;
