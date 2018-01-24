import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import styled from 'styled-components';
import {
    BrowserRouter,
    Route, Switch, Link,
} from 'react-router-dom';
import fetch from 'isomorphic-fetch';

class Home extends Component {

    componentWillMount() {
        const url = `${location.origin}/api/columns/qianduanzhidian`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
    }

    render() {
        return (
            <Container>
                <p>Home</p>
                <div>
                    <Link to="/about">About</Link>
                    <Link to="/user">User</Link>
                </div>
            </Container>
        );
    }
}

const About = () => (
    <Container>
        <p>About</p>
        <Link to="/">Home</Link>
    </Container>
);

const User = () => (
    <Container>
        <p>User</p>
        <Link to="/">Home</Link>
    </Container>
);

const _404 = () => (
    <Text>404</Text>
);

const App = () => (
    <Container>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/user" component={User} />
            <Route component={_404} />
        </Switch>
    </Container>
);

const Text = styled.div`
    padding: 20px;
    font-size: 32px;
    color: #333;
`;

const Container = styled.div`
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default App;

if (typeof window !== 'undefined' && window) {
    hydrate(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('app')
    );
}
