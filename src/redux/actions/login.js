import * as types from '../action-types';
import {push} from 'react-router-redux';
import {loginA, logoutA} from "../../api/login";
import {setSession, removeSession} from '../../utils/util';

export let login = (userData) => (dispatch) => (
	loginA(userData).then(data => {
		if (data.errCode==='9999') {
			let role = data.role.toString();
            let token = data.token;
           	setSession('role',role);
           	setSession('token',token);
            dispatch({
                type: types.LOGIN_SUCCESS,
                role: role,
				token: token
            });
			if(role==='1'){
                dispatch(push('/homeworkt'));
			}else if(role==='2'){
                dispatch(push('/homework'));
			}
			return {
				result: true,
				token : token
			}
		} else {
			return {result: false, err: data.errMsg}
		}
	})
);
export let logout = (token) => (dispatch) => (
	logoutA(token).then(data => {
		if (data.errCode==='9999') {
            removeSession('role');
            removeSession('token');
			dispatch({
				type: types.LOGOUT_SUCCESS
			});
            dispatch(push('/login'));
			return {result: true}
		} else {
			return {result: false, err: data.errMsg}
		}
	})
);