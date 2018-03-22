import React from 'react';
import {Route,Switch} from 'react-router-dom'
import {Layout,Input,Select} from 'antd';
let {Option} = Select;
let {Header,Content} = Layout;
import {connect} from 'react-redux';

import UploadBtn from '../../../components/UploadBtn/index'
import StudentWorkList from './StudentWorkList'

import {getStudentList} from "../../../api/homeworkt";
import * as action from '../../../redux/actions/homeworkt';

class HomeWorkT extends React.Component {
	constructor() {
		super();
		this.state={
			data : [
				{
					name : 'baizhen',
                    numberid : '1130114330'
				},
                {
                    name : 'baizhen111',
                    numberid : '1130114330'
                },

				]
		}
	}

	/*componentDidMount() {
        const result = getStudentList(1);
        this.setState({
			data : result
		})
    }

	getEveryWeekStudentList=(weeks)=>{
		const result = getStudentList(weeks);
        this.setState({
            data : result
        })
	}*/

	render() {
		return (

				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
					<Header style={{backgroundColor:'#fff'}}>
						作业历史:
						<Select
							placeholder="第一周"
							style={{width:150,margin:'0px 20px 0px 10px'}}
						>
							<Option value="第一周">第一周</Option>
							<Option value="第二周">第二周</Option>
						</Select>


						<UploadBtn title="上传作业"/>
					</Header>
					<Content style={{borderTop:'2px solid skyblue',overflowY:'scroll',padding:'20px 50px'}}>
						<StudentWorkList data={this.state.data}/>
					</Content>
				</Layout>


		)
	}
}

export default connect(
	state => ({...state.homeworktR}),
	action
)(HomeWorkT)