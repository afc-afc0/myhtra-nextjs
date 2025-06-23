import { createContext, useState, useContext, ReactNode } from 'react'
import { NodesState, UpdateNodePositionProps, useNodes } from '@simpleflow/hooks/useNodes'
import { NodeData, BaseNodePayload } from '@components/simpleflow/shared/types'

interface Viewport {
  x: number
  y: number
  zoom: number
}

interface CanvasContextType<T extends NodeData> {
  viewport: Viewport
  setViewport: (viewport: Viewport) => void
  nodes: NodesState<T>
  addNode: (payload: BaseNodePayload<T>) => void
  updateNodePosition: (props: UpdateNodePositionProps) => void
}

const CanvasContext = createContext<CanvasContextType<NodeData> | undefined>(undefined)

interface CanvasProviderProps {
  children: ReactNode
}

export function CanvasProvider({ children }: CanvasProviderProps) {
  const { nodes, addNode, updateNodePosition } = useNodes<NodeData>()
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 })

  const value: CanvasContextType<NodeData> = {
    addNode,
    nodes,
    setViewport,
    updateNodePosition,
    viewport
  }

  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
}

export function useCanvas(): CanvasContextType<NodeData> {
  const context = useContext(CanvasContext)

  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider')
  }

  return context
}
