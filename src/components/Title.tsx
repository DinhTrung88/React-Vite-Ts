import * as React from 'react'
import { useState, useMemo, useReducer } from 'react'
import { Button } from 'react-bootstrap'
export interface ITitleProps {}
interface Products {
  name: string
  price: number
}
const initState = 0
const UP_action = 'up'
const DOWN_action = 'down'
const reducer = (state: number, action: string) => {
  switch (action) {
    case UP_action:
      return state + 1
    case DOWN_action:
      return state - 1
    default:
      throw new Error('Invalid action')
  }
}
export default function Title(props: ITitleProps) {
  const [count, dispath] = useReducer(reducer, initState)
  return (
    <div className="mt-3">
      <h1>{count}</h1>
      <Button onClick={() => dispath(DOWN_action)}>Down</Button>
      <Button className="ms-3" onClick={() => dispath(UP_action)}>
        Up
      </Button>
    </div>
  )
}
