import * as types from '../action-types';
import {getCrossingDataA} from '../../api/homeworkt'
import {getTableDataA} from '../../api/data'

export let getCrossingData = () => (dispatch) => (
	getCrossingDataA().then(data => {
		if (data.result) {
			let tableData=JSON.parse(data.data);
			// let tableData = {
			// 	details: data.data
			// };
			dispatch({
				type: types.MAPSELF_GET_SUCCESS,
				roadData: tableData.details,
			});
			return {result: data.result, roadData: tableData.details}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);

export let getTableData = (searchTerm) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	let data = {
	// 		count: 0,
	// 		details: []
	// 	};
	// 	let {pageIndex, pageSize, beginTime, endTime} = searchTerm;
	// 	let newAllData = dataTableData2.details.filter(item => {
	// 		if (beginTime && endTime) {
	// 			if (!betweenMoment(item.time, beginTime, endTime)) {
	// 				return false
	// 			}
	// 		}
	// 		return true;
	// 	});
	// 	data.count = newAllData.length;
	// 	data.details = newAllData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
	// 	resolve({result: true, data: data});
	// })
	getTableDataA(searchTerm).then(data => {
		if (data.result) {
			let tableData=JSON.parse(data.data);
			// let tableData = data.data;
			dispatch({
				type: types.MAPSELF_GET_TABLE,
				details: tableData.details,
				count: tableData.count,
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let setSearchId = ({id, name}) => (dispatch) => {
	dispatch({
		type: types.MAPSELF_SET_SEARCHID,
		id,
		name
	})
};
export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.MAPSELF_SET_SEARCHTERM,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.MAPSELF_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};