import React from 'react'

function Features(props) {
    return (
        <section className='flex flex-col lg:flex-row w-full py-6 md:px-24 px-10 items-center lg:justify-around justify-center space-y-20 lg:space-y-0 lg:space-x-20 mt-12'>
            {props.features.map((item, index) => {
                return (
                    <div key={index} className='flex flex-col items-center justify-center space-y-4'>
                        <div className='lg:w-60 w-full h-72 bg-gray-200 rounded-xl flex items-center justify-center mb-4'></div>
                        <h1 className='text-2xl text-center  font-bold h-16'>{item.title}</h1>
                        <p className='text-lg lg:w-60 text-center font-thin h-36 text-gray-500'>{item.desc}</p>
                    </div>
                )
            })}
        </section>
    )
}

export default Features