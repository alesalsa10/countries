import React, { useEffect, useState } from 'react'; //rfc
import { Link, Redirect } from 'react-router-dom';
import {
  fetchAllCountries,
  fetchAllByRegion,
  lookupCountry,
} from '../../api/httpHooks';
import styles from './Countries.module.css';

export default function Countries({ theme }) {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState('All');
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      /* const response = await fetchAllCountries()
            setData(response) */
      if (region === 'All' && search === false) {
        const response = await fetchAllCountries();
        setData(response);
      } else if (search === true) {
        const response = await lookupCountry(country);
        setData(response);
      } else {
        const response = await fetchAllByRegion(region);
        setData(response);
      }
    }
    fetchData();
  }, [region, search]);

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };

  let error = (
    <div className={styles.error}>
      Could not find any countries matching your search query
    </div>
  );
  return (
    <div>
      <div className={styles.topRow}>
        <div>
          <input
            type='text'
            name='country'
            className={`${styles.countrySearch} ${
              theme === 'light' ? styles.light : styles.dark
            }`}
            placeholder='Search for a country...'
            value={country}
            onChange={handleCountryChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className={styles.selectDropdown}>
          <select
            name='countries'
            className={`${styles.countriesDropdown} ${
              theme === 'light' ? styles.light : styles.dark
            }`}
            onChange={handleRegionChange}
          >
            <option disabled defaultValue value='Filter'>
              Filter by Region
            </option>
            <option value='All'>All</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
          </select>
        </div>
      </div>
      
      {data === undefined ? (
        error
      ) : data.length > 1 ? (
        <div className={styles.countries}>
          {data.map((country) => (
            <div key={country.name}>
              <Link to={`/${country.name}`}>
                <img
                  className={styles.flag}
                  src={country.flag}
                  alt={`${country.name} flag`}
                />
              </Link>

              <h4 className={styles.main}> {country.name}</h4>
              <p>
                {' '}
                <span className={`${styles.generalInfo} ${styles.main}`}>
                  Population:{' '}
                </span>{' '}
                {country.population}{' '}
              </p>
              <p>
                {' '}
                <span className={`${styles.generalInfo} ${styles.main}`}>
                  Region:{' '}
                </span>{' '}
                {country.region}{' '}
              </p>
              <p className={styles.last}>
                {' '}
                <span className={`${styles.generalInfo} ${styles.main}`}>
                  Capital:{' '}
                </span>{' '}
                {country.capital}{' '}
              </p>
            </div>
          ))}
        </div>
      ) : (<Redirect to={`/${country}`} />)
    }
    </div>
  );
}
