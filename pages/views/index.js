import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { index } from '../redux/actions';
import { getImageUrl } from '../functions';
import isEnv from 'is-env';
import Box from '../components/box';
import Mark from '../components/mark';
import { Link } from 'react-router-dom';

class IndexView extends Component {

    constructor(props) {
        super(props);
        if (isEnv('browser')) {
            // 导航回退时，如果没有数据则初始化。
            const { info, list, page, next } = this.props.state;
            if (!info || !list) this.props.init();
        }
    }

    render() {
        const { info, list, page, next } = this.props.state;
        if (!info || !list) return null;

        return (
            <div>
                <Header className="flex-center flex-column">
                    <img src={getImageUrl(info.avatar)} className="avatar" />
                    <h1 className="name">{info.name}</h1>
                    <p className="intro">{info.intro}</p>
                    <p className="follow">{info.followersCount} 人关注</p>
                </Header>
                <List className="flex-column">
                    <Mark text="最新文章" />
                    <div>
                        {list.map((item, index) => (
                            <Box data={item} key={`list-${index}`} to={`/detail/${item.slug}`} />
                        ))}
                    </div>
                    <div className="flex-center">
                        <button className="more" onClick={_ => this.props.more(page + 1)}>{next}</button>
                    </div>
                </List>
            </div>
        );
    }
}

export default connect(state => ({ state: state.index }), index)(IndexView);

const Header = styled.div`
    height: 360px;
    // background-color: #fafafa;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        margin-bottom: 22px;
    }
    .name {
        font-size: 20px;
        line-height: 28px;
    }
    .intro {
        margin-top: 12px;
    }
    .follow {
        margin-top: 8px;
        color: #888;
        font-size: 14px;
    }
`;

const List = styled.div`
    width: 100%;
    max-width: 680px;
    margin: 12px auto;
    padding: 8px 0 20px;

    button.more {
        background-color: #f9f9f9;
        color: #777;
        border-radius: 3px;
        padding: 0.3em 1.2em;
        outline: none;
        &:hover {
            background-color: #f7f7f7;
        }
        &:active {
            background-color: #f1f1f1;
        }
    }
`;

const Item = styled(Link) `
    cursor: pointer;
    color: #656565;
    margin: 16px 0;
    line-height: 1.55;

    > div {
        word-break: break-all !important;
    }
    .title {
        font-weight: bold;
        margin: 8px 0;
        font-size: 20px;
        color: #333;
        line-height: 1.4;
    }
    .image {
        width: 240px;
        height: 180px;
        border-radius: 3px;
        margin: 12px 8px;
    }
    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        margin-right: 12px;
    }
    a { color: #767676 }
`;
