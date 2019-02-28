import React from 'react';
import styled from 'styled-components';
import { toThousands } from '../../unit';

export default ({ image_url, name, articles_count, description, followersCount = 0 }) => (
    <Root className='flex-center flex-column'>
        <Avatar src={image_url} />
        <Name>{name}</Name>
        <Follow>
            {toThousands(followersCount)} 人关注
            {' | '}
            {toThousands(articles_count)} 篇文章
        </Follow>
        <Intro>{description}</Intro>
    </Root>
);

const Root = styled.div`
    padding: 20px 16px;
    background-color: #fafafa;
    box-shadow: 1px 2px 6px rgba(1, 1, 1, 0.03);
    line-height: 1.55;
    text-indent: 2em;
`;

const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin-bottom: 22px;
    box-shadow: 1px 2px 2px rgba(1, 1, 1, 0.12);
`;

const Follow = styled.p`
    margin-top: 8px;
    color: #888;
    font-size: 14px;
`;

const Intro = styled.div`
    margin-top: 12px;
    max-width: 480px;
    font-size: 15px;
`;

const Name = styled.div`
    font-size: 20px;
    line-height: 28px;
`;