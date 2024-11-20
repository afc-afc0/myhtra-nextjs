'use client'

import React, { useState, useRef } from 'react'
import styles from './SimpleFlow.module.css'
import { CanvasProvider, useCanvas } from './context/CanvasContext'

export const SimpleFlow = ({}) => {
  
  return (
    <CanvasContainer>
      <Canvas>
        <Node position={{ x: 150, y: 150 }}>
          Node
        </Node>
      </Canvas>
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

const Canvas = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const [canvas, setCanvas] = useState()
  const { viewport, setViewport } = useCanvas()
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false)
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const { offsetX, offsetY } = e.nativeEvent
    const payload = e.dataTransfer.getData('text/plain')
    console.log('payload', JSON.parse(payload))
    console.log('e', e)
    console.log('handle drop', offsetX, offsetY)
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
      // Calculate new viewport position
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

  return (
    <div 
      ref={ref} 
      className={styles.canvas}
      onDragOver={handleDragOver}
      onDrop={e => handleDrop(e)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        translate: `translate(${viewport.x}px, ${viewport.y}px)`,
        transition: isDraggingCanvas ? 'none' : 'transform 0.1s ease-out',
      }}
    >
      { children }
    </div>
  )
}

interface NodeProps {
  children: React.ReactNode
  position: {
    x: number
    y: number
  }
}

const Node = ({ position, children }: NodeProps) => {  
  const { viewport } = useCanvas()

  const getTransform = () => {
    const screenX = (position.x + viewport.x) * viewport.zoom
    const screenY = (position.y + viewport.y) * viewport.zoom
    return `translate(${screenX}px, ${screenY}px) scale(${viewport.zoom})`
  }
  
  return (
    <div className={styles.node} style={{transform: getTransform(), transformOrigin: '0 0'}}>
      { children }
    </div>
  )
}
