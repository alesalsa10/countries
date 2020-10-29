import React, { useEffect, useState } from 'react'; //rfc
import { Link } from 'react-router-dom';
import { fetchAllCountries, fetchAllByRegion } from '../../api/httpHooks';
import styles from './Countries.module.css';

export default function Countries({ theme }) {
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
      <div className={styles.topRow}>
        <div>
          <input
            type='text'
            name='country'
            className={`${styles.countrySearch} ${
              theme === 'light' ? styles.light : styles.dark
            }`}
            placeholder='Search for a country...'
          />
        </div>
        <div className={styles.selectDropdown}>
          <select
            name='countries'
            className={`${styles.countriesDropdown} ${theme === 'light' ? styles.light : styles.dark}` }
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

      {data && (
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
      )}
    </div>
  );
}
