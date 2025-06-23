import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Position, BaseNodePayload, BaseNodeProps, NodeData } from '@components/simpleflow/shared/types'

export type NodesState<T extends NodeData> = Record<string, BaseNodeProps<T>>

export interface UpdateNodePositionProps {
  id: string
  position: Position
}

export const useNodes = <T extends NodeData>() => {
  const [nodes, setNodes] = useState<NodesState<T>>({})

  const addNode = (payload: BaseNodePayload<T>) => {
    const newNode: BaseNodeProps<T> = {
      id: uuidv4(),
      payload
    }

    setNodes((prevNodes) => ({
      ...prevNodes,
      [newNode.id]: newNode
    }))
  }

  const updateNodePosition = ({ id, position }: UpdateNodePositionProps) => {
    setNodes((prevNodes) => {
      const node = prevNodes[id]
      if (!node) return prevNodes

      return {
        ...prevNodes,
        [id]: {
          ...node,
          payload: {
            ...node.payload,
            position
          }
        }
      }
    })
  }

  return {
    addNode,
    nodes,
    updateNodePosition
  } as const
}
