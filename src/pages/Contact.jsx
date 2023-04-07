import React from 'react'

function Contact(props) {
    return (
        <section className='flex flex-col w-full items-center justify-center h-full py-12 px-24 mt-12 bg-gray-100 space-y-5'>
            <h1 className='md:text-5xl text-2xl font-bold text-center'>{props.contactHeader}</h1>
            <p className='text-lg md:w-2/4 text-center leading-relaxed font-thin text-gray-500'>{props.contactSub}</p>
            <button className='bg-[#67B773] hover:bg-[#428d4d] text-white font-bold md:py-4 p-4 md:px-14 rounded-xl text-lg'>
                {props.contactCTA}
            </button>
        </section>
    )
}

export default Contact