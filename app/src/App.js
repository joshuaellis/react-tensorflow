import React from 'react'
import { useModel } from 'react-tensorflow'

function App () {
  const model = useModel()

  console.log(model)

  return (
    <div className='App'>
      <h1>Hello World</h1>
    </div>
  )
}

export default App
