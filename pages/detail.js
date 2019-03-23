import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Mark from '../components/column/Mark';
import Header from '../components/detail/Header';
import RecommeBox from '../components/detail/RecommeBox';

import * as actions from '../stores/actions/detail';

export default connect(
    state => ({ state: state.detail }),
)(class DetailView extends Component {
    static async getInitialProps({ store, query, isServer }) {
        const id = query.id;
        await actions.initStateInServer(id, store);
        return { id, isServer };
    }

    componentDidMount() { this.fixImageUrl() }
    componentDidUpdate() { this.fixImageUrl() }
    fixImageUrl = () => {
        const content = document.querySelector('#content');
        if (!content) return;

        const imgs = content.querySelectorAll('img');
        imgs.forEach(i => {
            if (!i.getAttribute('data-original')) return;

            // 设置 url
            i.setAttribute('src', i.getAttribute('data-original'));
            // 设置 zoom
            i.onclick = function (event) {
                // 创建 zoom 层 <div className="image-zoom"><img /></div>
                const div = document.createElement('div');
                div.appendChild(i.cloneNode(true));
                div.setAttribute('class', 'image-zoom');
                div.onclick = e => {
                    document.body.removeChild(div);
                    document.body.style = '';
                }
                document.body.appendChild(div);
                setTimeout(() => {
                    document.body.style = 'overflow: hidden;';
                }, 0);
            }
        });
    }

    render() {
        const id = this.props.id;
        const state = this.props.state[id];
        if (!state) return null;

        const { data, recommend = [] } = state;
        if (!data) return null;

        return (
            <div>
                <Header {...data} />
                <Content
                    id='content'
                    key='content'
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
                <Footer className='flex flex-column flex-ai-center'>
                    <div style={{ margin: '0 auto', width: 680 }}>
                        <Mark text='推荐阅读' />
                    </div>
                    <div className='flex'>
                        {recommend.slice(0, 3).map((item, index) => (
                            <RecommeBox
                                key={`recommend-${index}`}
                                {...item.article}
                                href={`/detail?id=${item.article.id}`}
                                as={`/detail/${item.article.id}`}
                            />
                        ))}
                    </div>
                </Footer>
            </div>
        );
    }
});

const Content = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto 10px;
    line-height: 1.7;
    padding: 30px 8px;
    font-size: 16px;
    background-color: #fff;

    u {
        text-decoration: none;
        padding-bottom: 1px;
        border-bottom: 1px solid;
    }
    strong {
        color: #333;
        margin: 0 3px;
    }
    blockquote {
        font-size: 95%;
        background-color: #f9f9f9;
        padding-right: 8px;
        padding-left: 8px;
        border-left: 4px solid #f2f3f4;
        color: #333;
        margin: 0;
        margin-left: 4px;
    }
    figure {
        text-align: center;
    }
    img {
        border-radius: 3px;
        max-width: 100%;
        margin: 10px;
        &[src *= 'data:image'] {
            display: none;
        }
    }
    p {
        text-indent: 2em;
    }
    p > br {
        display: none;
    }
`;

const Footer = styled.div`
    height: 200px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 50px;
    height: 360px;
    background-color: #f6f6f6;
    padding: 20px;

    img.image {
        width: 192px !important;
        height: 144px !important;
    }
`;
