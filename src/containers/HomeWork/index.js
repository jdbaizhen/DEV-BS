import React from 'react';
import {Layout,Input,Select} from 'antd';
let {Option} = Select;
let {Header,Content} = Layout;
import {connect} from 'react-redux';

import Title from "../../components/Title/index";
import SearchTable from '../../components/SearchTable/index'
import HomeWorkList from './subpage/HomeWorkList'

//import * as action from '../../redux/actions/homework';

class HomeWork extends React.Component {
	constructor() {
		super();
		this.state={
			data : [],
			teacherName : '',
			subject:undefined
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

	componentDidMount() {
        this.setState({
            data : ['语文','数学','英语']
        })
	}

	render() {
		console.log(this.state.teacherName)
		return (
			<Layout style={{position: 'relative', top: '0', right: '0'}}>
				<Title tier1='作业管理'/>

				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
					<Header style={{backgroundColor:'#fff'}}>
						科目:
						<Select
							placeholder="科目"
							style={{width:150,margin:'0px 20px 0px 10px'}}
							onChange={(e)=>{
								this.setState({
									subject:e
								})
							}}
							value={this.state.subject}
						>
							{
								this.state.data.map((subject,i)=>(
									<Option key={i} value={subject}>{subject}</Option>
								))
							}
						</Select>

						老师:
						<Input
							placeholder="老师姓名"
							style={{width:150,margin:'0px 20px 0px 10px'}}
							value={this.state.teacherName}
							onChange={(e)=>this.handleChange(e,'teacherName')}
						/>

						<SearchTable handleReset={this.handleReset}/>
					</Header>
					<Content style={{borderTop:'2px solid skyblue',overflowY:'scroll',padding:'20px 50px'}}>
						<HomeWorkList></HomeWorkList>
					</Content>
				</Layout>

			</Layout>
		)
	}
}

import './index.less'

export default HomeWork
/*
export default connect(
	state => ({...state.mapDataR}),
	action
)(HomeWork)*/
