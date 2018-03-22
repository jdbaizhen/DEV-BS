import React,{Component} from 'react'
import { Table ,Pagination, Input, Popconfirm ,Select} from 'antd'
const Option = Select.Option;
import './index.less'

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);


class StudentList extends Component{
    constructor(props) {
        super(props);
        this.columns = [{
            title: '姓名',
            dataIndex: 'name',
            render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
            title: '学号',
            dataIndex: 'id',
            render: (text, record) => this.renderColumns(text, record, 'id'),
        }, {
            title: '学院',
            dataIndex: 'collage',
            render: (text, record) => this.renderColumns(text, record, 'collage'),
        }, {
            title: '专业',
            dataIndex: 'major',
            render: (text, record) => this.renderColumns(text, record, 'major'),
        }, {
            title: '班级',
            dataIndex: 'classs',
            render: (text, record) => this.renderColumns(text, record, 'classs'),
        }, {
            title: '入学年份',
            dataIndex: 'year_in',
            render: (text, record) => this.renderColumns(text, record, 'year_in'),
        }, {
            title: '联系方式',
            dataIndex: 'tel',
            render: (text, record) => this.renderColumns(text, record, 'tel'),
        }, {
            title: '邮箱',
            dataIndex: 'email',
            render: (text, record) => this.renderColumns(text, record, 'email'),
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                const { editable } = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                  <a onClick={() => this.save(record.key)}>保存   </a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>|   取消  </a>
                  </Popconfirm>
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.key)}>
                    <a>|   删除</a>
                  </Popconfirm>
                </span>
                                : <a onClick={() => this.edit(record.key)}>编辑</a>
                        }
                    </div>
                );
            },
        }];
        this.state = {
            data : this.props.dataSource ,
            major : this.props.major.collage_li ,
            index : 0,
            searchMajor : this.props.major.collage_li[0]
        };
        this.cacheData = this.props.dataSource.map(item => ({ ...item }));
    }

    paginChange = (page,pageSize) => {
        let searchMajor = this.state.searchMajor;
        console.log(page,pageSize,searchMajor);
    }
    renderColumns=(text, record, column)=>{
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }
    handleChange=(value, key, column)=> {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    edit=(key)=> {
        const newData = this.props.dataSource;
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    save=(key)=> {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        console.log(target);
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }
    }
    cancel=(key)=> {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }
    delete=(key)=> {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {

        }
    }


    selectChange = (value) => {
        let major = this.props.major;
        this.setState({
            major : major[value],
            index : 0
        })
        console.log(this.state.major[0])
    }

    searchInfo = (value,option) =>{
        this.setState({
            index : option.key,
            searchMajor: value
        })
        console.log(value);
    }

    render() {
        const {title,dataSource,id,collage,major} = this.props;
        return(
            <div className='myTable' id={id}>
                <h2>{title}</h2>

                <Select
                    defaultValue= {collage[0].collage_name}
                    style={{ width: 150 , marginBottom : '40px'}}
                    onChange={this.selectChange}
                >
                    {collage.map((item,index)=>{
                        return <Option key={index} value={item.collage_eng}>{item.collage_name}</Option>
                    })}

                </Select>

                <Select
                    value={this.state.major[this.state.index]}
                    style={{ width: 150 , marginBottom : '40px'}}
                    onChange={this.searchInfo}
                >
                    {this.state.major.map((item,index)=>{
                        return <Option key={index} value={item}>{item}</Option>
                    })}

                </Select>


                <Table
                    dataSource={dataSource}
                    columns={this.columns}
                    pagination={false}
                >

                </Table>
                <Pagination
                    className='pagination'
                    showQuickJumper
                    defaultCurrent={1}
                    total={50}
                    onChange={this.paginChange}
                />,
            </div>

        )
    }
}

export default StudentList