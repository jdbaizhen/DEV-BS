import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initState={
	role:'',
	token:''
};

export default (state=cloneDeep(initState),action)=>{
	switch (action.type){
		case Types.LOGIN_SUCCESS:
			return {
				...state,
				role:action.role,
                token:action.token
			};
		case Types.LOGOUT_SUCCESS:
			return {
				...state,
                role:'',
                token:''
			};
		default:
			return state;
	}
};
