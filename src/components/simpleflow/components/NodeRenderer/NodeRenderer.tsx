'use client'

import { NodesState } from "@simpleflow/hooks/useNodes"
import { BaseNodeProps, NodeData } from '@components/simpleflow/shared/shared'
import { config } from "@simpleflow/components/DragDropElements/config"

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
  console.log('props.payload.type', props.payload.type)
  console.log('component', config[props.payload.type].nodeComponent)
  const Node = config[props.payload.type].nodeComponent
  return <Node {...props} />
}