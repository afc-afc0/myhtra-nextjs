import { createContext, useState, useContext, ReactNode } from 'react'
import { AddNodeProps, NodesState, updateNodePositionProps, useNodes } from '../hooks/useNodes'

interface Viewport {
  x: number
  y: number
  zoom: number
}

interface CanvasContextType {
  viewport: Viewport
  setViewport: (viewport: Viewport) => void
  nodes: NodesState
  addNode: (node: AddNodeProps) => void,
  updateNodePosition: (props: updateNodePositionProps) => void
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

interface CanvasProviderProps {
  children: ReactNode
}

export function CanvasProvider({ children }: CanvasProviderProps) {
  const { nodes, addNode, updateNodePosition } = useNodes()
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 })

  const value = { 
    viewport,
    setViewport,
    nodes,
    addNode,
    updateNodePosition
  }

  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  )
}

export function useCanvas(): CanvasContextType {
  const context = useContext(CanvasContext)
  
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider')
  }
  
  return context
}