import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initAllCourse = {
    allCourse:[]
};
let mapDataR = (state = cloneDeep(initAllCourse), action) => {
	switch (action.type) {
		case Types.HOMEWORKT_GET_ALLCOURSE:
			return {
				...state,
                allCourse: action.allCourse
			};
		default:
			return state
	}
};

let initSearchTerms = {
	pageIndex:'1',
	pageSize:'10',
	courseId:undefined
}
let SearchTermR = (state = cloneDeep(initSearchTerms),action) => {
	switch (action.type) {
		case Types.HOMEWORK_SET_PAGES:
			return {
				...state,
				pageIndex:action.pageIndex,
				pageSize:action.pageSize
			}
		case Types.HOMEWORK_SET_COURSEID:
			return {
				...state,
				courseId:action.courseId
			}
		default:
			return state;
	}
}

let initHomeWorkList = {
    homeWorkData: [],
    pages: undefined,
    count: 0
}
let HomeWorkListR = (state = cloneDeep(initHomeWorkList),action) => {
	switch (action.type) {
		case Types.HOMEWORK_GET_LIST:
			return {
				...state,
				homeWorkData:action.homeWorkData,
				pages:action.pages,
				count:action.count
			}
		default:
			return state
	}
}

let initSubjectList = {
	details : [],
	count : 0
}

let SubjectListR = (state = cloneDeep(initSubjectList),action) => {
	switch (action.type) {
		case Types.HOMEWORKT_GET_SUBJECTLIST:
			return {
				...state,
				details : action.details,
				count:action.count
			}
		default:
			return state
	}
}

let initSubjectSearchTerm = {
	pageIndex:'1',
	pageSize:'10',
	courseId:undefined
}

let SubjecyListSearchTermR = (state=cloneDeep(initSubjectSearchTerm),action)=>{
	switch (action.type) {
		case Types.HOMEWORK_SET_SUBJECTLISTPAGES:
			return {
				...state,
				pageIndex:action.pageIndex,
				pageSize:action.pageSize,
			}
		case Types.HOMEWORKT_SET_SUBJECTLISTCOURSEID:
			return {
				...state,
				courseId:action.courseId
			}
		default:
			return state

	}
}

let initStudentList = {
	details : [],
	count : 0
}

let StudentHomeWorkListR = (state=cloneDeep(initStudentList),action) => {
	switch (action.type) {
		case Types.HOMEWORKT_GET_STUDENTHOMEWORLLIST:
			return {
				...state,
				details : action.details,
				count : action.count
			}
		default:
			return state
	}
}

let initStudentListTerm = {
	pageIndex :'1',
	pageSize : '10'
}

let StudentListSearchTermR = (state=cloneDeep(initStudentListTerm),action) => {
	switch (action.type) {
		case Types.HOMEWORKT_SET_STUDENTLISTPAGE:
			return {
				...state,
				pageIndex:action.pageIndex,
				pageSize:action.pageSize
			}
		default:
			return state
	}
}

export default {
    SearchTermR,
    HomeWorkListR,
	mapDataR,
    SubjectListR,
    SubjecyListSearchTermR,
    StudentHomeWorkListR,
    StudentListSearchTermR
}