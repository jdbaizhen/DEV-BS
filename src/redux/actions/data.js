import * as types from '../action-types';
// import dataTableData from '../../common/json/sj.json';
import {getTableDataA} from '../../api/data';
// import {betweenMoment} from '../../utils/util';

export let getTableData = (searchTerm) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	let data={
	// 		count:0,
	// 		details:[]
	// 	};
	// 	let {pageIndex, pageSize,beginTime,endTime} = searchTerm;
	// 	if(beginTime&&endTime){
	// 		let newAllData=dataTableData.details.filter(item=>{
	// 			return betweenMoment(item.time,beginTime,endTime)
	// 		});
	// 		data.count=newAllData.length;
	// 		data.details=newAllData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
	// 	}else{
	// 		dataTableData.details.sort(function () {
	// 			let num=Math.random()-0.5;
	// 			return num>0
	// 		});
	// 		data.count=dataTableData.count;
	// 		data.details=dataTableData.details.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
	// 	}
	// 	resolve({result: true, data: data});
	// })
	getTableDataA(searchTerm).then(data => {
		if (data.result) {
			let tableData=JSON.parse(data.data);
			// let tableData = data.data;
			dispatch({
				type: types.DATA_GET_TABLE,
				details: tableData.details,
				count: tableData.count,
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let getImages = (num) => (dispatch) => {
	dispatch({
		type: types.DATA_GET_IMAGES,
		selectedRowKey: num
	})
};
export let setSearchId = (id) => (dispatch) => {
	dispatch({
		type:types.DATA_SET_SEARCHID,
		id:id
	})
};
export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.DATA_SET_SEARCHTERM,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.DATA_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};