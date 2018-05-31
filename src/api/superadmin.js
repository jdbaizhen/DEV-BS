import {get,post} from './fetch'

let getStudentList = (major,page,pageSize) =>{
    let data = {
        major : major,
        page : page,
        pageSize : pageSize
    }
    let result = post('/',data);
    if(result.result){
        return result.details
    }else{
        return '获取学生列表失败'
    }
}

let changeStudentList = (data) => {
    let result = post('/',data);
    return result;
}

let delStudentList = (key) => {
    let result = get('/?key:'+key);
    return result;
}