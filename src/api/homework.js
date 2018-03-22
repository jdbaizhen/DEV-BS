import {get,post} from './fetch'

export const getInitHomeWork=()=>{
    let result = get('/student/inithomework');
    return result;
}

export const getSearchResult=(data)=>{
    let result = post('/student/searchhomeowrk',data);
    return result;
}

export const downloadhomework=(teacherid)=>{
    let result = get('/student/downloadhomework?teacherid:'+teacherid);
    return result;
}

export const uploadhomework=(data)=>{
    let result = post('/student/uploadhomework',data);
    return result;
}