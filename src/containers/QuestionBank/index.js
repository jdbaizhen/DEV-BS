import React from 'react';
import {Layout} from 'antd';
import Title from "../../components/Title/index";
import noAccess from '../../common/images/noAccess.png'
export default class Track extends React.Component {
    render() {
        return (
			<Layout>
				<Title tier1='测试题库'/>
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