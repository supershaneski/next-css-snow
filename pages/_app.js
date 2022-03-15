import Head from "next/head"
import React from "react"
import "../styles/app.css"

export default function MyApp({ Component, pageProps }) {

    const siteTitle = process.env.siteTitle
    const siteVersion = process.env.NEXT_PUBLIC_APPVERSION
    
    return (
        <React.StrictMode>
        <Head>
            <title>{ siteTitle } v{ siteVersion }</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
        </React.StrictMode>
    )
}
