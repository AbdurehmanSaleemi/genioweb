import React from 'react'

function Footer(props) {
    return (
        <footer className='flex flex-col lg:flex-row w-full h-14 bg-white items-center justify-between px-10 md:px-24'>
            <div className='flex flex-wrap md:flex-nowrap md:justify-start justify-center flex-row items-center space-x-6'>
                {props.menu.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-row items-center justify-center mt-4 md:mt-0'>
                            <h1 className='text-sm font-bold'>{item}</h1>
                        </div>
                    )
                })}
            </div>
            <h1 className='text-lg font-bold mt-4 md:mt-0'>{props.title}</h1>
            <h2 className='text-sm font-bold mt-4 md:mt-0'>Copyright © </h2>
        </footer>
    )
}

export default Footer