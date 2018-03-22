import React,{Component} from 'react'
import { Icon,List,Avatar,Upload } from 'antd'
import { Link } from 'react-router-dom'

class StudentWorkList extends Component{
    constructor(){
        super()
    }
    render() {
        return(
            <List
                itemLayout="horizontal"
                dataSource={this.props.data}
                renderItem={item => (
                    <List.Item actions={[<Link to="/homeworkt/detail">作业详情</Link>]}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.numberid}
                        />
                        <span>知之为知之，不知为不知，是知也</span>
                    </List.Item>
                )}
            />
        )
    }
}

export default StudentWorkList