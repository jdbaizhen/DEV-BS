import {post} from './post.js'
import {get} from './get.js'

export const loginA=(data)=>{
    post('/login',data)
}

export const logoutA=()=>{
    get('/logout')
}