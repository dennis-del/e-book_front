import React from 'react'
import Navbar from '../components/Navbar'
import AudioBooks from '../components/AudioBooks'
import Footer from '../components/Footer'

function Audiobook() {
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
                <AudioBooks />
            </div>
            <Footer />
        </>
    )
}

export default Audiobook