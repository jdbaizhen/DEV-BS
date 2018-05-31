import React,{Component} from 'react'
import {Button,Modal,Timeline} from 'antd';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/grade'
import { Link } from 'react-router-dom'

import MyTable from '../../../components/MyTable/index'
import {getSession} from '../../../utils/util'

class GradeList extends Component{
    constructor(){
        super();
        this.state={
            visible : false,
            score : []
        }
    }

    handleCancel = () => {
        this.setState({
            visible:false
        })
    }

    showDetail = (recode) => {
        let token = getSession('token');
        let {getScore} = this.props;
        let stuWorkId = recode.stuWorkId;
        getScore({stuWorkId:stuWorkId},{token:token}).then(data=>{
            let socreData = data.socreData;
            if(data.result){
                this.setState({
                    score : socreData,
                    visible:true
                })
            }
        })
    }

    render() {
        let {details,count,setTableH,loading} = this.props;
        let {visible,score} = this.state;
        let myTableProps = {
            count: count,
            allCount: count,
            loading,
            data: details,
            setTableH,
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
                    title: "作业标题", dataIndex: "remark", key: 'remark',width: '20%',
                },{
                    title: "题目数量", dataIndex: "topicNumber", key: 'topicNumber',width: '15%',
                },
                {
                    title: "导师评分", dataIndex: "totalScore", key: 'totalScore',width: '10%',
                },
                {
                    title: "布置时间", dataIndex: "createTime", key: 'createTime',width: '20%',
                },{
                    title: "查看详情", dataIndex: "edit", key: 'edit', width : '15%',
                    render: (text, record) => (
                        <Button type="primary" ghost icon="eye-o" onClick={()=>this.showDetail(record)}/>
                    )
                }
            ]
        };
        return(
            <div>
                <MyTable {...myTableProps}/>

                <Modal
                    width='300px'
                    visible={visible}
                    title='作业详情'
                    footer={false}
                     onCancel={this.handleCancel}
                >

                    <Timeline>
                        {
                            score.map((item,index)=>{
                               if(item.workNumber===0){
                                   return (
                                       <Timeline.Item>总分:{item.score}</Timeline.Item>
                                       )
                               }else{
                                   return (
                                       <Timeline.Item>第{item.workNumber}题:{item.score}</Timeline.Item>
                                   )
                               }
                            })
                        }
                    </Timeline>
                </Modal>
            </div>
        )
    }
}

export default connect(
    state=>({...state.getScoreR}),
    action
)(GradeList)
