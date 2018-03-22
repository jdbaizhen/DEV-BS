import React,{Component} from 'react'
import {Modal, Button,Input,Upload,Icon} from 'antd'
const {TextArea} = Input

export default class UploadBtn extends Component{
    state = {
        ModalText: '',
        visible: false,
        confirmLoading: false,
        remark : ''
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {

        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    handleChange = (event) =>{
        var remark = event.target.value;
        this.setState({
            remark:remark
        })
    }


    render() {

        const { visible, confirmLoading, ModalText } = this.state;
        return(
            <div style={{float:'right'}}>
                <Button type="primary" onClick={this.showModal}>{this.props.title}</Button>
                <Modal title={this.props.title}
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <TextArea
                        rows={4}
                        placeholder='备注'
                        style={{marginBottom:'20px'}}
                        defaultValue={this.state.remark}
                        onChange={this.handleChange}
                    />
                    上传:
                    <Upload
                        style={{marginLeft:'20px'}}
                        action='//jsonplaceholder.typicode.com/posts/'
                    >
                        <Button>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                </Modal>
            </div>
        )
    }
}
