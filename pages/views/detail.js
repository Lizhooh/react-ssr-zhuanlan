import React, { Component } from 'react';
import styled from 'styled-components';

export default class DetailView extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <p>detail</p>
            </div>
        );
    }
}
