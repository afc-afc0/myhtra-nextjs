import { Draggable } from "../../Draggable/Draggable"
import { DragAndDropConfig, NodeProps } from "../../types/types"
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

export const CircleNode = ({ id, position }: NodeProps) => {
  return (
    <Node id={id} key={id} position={position}>
      Drop Circle
    </Node>
  )
}

const type = 'circle'

export const config : DragAndDropConfig = { 
  type,
  drag: <Drag />,
  drop: <CircleNode id='0' position={{ x: 0, y: 0 }} />,
  payload: { type, data: { radius: 50 } }
}

// TO Continue: Finishing up creation logic for the Circle component
// And have the logic for this stabilized