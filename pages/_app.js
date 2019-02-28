import React from 'react'
import App, { Container } from 'next/app';
import BaseLayout from '../layouts/base';

// 需要继承 app
export default class extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <Container>
                <BaseLayout>
                    <Component {...pageProps} />
                </BaseLayout>
            </Container>
        )
    }
}