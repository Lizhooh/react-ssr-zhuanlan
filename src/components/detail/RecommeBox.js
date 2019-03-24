import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default ({ title, title_image, author, href }) => (
    <Root to={href}>
        {title_image ?
            <Image src={title_image} /> :
            <div style={{ height: 8 }} />
        }
        <Title>{title}</Title>
        <Footer>
            <span>{author.name}</span>
        </Footer>
    </Root>
);

const Root = styled(Link)`
    position: relative;
    width: 245px;
    height: 226px;
    border-radius: 5px;
    box-shadow: 0 6px 14px 0 rgba(26, 26, 26, 0.06);
    background-color: #fff;
    margin-right: 14px;
    overflow: hidden;
    color: #333;
`;

const Image = styled.img`
    height: 123px;
    width: 100%;
    object-fit: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const Title = styled.h3`
    font-size: 16px;
    font-weight: bold;
    margin: 5px 10px;
`;

const Footer = styled.div`
    color: #999;
    font-size: 14px;
    padding: 4px 12px;
`;