import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initSearch = {
    pageIndex: 1,
    pageSize: 10,
    courseId: undefined
}

let setSearchR = (state = cloneDeep(initSearch),action) => {
    switch (action.type) {
        case Types.GRADE_SET_PAGESCORE:
            return {
                ...state,
                pageIndex: action.pageIndex,
                pageSize : action.pageSize
            }
        case Types.GREADE_SET_SEARCHTERM:
            return {
                courseId: action.courseId
            }
        default:
            return state
    }
}

let initAllScore = {
    details : [],
    count : 0,
}

let getScoreR = (state = cloneDeep(initAllScore),action) => {
    switch (action.type) {
        case Types.GRADE_GET_ALLSCORE:
            return {
                ...state,
                details: action.details,
                count:action.count,
            }
        default:
            return state
    }
}

let initSearchTerm = {
    pageIndex: 1,
    pageSize: 10,
    workId: undefined
}

let setSearchTermsR = (state = cloneDeep(initSearchTerm),action) => {
    switch (action.type) {
        case Types.GREADE_SET_DETAILPAGE:
            return {
                ...state,
                pageIndex: action.pageIndex,
                pageSize: action.pageSize
            }
        default:
            return state
    }
}

let initDetailsScore = {
    details : [],
    count : 0,
}

let getDetailScoreR = (state = cloneDeep(initDetailsScore),action) => {
    switch (action.type) {
        case Types.GREADE_GET_DETAILSCORE:
            return {
                details : action.details,
                count : action.count
            }

        default:
            return state
    }
}

export default {
    setSearchR,
    getScoreR,
    setSearchTermsR,
    getDetailScoreR
}