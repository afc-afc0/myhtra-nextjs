'use client'

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Position } from "../types/types"

export interface AddNodeProps {
  position: Position
  type: string
  payload?: object
}

export interface NodeProps extends AddNodeProps {
  id: string
}

export type NodesState = Record<string, NodeProps>

export interface updateNodePositionProps {
  id: string
  position: Position
}

export const useNodes = () => {
  const [nodes, setNodes] = useState<NodesState>({})
  
  const addNode = ({ position, type, payload }: AddNodeProps) => {
    const newNode: NodeProps = {
      id: uuidv4(),
      type,
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