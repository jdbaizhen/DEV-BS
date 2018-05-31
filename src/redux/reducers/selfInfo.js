import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initInfo={
    data : '',
};

let selfInfo = (state=cloneDeep(initInfo),action) => {
    switch (action.type) {
        case Types.SELFINFO_GET_INFOLIST:
            return {
                ...state,
                data:action.data
            }
        case Types.SELFINFO_UPDATE_INFOLIST:
            return {
                ...state,
                updateInfo:action.updateInfo
            }
        default:
            return state;
    }
}

export default {
    selfInfo
}