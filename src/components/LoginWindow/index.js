import React from 'react';
import {Icon, Radio ,Modal} from 'antd';
const RadioGroup = Radio.Group;

export default class LoginWindow extends React.Component {
	constructor(){
		super();
		this.state={
			err:'',
            value: '',
		}
	}
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

	handleClick=()=>{
		this.setState({
			err:''
		});
		let role = this.state.value;
		if(role!==''){
            this.props.login({
                username: this.refs.username.value,
                password: this.refs.password.value,
                role : this.state.value,
            }).then(data=>{
                if(!data.result){
                    this.setState({
                        err:data.err
                    })
                }
            })
		}else{
            Modal.error({
                title: 'ERROR',
                content: '请选择职位',
            });
		}
	};
	handleKeyDown=(e)=>{
		if (e.keyCode==13){
			this.handleClick();
		}
	};

	render() {
		let {title} = this.props;
		return (
			<div className="loginWin animated zoomInDown">
				<p>{title}</p>
				<div className="loginForm" onKeyDown={(e)=>this.handleKeyDown(e)}>
					<div className="inputForm firstInput">
						<Icon type='user'/>
						<input type="text" id="username" name="username" placeholder="请输入学号" ref="username"/>
					</div>
					<div className="inputForm">
						<Icon type='lock'/>
						<input type="password" id="password" name="password" placeholder="请输入密码" ref="password"/>
					</div>
					<div className="loginErr">{this.state.err}</div>
					<div className="role">
						<RadioGroup onChange={this.onChange} value={this.state.value}>
							<Radio value={1} style={{color:'#fff'}}>教师</Radio>
							<Radio value={2} style={{color:'#fff'}}>学生</Radio>
						</RadioGroup>
					</div>
					<div className="loginBtn">
						<button onClick={this.handleClick}>登&nbsp;&nbsp;录</button>
					</div>
				</div>
			</div>
		)
	}
}
import './index.less';