'use client'

import { Loader } from '@/components/ui/loader'
import { createContext, useEffect, useRef, useState } from 'react'

const LoadingContext = createContext({
  value: 0,
  start: () => {},
  done: () => {}
})

const LoadingProvider = ({ children }) => {

  // States
  const step = useRef(5)
  const [value, setValue] = useState(0)
  const [isOn, setOn] = useState(false)

  // Methods
  const start = () => {
    setValue(0)
    setOn(true)
  }

  const done = () => {
    setValue(100)
    setTimeout(() => {
      setOn(false)
    }, 200)
  }

  useEffect(() => {
    if (isOn) {
      let timeout = 0

      if (value < 20) {
        step.current = 5
      } else if (value < 40) {
        step.current = 4
      } else if (value < 60) {
        step.current = 3
      } else if (value < 80) {
        step.current = 2
      } else {
        step.current = 1
      }

      if (value <= 98) {
        timeout = setTimeout(() => {
          setValue(value + step.current)
        }, 500)
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout)
        }
      }
    }
  }, [isOn, value])

  return (
    <LoadingContext.Provider
      value={{
        value,
        start,
        done
      }}
    >
      {isOn ? <Loader /> : <></>}
      {children}
    </LoadingContext.Provider>
  )
}

export {LoadingContext, LoadingProvider}
