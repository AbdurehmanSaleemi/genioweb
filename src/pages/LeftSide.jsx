import React, { startTransition } from 'react'
import { IoSparkles } from 'react-icons/io5'

function LeftSide(props) {

    const onClick = () => {
        props.setStartGenerating(true)
    }

    return (
        <div className='flex flex-col w-full bg-[#E6EFE9] h-full items-center justify-center p-12'>
            <div className='flex flex-col items-center justify-center w-full h-full mb-12'>
                <IoSparkles className='text-[#67B773] text-6xl mb-12' />
                <h1 className='text-4xl font-bold text-black text-center w-full lg:w-5/6'>
                Crea tu Página Web Profesional en 30 segundos con <span className='text-[#67B773] underline underline-offset-4'>GenioWeb</span>
                </h1>
                <textarea onChange={(e)=>props.setUserInput(e.target.value)} rows='6' className='w-full drop-shadow-[0_15px_15px_rgba(4,77,15,0.1)] transition-all ease-linear focus:border-2 focus:border-[#67B773] focus:outline-none border border-[#67B773] cursor-pointer resize-none lg:w-5/6 mt-12 p-4 rounded-lg' placeholder='Cuéntanos de qué trata tu sitio web. Ejemplo:  Agencia de Marketing en Monterrey' />
                <button onClick={onClick} className='w-full lg:w-5/6 mt-12 p-4 rounded-lg bg-[#67B773] text-white transition-all hover:bg-green-600 ease-linear font-bold text-lg drop-shadow-[0_15px_15px_rgba(4,77,15,0.1)]'>
                    Generar Sitio Web <IoSparkles className='inline-block text-md ml-2' />
                </button>
            </div>
        </div>
    )
}

export default LeftSide