import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/selfInfo'
import { Tabs, Row, Col, Timeline,Form,Input,Button,Upload,Modal,Spin} from 'antd';
let FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {getSession} from '../../../utils/util'
import MultiImgUpload from '../../../components/MultiImgUpload/index';

class InfoListC extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:true,
            disable:false,
            uploadList:[],
            initStudentInfo:{
                birthday:undefined,
                collegeName:undefined,
                email:undefined,
                entranceYear:undefined,
                headPortrait:undefined,
                majorName:undefined,
                nickname:undefined,
                phone:undefined,
                realname:undefined,
                sex :undefined,
                signature:undefined,
                stuClass:undefined,
                studentNumber:undefined,
                userId:undefined,
            },
            initTeacherInfo:{
                birthday:undefined,
                collegeName:undefined,
                email:undefined,
                headPortrait:undefined,
                nickname:undefined,
                phone:undefined,
                realname:undefined,
                sex :undefined,
                userId:undefined,
                teacherNumber:undefined
            }
        }
    }

    getImgData=(uploadList)=>{
        this.setState({
            uploadList
        })
    };

    callback = (key) => {
        console.log(key);
    }

    handleSubmit = () => {
        let token = getSession('token');
        let {form: {validateFields},updateInfo} = this.props;
        let {uploadList} = this.state;
        validateFields((err, values) => {
            let {phone,email} = values;
            if(phone && !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
                Modal.error({
                    title: '请输入正确的手机号',
                    content: '不是完整的11位手机号或者正确的手机号前七位'
                })
            }else if(email && !(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email))){
                Modal.error({
                    title: '请输入正确的邮箱地址',
                    content: '请输入正确的邮箱地址'
                })
            }else{
                let url = uploadList.length>0?uploadList[0].url:undefined;
                let nickname = values.nickname!==''?values.nickname:undefined;
                let phone = values.phone!==''?values.phone:undefined;
                let email = values.email!==''?values.email:undefined;
                let oldPassword = values.oldPassword!==''?values.oldPassword:undefined;
                let newPassword = values.newPassword!==''?values.newPassword:undefined;
                let obj = {
                    nickname:nickname,
                    phone:phone,
                    email:email,
                    oldPassword:oldPassword,
                    newPassword:newPassword,
                    headPortrait:url
                }
                updateInfo(obj,{token:token}).then(data => {
                    if(data.result){
                        this.getAllInfos();
                        Modal.success({
                            title: '提交成功',
                            content: '数据已更新'
                        })
                    }else{
                        Modal.error({
                            title: '提交失败',
                            content: data.errMsg
                        })
                    }
                })
            }
        })
    }

    handleReset = () => {
        let {form:{resetFields}} = this.props;
        resetFields();
    }

    getAllInfos = () => {
        let token = getSession('token');
        let {getAllInfo,role} = this.props;
        getAllInfo({token:token}).then(data => {
            let resultInfo = data.data;
            this.setState({loading:false});
            if(role==='1'){
                this.setState({
                    initTeacherInfo:{
                        birthday:resultInfo.birthday,
                        collegeName:resultInfo.collegeName,
                        email:resultInfo.email,
                        headPortrait:resultInfo.headPortrait,
                        nickname:resultInfo.nickname,
                        phone:resultInfo.phone,
                        realname:resultInfo.realname,
                        sex :resultInfo.sex,
                        teacherNumber:resultInfo.teacherNumber,
                        userId:resultInfo.userId,
                    }
                })
            }else if(role==='2'){
                this.setState({
                    initStudentInfo:{
                        birthday:resultInfo.birthday,
                        collegeName:resultInfo.collegeName,
                        email:resultInfo.email,
                        entranceYear:resultInfo.entranceYear,
                        headPortrait:resultInfo.headPortrait,
                        majorName:resultInfo.majorName,
                        nickname:resultInfo.nickname,
                        phone:resultInfo.phone,
                        realname:resultInfo.realname,
                        sex :resultInfo.sex,
                        signature:resultInfo.signature,
                        stuClass:resultInfo.stuClass,
                        studentNumber:resultInfo.studentNumber,
                        userId:resultInfo.userId,
                    }
                })
            }
        })
    }

    componentDidMount() {
        this.getAllInfos()
    }

    componentWillReceiveProps() {
        this.getAllInfos()
    }

    render() {
        let {initStudentInfo,initTeacherInfo,disable,uploadList,loading} = this.state;
        let {form: {getFieldDecorator}} = this.props;
        let role = getSession('role');
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
        let imgUploadProps={
            getImgData:this.getImgData,
            uploadList,
            disable,
            limit:1,
            maxSize:2000
        };
        return (
            loading
                ? <Spin
                    tip="Loading..."
                    style={{
                        position:'absolute',
                        left:'50%',
                        top:'50%',
                    }}
                />
            :<Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="个人信息" key="1">
                    <Row gutter={16}>
                        <Col span={2}/>
                        <Col span={7} style={{marginTop:'25px'}}>
                            {
                                role==='1'
                                ? <img src={initTeacherInfo.headPortrait} style={{width:'100%'}}/>
                                : <img src={initStudentInfo.headPortrait} style={{width:'100%'}}/>
                            }

                        </Col>
                        <Col span={1}/>
                        <Col span={12} style={{marginTop:'20px'}}>
                            {
                                role==='1'
                                    ?<Timeline>
                                        <Timeline.Item>学院 : {initTeacherInfo.collegeName}</Timeline.Item>
                                        <Timeline.Item>职工号 : {initTeacherInfo.teacherNumber}</Timeline.Item>
                                        <Timeline.Item>昵称 : {initTeacherInfo.nickname}</Timeline.Item>
                                        <Timeline.Item>姓名 : {initTeacherInfo.realname}</Timeline.Item>
                                        <Timeline.Item>性别 : {initTeacherInfo.sex}</Timeline.Item>
                                        <Timeline.Item>出生日期 : {initTeacherInfo.birthday}</Timeline.Item>
                                        <Timeline.Item>联系方式 : {initTeacherInfo.phone}</Timeline.Item>
                                        <Timeline.Item>邮箱 : {initTeacherInfo.email}</Timeline.Item>
                                    </Timeline>
                                    :<Timeline>
                                        <Timeline.Item>学院 : {initStudentInfo.collegeName}</Timeline.Item>
                                        <Timeline.Item>专业 : {initStudentInfo.majorName}</Timeline.Item>
                                        <Timeline.Item>班级 : {initStudentInfo.stuClass}</Timeline.Item>
                                        <Timeline.Item>学号 : {initStudentInfo.studentNumber}</Timeline.Item>
                                        <Timeline.Item>入学时间 : {initStudentInfo.entranceYear}</Timeline.Item>
                                        <Timeline.Item>昵称 : {initStudentInfo.nickname}</Timeline.Item>
                                        <Timeline.Item>姓名 : {initStudentInfo.realname}</Timeline.Item>
                                        <Timeline.Item>性别 : {initStudentInfo.sex}</Timeline.Item>
                                        <Timeline.Item>出生日期 : {initStudentInfo.birthday}</Timeline.Item>
                                        <Timeline.Item>联系方式 : {initStudentInfo.phone}</Timeline.Item>
                                        <Timeline.Item>邮箱 : {initStudentInfo.email}</Timeline.Item>
                                    </Timeline>

                            }

                        </Col>
                        <Col span={2}/>
                    </Row>
                </TabPane>
                <TabPane tab="修改信息" key="2">
                    <Form>
                        <Row gutter={16}>
                            <Col span={2}/>
                            <Col span={6} style={{marginTop:'25px'}}>
                                <MultiImgUpload {...imgUploadProps}/>
                            </Col>
                            <Col span={2}/>
                            <Col span={12} style={{marginTop:'20px'}}>
                                <FormItem label="昵称" {...formItemLayout}>
                                    {getFieldDecorator("nickname", {
                                        initialValue : initStudentInfo.nickname,
                                        trigger: disable ? null : 'onChange',
                                    })(
                                        <Input placeholder="请输入昵称" style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                                <FormItem label="联系方式" {...formItemLayout}>
                                    {getFieldDecorator("phone", {
                                        initialValue : initStudentInfo.phone,
                                        trigger: disable ? null : 'onChange',
                                    })(
                                        <Input placeholder="请输入联系方式" style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                                <FormItem label="邮箱" {...formItemLayout}>
                                    {getFieldDecorator("email", {
                                        initialValue : initStudentInfo.email,
                                        trigger: disable ? null : 'onChange',
                                    })(
                                        <Input placeholder="请输入邮箱地址" style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                                <FormItem label="旧密码" {...formItemLayout}>
                                    {getFieldDecorator("oldPassword", {
                                        initialValue : '',
                                        trigger: disable ? null : 'onChange',
                                    })(
                                        <Input type='password' placeholder="请输入旧密码" style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                                <FormItem label="新密码" {...formItemLayout}>
                                    {getFieldDecorator("newPassword", {
                                        initialValue : '',
                                        trigger: disable ? null : 'onChange',
                                    })(
                                        <Input type='password' placeholder="请输入新密码" style={{width: '100%'}}/>
                                    )}
                                </FormItem>

                                    <Button
                                        type='primary'
                                        style={{width:'120px',marginLeft:'20%',marginRight:'25px'}}
                                        onClick={this.handleSubmit}
                                    >
                                        提交
                                    </Button>
                                    <Button
                                        type='default'
                                        style={{width:'120px'}}
                                        onClick={this.handleReset}
                                    >
                                        重置
                                    </Button>

                            </Col>
                            <Col span={2}/>
                        </Row>
                    </Form>
                </TabPane>
            </Tabs>
        )
    }
}

const InfoList = Form.create()(InfoListC);
export default connect(
    state=>({...state.loginR,...state.selfInfoR}),
    action
)(InfoList)