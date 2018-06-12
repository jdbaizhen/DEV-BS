import React from 'react';
import {Layout,Select} from 'antd';
let {Header,Content} = Layout
let {Option} = Select
import {connect} from 'react-redux';
import Title from "../../components/Title/index";
import GradeList from './subpage/index'
import {getSession} from "../../utils/util";
import * as action from '../../redux/actions/grade';
import MyPagination from '../../components/MyPagination/index';

class Grade extends React.Component {
	constructor(props){
		super(props)
		this.state={
			loading:true,
			allCourse:[],
			count: 0,
            setTableH: () => {
            },
		}
	}

    handleSearch = (value) => {
    	let {setSearchScore} = this.props;
        setSearchScore(value);
	}

	getData = (obj) => {
        let token = getSession('token');
        let {getScoreList} = this.props;
        getScoreList({
			pageIndex:'1',
			pageSize:'10',
			courseId:undefined,
			...obj
		},{token:token}).then(data=>{
			if(data.result){
				this.setState({
					loading:false
				})
			}
		})
	}


    componentDidMount() {
        let token = getSession('token');
        let {getTeacherSubject} = this.props;
        this.getData();
        getTeacherSubject({token: token}).then(data => {
            if(data.result){
                this.setState({
                    allCourse:data.allCourse
                })
            }
        })
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        /*let {pageIndex,pageSize,courseId} = newProps;
        this.getData({pageIndex,pageSize,courseId});*/
	}

	render() {
        let {allCourse,setTableH,loading} = this.state;
        let {pageIndex,setPageScore,count} = this.props;
        let paginationProps = {
            count,
            pageIndex,
            setPage:setPageScore,
            isShowSizeChanger: false
        }
        let tableProps = {
        	loading,
            setTableH: setTableH,
        }
		return (
			<Layout>
				<Title tier1='成绩查询'/>
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
					<Header style={{backgroundColor:'#fff'}}>
						选择课程:
						<Select
							style={{width:150,margin:'0px 20px 0px 10px'}}
							placeholder="选择课程"
							onChange = {this.handleSearch}
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
					</Header>
					<Content style={{borderTop:'2px solid skyblue',overflowY:'scroll',padding:'20px 30px'}}>
						<GradeList {...tableProps}/>
						<MyPagination {...paginationProps}/>
					</Content>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.getScoreR,...state.setSearchR}),
	action
)(Grade)