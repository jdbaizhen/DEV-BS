import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/grade';
import {Layout, Button, Modal, Timeline} from 'antd';

const {Header, Content} = Layout;
import MyTable from '../../../components/MyTable/index';
import MyPagination from '../../../components/MyPagination/index';
import {getSession} from "../../../utils/util";

class GradetDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 'true',
            visible: false,
            score: [],
            isOnline: undefined,
        }
    }

    getData = (obj) => {
        let token = getSession('token');
        let {scoreDetailOnline, scoreDetailNotOnline} = this.props;
        let href = window.location.href;
        let workId = href.substring(href.indexOf('detail/') + 7, href.indexOf(';'));
        let isOnline = href.substring(href.indexOf(';') + 1);
        this.setState({
            isOnline: isOnline
        })
        if (isOnline == 2) {
            scoreDetailOnline({
                workId: workId,
                pageIndex: 1,
                pageSize: 10,
                ...obj
            }, {
                token: token
            }).then(data => {
                console.log(data);
                if (data.result) {
                    this.setState({
                        loading: false
                    })
                }
            })
        } else if (isOnline == 1) {
            scoreDetailNotOnline({
                workId: workId,
                pageIndex: 1,
                pageSize: 10,
                ...obj
            }, {
                token: token
            }).then(data => {
                if (data.result) {
                    this.setState({
                        loading: false
                    })
                }
            })
        }
    }


    componentDidMount() {
        this.getData();
    }

    /* componentWillReceiveProps(newProps) {
         let {pageIndex} = newProps;
         this.setState({
             loading:true
         })
         this.getData({pageIndex})
     }*/

    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }

    handleDetail = (record) => {
        let {topicNumber, topicScore} = record;
        let scoreArr = [];  //主观题数组
        let length = topicScore.length;
        for (let i = 0; i < length; i++) {
            if(topicNumber[i]===0){
                scoreArr.push(`总分 : ${topicScore[i]} 分`);
            }else{
                scoreArr.push(`第${topicNumber[i]}题 : ${topicScore[i]} 分`);
            }
        }
        this.setState({
            visible:true,
            score: scoreArr
        })
    }

    handleDetailOnline = (record) => {
        let {topicNumber, topicScore} = record;
        let scoreArr = [];  //主观题数组
        let length = topicScore.length;
        for (let i = 0; i < length; i++) {
            scoreArr.push(`第${topicNumber[i]}题 : ${topicScore[i]} 分`)
        }
        this.setState({
            visible:true,
            score: scoreArr
        })
    }

    render() {
        let {details, count, setPageDetailScore, pageIndex} = this.props;
        let {loading, isOnline, score,visible } = this.state;
        let myTableOnlineProps = {
            count: count,
            allCount: count,
            data: details,
            loading,
            heightLess: 60,
            isRowSelection: true,
            handleDelete: this.handleDelete,
            rowSelection: {},
            columns: [
                {
                    title: "序号", width: '8%', key: 'personId', render: (text, record) => (
                    details.indexOf(record) + 1
                )
                }, {
                    title: "姓名", dataIndex: "studentName", key: 'studentName', width: '10%',
                }, {
                    title: "学号", dataIndex: "studentNumber", key: 'studentNumber', width: '20%',
                },
                {
                    title: "选择题", dataIndex: "chooseScore", key: "chooseScore", width: "15%",
                },
                {
                    title: "填空题", dataIndex: "fillScore", key: "fillScore", width: "15%",
                },
                {
                    title: "时间", dataIndex: "time", key: 'time', width: '30%'
                },
                {
                    title: '分数详情', widtd: '10%', key: 'edit', render: (text, record) => (
                    <Button type="primary" ghost icon="eye-o" onClick={() => this.handleDetailOnline(record)}/>
                )
                }
            ]
        };
        let myTableProps = {
            count: count,
            allCount: count,
            data: details,
            loading,
            heightLess: 60,
            isRowSelection: true,
            handleDelete: this.handleDelete,
            rowSelection: {},
            columns: [
                {
                    title: "序号", width: '15%', key: 'personId', render: (text, record) => (
                    details.indexOf(record) + 1
                )
                }, {
                    title: "姓名", dataIndex: "studentName", key: 'studentName', width: '15%',
                }, {
                    title: "学号", dataIndex: "studentNumber", key: 'studentNumber', width: '20%',
                },
                {
                    title: "时间", dataIndex: "time", key: 'time', width: '30%'
                },
                {
                    title: '分数详情', widtd: '20%', key: 'age', render: (text, record) => (
                    <Button type="primary" ghost icon="eye-o" onClick={() => this.handleDetail(record)}/>
                )
                }
            ]
        };
        let paginationProps = {
            count,
            pageIndex,
            setPage: setPageDetailScore,
            isShowSizeChanger: false
        }
        return (
            <Layout
                style={{backgroundColor: '#ffffff', marginTop: '10px', boxShadow: '0 0 10px rgba(0, 21, 41, 0.08)'}}>
                <Content style={{overflowY: 'scroll', padding: '20px 50px'}}>
                    {
                        isOnline == 1
                            ? <MyTable {...myTableProps}/>
                            : <MyTable {...myTableOnlineProps}/>
                    }
                    <MyPagination {...paginationProps}/>
                    <Modal
                        width='300px'
                        visible={visible}
                        title='分数详情'
                        footer={false}
                        onCancel={this.handleCancel}
                    >

                        <Timeline>
                            {
                                score.map((item, index) => {
                                    return (
                                        <Timeline.Item>{item}</Timeline.Item>
                                    )
                                })
                            }
                        </Timeline>
                    </Modal>
                </Content>
            </Layout>
        )
    }
}

export default connect(
    state => ({...state.setSearchTermsR, ...state.getDetailScoreR}),
    action
)(GradetDetail);