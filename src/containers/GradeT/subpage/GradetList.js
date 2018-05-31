import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import * as action from '../../../redux/actions/grade'
import {Layout,Select,Button} from 'antd';
const {Header,Content} = Layout;
const {Option} = Select;
import MyTable from '../../../components/MyTable/index';
import MyPagination from '../../../components/MyPagination/index';
import {getSession} from "../../../utils/util";

class GradetList extends Component{
    constructor(props){
        super(props);
    }

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

    componentWillReceiveProps(newProps){
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
        let {allCourse,details,count,setTableH,loading,pageIndex,setPageStudentWorkList} = this.props;
        let myTableProps = {
            count: count,
            allCount: count,
            data: details,
            setTableH,
            loading,
            heightLess: 60,
            isRowSelection: true,
            handleDelete: this.handleDelete,
            rowSelection: {},
            columns: [
                {
                    title: "序号", width:'10%' , key: 'personId',render : (text,record) => (
                    details.indexOf(record)+1
                )
                },{
                    title: "学年", dataIndex: "schoolYear", key: 'schoolYear',width: '15%',
                },{
                    title: "题目数量", dataIndex: "topicNumber", key: 'topicNumber',width: '15%',
                },
                {
                    title: "作业标题", dataIndex: "remark", key: 'remark',width: '20%',
                },{
                    title: "布置时间", dataIndex: "createTime", key: 'createTime',width: '25%',
                },{
                    title: "查看详情", dataIndex: "edit", key: 'edit', width : '15%',
                    render: (text, record) => (
                        <Link to={`/gradet/detail/${record.workId};${record.status}`}>
                            <Button type="primary" ghost icon="eye-o"/>
                        </Link>
                    )
                }
            ]
        };
        let paginationProps = {
            count,
            pageIndex,
            setPage:setPageStudentWorkList,
            isShowSizeChanger: false
        }
        return(
                <Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
                    <Header style={{backgroundColor:'#fff'}}>
                        课程选择：
                        <Select
                            style={{width:150,margin:'0px 20px 0px 10px'}}
                            placeholder="选择课程"
                            onChange={this.handleChange}
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
                    <Content style={{borderTop:'2px solid skyblue',overflowY:'scroll',padding:'20px 50px'}}>
                        <MyTable {...myTableProps}/>
                        <MyPagination {...paginationProps}/>
                    </Content>
            </Layout>
        )
    }
}

export default connect(
    state => ({...state.mapDataR,...state.SubjectListR,...state.SubjecyListSearchTermR}),
    action
)(GradetList);