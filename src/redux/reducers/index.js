import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import loginR from './login';
import homeworktR from './homeworkt';
import dataR from './data';
import chartR from './chart';
import caseR from './case';
import caseTableR from './caseTable';
import trackR from './track';
import trackResultR from './trackResult'
import SelfInfoR from './selfInfo'
import GradeR from './grade'

export default combineReducers({
	...trackResultR,
	...trackR,
	...caseTableR,
	...caseR,
	...chartR,
	...homeworktR,
	...dataR,
	...SelfInfoR,
	...GradeR,
	loginR,
	router:routerReducer
})
