import React from 'react';
import {Layout, Menu, Icon, Card, Avatar, Tooltip,Button,Timeline ,Select,Modal} from 'antd';
let {Header,Content,Footer} = Layout;
let { Meta} = Card;
let Option = Select.Option;

import logo from '../../common/images/logo.png'
import Collage from './subpage/Collage'

import './index.less'
class SuperAdmin extends React.Component {
	constructor() {
		super();
		this.state={
			card:[
					{
						img : '',
						href : '#collage',
						title : '学院专业',
						description : '下载/上传江南大学学院专业信息'
					},
					{
						img : '',
						href : '#student',
						title : '学生信息',
						description : '下载/上传江南大学学生信息'
					},
					{
						img : '',
						href : '#teacher',
						title : '教师信息',
						description : '下载/上传江南大学教师信息'
					},
					{
						img : '',
						href : '#classinfo',
						title : '选课信息',
						description : '下载/上传江南大学学生选课信息'
					}
				],

		}
	}

    handleClick=(title)=>{
		alert(title)
	}


	render() {
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
							return <Card
								className = 'card'
								cover={<img alt="example" src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'/>}
								actions={[
											<Tooltip placement="bottom" title="下载文件格式模板">
												<Button onClick={()=>this.handleClick(item.title)}>
													<Icon type='download'/>
												</Button>
											</Tooltip>
											,
											<Tooltip placement="bottom" title="需按照模板格式上传文件">
												<Button>
													<Icon type='upload'/>
												</Button>
											</Tooltip>
										]}
							>
								<Meta
									avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
									title={item.title}
									description={item.description}
								/>
							</Card>
						})}
					</div>

					<Collage/>




				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2016 Created by Ant UED
				</Footer>
			</Layout>
		)
	}
}



export default SuperAdmin

