import React,{Component} from 'react'
import { Icon, Button,Timeline ,Select,Modal,Input} from 'antd';
let Option = Select.Option;

import './index.less'

const collage = [
    {
        collage_eng : 'collage_li',
        collage_name : '理学院'
    },
    {
        collage_eng : 'collage_wulian',
        collage_name : '物联网学院'
    },
    {
        collage_eng : 'collage_shengwu',
        collage_name : '生工学院'
    },
    {
        collage_eng : 'collage_yi',
        collage_name : '医学院'
    }
  ];
const major = {
    collage_li :['信息与计算科学','光电信息科学'],
    collage_wulian: ['计算机科学','物联网科学','光电信息技术','临床医学'],
    collage_shengwu : ['临床医学','光电信息技术','物联网科学','计算机科学','物联网科','光电信息技','临医学'],
    collage_yi : ['临床医学','光电信息技术','物联网科学','计机科学','物联科学','光电息技术','临床学']
}

export default class Collage extends Component{
    constructor(){
        super();
        this.state={
            visible: false,
            collage : collage,
            major : major[collage[0].collage_eng]
        }
    }



    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    selectChange = (value) => {
        this.setState({
            major : major[value]
        })
    }

    render() {
        return (
            <div id='collage' className='collageDiv common'>
                <h2>学院专业</h2>


                <Button
                    type="primary"
                    onClick={this.showModal}
                    style={{float:'right'}}
                >
                    <Icon type="plus"></Icon>
                </Button>

                <Modal
                    title="添加学院专业"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    学院:
                    <Select
                        defaultValue= {this.state.collage[0].collage_name}
                        style={{ width: 200 }}
                        onChange={this.selectChange}
                    >
                        {this.state.collage.map((item,index)=>{
                            return <Option key={index} value={item.collage_eng}>{item.collage_name}</Option>
                        })}

                    </Select>
                </Modal>


                <div className='collageCom'>
                    <Select
                        defaultValue= {this.state.collage[0].collage_name}
                        style={{ width: 300 , marginBottom : '40px'}}
                        onChange={this.selectChange}
                    >
                        {this.state.collage.map((item,index)=>{
                            return <Option key={index} value={item.collage_eng}>{item.collage_name}</Option>
                        })}

                    </Select>


                    <Timeline style={{textAlign:'left'}}>
                        {
                            this.state.major.map((item,index)=>{
                                return <Timeline.Item key={index}>{item}</Timeline.Item>
                            })
                        }
                    </Timeline>
                </div>
            </div>
        )
    }
}
