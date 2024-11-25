'use client'

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export interface Position {
  x: number
  y: number
}

export interface AddNodeProps {
  position: Position
  payload?: any
}

export interface Node extends AddNodeProps {
  id: string
}

export type NodesState = Record<string, Node>

export interface updateNodePositionProps {
  id: string
  position: Position
}

export const useNodes = () => {
  const [nodes, setNodes] = useState<NodesState>({})
  
  const addNode = ({ position, payload }: AddNodeProps) => {
    const newNode: Node = {
      id: uuidv4(),
      position,
      payload
    }
    setNodes(prevNodes => ({ 
      ...prevNodes, 
      [newNode.id]: newNode
    }))
  }

  const updateNodePosition = ({ id, position }: updateNodePositionProps) => {
    setNodes(prevNodes => ({
      ...prevNodes,
      [id]: {
        ...prevNodes[id],
        position
      }
    }))
  }

  return { nodes, addNode, updateNodePosition }
}