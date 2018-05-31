import React from 'react';
import {Route,Switch} from 'react-router-dom'
import {Layout,Input,Select,Button,Modal} from 'antd';
let {Option} = Select;
let {Header,Content} = Layout;
import {connect} from 'react-redux';
import {getSession} from '../../../utils/util'

import WorkForm from './WorkForm/index'
import StudentWorkList from './StudentWorkList'

import MyPagination from '../../../components/MyPagination/index'
import * as action from '../../../redux/actions/homeworkt';

class HomeWorkT extends React.Component {
	constructor() {
		super();
		this.state={
			loading:true,
			count:0,
			allCourse: [],
            handleSee:()=>{},
            setTableH: () => {
            },
		}
	}

    setTableH = (fn) => {
        this.setState({setTableH: fn});
    };

    getCount = (num) => {
        this.setState({
            count: num
        })
    };

    getSee = (callback) => {
        this.setState({
            handleSee:callback
        });
    };

	getSubjectData = (obj) => {
        let token = getSession('token');
		let {getSubjectList} = this.props;
        getSubjectList({
			pageSize:'10',
			pageIndex:'1',
			courseId:undefined,
			...obj
		},{
        	token:token
		}).then(data=>{
			if(data.result){
				this.setState({
					loading:false
				})
			}else{
                Modal.error({
					title:"系统异常",
					content:data.errMsg
				})
			}
		})
	}

    handleChange = (value) => {
        let {setCourseIdSubjectList} = this.props;
        setCourseIdSubjectList({courseId:value});
    }

	componentDidMount() {
		//获取该老师所有课程
		let token = getSession('token');
        let {getTeacherSubject} = this.props;
        this.getSubjectData();
        getTeacherSubject({token: token}).then(data => {
        	if(data.result){
        		this.setState({
					allCourse:data.allCourse
                })
			}
        })
    }

    componentWillReceiveProps(newProps){
		this.setState({
            loading:true
        })
        let token = getSession('token');
		let {pageIndex,courseId} = newProps;
        this.getSubjectData({
			pageIndex,
			courseId,
			pageSize:'10'
		},{
        	token:token
		});
	}

	render() {
		let {allCourse,handleSee,setTableH,count,loading} = this.state;
		let {pageIndex,setPageStudentWorkList} = this.props;
        let formProps = {
            allCourse: allCourse,
            getSee: this.getSee
        };
        let tableProps = {
            setTableH: setTableH,
            getCount: this.getCount,
            loading
        }
        let paginationProps = {
            count,
            pageIndex,
            setPage:setPageStudentWorkList,
            isShowSizeChanger: false
        }
        return (
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
					<Header style={{backgroundColor:'#fff'}}>
						课程选择：
						<Select
							style={{width:150,margin:'0px 20px 0px 10px'}}
							placeholder="选择课程"
							onChange = {this.handleChange}
						>
                            {
                                allCourse.map((item,index) => {
                                    return (
										<Option key={index} value={item.courseId}>
                                            {item.courseName}
										</Option>
                                    )
                                })
                            }
						</Select>

						<Button
							type='primary'
							style={{float:'right',marginTop:'20px'}}
							onClick={handleSee}
						>上传作业</Button>

						<WorkForm {...formProps}/>
					</Header>
					<Content style={{borderTop:'2px solid skyblue',overflowY:'scroll',padding:'20px 50px'}}>
						<StudentWorkList {...tableProps}/>
						<MyPagination {...paginationProps}/>
					</Content>
				</Layout>
		)
	}
}

export default connect(
	state => ({...state.SubjecyListSearchTermR}),
	action
)(HomeWorkT)