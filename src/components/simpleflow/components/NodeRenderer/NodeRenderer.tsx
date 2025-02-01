'use client'

import { NodesState } from "@simpleflow/hooks/useNodes"
import { BaseNodeProps, NodeData } from '@components/simpleflow/shared/types'
import { config } from "@components/simpleflow/shared/config"

export const Nodes = <T extends NodeData>({ nodes }: { nodes: NodesState<T> }) => {
  return (
    <>
      {Object.values(nodes).map((node) => (
        <RenderNode key={node.id} {...node} />
      ))}
    </>
  )
}

const RenderNode = <T extends NodeData>(props: BaseNodeProps<T>) => {
  const Node = config[props.payload.type].nodeComponent
  return <Node {...props} />
}