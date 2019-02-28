import React from 'react';
import styled from 'styled-components';

export default styled.div.attrs(p => ({
    children: p.text
}))`
    position: relative;
    margin: 20px;
    font-weight: bold;
    font-size: 16px;

    &:after {
        content: "";
        position: absolute;
        left: ${p => p.text.length * 18}px;
        right: 0;
        top: 50%;
        height: 1px;
        color: #f0f0f0;
        background: currentColor;
    }
`