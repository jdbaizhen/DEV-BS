import React from 'react';
import {Layout} from 'antd';
let {Header,Content} = Layout;
import Title from "../../components/Title/index";
import InfoList from './subpage/index'
class SelfInfo extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Layout>
                <Title tier1='个人信息管理'/>
                <Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)',position:'relative'}}>
                    <Content style={{overflowY:'scroll',padding:'20px 50px'}}>
                        <InfoList/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default SelfInfo