import React, { Component } from 'react';
import styled from 'styled-components';
import { getImageUrl } from '../functions';
import onlyspace from 'only-space';
import { Link } from 'react-router-dom';

export default ({ data, to }) => (
    <Container className="flex flex-column" to={to}>
        {data.titleImage && <Image src={data.titleImage} />}
        <div className="flex flex-column flex-1">
            <Title>{onlyspace(data.title)}</Title>
            {
                !data.titleImage &&
                <Summary>{onlyspace(data.content.replace(/<\/?[^>]*>/g, '').slice(0, 80)) + '...'}</Summary>
            }
        </div>

        <Footer className="flex flex-ai-center">
            <span className="name ellipsis">{data.author.name}</span>
            <span className="description ellipsis">{data.author.description}</span>
        </Footer>
    </Container>
);

const Container = styled(Link) `
    width: 240px;
    height: 225px;
    background-color: #fff;
    box-shadow: 0 6px 14px 0 rgba(26, 26, 26, 0.06);
    margin: 10px 8px;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.32s ease-in-out;


    &:hover {
        transform: scale(1.035);
    }

    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 123px;
    object-fit: cover;
    background-color: #f5f5f5;
    border-radius: 5px 5px 0 0;
`;

const Title = styled.div`
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin: 12px;
`;

const Summary = styled.div`
    margin: 0 12px 8px;
`;

const Footer = styled.div`
    color: #8590a6;
    padding: 8px 12px;
    font-size: 14px;

    .name {
        width: 100px;
    }

    .description {
        flex: 1;
        margin-left: 10px;
        text-align: right;
    }
`;