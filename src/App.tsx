

import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const inputRef = useRef(null)
  //@ts-ignore
  const wsRef = useRef()
  const [messages, setMessages] = useState(['hi', 'hello'])
  function sendMessage() {
    const data = JSON.stringify({
      type: "chat",
      payload: {
        roomId: "red",
        //@ts-ignore
        message: inputRef.current?.value
      }
    })
    //@ts-ignore
    wsRef.current?.send(data)
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red",
        }
      }))
    }
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }

    wsRef.current = ws
  }, [])

  return (

    <div className='h-screen w-screen bg-black flex-col p-10'>
      <div className='h-[80vh] w-[90vw] bg-slate-200 place-self-center p-3 flex-col'>
        {messages.map((msg ,index) => <div key={index} className='text-xl bg-slate-800 w-fit rounded-2xl text-white px-10 py-2 m-4'>{msg}</div>)}
      </div>
      <div className=' flex place-content-center' >
        <div className='m-5'>
          <input className='px-3 py-2 bg-slate-300' type="text" name="" id="" placeholder='Type your message' ref={inputRef} />
        </div>
        <div className='m-5'>
          <button onClick={sendMessage} className='bg-blue-500 px-5'>Send</button></div>
      </div>

    </div>
  )
}

export default App
