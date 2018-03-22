import 'whatwg-fetch'
import 'es6-promise'

function objparams(obj){
    let result = '';
    let item;
    for(item in obj){
        result += '&'+item +'='+encodeURIComponent(obj[item]);
    }
    if(result){
        return result;
    }
}

export function post(url,paramsObj){
    let result = fetch(url,{
        method : 'POST',
        credentials:'include',
        headers : {
            'Accept':'application/json,text/plain,*/*',
            'Content-Type' : 'application/json'
        },
        body:objparams(paramsObj)
    });
    return result;
}