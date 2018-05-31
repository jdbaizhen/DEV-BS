import React from 'react';
import {Layout} from 'antd';
import Title from "../../components/Title/index";
import {Route,Switch} from 'react-router-dom';
class HomeWork extends React.Component {
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
                                <route.component routes={routes}/>
                            )}/>
                        ))
                    }
                    <Route path='/homework' key='default' render={props=>(
                        <Default />
                    )}/>
                </Switch>
			</Layout>
		)
	}
}


export default HomeWork
