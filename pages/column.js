import React, { Component } from 'react';
import styled from 'styled-components';

import api from '../api';
import Header from '../components/column/Header';
import Item from '../components/column/Item';
import Mark from '../components/column/Mark';

export default class Column extends Component {
    static async getInitialProps({ query }) {
        const slug = query.slug;
        const [info, list] = await Promise.all([
            api.columnInfo(slug),
            api.columnPosts(slug),
        ]);
        return { info, list, slug };
    }

    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info || {},
            list: this.props.list || [],
            next: '加载更多',
        };
    }

    onMore = async () => {
        const res = await api.columnPosts(this.props.slug, this.state.list.length);
        this.setState({
            list: this.state.list.concat(res),
            next: res.length > 0 ? '加载更多' : '没有更多了',
        });
    }

    render() {
        const { info, list, next } = this.state;

        return (
            <div>
                <Header {...info} />
                <List className='flex-column'>
                    <Mark text='最新文章' />
                    <div>
                        {Array.isArray(list) && list.map((item, index) => (
                            <Item
                                key={`list-${index}`}
                                {...item}
                                href={`/detail?id=${item.id}`}
                                as={`/detail/${item.id}`}
                            />
                        ))}
                    </div>
                    <div className='flex-center'>
                        <Button onClick={this.onMore}>{next}</Button>
                    </div>
                </List>
            </div>
        );
    }
}

const List = styled.div`
    width: 100%;
    max-width: 680px;
    margin: 12px auto;
    padding: 8px 0 20px;
`;

const Button = styled.button`
    background-color: #f9f9f9;
    color: #777;
    border-radius: 3px;
    padding: 0.3em 1.2em;
    outline: none;
    font-size: 14px;
    &:hover {
        background-color: #f7f7f7;
        box-shadow: 1px 2px 2px rgba(1, 1, 1, 0.08);
    }
    &:active {
        background-color: #f1f1f1;
    }
`;