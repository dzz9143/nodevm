import React, { Component } from 'react';
import { Table, Tag, Button, Modal, Input, notification } from 'antd';
import { Link } from 'react-router';
import 'antd/lib/table/style/css';
import 'antd/lib/tag/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/notification/style/css';
import api from './api';

const statusToColorMap = {
    'running': 'green',
}

export default class ServiceList extends Component {
    timer = null;

    state = {
        services: [],
        serviceName: '',
        createServiceModalVisible: false,
    }

    fetchAllServices = () => {
        return fetch(api.fetch_services())
            .then(res => res.json())
            .then(data => {
                this.setState({
                    services: data.services || [],
                })
            });
    }

    componentDidMount() {
        // this.timer = setInterval(this.fetchAllServices, 3000);
        this.fetchAllServices();
    }

    // componentWillUnmount() {
    //     if (this.timer) {
    //         clearInterval(this.timer)
    //         this.timer = null;
    //     }
    // }

    createService = () => {
        fetch(api.create_service(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.serviceName,
            }),
        }).then(res => res.json()).then(data => {
            if (data.ok) {
                notification.success({
                    message: '服务创建成功',
                });
                this.fetchAllServices();
                this.setState({
                    createServiceModalVisible: false,
                })
            } else {
                notification.error({
                    message: '服务创建失败',
                    description: data.error,
                });
            }
        }).catch(() => {
            notification.error({
                message: '服务创建失败',
            });
        });
    }

    openCreateSerivceModal = () => {
        this.setState({
            createServiceModalVisible: true,
        });
    }

    hideCreateServiceModal = () => {
        this.setState({
            createServiceModalVisible: false,
        });
    }

    handleServiceNameChange = (e) => {
        this.setState({
            serviceName: e.target.value,
        });
    }

    render() {
        const columns = [
            {
                dataIndex: 'name',
                title: '服务名',
                key: 'name',
            },
            {
                dataIndex: 'status',
                title: '状态',
                key: 'status',
                render: (status) => {
                    return <Tag color={statusToColorMap[status]}>{status}</Tag>
                }
            },
            {
                dataIndex: 'address',
                title: '地址',
                key: 'address',
                render: (address) => address ? <a href={`http://${address}`} target='_blank'>{address}</a> : '-',
            },
            {
                title: '操作',
                key: 'action',
                render: ({ name }) => {
                    return (
                        <Link to={`/services/${name}`}>详情</Link>
                    );
                }
            }
        ];
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.openCreateSerivceModal} type='primary'>+ 创建服务</Button>
                </div>
                <Table
                    dataSource={this.state.services}
                    columns={columns}
                />
                <Modal
                    visible={this.state.createServiceModalVisible}
                    title='服务创建'
                    onOk={this.createService}
                    onCancel={this.hideCreateServiceModal}
                >
                    <div>
                        <span style={{ marginRight: 8 }}>服务名称: </span>
                        <Input
                            style={{ maxWidth: 300 }}
                            value={this.state.serviceName}
                            onChange={this.handleServiceNameChange}
                            placeholder='请填写服务名称'
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}