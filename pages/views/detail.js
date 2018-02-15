import React, { Component } from 'react';
import styled from 'styled-components';
import isEnv from 'is-env';
import { connect } from 'react-redux';
import { detail } from '../redux/actions';
import onlyspace from 'only-space';
import { getImageUrl } from '../functions';
import Box from '../components/box';
import Mark from '../components/mark';

class DetailView extends Component {

    constructor(props) {
        super(props);
        if (isEnv('browser')) {
            this.props.init(this.props.match.params.id);
            setTimeout(() => document.body.scrollTop = 0, 0);
        }
    }

    setImageUrl = () => {
        const content = document.querySelector('#content');
        if (content) {
            const imgs = content.querySelectorAll('img');
            imgs.forEach(i => {
                if (i.getAttribute('data-original')) {
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
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const id1 = this.props.match.params.id;
        const id2 = nextProps.match.params.id;
        if (id1 !== id2) {
            this.props.init(id2);
            setTimeout(() => document.body.scrollTop = 0, 0);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.setImageUrl();
    }

    render() {
        const data = this.props.state;
        if (!data) return null;

        return (
            <div>
                <Header image={data.titleImage}>
                    <div className="flex-jc-center flex-column">
                        <div className="flex-1" />
                        <div className="flex-jc-center flex-column body">
                            <h1 className="title">{onlyspace(data.title)}</h1>
                            <div className="flex-ai-center">
                                {
                                    data.author && data.author.avatar &&
                                    <img src={getImageUrl(data.author.avatar)} className="avater" />
                                }
                                {
                                    data.author && data.author.name &&
                                    <span>{data.author.name}</span>
                                }
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    id="content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                <Footer>
                    <Mark text="推荐阅读" />
                    {(data.recommend || []).map((item, index) => (
                        <Box data={item} key={`recommend-${index}`} to={`/detail/${item.slug}`} />
                    ))}
                </Footer>
            </div>
        );
    }
}

export default connect(state => ({ state: state.detail }), detail)(DetailView);

const Header = styled.div`
    height: ${p => p.image ? '100vh' : '180px'} ;
    background: url(${p => p.image}) center center no-repeat;
    background-size: cover;
    color: #f6f6f6;
    position: relative;

    > div {
        position: absolute;
        top: 0; bottom: 0;
        left: 0; right: 0;
        background-color: rgba(1, 1, 1, 0.2);
        z-index: 1;
        ${p => p.image ? `
            box-shadow: 0 -160px 300px rgba(1, 1, 1, 0.25) inset;
        `: `
            color: #333;
            background-color: #f8f8f8;
        `}
    }
    .body {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 30px 20px;
    }
    .title {
        font-size: 24px;
        margin: 12px 8px;
        font-weight: bold;
    }
    .avater {
        width: 35px;
        height: 35px;
        border-radius: 100%;
        margin: 8px 12px;
    }
`;

const Content = styled.div`
    width: 100%;
    max-width: 680px;
    margin: 10px auto;
    line-height: 1.7;
    padding: 30px 8px;
    font-size: 16px;

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
`;

const Footer = styled.div`
    height: 200px;
    width: 100%;
    max-width: 680px;
    margin: 0 auto;

    img.image {
        width: 192px !important;
        height: 144px !important;
    }
`;
