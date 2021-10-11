import axios from 'axios';
import { AppConstants } from '../constants';

const api = axios.create({
	baseURL: AppConstants.BACK_END_ADDRESS,
});

export default api;