import React from 'react'

function AboutUs(props) {
    return (
        <section className='flex flex-col lg:flex-row w-full items-center h-full md:px-24 px-10 mt-12 lg:space-x-24 lg:space-y-0 space-y-10 justify-center'>
            <div className='flex flex-col w-full h-full space-y-5'>
                <h1 className='text-5xl font-bold text-center lg:text-left'>{props.aboutHeader}</h1>
                <p className='text-lg leading-relaxed text-center lg:text-left font-thin text-gray-500'>{props.aboutUs}</p>
            </div>
            <div className='flex flex-col w-full h-full'>
                {/* create a gray rectange */}
                <div className='w-full h-56 bg-gray-200 rounded-lg'></div>
            </div>
        </section>
    )
}

export default AboutUs