import axios from 'axios';

const instance = axios.create({
	baseURL: "https://yonglin-burger.firebaseio.com/"
});

export default instance;


