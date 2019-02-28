import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import onlyspace from 'only-space';

export default ({ title_image, title, excerpt, author = {}, href, as }) => (
    <Link href={href} as={as}>
        <Root className='flex'>
            {title_image &&
                <TitleImage src={title_image} />
            }

            <div className='flex-column flex-1' style={{ margin: '0 8px' }}>
                <Title className='title'>{onlyspace(title)}</Title>
                <Content>
                    {onlyspace(excerpt + '').replace(/<\/?[^>]*>/g, '').slice(0, 120) + '......  '}
                    <ReView>查看全文</ReView>
                </Content>
                <div className='flex-ai-center' style={{ padding: '6px 0' }}>
                    {author && author.avatar_url &&
                        <Avatar src={author.avatar_url} />
                    }
                    <span>{author.name}</span>
                </div>
            </div>
        </Root>
    </Link>
);

const Root = styled.a`
    cursor: pointer;
    color: #656565;
    margin: 16px 0;
    line-height: 1.55;
    border-radius: 5px;
    &:hover .title {
        transition: color 0.3s ease-in-out;
        color: #39f;
    }
    > div {
        word-break: break-all !important;
    }
    a { color: #767676 }
`;

const TitleImage = styled.div`
    width: 240px;
    height: 180px;
    border-radius: 3px;
    margin: 12px 8px;
    display: block;
    background: url(${p => p.src}) center center no-repeat;
    background-color: #f4f4f4;
    background-size: cover;
`;

const Title = styled.div`
    font-weight: bold;
    margin: 8px 0;
    font-size: 18px;
    color: #333;
    line-height: 1.4;
`;

const Content = styled.div`
    font-size: 14px;
`;

const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin-right: 12px;
`;

const ReView = styled.span`
    color: #38f;
    float: right;
    font-size: 14px;
    font-weight: 400;
`;