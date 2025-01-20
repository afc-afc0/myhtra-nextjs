import { Draggable } from "../../Draggable/Draggable"
import { BaseNodePayload, BaseDragAndDropConfig, BaseNodeProps } from "../../types/baseTypes"
import { Node } from "../../Node/Node"

export const Drag = () => {
  return (
    <Draggable
      id="circle"
      payload={config.payload}
    >
      Circle
    </Draggable>
  )
}

export const CircleNode = ({ id, position, data }: CircleNodeProps) => {
  
  console.log('Circle Node', id, position, data)

  return (
    <Node id={id} key={id} position={position}>
      Drop Circle
    </Node>
  )
}

const type = 'circle'

interface CircleData {
  radius: number
}

interface CircleNodeProps extends BaseNodeProps {
  data: CircleData
}

interface CirclePayload extends BaseNodePayload {
  data: CircleData
}

export const config : BaseDragAndDropConfig<CirclePayload> = { 
  type,
  panelComponent: Drag,
  canvasComponent: CircleNode,
  payload: { type, data: { radius: 50 } }
}