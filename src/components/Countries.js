import React, { useEffect, useState } from 'react'; //rfc
import { Link } from 'react-router-dom';
import { fetchAllCountries, fetchAllByRegion } from '../api/httpHooks';

export default function Countries() {
  const [data, setData] = useState(null);
  const [region, setRegion] = useState('All');

  useEffect(() => {
    async function fetchData() {
      /* const response = await fetchAllCountries()
            setData(response) */
      if (region === 'All') {
        const response = await fetchAllCountries();
        setData(response);
      } else {
        const response = await fetchAllByRegion(region);
        setData(response);
      }
    }
    fetchData();
  }, [region]);

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  return (
    <div>
      <h1>Where in the world?</h1>
      <input
        type='text'
        name='country'
        id='country'
        placeholder='Search for a country'
      />
      <select name='countries' id='countries' onChange={handleRegionChange}>
        <option value='All'>All</option>
        <option value='Africa'>Africa</option>
        <option value='Americas'>Americas</option>
        <option value='Asia'>Asia</option>
        <option value='Europe'>Europe</option>
        <option value='Oceania'>Oceania</option>
      </select>

      {data && (
        <div className='countries'>
          {data.map((country) => (
            <div key={country.name}>
              <Link to={`/${country.name}`}>
                <img
                  className='flag'
                  src={country.flag}
                  alt={`${country.name} flag`}
                />
              </Link>

              <h4> {country.name}</h4>
              <p>
                {' '}
                <span className='generalInfo'>Population: </span>{' '}
                {country.population}{' '}
              </p>
              <p>
                {' '}
                <span className='generalInfo'>Region: </span> {country.region}{' '}
              </p>
              <p>
                {' '}
                <span className='generalInfo'>Capital: </span> {country.capital}{' '}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
