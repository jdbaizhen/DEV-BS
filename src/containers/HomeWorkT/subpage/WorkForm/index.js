import React,{Component} from 'react';
import {connect} from 'react-redux'
import * as action from '../../../../redux/actions/homeworkt'

import {Modal, Form, Input, Select,Upload,Icon,Button,message,Tabs,Collapse,DatePicker} from 'antd';
let Option = Select.Option;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
let FormItem = Form.Item;
const {TextArea} = Input;
import {getSession} from '../../../../utils/util'
import MyModalForm from '../../../../components/MyModalForm/index'
import MultiImgUpload  from '../../../../components/MultiImgUpload/index'

class WorkFormC extends Component{
    constructor(props){
        super(props)
        this.state={
            flag: false,
            title: '',
            footer: false,
            disable: false,
            loading: false,
            uploadList:[],
            formData : {
                courseId : '',
                topicNumber:'',
                remark:''
            },
            token:'',
            handleSubmit: () => {
            },
            numberChose : [],
            numberFill: [],
            number: [],
        }
    }

    handleCancel = () => {
        this.setState({
            flag : false,
            loading : false,
        })
    }

    handleSee = () => {
        this.setState({
            flag : true,
        })
    }

    handleChange = (value) => {
        this.setState({
            formData:{courseId : value}
        })
    }

    handleReset = () => {
        let {form:{resetFields}} = this.props;
        resetFields();
    }

    beforeUpload = (file,fileList) => {
            let name = file.name;
            let {form: {validateFields}} = this.props;
            validateFields((err, values) => {
                let {courseId} = this.state.formData;
                let {courseTime} = values;
                let time = courseTime?courseTime.format('YYYY-MM-DD ')+'00:00:00':undefined;
                this.setState({
                    formData:{
                        courseId:courseId,
                        topicNumber:values.courseNumber,
                        remark:values.remark,
                        limitTime:time
                    }
                })
            })
    }

    onChange = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            this.handleCancel();
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    handleAddChose = () => {
        let {numberChose} = this.state;
        numberChose.push(1);
        this.setState({
            numberChose : numberChose
        })
    }

    handleAddFill = () => {
        let {numberFill} = this.state;
        numberFill.push(1);
        this.setState({
            numberFill : numberFill
        })
    }

    handleAdd = () => {
        let {number} = this.state;
        number.push(1);
        this.setState({
            number : number
        })
    }

    handleSubmit = () => {
        let {submitHomeWorkTwo} = this.props;
        let {numberChose,numberFill,number,token} = this.state;
        const choseLength = numberChose.length;
        const fillLength = numberFill.length;
        const length = number.length;
        let choseArr = [];
        let fillArr = [];
        let arr = [];
        let {form: {validateFields}} = this.props;
        validateFields((err, values) => {
            let topic = values.topic;
            let {courseId} = this.state.formData;
            let {courseTime} = values;
            let courseChose = values.courseChose;
            let courseFill = values.courseFill;
            let limitTime = courseTime?courseTime.format('YYYY-MM-DD ')+'00:00:00':undefined;
            for (let i = 0; i < choseLength; i++) {
                let abcdArr = [];
                abcdArr.push(values[`answerchoseA${i+1}`]);
                abcdArr.push(values[`answerchoseB${i+1}`]);
                abcdArr.push(values[`answerchoseC${i+1}`]);
                abcdArr.push(values[`answerchoseD${i+1}`]);
                let obj = {
                    question: values[`questionchose${i + 1}`],
                    abcdArr : abcdArr,
                    answer: values[`answerchose${i + 1}`]
                }
                choseArr.push(obj);
            }
            for(let i=0;i<fillLength;i++){
                let obj = {
                    question : values[`questionfill${i+1}`],
                    answer:values[`answerfill${i+1}`]
                }
                fillArr.push(obj);
            }
            for(let i=0;i<length;i++){
                arr.push(values[`question${i+1}`]);
            }
            submitHomeWorkTwo({
                topic:topic,
                courseId:courseId,
                choseScore:courseChose,
                fillScore:courseFill,
                limitTime:limitTime,
                choseArr:choseArr,
                fillArr:fillArr,
                arr:arr
            },{token:token}).then(data=>{
                this.handleCancel();
                if(data.result){
                    this.setState({
                        numberChose : [],
                        numberFill: [],
                        number: [],
                    })
                    Modal.success({
                        title:'提交成功'
                    })
                }else{
                    Modal.error({
                        title:'系统异常'
                    })
                }
            })
        })

    }

