import * as types from '../action-types';
import {push} from 'react-router-redux';
import {loginA, logoutA} from "../../api/login";
import {setSession, removeSession} from '../../utils/util';

export let login = (userData) => (dispatch) => (
	loginA(userData).then(data => {
		if (data.result) {
			let userInfo = JSON.parse(data.data);
			setSession('username', userInfo.username);
			dispatch({
				type: types.LOGIN_SUCCESS,
				username: userInfo.username
			});
			dispatch(push('/homework'));
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let logout = () => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	resolve({result: true})
	// })
	logoutA().then(data => {
		if (data.result) {
			removeSession('username');
			dispatch({
				type: types.LOGOUT_SUCCESS
			});
			dispatch(push('/'));
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);