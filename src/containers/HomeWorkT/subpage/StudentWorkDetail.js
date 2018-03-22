import React,{Component} from 'react'
import logo from '../../../common/images/login2.jpg'
import {Layout,Input,Button} from 'antd';


let {Content,Sider} = Layout;
let {TextArea} = Input;


export default class StudentWorkDetail extends Component{
    constructor() {
        super();
        this.state={
            score : '',
            suggestion : '',
        }
    }

    handleChangeScore=(event)=>{
        let score = event.target.value;
        this.setState({
            score : score
        })
    }
    handleChangeSuggestion=(event)=>{
        let suggestion = event.target.value;
        this.setState({
            suggestion : suggestion
        })
    }

    handleClick=()=>{
        console.log(this.state)
    }

    render() {

        return(
            <Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>

                <Content style={{overflow:'scroll',padding:'20px'}}>
                    <img src={logo} alt=""/>
                </Content>
                <Sider style={{backgroundColor:'#ffffff',padding:'20px'}}>
                    <h2>批改</h2>
                    <Input
                        defaultValue={this.state.score}
                        placeholder='导师评分'
                        style={{marginTop:'20px'}}
                        onChange={this.handleChangeScore}
                    />
                    <TextArea
                        rows={8}
                        placeholder='导师建议'
                        style={{margin:'20px 0px'}}
                        defaultValue={this.state.suggestion}
                        onChange={this.handleChangeSuggestion}
                    >

                    </TextArea>
                    <Button
                        type="primary"
                        style={{width:'100%'}}
                        onClick={this.handleClick}
                    >
                        提交
                    </Button>
                </Sider>
            </Layout>
        )
    }
}

