import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import { Link } from 'react-router';
import 'antd/lib/table/style/css';
import 'antd/lib/tag/style/css';
import api from './api';

const statusToColorMap = {
    'running': 'green',
}

export default class ServiceList extends Component {
    state = {
        services: [],
    }

    componentDidMount() {
        fetch(api.fetch_services())
            .then(res => res.json())
            .then(data => {
                this.setState({
                    services: data.services || [],
                })
            })
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
            <Table
                dataSource={this.state.services}
                columns={columns}
            />
        );
    }
}