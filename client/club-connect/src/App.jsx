import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='text-3xl font-bold underline'>Hello World!</h1>
        <button class="btn btn-primary">Primary</button>
      </div>
    </>
  )
}

export default App
