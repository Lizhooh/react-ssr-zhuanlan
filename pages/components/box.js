import React from 'react';
import styled from 'styled-components';
import { getImageUrl } from '../functions';
import onlyspace from 'only-space';
import { Link } from 'react-router-dom';

export default ({ data, to }) => (
    <Item className="flex" to={to}>
        <div>
            {data.titleImage && <img src={data.titleImage} className="image" />}
        </div>
        <div className="flex-column flex-1" style={{ margin: '0 8px' }}>
            <div className="title">{onlyspace(data.title)}</div>
            <div>
                {onlyspace(data.content.replace(/<\/?[^>]*>/g, '').slice(0, 120)) + '......  '}
                <span style={{ color: '#aaa' }}>查看全文</span>
            </div>
            <div className="flex-ai-center" style={{ padding: '6px 0' }}>
                {
                    data.author && data.author.avatar &&
                    <img src={getImageUrl(data.author.avatar)} className="avatar" />
                }
                {data.author.name}
            </div>
        </div>
    </Item>
);

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
