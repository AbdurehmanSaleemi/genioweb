import { useMemo, useState } from 'react'
import './App.css'
import LeftSide from './pages/LeftSide'
import RightSide from './pages/RightSide'

function App() {
  const [userInput, setUserInput] = useState('')
  const [startGenerating, setStartGenerating] = useState(false)
  useMemo(() => {
    console.log(startGenerating)
  }, [startGenerating])

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row absolute'>
      <div className='w-full h-full lg:w-1/4 lg:fixed lg:top-0'>
        <LeftSide 
        setUserInput={setUserInput} 
        setStartGenerating={setStartGenerating}
        />
      </div>
      <div className='lg:w-3/4 w-full lg:absolute lg:right-0 lg:top-0 min-h-screen'>
        <RightSide userInput={userInput} 
        setStartGenerating={setStartGenerating} 
        startGenerating={startGenerating}
        />
      </div>
    </div>
  )
}

export default App
