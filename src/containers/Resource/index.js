import React from 'react';
import {Layout,Modal} from 'antd';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/case';
import Title from "../../components/Title/index";


class Case extends React.Component{
	constructor(){
		super();

	}

	render(){

		return(
			<Layout>
				<Title tier1='课程资源'/>
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>

				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state=>({...state.caseTermR}),
	action
)(Case)