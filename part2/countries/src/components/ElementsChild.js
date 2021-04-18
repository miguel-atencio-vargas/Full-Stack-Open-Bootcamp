

const ElementsChild = ({ renderCountries, handleSearch, weatherData }) => {
  // the api works when it want it! this avoid the app crashed!
  // error msg: Your current Subscription Plan does not support HTTPS Encryption 
  // when the request is not on https :/
  // but it shows the weather info when the api is not crazy. just prove a few times.
  const temp = weatherData ? weatherData.temperature : '';
  const wind_degree = weatherData ? weatherData.wind_degree: '';
  const wind_dir = weatherData ? weatherData.wind_dir : '';
  const imgUrl = weatherData ? weatherData.weather_icons[0] : '';
  
  const handleButton = e => {
    const searchThisCountrie = e.target.dataset.countrie;
    let position = searchThisCountrie.indexOf('(');
    position = position > 0 ? position : searchThisCountrie.length;
    handleSearch(searchThisCountrie.substring(0, position));
  }

  const length = renderCountries.length;
  if (length>10) return <li>Too many countries, specify another filter</li>
  if (length>1) {
    return renderCountries.map(e => <li key={e.name}> {e.name}
      <button data-countrie={e.name} onClick={handleButton}>show</button>
    </li>);
  }
  if (length === 1) {
    const countrie = renderCountries[0];
    return (
      <li>
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
          style={{ width: '30%', marginTop: '20px' }}
        />
        <h3>Weather in {countrie.capital}</h3>
        <p><b>temperature: </b>{temp}</p>
        <img 
          src={imgUrl} 
          alt={'Weather of: ' + countrie.capital}
          style={{width: '80px', marginTop: '20px' }}/>
        <p><b>wind:</b>{wind_degree} <b>direction</b> {wind_dir}</p>
      </li>
    )
  }
  return <li>not found</li>
}


export default ElementsChild;