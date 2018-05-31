import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import {Layout,Select} from 'antd';

class StudentWorkIndex extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {routes} = this.props;
        let route = routes[1].routes;
        let Default = route[0].component;
        return (
            <Layout style={{position: 'relative', top: '0', right: '0'}}>
                <Switch>
                    {
                        route.map((route, i) => (
                            <Route path={route.path} key={i} render={props=>(
                                <route.component/>
                            )}/>
                        ))
                    }
                    <Route path='/homeworkt/detail' key='default' render={props=>(
                        <Default />
                    )}/>
                </Switch>
            </Layout>
        )
    }
}
export default StudentWorkIndex