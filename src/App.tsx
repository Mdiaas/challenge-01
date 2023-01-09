import { MouseEventHandler, useState } from 'react'
import './styles/global.css'

interface dotsProps{
  x:number,
  y: number
}
export function App() {
  const [dots, setDots] = useState<dotsProps[]>([]);
  const [deletedDots, setDeletedDots] = useState<dotsProps[]>([]);

  function handleScreenClick(event: React.MouseEvent<HTMLElement>){
    setDots((dots) => {
        const newDot = {
          x: event.clientX,
          y: event.clientY
        }
        return [...dots, newDot]
    })
  }
  function handleUndo(event:React.MouseEvent<HTMLElement>){
    event.stopPropagation()
    setDots((state) => {
      const dotsWithoutDeletedOne = [...state]
      const deletedDot = dotsWithoutDeletedOne.pop()
      setDeletedDots((stateDeleted) => [...stateDeleted, deletedDot!])
      return dotsWithoutDeletedOne
    })

  }
  function handleRedo(event:React.MouseEvent<HTMLElement>){
    event.stopPropagation()
    setDeletedDots((stateDeleted)=>{
      const newDeletedDots = [...deletedDots]
      const recoverDot = newDeletedDots.pop()
      if(recoverDot){
        setDots((state) => {
          return [...state, recoverDot]
        })
      }
      return newDeletedDots
    })
  }
  return (
    <div className="App" onClick={handleScreenClick}>
      {dots.map((dot,i) => {
          return ( 
            <div className='dot' style={{left:dot.x, top: dot.y}} key={i}></div>
          )
        })}
      <div className='controllers'>
        
        <button onClick={handleUndo} disabled = {dots.length === 0}>Undo</button>
        <button onClick={handleRedo} disabled={deletedDots.length ===0}>Redo</button>
      </div>
    </div>
  )
}
