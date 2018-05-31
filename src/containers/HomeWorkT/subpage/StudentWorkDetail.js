import React,{Component} from 'react';
import {Button} from 'antd';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/homeworkt';
import { Link } from 'react-router-dom';
import {getSession} from "../../../utils/util";
import MyTable from '../../../components/MyTable/index'
import MyPagination from '../../../components/MyPagination/index'

class StudentWorkDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            detailCount:0,
            setTableH: () => {},
        }
    }

    setTableH = (fn) => {
        this.setState({setTableH: fn});
    };

    getCount = (num) => {
        this.setState({
            detailCount: num
        })
    };

    getData = (...obj) => {
        let token = getSession('token');
        let {getStudentList} = this.props;
        let href = window.location.href;
        let workId = href.substring(href.indexOf('main/')+5);
        getStudentList({
            workId:workId,
            pageIndex:'1',
            pageSize:'10',
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
        this.getData();
    }

    /*componentWillReceiveProps (newProps) {
        let {pageIndex,pageSize} = newProps;
        this.getData({
            pageIndex,
            pageSize,
        })
    }*/

    render() {
        let {count,details,pageIndex,setPageStudentWorkDetail} = this.props;
        let {detailCount} = this.state;
        let {loading} = this.state;
        let paginationProps = {
            count,
            pageIndex,
            setPage:setPageStudentWorkDetail,
            isShowSizeChanger: false
        };
        let myTableProps = {
            count: count,
            allCount: count,
            setTableH:this.setTableH,
            data: details,
            heightLess: 60,
            loading,
            isRowSelection: true,
            handleDelete: this.handleDelete,
            rowSelection: {},
            columns: [
                {
                    title: "序号", width:'20%' , key: 'stuWorkId',render : (text,record) => (
                      details.indexOf(record)+1
                    )
                },{
                    title: "姓名", dataIndex: "studentName", key: 'studentName',width: '20%',
                },{
                    title: "学号", dataIndex: "studentNumber", key: 'studentNumber',width: '20%',
                },
                {
                    title: "状态", dataIndex: "status", key: 'status',width: '20%',
                    render : (text,record) => (
                        <span> {text===0?'未批改':'已批改'}</span>
                    )
                },{
                    title: "批改", dataIndex: "edit", key: 'edit', width : '20%',
                    render: (text, record) => (
                        <div>
                            {
                                record.isOnline===0
                                    ? <Link to={`/homeworkt/detail/correct/${record.stuWorkId}`}>
                                        <Button type="primary" ghost icon="edit"/>
                                    </Link>
                                    : <Link to={`/homeworkt/detail/correctonline/${record.stuWorkId};${record.studentNumber}`}>
                                        <Button type="primary" ghost icon="edit"/>
                                    </Link>
                            }
                        </div>
                    )
                }
            ]
        };
        return(
           <div style={{padding:'20px 50px',backgroundColor:'#fff',marginTop:'10px'}}>
               <MyTable {...myTableProps}/>
               <MyPagination {...paginationProps}/>
           </div>
        )
    }
}

export default connect(
    state=>({...state.StudentHomeWorkListR,...state.StudentListSearchTermR}),
    action
)(StudentWorkDetail)