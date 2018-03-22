import React from 'react';
import {Route,Switch} from 'react-router-dom'
import {Layout,Select} from 'antd';
import {connect} from 'react-redux';

import Title from "../../components/Title/index";

class HomeWorkT extends React.Component {
	constructor() {
		super();
	}

	render() {
	    let {routes} = this.props;
	    let Default = routes[0].component;
		return (
			<Layout style={{position: 'relative', top: '0', right: '0'}}>
                <Title tier1='作业管理'/>
                <Switch>
                    {
                        routes.map((route, i) => (
                            <Route path={route.path} key={i} render={props=>(
                                <route.component />
                            )}/>
                        ))
                    }
                    <Route path='/homeworkt' key='default' render={props=>(
                        <Default />
                    )}/>
                </Switch>
			</Layout>
		)
	}
}

import './index.less'

export default HomeWorkT