    getImgData=(uploadImg)=>{
       /* let {uploadList} = this.state;
        uploadList.push(uploadImg);*/
        this.setState({
            uploadList:uploadImg
        })
        console.log(uploadImg);
    };

    handleClear = () => {
        this.setState({
            numberChose : [],
            numberFill: [],
            number: [],
        })
    }

    componentDidMount() {
        let { getSee } = this.props;
        getSee(this.handleSee);
        let token = getSession('token');
        this.setState({
            token:token
        })
    }

    render() {
        let {title, footer, flag ,disable,formData,token,numberChose,numberFill,number,uploadList} = this.state;
        let {allCourse} = this.props;
        let {form: {getFieldDecorator}} = this.props;
        let modalFormProps = {
            width: 800,
            flag,
            title:'布置作业',
            footer,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            handleReset: this.handleReset
        };
        let formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 15},
            },
            colon: false
        };
        let uploadProps={
            action:'http://112.0.120.229:8080/work/mkwork/'+token,
            data:formData,
            beforeUpload:this.beforeUpload,
            onChange:this.onChange
        }
        let imgProps={
            uploadList,
            getImgData:this.getImgData,
            limit:1,
            maxSize:2000
        }
        return(
            <MyModalForm {...modalFormProps}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="上传" key="1">
                        <FormItem
                            label="课程"
                            {...formItemLayout}
                        >
                            {getFieldDecorator("courseId", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择课程'
                                    }
                                ]
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="选择课程"
                                    onChange = {this.handleChange}
                                >
                                    {
                                        allCourse.map((item,index) => {
                                            return (
                                                <Option key={index} value={item.courseId}>
                                                    {item.courseName}
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>

                        <FormItem label="题目数量" {...formItemLayout}>
                            {getFieldDecorator("courseNumber", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入数字'
                                    }
                                ]
                            })(
                                <Input placeholder="如3" type="number" style={{width: '100%'}}/>
                            )}
                        </FormItem>

                        <FormItem label="截至时间" {...formItemLayout}>
                            {getFieldDecorator("courseTime", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择时间'
                                    }
                                ]
                            })(
                                <DatePicker  style={{width: '100%'}}/>
                            )}
                        </FormItem>

                        <FormItem label="作业标题" {...formItemLayout}>
                            {getFieldDecorator("remark", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入作业标题'
                                    }
                                ]
                            })(
                                <Input placeholder="作业标题"/>
                            )}
                        </FormItem>

                        <FormItem label="上传文件" {...formItemLayout}>
                            {getFieldDecorator("file", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请上传word/pdf'
                                    }
                                ]
                            })(
                                <Upload {...uploadProps}>
                                    <Button>
                                        <Icon type="upload" /> 上传作业文件
                                    </Button>
                                </Upload>
                            )}
                        </FormItem>
                    </TabPane>
                    <TabPane tab="编辑" key="2">
                        <FormItem
                            label="课程"
                            {...formItemLayout}
                        >
                            {getFieldDecorator("courseId", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择课程'
                                    }
                                ]
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="选择课程"
                                    onChange = {this.handleChange}
                                >
                                    {
                                        allCourse.map((item,index) => {
                                            return (
                                                <Option key={index} value={item.courseId}>
                                                    {item.courseName}
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="标题" {...formItemLayout}>
                            {getFieldDecorator("topic", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入注意事项'
                                    }
                                ]
                            })(
                                <Input
                                    placeholder='请输入作业标题'
                                />
                            )}
                        </FormItem>

                        <FormItem label="截至时间" {...formItemLayout}>
                            {getFieldDecorator("courseTime", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择时间'
                                    }
                                ]
                            })(
                                <DatePicker style={{width: '100%'}}/>
                            )}
                        </FormItem>

                        <FormItem label="选择题" {...formItemLayout}>
                            {getFieldDecorator("courseChose", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入每道选择题分数'
                                    }
                                ]
                            })(
                                <Input type="number" min="0" max="100" style={{width: '100%'}} placeholder="每道选择题分数"/>
                            )}
                        </FormItem>

                        <FormItem label="填空题" {...formItemLayout}>
                            {getFieldDecorator("courseFill", {
                                trigger: disable ? null : 'onChange',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入每道填空题分数'
                                    }
                                ]
                            })(
                                <Input type="number" min="0" max="100" style={{width: '100%'}} placeholder="每道填空题分数"/>
                            )}
                        </FormItem>

                        <Collapse bordered={false} style={{backgroundColor:'rgb(236,236,236)',marginBottom:'20px'}}>
                            <Panel header="选择题" key="1">
                                {
                                    numberChose.map((item,index)=>{
                                        return (
                                            <div>
                                                <FormItem
                                                    label={`选择第${index+1}题`}
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`questionchose${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入题目'
                                                            }
                                                        ]
                                                    })(
                                                        <TextArea
                                                            rows={4}
                                                            placeholder={`第${index+1}题题目`}
                                                        />
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="A"
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`answerchoseA${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入答案 A'
                                                            }
                                                        ]
                                                    })(
                                                        <Input placeholder={`第${index+1}题A解答`}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="B"
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`answerchoseB${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入答案 B'
                                                            }
                                                        ]
                                                    })(
                                                        <Input placeholder={`第${index+1}题B解答`}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="C"
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`answerchoseC${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入答案 C'
                                                            }
                                                        ]
                                                    })(
                                                        <Input placeholder={`第${index+1}题C解答`}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="D"
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`answerchoseD${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入答案 D'
                                                            }
                                                        ]
                                                    })(
                                                        <Input placeholder={`第${index+1}题D解答`}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="解答"
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`answerchose${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入答案'
                                                            }
                                                        ]
                                                    })(
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            placeholder="选择课程"
                                                        >
                                                            <Option key='1' value='a'> A </Option>
                                                            <Option key='2' value='b'> B </Option>
                                                            <Option key='3' value='c'> C </Option>
                                                            <Option key='4' value='d'> D </Option>
                                                        </Select>
                                                    )}
                                                </FormItem>
                                            </div>
                                        )
                                    })
                                }
                            </Panel>
                            <Panel header="填空题" key="2">
                                {
                                    numberFill.map((item,index)=>{
                                        return(
                                            <div>
                                                <FormItem
                                                    label={`填空第${index+1}题`}
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`questionfill${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入题目'
                                                            }
                                                        ]
                                                    })(
                                                        <TextArea
                                                            rows={4}
                                                            placeholder={`填空第${index+1}题题目`}
                                                        />
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="解答"
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`answerfill${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入答案'
                                                            }
                                                        ]
                                                    })(
                                                        <Input placeholder={`填空第${index+1}题解答`}/>
                                                    )}
                                                </FormItem>
                                            </div>
                                        )
                                    })
                                }
                            </Panel>
                            <Panel header="主观题" key="3">
                                {
                                    number.map((item,index)=>{
                                        return(
                                            <div>
                                                <FormItem
                                                    label={`主观第${index+1}题`}
                                                    {...formItemLayout}
                                                >
                                                    {getFieldDecorator(`question${index+1}`, {
                                                        trigger: disable ? null : 'onChange',
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入题目'
                                                            }
                                                        ]
                                                    })(
                                                        <TextArea
                                                            rows={4}
                                                            placeholder={`主观第${index+1}题题目`}
                                                        />
                                                    )}
                                                </FormItem>
                                            </div>


                                        )
                                    })
                                }
                            </Panel>
                        </Collapse>
                        <div style={{textAlign:'center'}}>
                            <Button
                                type='default'
                                onClick={this.handleClear}
                                style={{background:'red',color:'#fff',marginRight:'20px'}}
                            >
                                清空
                            </Button>
                            <Button
                                type='primary'
                                style={{marginRight:'20px'}}
                                onClick={this.handleAddChose}
                            >
                                添加选择题
                            </Button>
                            <Button
                                type='primary'
                                style={{marginRight:'20px'}}
                                onClick={this.handleAddFill}
                            >
                                添加填空题
                            </Button>
                            <Button
                                type='primary'
                                style={{marginRight:'20px'}}
                                onClick={this.handleAdd}
                            >
                                添加主观题
                            </Button>
                            <Button
                                type='default'
                                onClick={this.handleSubmit}
                                style={{background:'green',color:'#fff'}}
                            >
                                提交
                            </Button>
                        </div>
                    </TabPane>
                </Tabs>
            </MyModalForm>
        )
    }
}
const WorkForm = Form.create()(WorkFormC);
export default connect(
    state=>({...state.homeworktR}),
    action
)(WorkForm)