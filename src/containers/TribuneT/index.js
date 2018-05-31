import React from 'react';
import {Layout, Modal} from 'antd';
import {connect} from 'react-redux';
import Title from "../../components/Title/index";
import noAccess from '../../common/images/noAccess.png'
import * as action from "../../redux/actions/chart";


class Chart extends React.Component {

	render() {
		return (
			<Layout>
				<Title tier1="论坛交流"/>
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
					<div className="full-screen no-access-box">
						<img src={noAccess} alt=""/>
						<h1>该模块暂未开放，敬请期待!!!</h1>
					</div>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.mapDataR, ...state.chartTermR}),
	action
)(Chart)