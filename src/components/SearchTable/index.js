import React,{Component} from 'react'
import { Button } from 'antd'
import './index.less'

export default class SearchTable extends Component{
    render(){
        return(
            <div className="search-btn">
                <Button type="primary" icon="search"></Button>
                <Button
                    type="default"
                    style={{marginLeft:'10px'}}
                    onClick={this.props.handleReset}
                >
                    重置
                </Button>
            </div>
        )
    }
}