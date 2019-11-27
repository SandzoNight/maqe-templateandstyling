import App from 'next/app'
import Head from 'next/head'
import React from 'react'

import '@fortawesome/fontawesome-svg-core/styles.css'

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <Head>
                    <link rel='stylesheet' href='/static/css/bootstrap.css' />
                </Head>
                <Component {...pageProps} />
            </>
        )
    }
}