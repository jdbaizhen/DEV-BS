import * as types from '../action-types'
import {getScoreListA,getScoreA,scoreDetailOnlineA,scoreDetailNotOnlineA} from "../../api/grade";
import {getTeacherSubjectA,getSubjectListA} from "../../api/homeworkt"

export let getScoreList = (data,token) => (dispatch) => (
    getScoreListA(data,token).then(data=>{
        if (data.errCode === '9999') {
            let result = data.data;
            let homeWorkData = result.list;
            let total = result.total;
            dispatch({
                type : types.GRADE_GET_ALLSCORE,
                details: homeWorkData,
                count: total
            })
            return {
                result : true,
                details: homeWorkData,
                count: total
            }
        }else{
            return {
                result : false
            }
        }
    })
)

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

export let getScore = (data,token) => (dispatch) => (
    getScoreA(data,token).then(data=>{
        if(data.errCode==='9999'){
            let socreData = data.data;
            return {
                result : true,
                socreData : socreData
            }
        }else{
            return {
                result : false,
                err : data.errMsg
            }
        }
    })
)

export let setPageScore = (num1,num2) => (dispatch) => (
    dispatch({
        type : types.GRADE_SET_PAGESCORE,
        pageIndex : num1,
        pageSize : num2
    })
)

export let setSearchScore = (value) => (dispatch) => (
    dispatch({
        type : types.GREADE_SET_SEARCHTERM,
        courseId : value
    })
)

export let setPageStudentWorkList = (num1,num2) => (dispatch) => (
    dispatch({
        type : types.HOMEWORK_SET_SUBJECTLISTPAGES,
        pageIndex : num1,
        pageSize : num2
    })
)

export let getSubjectList = (data,token) => (dispatch) => (
    getSubjectListA(data,token).then(data => {
        if(data.errCode==='9999'){
            let subjectData = data.data;
            let count = subjectData.total;
            let details = subjectData.list;
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

export let setCourseIdSubjectList = (data) => (dispatch) => {
    dispatch({
        type : types.HOMEWORKT_SET_SUBJECTLISTCOURSEID,
        courseId:data.courseId
    })
}

export let scoreDetailOnline = (data,token) => (dispatch) => (
    scoreDetailOnlineA(data,token).then( data => {
        if(data.errCode==='9999'){
            let details = data.data;
            let count = data.total;
            dispatch({
                type : types.GREADE_GET_DETAILSCORE,
                details : details,
                count : count
            })
            return {
                result: true,
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


export let scoreDetailNotOnline = (data,token) => (dispatch) => (
    scoreDetailNotOnlineA(data,token).then( data => {
        if(data.errCode==='9999'){
            let count = data.total;
            let details = data.data;
            dispatch({
                type : types.GREADE_GET_DETAILSCORE,
                details : details,
                count : count
            })
            return {
                result: true,
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


export let setPageDetailScore = (num1,num2) => (dispatch) => {
    dispatch({
        type: types.GREADE_SET_DETAILPAGE,
        pageIndex: num1,
        pageSize: num2
    })
}
