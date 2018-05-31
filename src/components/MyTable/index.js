import React from 'react';
import {Table,Modal, Alert, Popconfirm,Button,Layout} from 'antd';

export default class MyTable extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedRowKeys: [],
			selectedData: [],
			tableH: 0,
			tableW: 0
		}
	}

	componentDidMount() {
		setTimeout(this.setTableH, 0);
		window.addEventListener('resize',this.setTableH);
		if(this.props.setTableH){
			this.props.setTableH(this.setTableH);
		}
	}

	setTableH = () => {
		let {heightLess}=this.props;
		let tableH = parseFloat(getComputedStyle(this.refs.tableH)['height']) - heightLess;
		let tableW = parseFloat(getComputedStyle(this.refs.tableH)['width']);
		this.setState({
			tableH,
			tableW
		})
	};

	render() {
		let {tableH, selectedRowKeys, selectedData, tableW} = this.state;
		let {data, columns, loading, isRowSelection,heightLess, count, handleDelete,allCount,rowSelection,idWord,tableChange} = this.props;
		let height = count*heightLess;
		let myRowSelection = {};
		if (isRowSelection) {
			myRowSelection = {
				type: 'checkbox',
				selectedRowKeys,
				onChange: (rowKeys, rows) => {
					this.setState({
						selectedRowKeys: rowKeys,
						selectedData: rows.map(item => item[idWord?idWord:"id"])
					})
				},
				selections: true
			};
		}
		return (
			<Layout className="my-table-box">
				{/*{isRowSelection ? (
					<div className="my-table-alert">
						<Alert message={
							<div>
								<span style={{lineHeight: '24px'}}>
									已选择
									<span className="my-table-word">{selectedData.length}</span>
									项 / 当前页
									<span className="my-table-word">{count}</span>
									项 / 总共
									<span className="my-table-word">{allCount}</span>
									项
									</span>
									<Popconfirm title={`确认删除这${selectedData.length}项吗`}
									            onConfirm={() => {
										            handleDelete([...selectedData]).then(data => {
											            if(data.result){
												            this.setState({
													            selectedRowKeys: [],
													            selectedData: []
												            })
											            }else{
										            		Modal.error({
													            title:'未能成功删除数据',
													            content:data.err
												            })
											            }
										            })
									            }}>
									</Popconfirm>
									{this.props.children}
							</div>
						}
						       type="info" showIcon style={{height: '42px'}}/>
					</div>
				) : (
					<div className="my-table-alert">
						<Alert message={
							<div>
								<span style={{lineHeight: '24px'}}>
									当前页
									<span className="my-table-word">{}</span>
									项 / 总共
									<span className="my-table-word">{allCount}</span>
									项
								</span>
								{this.props.children}
							</div>
						}
						       type="info" showIcon style={{height: '42px'}}/>
				</div>
				)}*/}
				<div ref="tableH"
				     style={{
					     backgroundColor: '#fff',
				     }}
				>
					<Table
						dataSource={data}
						columns={columns}
						loading={loading}
						scroll={height}
						size="middle"
						pagination={false}
						onChange={tableChange?tableChange:null}
					/>
				</div>
			</Layout>
		)
	}
	componentWillUnmount(){
		window.removeEventListener('resize',this.setTableH);
	}
}