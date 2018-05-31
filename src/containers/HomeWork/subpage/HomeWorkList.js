import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import * as action from '../../../redux/actions/homeworkt';
import {Button, Layout, Icon, Upload, Modal, Tooltip} from 'antd';
import MyTable from "../../../components/MyTable";
import {getSession} from '../../../utils/util'

class HomeWorkList extends Component {
    constructor() {
        super()
        this.state = {
            uploadList: [],
        }
    }

    beforeUpload = (file, fileList) => {
        let name = file.name;
        let format = name.substring(name.indexOf('.') + 1);
        let size = Math.floor(file.size / 1024);
        if (format !== 'jpeg' && format !== 'png' && format !== 'jpg') {
            Modal.error({
                title: '上传格式出错',
                content: '只能上传jpeg/png/jpg格式'
            })
        } else if (size > 2000) {
            Modal.error({
                title: '图片过大',
                content: '只能上传小于2000kb的图片'
            })
        } else {
            let _this = this;
            let uploadList = _this.state.uploadList;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                uploadList.push(this.result);
                _this.setState({
                    uploadList: uploadList
                })
            }
        }
        return false;
    }

    submitHomework = (record) => {
        let {submitHomework} = this.props;
        let token = getSession('token');
        let {uploadList} = this.state;
        let {workId} = record;
        submitHomework({
            workId:workId,
            files:uploadList
        },{
            token:token
        }).then(data=>{
            if(data.result){
                Modal.success({
                    title:'提交成功',
                    content:'作业提交成功'
                })
            }else{
                Modal.error({
                    title:'提交失败',
                    content:'作业提交失败，请重试'
                })
            }
        })
    }

    render() {
        let {loading, setTableH, getCount, count, homeWorkData} = this.props;
        getCount(count);
        let myTableProps = {
            count: count,
            allCount: count,
            data: homeWorkData,
            loading,
            setTableH,
            heightLess: 60,
            isRowSelection: true,
            rowSelection: {},
            columns: [
                {
                    title: "序号", width:'10%' , key: 'personId',render : (text,record) => (
                    homeWorkData.indexOf(record)+1
                )
                },
                {
                    title: "老师姓名", dataIndex: "teacherName", key: 'teacherName', width: '10%',
                },
                {
                    title: "备注信息", dataIndex: "remark", key: 'remark', width: '20%',
                }, {
                    title: "线上测试", dataIndex: "wordId", key: 'wordId', width: '15%',
                    render: (text, record) => (
                        <Link to={`/homework/correct/${record.workId}`}>
                            <Button type="primary" disabled={record.limit===0&&record.status===2?false:true} ghost icon="edit"/>
                        </Link>
                    )
                },{
                    title: "下载作业", dataIndex: "wordId", key: 'wordId', width: '15%',
                    render: (text, record) => (
                        <Button type="primary" disabled={record.limit===0&&record.status===1?false:true} ghost>
                            <a href={record.fileUrl} download="作业">
                                <Icon type='download'/>
                            </a>
                        </Button>
                    )
                }, {
                    title: "上传作业", dataIndex: "", key: '', width: '15%',
                    render: (text, record) => (
                        <Upload
                            action=''
                            multiple='true'
                            beforeUpload={this.beforeUpload}
                            onChange={this.uploadChange}
                            onRemove={this.uploadDel}
                        >
                            <Tooltip placement="topLeft" title="按ctrl键可选所有图片">
                                <Button type="primary" disabled={record.limit===0&&record.status===1?false:true} ghost>
                                    <Icon type='upload'/>
                                </Button>
                            </Tooltip>
                        </Upload>
                    )
                }, {
                    title: "确认上传", dataIndex: "", key: '', width: '15%',
                    render: (text, record) => (
                        <Button type="primary" disabled={record.limit===0&&record.status===1?false:true} ghost onClick={()=>this.submitHomework(record)}>
                            点击上传
                        </Button>
                    )
                }
            ]
        };

        return (
            <Layout>
                <MyTable {...myTableProps}/>
            </Layout>
        )
    }
}

export default connect(
    state => ({...state.HomeWorkListR, ...state.loginR}),
    action
)(HomeWorkList)