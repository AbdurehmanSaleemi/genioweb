import React, { useEffect } from 'react'
import {RxHamburgerMenu} from "react-icons/rx";
import {MdClose} from "react-icons/md";

function Header(props) {
    const [isOpen, setIsOpen] = React.useState(false)

    const onClick = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])
    return (
        <header className='flex flex-row items-center justify-between w-full bg-white h-20 px-10 md:px-24 relative'>
                <div className='w-full'>
                    <h1 className='text-2xl font-bold'>{props.title}</h1>
                </div>
                <div className='hidden lg:flex flex-row items-center justify-end space-x-6 w-full '>
                    {props.menu.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-row items-center justify-center'>
                                <h1 className='text-xl font-bold'>{item}</h1>
                            </div>
                        )
                    })}
                </div>
                <div className='flex lg:hidden flex-row items-center justify-end space-x-6 w-full'>
                    <div className='flex flex-row items-center justify-center'>
                        <RxHamburgerMenu onClick={onClick} className='text-2xl cursor-pointer' />
                    </div>
                </div>
                {isOpen ? <div className='flex flex-col bg-white items-center justify-center h-auto w-full absolute left-0 top-20 p-12'>
                    <div className='flex flex-col items-center justify-center space-y-6'>
                        <MdClose onClick={onClick} className='text-2xl cursor-pointer' />
                        {props.menu.map((item, index) => {
                            return (
                                <div key={index} className='flex flex-row items-center justify-center'>
                                    <h1 className='text-2xl font-bold'>{item}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div> : null}
                    
        </header>
    )
}

export default Header