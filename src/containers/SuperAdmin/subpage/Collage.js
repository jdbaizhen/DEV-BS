import React,{Component} from 'react'
import { Icon, Button,Timeline ,Select,Modal,Input} from 'antd';
let Option = Select.Option;

import './index.less'

export default class Collage extends Component{
    constructor(){
        super();
        this.state={
            visible: false,
            inputCollage : '',
            inputMajor : '',
            inputShortMajor : '',
            collage : [
                {
                    nameCollage : '理学院',
                    major : [
                        {
                            nameMajor : '信息与计算科学',
                            shortName : '信计'
                        },
                        {
                            nameMajor : '光电信息技术',
                            shortName : '光科'
                        }
                    ]
                },
                {
                    nameCollage : '物联网学院',
                    major : [
                        {
                            nameMajor : '计算机科学',
                            shortName : '计科'
                        },
                        {
                            nameMajor : '物联网科学',
                            shortName : '物联'
                        },
                        {
                            nameMajor : '物联网科学',
                            shortName : '物联'
                        },
                        {
                            nameMajor : '物联网科学',
                            shortName : '物联'
                        }
                    ]
                },
                {
                    nameCollage : '生工学院',
                    major : [
                        {
                            nameMajor : '信息与计算科学',
                            shortName : '信计'
                        },
                        {
                            nameMajor : '光电信息技术',
                            shortName : '光科'
                        },
                        {
                            nameMajor : '物联网科学',
                            shortName : '物联'
                        },
                        {
                            nameMajor : '物联网科学',
                            shortName : '物联'
                        }
                    ]
                },
                {
                    nameCollage : '医学院',
                    major : [
                        {
                            nameMajor : '口腔医学',
                            shortName : '信计'
                        },
                        {
                            nameMajor : '光电信息技术',
                            shortName : '光科'
                        },
                        {
                            nameMajor : '临床医学',
                            shortName : '物联'
                        },
                        {
                            nameMajor : '物联网科学',
                            shortName : '物联'
                        }
                    ]
                }
            ]
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleChange = (e) => {
        let value = e.target.value;
        this.setState({
            inputCollage : value
        })
    }

    render() {
        return (
            <div id='collage' className='collageDiv'>
                <h2>学院专业</h2>

                <Button
                    type="primary"
                    onClick={this.showModal}
                    style={{float:'right'}}
                >
                    <Icon type="plus"></Icon>
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={(e)=>this.handleCancel}
                >
                    学院:
                    <Input
                        className='collageInput'
                        type='text'
                        placeholder='学院'
                        value={this.state.inputCollage}
                        onChange={(e)=>this.handleChange}
                    />
                   {/* 专业:
                    <Input
                        className='collageInput'
                        type='text'
                        placeholder='专业'
                        value={this.state.inputMajor}
                        onChange={(e)=>this.handleChange(e,'inputMajor')}
                    />
                    简称:
                    <Input
                        className='collageInput'
                        type='text'
                        placeholder='专业简称'
                        value={this.state.inputShortMajor}
                        onChange={(e)=>this.handleChange(e,'inputShortMajor')}
                    />*/}
                </Modal>


                <div className='collageCom'>
                    <Select
                        defaultValue= '理学院'
                        style={{ width: 300 , marginBottom : '40px'}}
                        onChange={(e)=>{this.setState({select:e})}}
                    >
                        {this.state.collage.map((item,index)=>{
                            return <Option key={index} value={item.nameCollage}>{item.nameCollage}</Option>
                        })}

                    </Select>


                    <Timeline style={{textAlign:'left'}}>
                        {/*{this.state.collage.map((item,index)=>{
									let select = this.state.select;
									if(select == item.nameCollage){
										this.state.collage[index].major.map((item,i)=>{
											return <Timeline.Item>{item.nameMajor}--{item.shortName}</Timeline.Item>
										})
									}
								})}*/}
                        {
                            this.state.collage[1].major.map((item,index)=>{
                                return <Timeline.Item>{item.nameMajor}--{item.shortName}</Timeline.Item>
                            })
                        }
                    </Timeline>
                </div>
            </div>
        )
    }
}
