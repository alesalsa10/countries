import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { lookupCountry, codeToCountry } from '../../api/httpHooks';
import styles from './Country.module.css';
import Button from '../Button/Button';

export default function Country({ theme }) {
  const [data, setData] = useState(null);
  const [borders, setBorders] = useState([]);
  let { id } = useParams();

  async function countryName(array) {
    const names = await Promise.all(array.map((code) => codeToCountry(code)));
    return names;
  }

  useEffect(() => {
    async function fetchData() {
      const response = await lookupCountry(id);
      setData(response);
      const countries = await countryName(response[0].borders);
      setBorders(countries);
    }
    fetchData();
  }, [id]);

  return (
    <div className={styles.country}>
      <Button theme={theme} />
      {data &&
        data.map((info) => (
          <div key={info.name} className={styles.countryInfo}>
            <div>
              <img className={styles.countryFlag} src={info.flag} alt='flag' />
            </div>
            <div className={`${styles.countryName} ${styles.main}`}>
              <h2> {info.name} </h2>
            </div>
            <div className={`${styles.specificlInfo} ${styles.main}`}>
              <p>
                {' '}
                <span className={styles.spans}>Native Name: </span>{' '}
                {info.nativeName}{' '}
              </p>
              <p>
                {' '}
                <span className={styles.spans}>Population:</span>{' '}
                {info.population}{' '}
              </p>
              <p>
                {' '}
                <span className={styles.spans}>Region:</span> {info.region}{' '}
              </p>
              <p>
                <span className={styles.spans}>Sub Region:</span>{' '}
                {info.subregion}{' '}
              </p>
              <p>
                <span className={styles.spans}>Capital:</span> {info.capital}{' '}
              </p>
            </div>
            <div className={`${styles.moreInfo} ${styles.main}`}>
              <p>
                <span className={styles.spans}>Currencies:</span>{' '}
                {info.currencies.map((currency) => (
                  <span key={currency.name}> {currency.name} </span>
                ))}{' '}
              </p>
              <p>
                <span className={styles.spans}>languages:</span>{' '}
                {info.languages.map((language) => (
                  <span key={language.name}> {language.name} </span>
                ))}{' '}
              </p>
            </div>
            <div className={`${styles.borders} ${styles.main}`}>
              {borders.length === 0 ? (
                <p>No countries around border</p>
              ) : (
                <p>
                  <span className={styles.spans}>Country Borders: </span>{' '}
                  {borders.map((country) => (
                    <span key={country.name}> 
                      <Link to={`/${country.name}`} className={styles.countryLinks}>
                        <span className={styles.borderName}> {country.name} </span>
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
