import {get,post} from './fetch'

export let getScoreListA = (data,token) => (
    post('/work/getWorks/'+token.token,data)
)

export let getScoreA = (data,token) => (
    post('/work/getScore/'+token.token,data)
)

export let scoreDetailOnlineA = (data,token) =>(
    post('/teacher/getWorkOnlineScore/'+token.token,data)
)

export let scoreDetailNotOnlineA = (data,token) => (
    post('/teacher/getWorkScore/'+token.token,data)
)

export let studentGetWorkonlineScoreA = (data,token) => (
    post('/student/getWorkOnlineScore/'+token.token,data)
)