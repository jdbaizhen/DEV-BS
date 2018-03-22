import {get,post} from './fetch';
export const loginA=(data)=>(
	post('/driverCar/user/login',data)
);
export const logoutA=()=>(
	get('/driverCar/users/logout')
);
