import React, { Component } from 'react';
import { Modal, Table, Button, Input } from 'antd';
// import { Link } from 'react-router';
import 'antd/lib/modal/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/input/style/css';
import api from './api';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/mode/javascript/javascript.js';

import { Controlled as CodeMirror } from 'react-codemirror2';


const statusToColorMap = {
    'running': 'green',
}

const codeMirrorOptions = {
    mode: 'javascript',
    theme: 'xq-light',
    tabSize: 2,
    lineNumbers: true,
}

export default class ServiceList extends Component {
    state = {
        detail: {},
        funcModalVisible: false,
        func: {
            body: '',
            name: '',
        },
    }

    componentDidMount() {
        fetch(api.fetch_service_detail(this.props.params.name))
            .then(res => res.json())
            .then(data => {
                this.setState({
                    detail: data.detail || {},
                });
            })
    }
    openFuncModal = () => {
        this.setState({
            funcModalVisible: true,
        });
    }
    hideFuncModal = () => {
        this.setState({
            funcModalVisible: false,
        });
    }
    render() {
        const { detail } = this.state;
        return (
            <div>
                <h2>{detail.name}</h2>
                <Button type='primary' onClick={this.openFuncModal}>+ 创建函数</Button>
                <pre>
                    {JSON.stringify(this.state.detail, null, 2)}
                </pre>
                <Modal
                    title='函数定义'
                    visible={this.state.funcModalVisible}
                    onCancel={this.hideFuncModal}
                    width='50%'
                >
                    <div style={{ fontSize: 18 }}>
                        <div style={{ margin: '8px 0' }}>
                            {'function '}
                            <Input style={{ width: 200, margin: '0 8px', fontSize: 16 }} placeholder='函数名称' />
                            {'(req, res) {'}
                        </div>
                        <CodeMirror
                            value={this.state.func.body}
                            options={codeMirrorOptions}
                            onBeforeChange={(editor, data, value) => {
                                this.setState({
                                    func: Object.assign({}, this.state.func, { body: value }),
                                });
                            }}
                        />
                        <div style={{ margin: '8px 0' }}>
                            {'}'}
                        </div>
                    </div>

                </Modal>
            </div>
        );
    }
}