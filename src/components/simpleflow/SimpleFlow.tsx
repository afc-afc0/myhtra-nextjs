'use client'

import React, { useState, useRef } from 'react'
import styles from './SimpleFlow.module.css'
import { CanvasProvider, useCanvas } from './context/CanvasContext'
import { Position } from './types/types'
import { Draggable } from './components/Draggable/Draggable'
import { NodeRenderer } from './components/NodeRenderer/NodeRenderer'

export const SimpleFlow = ({}) => {
  return (
    <CanvasContainer>
      <Canvas />
    </CanvasContainer>
  )
}

const CanvasContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <CanvasProvider>
      { children }
    </CanvasProvider>
  )
}

const Canvas = ({ children }: { children?: React.ReactNode }) => {
  const ref = useRef(null)
  const { viewport, setViewport, nodes, addNode } = useCanvas()

  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false)
  const [dragStartPosition, setDragStartPosition] = useState<Position>({ x: 0, y: 0 })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const { offsetX, offsetY } = e.nativeEvent

    if (e.dataTransfer.getData('text/plain') === '') return

    const payload = JSON.parse(e.dataTransfer.getData('text/plain'))
  
    addNode({
      position: {
        x: offsetX - viewport.x,
        y: offsetY - viewport.y
      },
      type: payload.type,
      payload
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingCanvas(true)
    setDragStartPosition({
      x: e.clientX - viewport.x,
      y: e.clientY - viewport.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCanvas) {
      setViewport({
        x: e.clientX - dragStartPosition.x,
        y: e.clientY - dragStartPosition.y,
        zoom: 1
      })
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDraggingCanvas(false)
  }

  const handleMouseLeave = () => {
    setIsDraggingCanvas(false)
  }

  return (
    <>
      <Draggable
        id="circle" 
        payload={{ type: 'circle', data: { radius: 50 } }}
      >
        Circle
      </Draggable>
      <div 
        ref={ref} 
        className={styles.canvas}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          translate: `translate(${viewport.x}px, ${viewport.y}px)`,
          transition: isDraggingCanvas ? 'none' : 'transform 0.1s ease-out',
          zIndex: 1
        }}
      >
        <NodeRenderer nodes={nodes} />
        { children }
      </div>
    </>
  )
}

