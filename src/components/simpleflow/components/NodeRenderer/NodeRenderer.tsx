import { NodesState } from "@components/simpleflow/hooks/useNodes"
import { NodeProps } from '@components/simpleflow/hooks/useNodes'
import { Node } from '@components/simpleflow/components/Node/Node'

export const NodeRenderer = ({ nodes }: { nodes: NodesState }) => {
  return (
    <>
      {Object.values(nodes).map((node) => (
        <RenderNode key={node.id} id={node.id} type={node.type} position={node.position} payload={node.payload} />
      ))}
    </>
  )
}

const RenderNode = ({ id, type, position, payload }: NodeProps) => {
  
  
  
  
  return (
    <Node id={id} key={id} position={position}>
      Node
    </Node>
  )
}