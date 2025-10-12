'use client'
import React from 'react'
import { useCounterStore } from '@/store/counterStore'
const page = () => {
    const {count,increment,decrement,reset} = useCounterStore(state=>state)

  return (
    <div>
      <h2>count : {count}</h2> <br />
      <button onClick={increment}>increment</button> 
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default page
