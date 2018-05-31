import React,{Component} from 'react'
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/homeworkt';
import {Layout, Radio, Input,Form,Button,Spin,Modal} from 'antd';
const {Content} = Layout;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {TextArea} = Input;
import {getSession} from "../../../utils/util";

class HomeWorkCorrectC extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            disable: false,
            choseArrNumber:[],
            fillArrNumber:[],
            arrNumber:[],
            choseArr:[
                {
                    question:'全国人大常委会《关于实行宪法宣誓制度的决定》的通过，标志着我国公职人员就职宣誓开始走上制度化发展的道路。下列关于宪法宣誓的说法正确的是',
                    abcdArr:['宪法宣誓是向宣誓者施加责任的法律机制','宪法宣誓是宣誓者向在场聆听的人员宣誓','宪法宣誓能实现内在素质向外在规范转变','宪法宣誓是示范敬畏宪法权威的社会仪式'],
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
        let {choseArrNumber,fillArrNumber,arrNumber}=this.state;
        let {form: {validateFields},submitStudentWork} = this.props;
        let token = getSession('token');
        let href = window.location.href;
        let workId = href.substring(href.indexOf('correct/') + 8);
        let choseLength = choseArrNumber.length;
        let fillLength = fillArrNumber.length;
        let length = arrNumber.length;
        let choseAnswerArr = [];
        let fillAnswerArr = [];
        let answerArr =[];
        validateFields((err,values)=>{
            for(let i=0;i<choseLength;i++){
                let choseAnswer = choseArrNumber[i]+';'+values[`answerchose${i+1}`];
                choseAnswerArr.push(choseAnswer);
            }
            for(let i=0;i<fillLength;i++){
                let fillAnswer = fillArrNumber[i]+';'+values[`answerfill${i+1}`];
                fillAnswerArr.push(fillAnswer);
            }
            for(let i=0;i<length;i++){
                let answer = arrNumber[i]+';'+values[`answer${i+1}`];
                answerArr.push(answer);
            }
            submitStudentWork({
                workId:workId,
                choseAnswerArr:choseAnswerArr,
                fillAnswerArr:fillAnswerArr,
                answerArr:answerArr
            },{
                token:token
            }).then(data=>{
                if(data.result){
                    Modal.success({
                        title:'提交成功'
                    })
                }else{
                    Modal.error({
                        title:'提交失败',
                        content:data.err
                    })
                }
            })
        })
    }

    componentDidMount() {
        let token = getSession('token');
        let href = window.location.href;
        let workId = href.substring(href.indexOf('correct/') + 8);
        let {getWork} = this.props;
        getWork({workId:workId},{token:token}).then(data=>{
            if(data.result){
                let workData = data.data;
                this.setState({
                    loading:false,
                    choseArr:workData.choseArr,
                    fillArr:workData.fillArr,
                    arr:workData.arr,
                    choseArrNumber:workData.choseArrNumber,
                    fillArrNumber:workData.fillArrNumber,
                    arrNumber:workData.arrNumber
                })
            }
        })
    }

    render() {
        let {choseArr,fillArr,arr,disable,loading}=this.state;
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
            :<Layout>
                <Content style={{padding:'20px',backgroundColor:'#fff',overflowY:'scroll',borderTop:'2px solid #ccc'}}>
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
                                            trigger: disable ? null : 'onChange',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入答案'
                                                }
                                            ]
                                        })(
                                            <RadioGroup>
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
                                            trigger: disable ? null : 'onChange',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入答案'
                                                }
                                            ]
                                        })(
                                            <Input placeholder="在此作答"/>
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
                                            trigger: disable ? null : 'onChange',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入答案'
                                                }
                                            ]
                                        })(
                                            <TextArea rows={4} placeholder="在此作答"/>
                                        )}
                                    </FormItem>
                                </div>
                            )
                        })
                    }
                    <Button
                        type="primary"
                        onClick={this.submitWork}
                    >提交
                    </Button>
                </Content>
            </Layout>
        )
    }
}
const HomeWorkCorrect = Form.create()(HomeWorkCorrectC);
export default connect(
    state => ({...state}),
    action
)(HomeWorkCorrect)