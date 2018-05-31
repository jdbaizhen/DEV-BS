import React,{Component} from 'react'
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/homeworkt';
import {Layout, Radio, Input,Form,Button,Spin,Modal} from 'antd';
const {Content,Sider} = Layout;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {TextArea} = Input;
import {getSession} from "../../../utils/util";

class StudentWorkCorrectOnlineC extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            disable: false,
            choseArrNumber:[],
            fillArrNumber:[],
            arrNumber:[],
            arrAnwser:[],
            choseArr:[
                {
                    question:'全国人大常委会《关于实行宪法宣誓制度的决定》的通过，标志着我国公职人员就职宣誓开始走上制度化发展的道路。下列关于宪法宣誓的说法正确的是',
                    abcdArr:['任的法律机制宪法宣誓是向宣誓者施加责','宪法宣誓是宣誓者向在场聆听的人员宣誓','宪法宣誓能实现内在素质向外在规范转变','宪法宣誓是示范敬畏宪法权威的社会仪式'],
                    answer:'b'
                },
                {
                    question:'全国人大常委会《关于实行宪法宣誓制度的决定》的通过，标志着我国公职人员就职宣誓开始走上制度化发展的道路。下列关于宪法宣誓的说法正确的是',
                    abcdArr:['宪法宣誓是向宣誓者施加责任的法律机制','宪法宣誓是宣誓者向在场聆听的人员宣誓','宪法宣誓能实现内在素质向外在规范转变','宪法宣誓是示范敬畏宪法权威的社会仪式'],
                    answer:'b'
                }
            ],
            fillArr:[
                {
                    question:'当前我国要把防控金融风险放到更加重要的位置，下决心处置一批风险点，确保不发生系统性金融风险。下列不属于金融机构采取的风险防范措施的是',
                    answer:'执行居民存款保险制度'
                },
                {
                    question:'当前我国要把防控金融风险放到更加重要的位置，下决心处置一批风险点，确保不发生系统性金融风险。下列不属于金融机构采取的风险防范措施的是',
                    answer:'执行居民存款保险制度'
                }
            ],
            arr:[
                '习近平在庆祝中国人民解放军建军90周年大会上指出：“人民军队的历史辉煌，是鲜血生命铸就的，永远值得我们铭记。”下列事件标志着中国共产党开始独立领导革命战争、创建人民军队的有',
                '习近平在庆祝中国人民解放军建军90周年大会上指出：“人民军队的历史辉煌，是鲜血生命铸就的，永远值得我们铭记。”下列事件标志着中国共产党开始独立领导革命战争、创建人民军队的有'
            ]
        }
    }

    submitWork = () => {
        let {arrNumber} = this.state;
        let token = getSession('token');
        let {teacherMakeOnlineScore} = this.props;
        let href = window.location.href;
        let string = href.substring(href.indexOf('correctonline/') + 14);
        let workId = string.substring(0,string.indexOf(';'));
        let number = string.substring(string.indexOf(';')+1);
        let {arr} = this.state;
        let {form: {validateFields}} = this.props;
        let length = arr.length;
        validateFields((err,values)=>{
            let answerArr =[];
            for(let i=0;i<length;i++){
                answerArr.push(values[`score${i+1}`]);
            }
            teacherMakeOnlineScore({
                workId:workId,
                studentNumber:number,
                topicNumber:arrNumber,
                score:answerArr
            },{token:token}).then(data=>{
                if(data.result){
                    Modal.success({
                        title:'批改成功'
                    })
                }else{
                    Modal.error({
                        title:'系统异常'
                    })
                }
            })
        })
    }

    componentDidMount() {
        let token = getSession('token');
        let href = window.location.href;
        let string = href.substring(href.indexOf('correctonline/') + 14);
        let workId = string.substring(0,string.indexOf(';'));
        let number = string.substring(string.indexOf(';')+1);
        let {getWork} = this.props;
        getWork({
            workId:workId,
            studentNumber:number
        },{token:token}).then(data=>{
            if(data.result){
                let workData = data.data;
                this.setState({
                    loading:false,
                    choseArr:workData.choseArr,
                    fillArr:workData.fillArr,
                    arr:workData.arr,
                    choseArrNumber:workData.choseArrNumber,
                    fillArrNumber:workData.fillArrNumber,
                    arrNumber:workData.arrNumber,
                    arrAnwser:workData.arrAnwser
                })
            }
        })
    }

    render() {
        let {choseArr,fillArr,arr,arrAnwser,disable,loading}=this.state;
        let {form: {getFieldDecorator}} = this.props;
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
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return(
            loading
            ?<Spin
                    tip="Loading..."
                    style={{
                        position:'absolute',
                        left:'50%',
                        top:'50%',
                    }}
                />
            :<Layout style={{borderTop:'2px solid #ccc'}}>
                <Content style={{padding:'20px',backgroundColor:'#fff',overflowY:'scroll'}}>
                    {choseArr.length>0?<h2>选择题</h2>:<span/>}
                    {
                        choseArr.map((item,index)=>{
                            return(
                                <div style={{marginTop:'15px'}}>
                                    <p>{index+1}、{item.question}</p>
                                    <FormItem
                                        label=''
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator(`answerchose${index+1}`, {
                                            initialValue:item.answer,
                                            trigger: disable ? null : 'onChange',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入答案'
                                                }
                                            ]
                                        })(
                                            <RadioGroup disabled>
                                                <Radio style={radioStyle} value="a">A{item.abcdArr[0]}</Radio>
                                                <Radio style={radioStyle} value="b">B{item.abcdArr[1]}</Radio>
                                                <Radio style={radioStyle} value="c">C{item.abcdArr[2]}</Radio>
                                                <Radio style={radioStyle} value="d">D{item.abcdArr[3]}</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </div>
                            )
                        })
                    }
                    {fillArr.length>0?<h2>填空题</h2>:<span/>}
                    {
                        fillArr.map((item,index)=>{
                            return(
                                <div style={{marginTop:'15px'}}>
                                    <p>{index+1}、{item.question}</p>
                                    <FormItem
                                        label=''
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator(`answerfill${index+1}`, {
                                            initialValue:item.answer,
                                            trigger: disable ? null : 'onChange',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入答案'
                                                }
                                            ]
                                        })(
                                            <Input disabled  placeholder="在此作答"/>
                                        )}
                                    </FormItem>
                                </div>
                            )
                        })
                    }
                    {arr.length>0?<h2>主观题</h2>:<span/>}
                    {
                        arr.map((item,index)=>{
                            return (
                                <div style={{marginTop:'15px'}}>
                                    <p>{index+1}、{item}</p>
                                    <FormItem
                                        label=''
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator(`answer${index+1}`, {
                                            initialValue:arrAnwser[index],
                                            trigger: disable ? null : 'onChange',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入答案'
                                                }
                                            ]
                                        })(
                                            <TextArea disabled rows={4} placeholder="在此作答"/>
                                        )}
                                    </FormItem>
                                </div>
                            )
                        })
                    }
                </Content>
                <Sider style={{backgroundColor:'#fff',padding:'0px 20px 20px 20px',overflowY:'scroll'}}>
                    {
                        arr.map((item,index)=>{
                            return (
                                <div style={{marginTop:'15px'}}>
                                    <p>{`主观：第${index+1}题`}</p>
                                    <FormItem
                                        label=''
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator(`score${index+1}`, {
                                            trigger: disable ? null : 'onChange',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入评分'
                                                }
                                            ]
                                        })(
                                            <Input placeholder="综合评分" type="number" min="0" max="100"/>
                                        )}
                                    </FormItem>
                                    {/*<FormItem
                                        label=''
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator(`scoreDetail${index+1}`, {
                                            trigger: disable ? null : 'onChange',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入答案'
                                                }
                                            ]
                                        })(
                                            <TextArea rows={4} placeholder="教师评价"/>
                                        )}
                                    </FormItem>*/}
                                </div>
                            )
                        })
                    }
                    <Button
                        type="primary"
                        onClick={this.submitWork}
                    >提交
                    </Button>
                </Sider>
            </Layout>
        )
    }
}
const StudentWorkCorrectOnline = Form.create()(StudentWorkCorrectOnlineC);
export default connect(
    state => ({...state}),
    action
)(StudentWorkCorrectOnline)