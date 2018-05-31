import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/homeworkt';
import {Layout, Input, Button, Modal, Form,Spin} from 'antd';

const FormItem = Form.Item;
import {getSession} from "../../../utils/util";

let {Content, Sider} = Layout;

class StudentWorkCorrectC extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            topicNumber: 0,
            avgSocre: '',
            visible: false,
            image:'',
            imgIndex:0,
            loading:true
        }
    }

    handleClick = () => {
        let token = getSession('token');
        let {form: {validateFields}, submitScore} = this.props;
        let {topicNumber} = this.state;
        let href = window.location.href;
        let workId = href.substring(href.indexOf('correct/') + 8);
        validateFields((err, values) => {
            let score = [];
            let number = [];
            for(let i=0;i<topicNumber;i++){
                let scores = values[`s${i+1}`];
                score.push(scores);
                number.push(i+1);
            }
            score.push(values.avgSocre);
            number.push(0);

            submitScore({
                stuWorkId: workId,
                score: score,
                number: number
            }, {token: token}).then(data => {
                if (data.result) {
                    Modal.success({
                        title: '提交成功',
                        content: '提交成功'
                    })
                } else {
                    Modal.error({
                        title: '提交失败',
                        content: data.err
                    })
                }
            })
        })
    }

    getData = () => {
        let token = getSession('token');
        let {getOneStudentWorkInfo} = this.props;
        let href = window.location.href;
        let workId = href.substring(href.indexOf('correct/') + 8);
        getOneStudentWorkInfo({stuWorkId: workId}, {token: token}).then(data => {
            if (data.result) {
                this.setState({
                    loading:false,
                    files: data.files,
                    topicNumber: data.topicNumber
                })
            } else {
                Modal.error({
                    title: '获取数据失败',
                    content: '请重新登陆后再试'
                })
            }
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    showImg = (src,imgIndex) => {
        this.setState({
            visible: true,
            image:src,
            imgIndex:imgIndex
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        let {files, topicNumber, avgSocre,loading} = this.state;
        let formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 24},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
            },
            colon: false
        };
        let {form: {getFieldDecorator}} = this.props;
        let inputs = [];
        let topNumber = [];
        for (let i = 0; i < topicNumber; i++) {
            inputs.push(<Input
                placeholder='导师评分'
                style={{marginTop: '20px'}}
            />)
            topNumber.push('s' + (i + 1).toString());
        }
        return (
            loading?
                <Spin
                    tip="Loading..."
                    style={{
                        position:'absolute',
                        left:'50%',
                        top:'50%',
                    }}
                />
                :<Layout
                style={{backgroundColor: '#ffffff', marginTop: '10px', boxShadow: '0 0 10px rgba(0, 21, 41, 0.08)'}}>
                <Content style={{overflow: 'scroll', padding: '20px'}}>
                    {
                        files.map((item, index) => {
                            return (
                                <div>
                                    <span>{`第${index+1}题`}:</span>
                                    <img
                                        style={{width:'100%'}}
                                        src={item}
                                        alt='作业图片'
                                        onClick={()=>this.showImg(item,index)}/>
                                </div>
                            )
                        })
                    }
                    <Modal
                        title="作业展示"
                        width='1000px'
                        footer={null}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}>
                        <h2
                            style={{margin:'0 auto'}}
                        >第{this.state.imgIndex+1}题</h2>
                        <img
                            style={{width:'100%'}}
                            src={this.state.image}
                            alt="作业大图"/>
                    </Modal>
                </Content>
                <Sider style={{backgroundColor: '#ffffff', padding: '20px', overflowY: 'scroll'}}>
                    <h2>批改打分</h2>
                    <Form style={{marginTop: '20px'}}>
                        {
                            inputs.map((item, index) => (
                                <FormItem label="" {...formItemLayout}>
                                    {getFieldDecorator(topNumber[index], {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={`第${index + 1}题`} style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                            ))
                        }
                        <FormItem label="" {...formItemLayout}>
                            {getFieldDecorator('avgSocre', {
                                initialValue: avgSocre
                            })(
                                <Input placeholder="综合评分" style={{width: '100%'}}/>
                            )}
                        </FormItem>
                    </Form>
                    <Button
                        type="primary"
                        style={{width: '100%'}}
                        onClick={this.handleClick}
                    >
                        提交
                    </Button>
                </Sider>
            </Layout>
        )
    }
}

const StudentWorkCorrect = Form.create()(StudentWorkCorrectC)

export default connect(
    state => ({...state.StudentHomeWorkListR}),
    action
)(StudentWorkCorrect)