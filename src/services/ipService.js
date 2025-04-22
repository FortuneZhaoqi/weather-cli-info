import axios from 'axios';

const IP_API_URL = 'http://ip-api.com/json';

export async function getLocalCity() {
  try {
    const res = await axios.get(IP_API_URL);
    return res.data.city;
  } catch (err) {
    throw new Error(`Could bot determine your location: ${ err.message }`);
  }
}
