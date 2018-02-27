import React, { Component } from 'react';
// import { Table, Tag } from 'antd';
// import { Link } from 'react-router';
// import 'antd/lib/table/style/css';
// import 'antd/lib/tag/style/css';
import api from './api';

const statusToColorMap = {
    'running': 'green',
}

export default class ServiceList extends Component {
    state = {
        detail: {},
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
    render() {
        return (
            <pre>
                {JSON.stringify(this.state.detail, null, 2)}
            </pre>
        );
    }
}