import React, { Component } from 'react';
import styled from 'styled-components';

import api from '../api';
import Item from '../components/index/Item';
import Header from '../components/index/Header';

export default class Index extends Component {
    static async getInitialProps() {
        return { columns: await api.recommendColumn(1) };
    }

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.columns,
        };
    }

    updateColumn = async (e) => {
        const res = await api.recommendColumn();
        this.setState({ list: res });
    }

    render() {
        const { list = [] } = this.state;

        return (
            <Root>
                <Header title='随心写作，自由表达' />
                <Content>
                    <Mark>专栏 · 发现</Mark>
                    <div>
                        {Array.isArray(list) && list.map((item, index) => (
                            <Item
                                key={index}
                                data={item}
                                href={`/column?slug=${item.url_token}`}
                                as={`/column/${item.url_token}`}
                            />
                        ))}
                    </div>
                </Content>
                <div style={{ textAlign: 'center' }}>
                    <button className="update" onClick={this.updateColumn}>换一换</button>
                </div>
            </Root>
        );
    }
}

const Root = styled.div`
    background-color: #fcfcfc;
    padding: 20px;
    padding-bottom: 100px;

    .update {
        margin-top: 50px;
        border: 1px solid #555;
        padding: 0.3em 1.2em;
        border-radius: 5px;
        background-color: #fff;

        &:active {
            background-color: #f1f1f1;
        }
    }
`;

const Content = styled.div`
    margin: 0 auto;
    width: 904px;
    text-align: center;
    &::after {
        content: "";
        display: table;
        clear: both;
    }
`;

const Mark = styled.p`
    font-weight: bold;
    position: relative;
    margin: 30px auto;
    &::after, &::before {
        background-color: #ccc;
        content: "";
        position: absolute;
        height: 1px;
        width: 200px;
        left: 200px;
        top: 50%;
    }
    &::after {
        left: auto;
        right: 200px;
    }
`;

