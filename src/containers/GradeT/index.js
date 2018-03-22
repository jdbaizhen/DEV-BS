import React from 'react';
import {Layout,Select} from 'antd';
let {Header,Content} = Layout
let {Option} = Select
import {connect} from 'react-redux';
import Title from "../../components/Title/index";
import SearchTable from '../../components/SearchTable/index'
import GradeTable from '../../components/GradeTable/index'

import * as action from '../../redux/actions/data';

class Data extends React.Component {
	render() {

		return (
			<Layout>
				<Title tier1='成绩查询'/>
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
					<Header style={{backgroundColor:'#fff'}}>
						学期:
						<Select
							placeholder="学期"
							style={{width:150,margin:'0px 20px 0px 10px'}}
						>
							<Option value="2017上学期">2017上学期</Option>
							<Option value="2017下学期">2017下学期</Option>
						</Select>

						科目:
						<Select
							placeholder="科目"
							style={{width:150,margin:'0px 20px 0px 10px'}}
						>
							<Option value="高等代数">高等代数</Option>
							<Option value="数学分析">数学分析</Option>
						</Select>



						<SearchTable/>
					</Header>
					<Content style={{borderTop:'2px solid skyblue',overflowY:'scroll',padding:'20px 30px'}}>
						<GradeTable></GradeTable>
					</Content>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.mapDataR,id:state.dataTermR.id}),
	action
)(Data)