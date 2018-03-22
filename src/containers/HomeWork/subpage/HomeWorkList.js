import React,{Component} from 'react'
import { Icon,List,Avatar,Upload,Tooltip } from 'antd'

export default class HomeWorkList extends Component{
    constructor(){
        super()
    }
    render() {
        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
        ];
        return(
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[<Tooltip placement="bottom" title="下载本次作业">
                                            <Icon type="download"/>
                                        </Tooltip>,

                                        <Upload multiple={true}>
                                            <Tooltip placement="top" title="请一次性上传所有图片,按ctrl可多选">
                                                <Icon type="upload"/>
                                            </Tooltip>
                                        </Upload>
                                        ]}>
                        <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    </List.Item>
                )}
            />

        )
    }
}