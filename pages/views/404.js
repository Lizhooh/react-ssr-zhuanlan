import React from 'react';
import styled from 'styled-components';

export default () => (
    <Container>
        <Text>404</Text>
    </Container>
);

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
`;

const Text = styled.div`
    font-size: 20px;
`;
