import React from 'react'

function Hero(props) {
    return (
        <div className='flex flex-col py-16 bg-gray-100 w-full items-center justify-center space-y-10 px-10 md:px-24'>
            <h1 className='md:text-5xl text-3xl font-bold text-center'>{props.heroTitle}</h1>
            <p className='text-2xl font-thin text-gray-500 text-center'>{props.heroSub}</p>
            <button className='bg-[#67B773] hover:bg-[#428d4d] text-white font-bold py-4 px-14 rounded-xl text-lg transition-all ease-linear'>
                {props.cta}
            </button>
        </div>
    )
}

export default Hero