import React, { Component } from 'react';
import { Modal, Table, Button, Input, notification, Tag } from 'antd';
// import { Link } from 'react-router';
import 'antd/lib/modal/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/notification/style/css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/mode/javascript/javascript.js';

import { Controlled as CodeMirror } from 'react-codemirror2';
import api from './api';


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

    fetchDetail = () => {
        fetch(api.fetch_service_detail(this.props.params.name))
            .then(res => res.json())
            .then(data => {
                this.setState({
                    detail: data.detail || {},
                });
            });
    }

    componentDidMount() {
        this.fetchDetail();
    }

    handleFuncNameChange = (e) => {
        this.setState({
            func: Object.assign({}, this.state.func, { name: e.target.value }),
        });
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

    updateFunction = () => {
        const { detail } = this.state;
        fetch(api.update_function(detail.name), {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.func.name,
                body: this.state.func.body,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(data => {
            if (data.ok) {
                notification.success({
                    message: '函数保存成功',
                });
                this.fetchDetail();
                this.setState({
                    funcModalVisible: false,
                });
            }
        });
    }

    handleFuncEdit = (name) => {
        this.setState({
            funcModalVisible: true,
            func: {
                body: this.state.detail.functions[name],
                name,
            },
        });
    }

    render() {
        const { detail } = this.state;

        const columns = [
            {
                dataIndex: 'name',
                title: '函数名称',
                key: 'name',
                render: (name) => {
                    return <a target='_blank' href={`http://${detail.address}/${name}`}>{name}</a>;
                },
            },
            {
                title: '操作',
                key: '修改',
                width: 200,
                render: ({ name }) => {
                    return <Button onClick={() => this.handleFuncEdit(name)}>修改</Button>
                }
            }
        ];

        const { functions = {} } = detail;

        return (
            <div>
                <h2>{detail.name} <Tag color={statusToColorMap[detail.status]}>{detail.status}</Tag></h2>
                <Button style={{ marginBottom: 16 }} type='primary' onClick={this.openFuncModal}>+ 创建函数</Button>
                {/* <pre>
                    {JSON.stringify(this.state.detail, null, 2)}
                </pre> */}
                <Table
                    dataSource={Object.keys(functions).map(name => {
                        return {
                            name,
                        };
                    })}
                    columns={columns}
                    pagination={false}
                />
                <Modal
                    title='函数定义'
                    visible={this.state.funcModalVisible}
                    onOk={this.updateFunction}
                    onCancel={this.hideFuncModal}
                    width='50%'
                >
                    <div style={{ fontSize: 18 }}>
                        <div style={{ margin: '8px 0' }}>
                            {'function '}
                            <Input value={this.state.func.name} onChange={this.handleFuncNameChange} style={{ width: 200, margin: '0 8px', fontSize: 16 }} placeholder='函数名称' />
                            {'(req, res) {'}
                        </div>
                        <div style={{ fontSize: 14 }}>
                            <CodeMirror
                                value={this.state.func.body}
                                options={codeMirrorOptions}
                                onBeforeChange={(editor, data, value) => {
                                    this.setState({
                                        func: Object.assign({}, this.state.func, { body: value }),
                                    });
                                }}
                            />
                        </div>
                        <div style={{ margin: '8px 0' }}>
                            {'}'}
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}