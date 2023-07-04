import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import  { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keyword" content={keywords} />
                <meta name="autor" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "84vh", marginTop:"80px" }}>
                <Toaster/>
                {children}
            </main>
            <Footer />
        </div>

    )
}


Layout.defaultProps={
    title:"QuickShop - Shop Now",
    description:"mern stack project",
    keywords:"html css javascript mern",
    author:"Shahama"
}
export default Layout
