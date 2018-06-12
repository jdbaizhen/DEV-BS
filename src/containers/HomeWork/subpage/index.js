import React from 'react';
import {Layout,Select} from 'antd';
let {Option} = Select;
let {Header,Content} = Layout;
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/homeworkt';
import HomeWorkList from './HomeWorkList';
import MyPagination from '../../../components/MyPagination';
import {getSession} from '../../../utils/util'

class HomeWorkIndex extends React.Component {
    constructor() {
        super();
        this.state={
            allCourse:[],
            newCount: 0,
            loading: true,
            setTableH: () => {
            },
        }
    }

    handleChange=(event)=>{
        let teacherName=event.target.value;
        this.setState({
            teacherName:teacherName
        })
    }

    handleReset=()=>{
        this.setState({
            teacherName : '',
            subject:undefined
        })
    }

    handleSearch = (value) => {
        let {setCourseId} = this.props;
        setCourseId({courseId:value});
    }

    setTableH = (fn) => {
        this.setState({setTableH: fn});
    };

    getCount = (num) => {
        this.setState({
            newCount: num
        })
    };

    getData = (obj) => {
        let token = getSession('token');
        let {getHomeworkList} = this.props;
        let term = {
            pageIndex:'1',
            pageSize:'10',
            courseId:undefined,
            ...obj
        }
        getHomeworkList(term,{token:token}).then(data=>{
            if(data.result){
                this.setState({
                    loading:false
                })
            }
        })
    }

    componentDidMount() {
        this.setState({
            loading:true
        })
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

    componentWillReceiveProps (newProps){
        let token = getSession('token');
        let {pageIndex,pageSize,courseId} = newProps;
        this.getData({
            pageIndex,
            pageSize,
            courseId
        },{token:token})
    }

    render() {
        let {pageIndex,pageSize,courseId,setPage,setCourseId} = this.props;
        let {allCourse,loading,newCount} = this.state;
        let tableProps = {
            loading,
            setTableH: this.setTableH,
            getData: this.getData,
            getCount: this.getCount,
        }
        let paginationProps = {
            count:newCount,
            pageIndex,
            setPage,
            isShowSizeChanger: false
        }
        return (
                <Layout style={{backgroundColor:'#ffffff',marginTop:'10px'}}>
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
                    <Content style={{borderTop:'2px solid skyblue',padding:'20px 50px',overflowY:'scroll'}}>
                        <HomeWorkList {...tableProps}/>
                        <MyPagination {...paginationProps}/>
                    </Content>
                </Layout>
        )
    }
}


export default connect(
    state => ({...state.SearchTermR}),
    action
)(HomeWorkIndex)
