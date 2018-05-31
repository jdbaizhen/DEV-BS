import {get,post} from './fetch'

export let getAllInfoA = (token) => (
    get('/user/getInfo/'+token.token)
)

export let updateInfoA = (data,token) => (
    post('/user/update/'+token.token,data)
)