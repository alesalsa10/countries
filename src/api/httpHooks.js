import axios from 'axios';

let baseurl = 'https://restcountries.eu/rest/v2/';

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${baseurl}all`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchAllByRegion = async (region) => {
  try{
    const response = await axios.get(`${baseurl}region/${region}`)
    return response.data
  } catch (error){
    console.log('error', error)
  }
}

export const lookupCountry = async (name) => {
  try{
    const response = await axios.get(`${baseurl}name/${name}`)
    return response.data
  } catch (error){
    console.log('error', error)
  }
}

export const codeToCountry = async (code) => {
  try{
    const response = await axios.get(`${baseurl}alpha/${code}`)
    return response.data
  } catch(error){
    console.log('error', error)
  }
}