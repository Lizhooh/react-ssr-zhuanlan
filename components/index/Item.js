import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { toThousands, leaveOut } from '../../unit';

export default ({ data, href, as }) => {
    if (!data) return null;
    return (
        <Root className='flex'>
            <Link href={href} as={as}>
                <a className='flex-1 flex-ai-center flex-column'>
                    <Avatar src={data.image_url} />
                    <div className='flex-1 flex-column'>
                        <div className='flex-1 flex-column'>
                            <Title>{data.title}</Title>
                            <Description>{leaveOut(data.description, 30)}</Description>
                        </div>
                        <Counts>
                            <span>{toThousands(data.followers)} 人关注</span>
                            <span> | {toThousands(data.articles_count)} 篇文章</span>
                        </Counts>
                    </div>
                    <Button>进入专栏</Button>
                </a>
            </Link>
        </Root>
    );
}

const Root = styled.div`
    box-shadow: 0 8px 18px rgba(1, 1, 1, 0.06);
    background-color: #fff;
    width: 206px;
    height: 268px;
    margin: 10px;
    float: left;
    padding: 18px;
    > a { margin: 0; padding: 0; }
`;

const Title = styled.h3`
    color: #333;
    font-size: 15px;
    margin: 15px 0 8px;
    & ~ div {
        color: #818181;
        font-size: 14px;
        overflow: hidden;
    }
`;

const Avatar = styled.div`
    width: 58px;
    height: 58px;
    border-radius: 100%;
    background: url(${p => p.src}) center center no-repeat;
    background-size: 100%;
    background-color: #f4f4f4;
    box-shadow: 1px 2px 2px rgba(1, 1, 1, 0.12);
`;

const Description = styled.div`
    flex: 1;
    font-size: 14px;
`;

const Counts = styled.div`
    height: 30px;
    color: #818181;
    font-size: 13px;
    font-weight: bold;
`;

const Button = styled.button`
    font-size: 14px;
    display: block;
    background-color: #fff;
    padding: 0.25em 1.2em 0.33em;
    border-radius: 15px;
    color: #50c87e;
    border: 1px solid #50c87e;
`;