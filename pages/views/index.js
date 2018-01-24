import React, { Component } from 'react';
import styled from 'styled-components';

export default class IndexView extends Component {
    static getInitialPropsState({ state }) {
        return state;
    }

    componentDidMount() {
        console.log(this.props.state);
    }

    render() {
        return (
            <div>
                <p>Hello</p>
            </div>
        );
    }
}
