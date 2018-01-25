import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { index } from '../redux/actions';

class IndexView extends Component {

    render() {
        return (
            <div>
                <p>Hello</p>
            </div>
        );
    }
}

export default connect(
    state => ({ state: state.index }),
    index,
)(IndexView);

