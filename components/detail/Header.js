import React from 'react';
import styled from 'styled-components';
import onlyspace from 'only-space';

export default ({ titleImage, title, author = {} }) => (
    <Root>
        <TitleImage src={titleImage} />

        <Title>{onlyspace(title)}</Title>
        <div className='flex-ai-center'>
            {author.avatar_url && <Avatar src={author.avatar_url} />}
            <div className='flex-jc-center flex-column'>
                <Name>{author.name}</Name>
                <Description>{author.description}</Description>
            </div>
        </div>
    </Root>
);

const Root = styled.div`
    background-size: cover;
    color: #333;
    position: relative;
    width: 700px;
    margin: 0 auto;
`;

const TitleImage = styled.img`
    width: 690px;
    margin-top: 20px;
    box-shadow: 1px 1px 1px rgba(1, 1, 1, 0.03);
    border-radius: 3px;
`;

const Title = styled.div`
    font-size: 24px;
    margin: 12px 8px;
    font-weight: bold;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin: 8px 12px;
`;

const Name = styled.span`
    font-size: 15px;
    font-weight: bold;
`;

const Description = styled.span`
    font-size: 14px;
    color: #999;
`;