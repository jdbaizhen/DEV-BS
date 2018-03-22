import React from 'react';
import {Layout} from 'antd';
import Title from "../../components/Title/index";

export default class Track extends React.Component {
	render() {

		return (
			<Layout>
				<Title tier1='测试题库'/>
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>

				</Layout>
			</Layout>
		)
	}
}