import React,{Component} from 'react'
import { Table,Icon,Divider } from 'antd'

export default class GradeTable extends Component{
    render() {
        const columns = [{
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',

        }, {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
        }, {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        }, {
            title: 'GPA',
            dataIndex : 'gpa',
            key: 'gpa',

        }];

        const data = [{
            key: '1',
            subject: '大学物理',
            teacher: 'Mr.huang',
            score: '88',
            gpa : '3.2',
        }, {
            key: '2',
            subject: '大学物理',
            teacher: 'Mr.huang',
            score: '88',
            gpa : '3.2',
        }, {
            key: '3',
            subject: '大学物理',
            teacher: 'Mr.huang',
            score: '88',
            gpa : '3.2',
        }];

        return(
            <Table columns={columns} dataSource={data} />
        )
    }
}