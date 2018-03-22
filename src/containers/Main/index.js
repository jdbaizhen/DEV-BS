import React from 'react';
import {Layout,Icon} from 'antd';
let {Header, Footer, Sider}=Layout;
import NavDark from "../../components/NavDark/index";
import Logout from './subpage/Logout';
import navProps from './subpage/navProps';
import logo from '../../common/images/logo.png';
import SuperAdmin from '../SuperAdmin/index'

import {getSession} from '../../utils/util'


export default class Main extends React.Component{
	constructor(){
		super();
		this.state={
			collapsed:false,
			user : ''
		}
	}
	onCollapse=(collapsed)=>{
		this.setState({collapsed});
	};
	componentWillMount() {
        //let user = getSession('username');
        this.setState({user:'1'});
	}

	render(){
		let {collapsed}=this.state;
		return(
			<div>
				{this.state.user==2?
					<Layout style={{height:'100%'}}>
						<Sider
							collapsed={collapsed}
							collapsible={false}
							onCollapse={this.onCollapse}
							width={220}
							style={{boxShadow:'2px 0 6px rgba(134, 155, 116, 0.6)'}}
							breakpoint="md"
						>

							<Header className="logoHeader">
								<img src={logo} alt="" className="logo"/>
							</Header>

							<NavDark {...navProps} user={this.state.user} inlineCollapsed={collapsed}/>
						</Sider>

						<Layout style={{height:'100%',backgroundColor:'#eee'}}>
							<Header className="titleHeader">
								江南大学理学院作业管理平台
								<Logout/>
							</Header>
                            {this.props.children}
							<Footer style={{textAlign:'center',height:'48px',paddingTop:'12px',paddingBottom:'12px'}}>Copyright <Icon type="copyright"/> 江南大学理学院   Inc. 2018</Footer>
						</Layout>
					</Layout>:
					<SuperAdmin/>
				}
			</div>

		)
	}
}
import './index.less'

