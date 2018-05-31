import React from 'react';
import {Layout, Icon} from 'antd';
import NavDark from "../../components/NavDark/index";
import Logout from './subpage/Logout';
import navProps from './subpage/navProps';
import logo from '../../common/images/logo.png';
import SuperAdmin from '../SuperAdmin/index'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import * as action from '../../redux/actions/login'
import {getSession,setSession} from "../../utils/util";
let {Header, Footer, Sider} = Layout;

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            role: undefined
        }
    }
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };
    componentWillReceiveProps(newProps) {
        if(newProps){
            let role = newProps.role;
            if(role){
                setSession('role',role);
                this.setState({
                    role : role
                })
            }else{
                let roles = getSession('role');
                this.setState({
                    role : roles
                })
            }
        }
    }
    render() {
        let {collapsed} = this.state;
        return (
            <div style={{height: '100%'}}>
                <Layout style={{height: '100%'}}>
                    <Sider
                        collapsed={collapsed}
                        collapsible={false}
                        onCollapse={this.onCollapse}
                        width={220}
                        style={{boxShadow: '2px 0 6px rgba(134, 155, 116, 0.6)'}}
                        breakpoint="md"
                    >

                        <Header className="logoHeader">
                            <img src={logo} alt="" className="logo"/>
                        </Header>
                        {this.state.role === '2' ?
                            <NavDark {...navProps} navItems={navProps.navList} inlineCollapsed={collapsed}/> :
                            <NavDark {...navProps} navItems={navProps.navListT} inlineCollapsed={collapsed}/>
                        }
                    </Sider>
                    <Layout style={{height: '100%', backgroundColor: '#eee'}}>
                        <Header className="titleHeader">
                            江南大学理学院作业管理平台
                            <Logout/>
                        </Header>
                        {this.props.children}
                        <Footer
                            style={{textAlign: 'center', height: '48px', paddingTop: '12px', paddingBottom: '12px'}}>Copyright
                            <Icon type="copyright"/> 江南大学理学院 Inc. 2018</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

import './index.less'
import '../../common/main.less'

export default withRouter(
    connect(
        state => ({...state.loginR}),
        action,
    )(Main)
)