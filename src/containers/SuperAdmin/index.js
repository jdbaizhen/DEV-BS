import React from 'react';
import {Layout, Menu, Icon, Card, Avatar, Tooltip,Button,Timeline ,Select,Modal,Popconfirm ,Input,Upload} from 'antd';
let {Header,Content,Footer} = Layout;
let { Meta} = Card;
let Option = Select.Option;

import logo from '../../common/images/logo.png'
import Collage from './subpage/Collage'
import StudentList from './subpage/StudentList'
import TeacherList from './subpage/TeacherList'
import ClassList from './subpage/ClassList'

import './index.less'
import collageFile from '../../common/file/学院专业信息录入表.xlsx';
import studentFile from '../../common/file/学生信息录入表.xlsx';
import classsFile from '../../common/file/必选课信息表.xlsx';
import teacherFile from '../../common/file/教师信息录入表.xlsx';

const StudentInfo = [{
			key: '1',
			name: '胡彦斌',
			id: 1130114330,
			collage: '理学院',
			major : '信息与计算科学',
			classs : '信计1403',
			year_in : '2014',
			tel : '15061887368',
			email : 'jdabaizhen@outlook.com'
		}, {
			key: '2',
			name: '胡彦斌',
			id: 1130114330,
			collage: '理学院',
			major : '信息与计算科学',
			classs : '信计1403',
			year_in : '2014',
			tel : '15061887368',
			email : 'jdabaizhen@outlook.com'
		}, {
			key: '3',
			name: '胡彦斌',
			id: 1130114330,
			collage: '理学院',
			major : '信息与计算科学',
			classs : '信计1403',
			year_in : '2014',
			tel : '15061887368',
			email : 'jdabaizhen@outlook.com'
		}, {
			key: '4',
			name: '胡彦斌',
			id: 1130114330,
			collage: '理学院',
			major : '信息与计算科学',
			classs : '信计1403',
			year_in : '2014',
			tel : '15061887368',
			email : 'jdabaizhen@outlook.com'
		}, {
			key: '5',
			name: '胡彦斌',
			id: 1130114330,
			collage: '理学院',
			major : '信息与计算科学',
			classs : '信计1403',
			year_in : '2014',
			tel : '15061887368',
			email : 'jdabaizhen@outlook.com'
		} ];


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}];

const collage = [
    {
        collage_eng : 'collage_li',
        collage_name : '理学院'
    },
    {
        collage_eng : 'collage_wulian',
        collage_name : '物联网学院'
    },
    {
        collage_eng : 'collage_shengwu',
        collage_name : '生工学院'
    },
    {
        collage_eng : 'collage_yi',
        collage_name : '医学院'
    }
];

const major = {
    collage_li :['信息与计算科学','光电信息科学'],
    collage_wulian: ['计算机科学','物联网科学','光电信息技术','临床医学'],
    collage_shengwu : ['临床学','光电信息技术','物联网科学','计机科学','物网科学','光信息技术','临床医学'],
    collage_yi : ['临床医学','光电息技术','物联科学','计算机科学','物联网科学','光电信息技术','临医学']
}

class SuperAdmin extends React.Component {
	constructor() {
		super();

		this.state={
            card:[
					{
						img : '',
						href : '#collage',
						title : '学院专业',
						description : '下载/上传江南大学学院专业信息',
						downloadURL : collageFile,
						action : '/managers/reg/cm'
					},
					{
						img : '',
						href : '#student',
						title : '学生信息',
						description : '下载/上传江南大学学生信息',
                        downloadURL : studentFile,
                        action : '/managers/reg/student'
					},
					{
						img : '',
						href : '#teacher',
						title : '教师信息',
						description : '下载/上传江南大学教师信息',
                        downloadURL : teacherFile,
                        action : '/managers/reg/teacher'
					},
					{
						img : '',
						href : '#classinfo',
						title : '选课信息',
						description : '下载/上传江南大学学生选课信息',
                        downloadURL : classsFile,
                        action : '/managers/reg/cs'
					}
				],
		}
	}



	pageChange=(page,pageSize)=>{
		console.log(page)
	}

    addUpload = (file,fileList) =>{
        let fileName = file.name;
        let reg = /\.xlsx/gi;
        console.log(fileList);
        if(!reg.test(fileName)){
        	alert('请上传.xlsx类型的文件');
		}else{
            let reader=new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
                let obj={};
                obj.name=file.name;
                obj.url=this.result;
               	console.log(this.result)
            }
		}

    }

    uploadChange = (data) => {
        console.log(data.file.response);
    }

	render() {
        const props = {
            accept : 'multipart/form-data',
            beforeUpload : this.addUpload,
			onChange : this.uploadChange,
        };

		return (
			<Layout className="layout">
				<Header className='nav'>
					<img src={logo} alt='logo' className="logo" />

					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={[]}
						style={{ lineHeight: '64px',float:'right' }}
					>
						{this.state.card.map((item,index)=>{
							return <Menu.Item key={index}><a href={item.href}>{item.title}</a></Menu.Item>
						})}

					</Menu>
				</Header>
				<Content style={{ padding: '0px',backgroundColor:'#fff' }}>
					<div className='cardDiv'>
						{this.state.card.map((item,index)=>{
							return <div style={{width : '50%', display:'inline-block'}}><Card
								className = 'card'
								cover={<img alt="example" src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'/>}
								actions={[
											<Tooltip placement="bottom" title="下载文件格式模板">
												<Button>
													<a href={item.downloadURL}>
														<Icon type='download'/>
													</a>
												</Button>
											</Tooltip>
											,
											<Tooltip placement="bottom" title="需按照模板格式上传文件">
												<Upload {...props} action={item.action}>
													<Button>
														<Icon type='upload'/>
													</Button>
												</Upload>
											</Tooltip>
										]}
							>
								<Meta
									avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
									title={item.title}
									description={item.description}
								/>
							</Card></div>
						})}
					</div>

					<Collage />

					<StudentList
						id = "student"
						title = "学生信息"
						collage = {collage}
						major = {major}
						dataSource={StudentInfo}
						pageChange={this.pageChange}
					/>

					<TeacherList
						id = "teacher"
						title = "教师信息"
						collage = {collage}
						major = {major}
						dataSource={StudentInfo}
						pageChange={this.pageChange}
					/>

					<ClassList
						id = "classinfo"
						title = "选课信息"
						collage = {collage}
						major = {major}
						dataSource={StudentInfo}
						pageChange={this.pageChange}
					/>


				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2016 Created by Ant UED
				</Footer>
			</Layout>
		)
	}
}



export default SuperAdmin

