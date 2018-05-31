import * as types from '../action-types';
import {getAllInfoA,updateInfoA} from '../../api/selfInfo'

export let getAllInfo = (token) => (dispatch) => (
    getAllInfoA(token).then(data => {
        if(data.errCode==='9999'){
            let infoData = data.data;
            dispatch({
                type : types.SELFINFO_GET_INFOLIST,
                infoData : infoData
            })
            return {
                result : true,
                data : infoData
            }
        }else{
            return {
                result : false,
                err : data.errMsg
            }
        }
    })
)

export let updateInfo = (data,token) => (dispatch) => (
    updateInfoA(data,token).then(data => {
        if(data.errCode==='9999'){
            dispatch({
                type : types.SELFINFO_UPDATE_INFOLIST,
                updateInfo : []
            })
            return {
                result: true,
                data: data.data
            }
        }else{
            return {
                result: true,
                data: data.errMsg
            }
        }
    })
)