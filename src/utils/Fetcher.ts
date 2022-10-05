import {config} from './Config';

const Fetcher = (url: string) =>
  fetch(config.API_URL + url).then(res => res.json());

export default Fetcher;
