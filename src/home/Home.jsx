import React from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Freebook from '../components/Freebook'

function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <Freebook />
            <Footer />
        </>
    )
}

export default Home