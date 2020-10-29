import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lookupCountry } from '../../api/httpHooks';
import styles from './Country.module.css';

export default function Country() {
  const [data, setData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await lookupCountry(id);
      setData(response);
    }
    fetchData();
  }, [id]);

  return (
    <div className={styles.country}>
      {data &&
        data.map((info) => (
          <div key ={info.name} className={styles.countryInfo}>
            <div>
              <img className={styles.countryFlag} src={info.flag} alt='flag' />
            </div>
            <div className={`${styles.countryName} ${styles.main}`}>
              <h2> {info.name} </h2>
            </div>
            <div className={`${styles.specificlInfo} ${styles.main}`}>
              <p> <span className={styles.spans}>Native Name: </span> {info.nativeName} </p>
              <p> <span className={styles.spans}>Population:</span> {info.population} </p>
              <p> <span className={styles.spans}>Region:</span> {info.region} </p>
              <p><span className={styles.spans}>Sub Region:</span> {info.subregion} </p>
              <p><span className={styles.spans}>Capital:</span> {info.capital} </p>
            </div>
            <div className={`${styles.moreInfo} ${styles.main}`}>
              <p>
                <span className={styles.spans}>Currencies:</span>{' '}
                {info.currencies.map((currency) => (
                  <span key={currency.name} className={styles.spans}> {currency.name} </span>
                ))}{' '}
              </p>
              <p>
                <span className={styles.spans}>languages:</span>{' '}
                {info.languages.map((language) => (
                  <span key={language.name}> {language.name} </span>
                ))}{' '}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
