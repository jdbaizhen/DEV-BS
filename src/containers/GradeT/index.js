import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {Layout} from 'antd';
import Title from "../../components/Title/index";

class GradeT extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
        let {routes} = this.props;
        let Default = routes[0].component;
		return (
			<Layout>
				<Title tier1='成绩查询'/>
					<Switch>
                        {
                            routes.map((route, i) => (
								<Route path={route.path} key={i} render={props=>(
									<route.component routes={routes}/>
                                )}/>
                            ))
                        }
						<Route path='/gradet' key='default' render={props=>(
							<Default />
                        )}/>
					</Switch>
			</Layout>
		)
	}
}

export default GradeT