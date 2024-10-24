import React from 'react'
import main from '../../src/assets/main.gif'

function Banner() {
    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10'>
                <div className='w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32'>
                    <div className='space-y-6'>
                        <h1 className='text-4xl font-bold'>Hello, Welcome here to learn something{" "}<span className='text-pink-500'>new everyday!!!</span></h1>
                        <p className='text-xl'>Reading is defined as a cognitive process that involves decoding symbols to arrive at meaning.
                            Reading is a lifelong skill that improves memory, foundation of knowledge, and adds a richness and depth of meaning to life for all those who can access true, deep comprehension.
                            The variety of content available online is vast, ranging from articles and e-books to journals and blogs, catering to diverse interests and needs. Online resources are often more cost-effective than physical books, 
                            with many being free or significantly cheaper. Additionally, online reading is environmentally friendly, efficient information retrieval, reducing the need for paper and physical storage space. 
                        </p>
                    </div>
                </div>
                <div className='order-1 w-full md:w-1/2 mt-10'>
                    <img src={main} className='w-85' alt="" />
                </div>
            </div>
        </>
    )
}

export default Banner