import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Header from '../components/column/Header';
import Item from '../components/column/Item';
import Mark from '../components/column/Mark';

import { getAction } from '../stores';

export default connect(
    state => ({ state: state.column }),
)(class Column extends Component {
    static async getInitialProps({ match }) {
        const slug = match.params.slug;
        const action = getAction('column');
        await action.initStateInServer(slug);
        return { slug };
    }

    render() {
        const { slug } = this.props;
        const { loadmore } = getAction('column');
        const state = this.props.state[slug];
        if (!state) return null;

        const { info, list, next } = state;

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
                                href={`/detail/${item.id}`}
                            />
                        ))}
                    </div>
                    <div className='flex-center'>
                        <Button onClick={e => loadmore(slug)}>{next}</Button>
                    </div>
                </List>
            </div>
        );
    }
});

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