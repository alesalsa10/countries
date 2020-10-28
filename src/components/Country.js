import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lookupCountry } from '../api/httpHooks';

export default function Country() {
  const [data, setData] = useState(null);
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function fetchData() {
      const response = await lookupCountry(id);
      setData(response);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      {data &&
        data.map((info) => (
          <div className='countryInfo'>
            <div>
              <img className='countryFlag' src={info.flag} alt='flag' />
            </div>
            <div  className='countryName'>
              <h2> {info.name} </h2>
            </div>
            <div className='specificlInfo'>
              <p> Native Name: {info.nativeName} </p>
              <p> Population: {info.population} </p>
              <p> Region: {info.region} </p>
              <p>Sub Region: {info.subregion} </p>
              <p>Capital: {info.capital} </p>
            </div>
            <div className='moreInfo'>
              <p>
                Currencies:{' '}
                {info.currencies.map((currency) => (
                  <span> {currency.name} </span>
                ))}{' '}
              </p>
              <p>
                languages:{' '}
                {info.languages.map((language) => (
                  <span> {language.name} </span>
                ))}{' '}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
