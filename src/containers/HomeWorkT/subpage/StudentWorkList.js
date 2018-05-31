import React,{Component} from 'react'
import {Button} from 'antd';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/homeworkt'
import { Link } from 'react-router-dom'

import MyTable from '../../../components/MyTable/index'

class StudentWorkList extends Component{
    constructor(){
        super()
    }

    render() {
        let {details,count,setTableH,loading,getCount} = this.props;
        getCount(count);
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
                        <Link to={`/homeworkt/detail/main/${record.workId}`}>
                            <Button type="primary" ghost icon="eye-o"/>
                        </Link>
                    )
                }
            ]
        };
        return(
            <div>
                <MyTable {...myTableProps}/>
            </div>
        )
    }
}

export default connect(
    state=>({...state.SubjectListR}),
    action
)(StudentWorkList)