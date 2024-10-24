import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LatestBooks from '../components/LatestBooks'

function Latestbook() {
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
            <LatestBooks />
            </div>
            <Footer />
        </>
    )
}

export default Latestbook