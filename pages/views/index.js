import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { index } from '../redux/actions';
import { Link } from 'react-router-dom';
import { getImageUrl, leaveOut, toThousands } from '../functions';
import isEnv from 'is-env';

class IndexView extends Component {

    constructor(props) {
        super(props);
        if (isEnv('browser')) {
            document.body.scrollTop = 0;
            if (!this.props.state.columns) {
                this.props.init();
            }
        }
    }

    update = () => {
        this.props.update(this.props.state.page);
    }

    render() {
        const { columns = []} = this.props.state;

        return (
            <Container>
                <Header image="/static/zhuanlan.svg" className="flex-center">
                    <img src="/static/logo.png" className="logo" />
                    <p className="title">随心写作，自由表达</p>
                </Header>
                <Content>
                    <p className="mark">专栏 · 发现</p>
                    {columns.map((item, index) => (
                        <Item key={`item-${item.slug}`} className="flex">
                            <Link to={`/column/${item.slug}`} className="flex-1 flex-ai-center flex-column">
                                <img src={getImageUrl(item.avatar)} className="avatar" />
                                <div className="flex-1 flex-column">
                                    <div className="flex-1 flex-column">
                                        <h3>{item.name}</h3>
                                        <div style={{ flex: 1 }}>{leaveOut(item.description, 25)}</div>
                                    </div>
                                    <div className="counts">
                                        <span>{toThousands(item.followersCount)}人关注</span>
                                        <span> | {toThousands(item.postsCount)}篇文章</span>
                                    </div>
                                </div>
                                <div>
                                    <button className="button">进入专栏</button>
                                </div>
                            </Link>
                        </Item>
                    ))}

                    <button className="update" onClick={this.update}>换一换</button>
                </Content>
            </Container>
        );
    }
}

export default connect(state => ({ state: state.index }), index)(IndexView);

const Container = styled.div`
    background-color: #fcfcfc;
    padding: 20px;
    padding-bottom: 100px;
`;

const Header = styled.div`
    height: 420px;
    background: url(${p => p.image}) center center no-repeat;
    background-size: 960px 720px;
    position: relative;

    .logo {
        margin-top: 12px;
        margin-left: -6px;
        width: 127px;
        height: 178px;
    }

    .title {
        letter-spacing: .5em;
        font-size: 18px;
        line-height: 24px;
        position: absolute;
        bottom: 30px;
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
    .mark {
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
    }
    .update {
        margin-top: 50px;
        border: 1px solid #555;
        padding: 0.3em 1.2em;
        border-radius: 5px;
        background-color: #fff;
    }
`;

const Item = styled.div`
    box-shadow: 0 8px 18px rgba(1, 1, 1, 0.06);
    background-color: #fff;
    width: 206px;
    height: 258px;
    margin: 10px;
    float: left;
    padding: 18px;
    > a { margin: 0; padding: 0 }

    h3 {
        color: #444;
        font-size: 16px;
        margin: 16px 0 8px;
        & ~ div{
            color: #818181;
            font-size: 14px;
            overflow: hidden;
        }
    }
    .counts {
        height: 30px;
        color: #818181;
        font-size: 14px;
    }

    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 100%;
    }

    .button {
        background-color: #fff;
        padding: 0.3em 1.2em;
        border-radius: 5px;
        color: #50c87e;
        border: 1px solid #50c87e;
    }
`;

