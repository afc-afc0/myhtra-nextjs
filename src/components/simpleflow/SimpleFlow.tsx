'use client'

import React, { useState, useRef } from 'react'
import styles from '@simpleflow/SimpleFlow.module.css'
import { CanvasProvider, useCanvas } from '@simpleflow/context/CanvasContext'
import { BaseNodePayload, NodeData, Position } from '@components/simpleflow/shared/types'
import { Nodes } from '@simpleflow/components/NodeRenderer/NodeRenderer'
import { CircleDraggable } from '@simpleflow/components/DragDropElements/Circle/Circle'
import { StartDraggable } from './components/DragDropElements/Start/Start'

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
  
    try {
      const draggedPayload = JSON.parse(e.dataTransfer.getData('text/plain'))
      
      // Ensure the payload has the required structure
      if ('type' in draggedPayload && 'data' in draggedPayload) {
        addNode({
          type: draggedPayload.type,
          position: {
            x: offsetX - viewport.x,
            y: offsetY - viewport.y
          },
          data: draggedPayload.data
        } as BaseNodePayload<NodeData>)
      }
    } catch (error) {
      console.error('Invalid payload data:', error)
    }
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
      <CircleDraggable />
      <StartDraggable />
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
        <Nodes nodes={nodes} />
        { children }
      </div>
    </>
  )
}

