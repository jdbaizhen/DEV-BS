import {get} from './fetch';
export const getCrossingDataA=()=>(
	get('/driverCar/map/getCrossings')
);
export const getStudentList=(i)=>{
	var result = get('/bs/homeworkt/getstudentlist?week:'+i);
	return result;
};