import wpapi from 'wpapi'
import config from '../constants/config';


const wp = new wpapi({ endpoint: `${config.url.wpJson}` });


export default wp;
export  {wp};