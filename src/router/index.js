import Login from "../containers/Login";
import Grade from "../containers/Grade/index";
import QuestionBank from "../containers/QuestionBank/index";
import Resource from "../containers/Resource/index";
import Tribune from "../containers/Tribune/index";
import HomeWork from "../containers/HomeWork/index";
import HomeWorkT from "../containers/HomeWorkT/index";
import GradeT from "../containers/GradeT/index";
import QuestionBankT from "../containers/QuestionBankT/index";
import ResourceT from "../containers/ResourceT/index";
import TribuneT from "../containers/TribuneT/index";
import HomeWorkList from "../containers/HomeWorkT/subpage/index"
import StudentWorkDetail from "../containers/HomeWorkT/subpage/StudentWorkDetail";
import SuperAdmin from '../containers/SuperAdmin/index'

export default [
        {
            path:'/login',
            component:Login
        },
        {
            path:'/',
        },
        {
            path:'/homework',
            component:HomeWork
        },
        {
            path:'/grade',
            component:Grade
        },
        {
            path:'/questionbank',
            component:QuestionBank,
        },
        {
            path:'/resource',
            component:Resource
        },
        {
            path:'/tribune',
            component:Tribune
        },
        {
            path : '/homeworkt',
            component:HomeWorkT,
            routes : [
                {
                    path : '/homeworkt/main',
                    component:HomeWorkList
                },
                {
                    path : '/homeworkt/detail',
                    component:StudentWorkDetail
                }
            ]
        },
        {
            path:'/gradet',
            component:GradeT
        },
        {
            path:'/questionbankt',
            component:QuestionBankT,
        },
        {
            path:'/resourcet',
            component:ResourceT
        },
        {
            path:'/tribunet',
            component:TribuneT
        },
        {
            path:'/superadmin',
            component:SuperAdmin,
        }
]

