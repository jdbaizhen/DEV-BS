import * as types from '../action-types';
import {getTeacherSubjectA,getHomeworkListA,submitHomeworkA,getSubjectListA,getStudentListA,getOneStudentWorkInfoA,submitScoreA,submitHomeWorkTwoA,getWorkA,submitStudentWorkA,teacherMakeOnlineScoreA} from '../../api/homeworkt'

export let getTeacherSubject = (token) => (dispatch) => (
    getTeacherSubjectA(token).then(data => {
        if (data.errCode==='9999') {
			let tableData=data.data;
			dispatch({
				type: types.HOMEWORKT_GET_ALLCOURSE,
				allCourse: tableData
			});
			return {result: true, allCourse: tableData}
		} else {
			return {result: false, err: data.errMsg}
		}
	})
);

export let getSubjectList = (data,token) => (dispatch) => (
    getSubjectListA(data,token).then(data => {
        if(data.errCode==='9999'){
            let subjectData = data.data;
            let count = subjectData.total;
            let details = subjectData.list;
            console.log(details);
            dispatch({
                type: types.HOMEWORKT_GET_SUBJECTLIST,
                details : details,
                count : count
            })
            return {
                result : true,
                data:details,
                count : count
            }
        }else{
            return {
                result : false,
                err : data.errCode
            }
        }
    })
)

export let teacherMakeOnlineScore = (data,token) => (dispatch) => (
    teacherMakeOnlineScoreA(data,token).then(data=>{
        if(data.errCode==='9999'){
            return {
                result: true
            }
        }else{
            return{
                result: false
            }
        }
    })
)

export let getHomeworkList = (data,token) => (dispatch) => (
    getHomeworkListA(data, token).then(data => {
        if (data.errCode === '9999') {
            let result = data.data;
            let homeWorkData = result.list;
            let pages = result.pages;
            let total = result.total;
            dispatch({
                type : types.HOMEWORK_GET_LIST,
                homeWorkData: homeWorkData,
                pages: pages,
				count: total
            })
			return {
            	result : true,
                homeWorkData: homeWorkData,
                pages: pages,
                count: total
			}
        }else{
        	return {
        		result : false
			}
		}
    })
)

export let setCourseIdSubjectList = (data) => (dispatch) => {
    dispatch({
        type : types.HOMEWORKT_SET_SUBJECTLISTCOURSEID,
        courseId:data.courseId
    })
}

export let setCourseId = (data) => (dispatch) => {
    dispatch({
        type : types.HOMEWORK_SET_COURSEID,
        courseId:data.courseId
    })
}

export let submitHomework = (data,token) => (dispatch) => (
    submitHomeworkA(data,token).then(data=>{
        if(data.errCode==='9999'){
            console.log(data);
            return {
                result : true
            }
        }else{
            return {
                result : false,
                err : data.errMsg
            }
        }
    })
)

export let getStudentList = (data,token) => (dispatch) => (
    getStudentListA(data,token).then(data=>{
        if(data.errCode==='9999'){
            let studentData = data.data;
            let studentList = studentData.list;
            let count = studentData.total;
            dispatch({
                type : types.HOMEWORKT_GET_STUDENTHOMEWORLLIST,
                details : studentList,
                count : count
            })
            return {
                result : true
            }
        }else{
            return {
                result : false,
                err : data.errMsg
            }
        }
    })
)

export let getOneStudentWorkInfo = (data,token) => (dispatch) => (
    getOneStudentWorkInfoA(data,token).then(data=>{
        if(data.errCode==='9999'){
           let WorkData = data.data;
           let topicNumber = WorkData.topicNumber;
           let files = WorkData.files;
           return {
               result:true,
               topicNumber:topicNumber,
               files:files
           }
        }else{
            return {
                result:false,
                err:data.errMsg
            }
        }
    })
)

export let submitScore = (data,token) => (dispatch) => (
    submitScoreA(data,token).then(data=>{
        if(data.errCode==='9999'){
            return {
                result: true
            }
        }else{
            return {
                result: false,
                err: data.Msg
            }
        }
    })
)

export let submitHomeWorkTwo = (data,token) => (dispatch) => (
    submitHomeWorkTwoA(data,token).then(data=>{
        if(data.errCode==='9999'){
            dispatch({
                type : types.HOMEWORKT_GET_STUDENTHOMEWORLLIST
            })
            return {
                result: true
            }
        }else{
            return {
                result: false,
                err: data.Msg
            }
        }
    })
)

export let getWork = (data,token) => (dispatch) => (
    getWorkA(data,token).then(data=>{
        if(data.errCode==='9999'){
            let workData = data.data;
            return{
                result:true,
                data:workData,
            }
        }else{
            return{
                result:false
            }
        }
    })
)

export let submitStudentWork = (data,token) => (dispatch) => (
    submitStudentWorkA(data,token).then(data=>{
        if(data.errCode==='9999'){
            console.log(data);
            return {
                result:true
            }
        }else{
            return {
                result:false,
                err:data.errMsg
            }
        }
    })
)

//分页
export let setPageStudentWorkList = (num1,num2) => (dispatch) => (
    dispatch({
        type : types.HOMEWORK_SET_SUBJECTLISTPAGES,
        pageIndex : num1,
        pageSize : num2
    })
)

export let setPageStudentWorkDetail = (num1,num2) => (dispatch) => {
    dispatch({
        type : types.HOMEWORKT_SET_STUDENTLISTPAGE,
        pageIndex : num1,
        pageSize : num2
    })
}

export let setPage = (num1,num2) => (dispatch) => {
    dispatch({
        type : types.HOMEWORK_SET_PAGES,
        pageIndex : num1,
        pageSize : num2
    })
}

