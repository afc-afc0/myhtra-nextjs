'use client'

import { useCanvas } from "@components/simpleflow/context/CanvasContext"
import { Position } from "@components/simpleflow/shared/types"
import { useState, useRef } from "react"

import styles from './Node.module.css'

interface NodeProps {
  id: string
  children: React.ReactNode
  position: Position
}

export const Node = ({ id, position, children }: NodeProps) => {

  const { viewport, updateNodePosition } = useCanvas()
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<Position>({ x: 0, y: 0 })
  const nodeStartPositionRef = useRef<Position>({ x: 0, y: 0 })

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Capture the pointer to receive events outside the element
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY
    }
    nodeStartPositionRef.current = {
      x: position.x,
      y: position.y
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    e.preventDefault()
    e.stopPropagation()

    const dx = (e.clientX - dragStartRef.current.x) / viewport.zoom
    const dy = (e.clientY - dragStartRef.current.y) / viewport.zoom

    const newX = nodeStartPositionRef.current.x + dx
    const newY = nodeStartPositionRef.current.y + dy

    if (id) {
      updateNodePosition({ id, position: { x: newX, y: newY } })
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Release pointer capture
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    
    setIsDragging(false)
  }

  const getTransform = () => {
    const screenX = (position.x + viewport.x) * viewport.zoom
    const screenY = (position.y + viewport.y) * viewport.zoom
    return `translate(${screenX}px, ${screenY}px) scale(${viewport.zoom})`
  }

  return (
    <div
      className={styles.node}
      style={{
        position: 'absolute',
        transform: getTransform(),
        transformOrigin: '0 0',
        zIndex: isDragging ? 100 : 1000,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none', // Prevent browser handling of all panning and zooming gestures
        userSelect: 'none'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {children}
    </div>
  )
}