import Login from "../containers/Login";
import Grade from "../containers/Grade/index";
import QuestionBank from "../containers/QuestionBank/index";
import Resource from "../containers/Resource/index";
import Tribune from "../containers/Tribune/index";
import HomeWork from "../containers/HomeWork/index";
import HomeWorkIndex from '../containers/HomeWork/subpage/index';
import HomeWorkCorrect from '../containers/HomeWork/subpage/HomeWorkCorrect';
import HomeWorkT from "../containers/HomeWorkT/index";
import GradeT from "../containers/GradeT/index";
import GradetList from "../containers/GradeT/subpage/GradetList";
import GradetDetail from "../containers/GradeT/subpage/GradetDetail";
import QuestionBankT from "../containers/QuestionBankT/index";
import ResourceT from "../containers/ResourceT/index";
import TribuneT from "../containers/TribuneT/index";
import HomeWorkList from "../containers/HomeWorkT/subpage/index"
import StudentWorkDetail from "../containers/HomeWorkT/subpage/StudentWorkDetail";
import StudentWorkCorrect from "../containers/HomeWorkT/subpage/StudentWorkCorrect"
import StudentWorkCorrectOnline from "../containers/HomeWorkT/subpage/StudentWorkCorrectOnline"
import StudentWorkIndex from "../containers/HomeWorkT/subpage/StudentWorkIndex"
import SuperAdmin from '../containers/SuperAdmin/index'
import SelfInfo from '../containers/SelfInfo/index'

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
            component:HomeWork,
            routes: [
                {
                    path:'/homework/main',
                    component:HomeWorkIndex
                },
                {
                    path:'/homework/correct/:workId',
                    component:HomeWorkCorrect
                }
            ]
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
                    component:StudentWorkIndex,
                    routes : [
                        {
                            path : '/homeworkt/detail/main/:workId',
                            component:StudentWorkDetail
                        },
                        {
                            path : '/homeworkt/detail/correct/:workId',
                            component:StudentWorkCorrect
                        },
                        {
                            path : '/homeworkt/detail/correctonline/:workId',
                            component:StudentWorkCorrectOnline
                        }
                    ]
                }
            ]
        },
        {
            path:'/gradet',
            component:GradeT,
            routes : [
                {
                    path : '/gradet/main',
                    component:GradetList
                },
                {
                    path : '/gradet/detail/:workId',
                    component:GradetDetail
                },
            ]
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
        },
        {
            path:'/selfinfo',
            component:SelfInfo,
        }
]

