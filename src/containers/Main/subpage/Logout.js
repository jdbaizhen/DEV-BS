import React from 'react';
import * as action from '../../../redux/actions/login';
import {getSession} from '../../../utils/util'

import {connect} from 'react-redux';
import {Modal,Icon,Tooltip,Popconfirm} from 'antd';
class Logout extends React.Component{
	handleLogout=()=>{
		let token = getSession('token');
		let {logout} = this.props;
		logout({token:token}).then(data=>{
			if(!data.result){
				Modal.error({
					title:'退出失败',
					content:data.err
				})
			}
		})
	};

    render(){
        return(
	        <Tooltip placement="left" title="退出">
		        <Popconfirm placement="left" title="是否退出" okText="退出" onConfirm={this.handleLogout}>
	        <Icon type="logout" id="logout"/>
		        </Popconfirm>
	        </Tooltip>
        )
    }
}
import './Logout.less'
export default connect(
	state=>({...state.loginR}),
	action
)(Logout)
