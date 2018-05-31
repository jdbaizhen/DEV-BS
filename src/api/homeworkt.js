import {get,post} from './fetch';
export const getTeacherSubjectA=(token)=>(
	post('/course/getSmsCourseByUser/'+token.token)
);

export const getHomeworkListA = (data,token) => (
	post('/work/getWorks/'+token.token,data)
)

export const submitHomeworkA = (data,token) => (
	post('/work/postWorks/'+token.token,data)
)

export const getSubjectListA = (data,token) => (
    post('/work/getWorksT/'+token.token,data)
)

export const getStudentListA = (data,token) => (
	post('/work/getStudentWorks/'+token.token,data)
)

export const getOneStudentWorkInfoA = (data,token) => (
	post('/work/getStudentWorkInfo/'+token.token,data)
)

export const submitScoreA = (data,token) => (
	post('/work/makeScore/'+token.token,data)
)

export const submitHomeWorkTwoA = (data,token) => (
	post('/work/makeWork2/'+token.token,data)
)

export let getWorkA = (data,token) => (
    post('/work/getWork2/'+token.token,data)
)

export let submitStudentWorkA = (data,token) => (
    post('/work/postWork2/'+token.token,data)
)

export let teacherMakeOnlineScoreA = (data,token) => (
	post('/teacher/makeOnlineScore/'+token.token,data)
)