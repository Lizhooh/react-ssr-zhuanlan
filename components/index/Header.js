import React from 'react';
import styled from 'styled-components';

export default ({ title = '' }) => (
    <Root image='/static/zhuanlan.svg' className='flex-center'>
        <Logo src='/static/logo.png' />
        <Title>{title}</Title>
    </Root>
);

const Root = styled.div`
    height: 420px;
    background: url(${p => p.image}) center center no-repeat;
    background-size: 960px 720px;
    position: relative;
`;

const Title = styled.p`
    letter-spacing: .5em;
    font-size: 18px;
    line-height: 24px;
    position: absolute;
    bottom: 30px;
`;

const Logo = styled.img`
    margin-top: 12px;
    margin-left: -6px;
    width: 127px;
    height: 178px;
`;